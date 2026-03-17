export interface WeatherMetrics {
  temperature: number;     // °C
  precipitation: number;   // mm
  cloudCover: number;      // %
}

export interface CountryWeatherProfile {
  country: string;
  date: string;
  metrics: WeatherMetrics;
}