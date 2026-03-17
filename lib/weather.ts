import { CountryWeatherProfile, WeatherMetrics } from "@/types/weather";

export async function fetchCountryWeatherProfile(
  countryCode: string,
  date: string
): Promise<CountryWeatherProfile> {
  // TODO: Replace with OpenWeather API logic
  const mockWeather: WeatherMetrics = {
    temperature: 15,
    precipitation: 2,
    cloudCover: 60
  };

  return {
    country: countryCode,
    date,
    metrics: mockWeather
  };
}