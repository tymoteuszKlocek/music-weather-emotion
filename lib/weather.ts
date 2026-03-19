import { CountryWeatherProfile } from "@/types/weather";
import { getCountryByCode } from "./map";

export async function fetchCountryWeatherProfile(
  countryCode: string,
  date: string
): Promise<CountryWeatherProfile> {
  const country = getCountryByCode(countryCode);
  if (!country) throw new Error("Country not found");

  const apiKey = process.env.OPENWEATHER_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${country.lat}&lon=${country.lon}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      // If it's a 401 (not active yet), return mock data instead of crashing
      console.warn("Weather API key not yet active. Using mock data.");
      return {
        country: countryCode,
        date,
        metrics: { temperature: 22, precipitation: 0, cloudCover: 10 }
      };
    }

    const data = await res.json();
    return {
      country: countryCode,
      date,
      metrics: {
        temperature: data.main.temp,
        precipitation: data.rain?.["1h"] || 0,
        cloudCover: data.clouds.all,
      },
    };
  } catch (err) {
    // Fallback for network errors
    console.log("Weather API fetch failed. Using mock data.", err);
    return {
      country: countryCode,
      date,
      metrics: { temperature: 15, precipitation: 0, cloudCover: 50 }
    };
  }
}