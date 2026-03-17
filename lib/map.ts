import { Country } from "@/types/country";

export const COUNTRIES: Country[] = [
    { code: "US", name: "United States", lat: 37.0902, lon: -95.7129 },
    { code: "GB", name: "United Kingdom", lat: 55.3781, lon: -3.4360 },
    { code: "DE", name: "Germany", lat: 51.1657, lon: 10.4515 },
    { code: "BR", name: "Brazil", lat: -14.2350, lon: -51.9253 },
    { code: "JP", name: "Japan", lat: 36.2048, lon: 138.2529 }
    // add more as needed
];

export function getCountryByCode(code: string): Country | undefined {
    return COUNTRIES.find((c) => c.code === code);
}