import { AudioFeatures, CountryMusicProfile } from "@/types/music";

async function findPublicPlaylistForCountry(
  countryCode: string,
  token: string
): Promise<string> {
  // Search for public playlists matching the country name
  const countryNames: Record<string, string> = {
    US: "USA hits 2026",
    GB: "UK hits 2026",
    DE: "Germany hits 2026",
    BR: "Brazil hits 2026",
    JP: "Japan hits 2026",
  };

  const query = countryNames[countryCode] ?? `${countryCode} top hits`;
  const encoded = encodeURIComponent(query);

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encoded}&type=playlist&limit=5`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const data = await res.json();
  const playlists = data.playlists?.items ?? [];

  // Pick first playlist NOT owned by "spotify" (to avoid 403)
  const accessible = playlists.find(
    (p: any) => p?.owner?.id !== "spotify" && p?.id
  );

  if (accessible) {
    console.log(`✅ Found public playlist: "${accessible.name}" by ${accessible.owner.id}`);
    return accessible.id;
  }

  // Last resort fallback — a well-known public playlist
  console.warn("⚠️ No accessible playlist found, using fallback");
  return "3qaxO2Z99batsuhi12MDsn";
}

async function getAccessToken(): Promise<string> {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
      ).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("❌ Spotify token error:", err);
    throw new Error(`Spotify auth failed: ${err.error_description}`);
  }

  const data = await res.json();
  console.log("✅ Spotify token acquired");
  return data.access_token;
}

// These are PUBLIC user-created playlists (not Spotify editorial)
// Client Credentials flow can access these without restrictions
const COUNTRY_PLAYLIST_MAP: Record<string, string> = {
  US: "3qaxO2Z99batsuhi12MDsn",   // USA Hot Hits (public)
  GB: "0XSl0xXKju7plucrd5AQIL",   // UK Top Hits (public)
  DE: "5lSMRBGDsGBSMGBGDsGBSM",   // fallback to global
  BR: "1oSmEoS5g7bKBKZe1RKdEn",   // Brazil Hits (public)
  JP: "4cOdK2wGLETKBW3PvgPWqT",   // Japan Hits (public)
  GLOBAL: "3qaxO2Z99batsuhi12MDsn", // fallback
};

export async function fetchCountryMusicProfile(
  countryCode: string,
  date: string
): Promise<CountryMusicProfile> {
  const token = await getAccessToken();

  console.log(`🎵 Fetching top tracks for market: ${countryCode}`);
  if (!/^[A-Z]{2}$/.test(countryCode)) {
    throw new Error(`Invalid countryCode for market: ${countryCode}`);
  }
  // ✅ Search for popular tracks in a specific market
  const params = new URLSearchParams({
    q: "pop hits",
    type: "track",
    market: countryCode,
    limit: "10",
    offset: "0"
  });

  const searchUrl = `https://api.spotify.com/v1/search?${params.toString()}`;

  console.log("🔎 Spotify search URL:", searchUrl);

  const searchRes = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!searchRes.ok) {
    const err = await searchRes.json();
    console.error("❌ Track search failed:", err);
    throw new Error(`Spotify track search failed: ${err.error?.message}`);
  }

  const searchData = await searchRes.json();
  const tracks = searchData.tracks?.items ?? [];

  if (tracks.length === 0) {
    throw new Error(`No tracks found for market ${countryCode}`);
  }

  const trackIds = tracks.map((t: any) => t.id).join(",");

  // ✅ Get audio features
  const featuresRes = await fetch(
    `https://api.spotify.com/v1/audio-features?ids=${trackIds}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!featuresRes.ok) {
    const err = await featuresRes.json();
    console.error("❌ Audio features failed:", err);
    throw new Error(`Spotify audio features failed: ${err.error?.message}`);
  }

  const featuresData = await featuresRes.json();
  const features = (featuresData.audio_features ?? []).filter(
    (f: any) => f !== null
  );

  if (features.length === 0) {
    throw new Error("No valid audio features returned");
  }

  // ✅ Aggregate averages
  const count = features.length;

  const avg = features.reduce(
    (acc, curr) => ({
      valence: acc.valence + curr.valence / count,
      energy: acc.energy + curr.energy / count,
      danceability: acc.danceability + curr.danceability / count,
      tempo: acc.tempo + curr.tempo / count,
    }),
    { valence: 0, energy: 0, danceability: 0, tempo: 0 }
  );

  return {
    country: countryCode,
    date,
    average: avg,
    topTracks: tracks.slice(0, 3).map((t: any) => t.name),
  };
}