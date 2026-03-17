export interface AudioFeatures {
  valence: number;
  energy: number;
  danceability: number;
  tempo: number;
}

export interface CountryMusicProfile {
  country: string;  // ISO code
  date: string;     // ISO date
  average: AudioFeatures;
  topTracks: string[];
}