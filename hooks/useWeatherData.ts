import { useQuery } from "@tanstack/react-query";
import { CountryWeatherProfile } from "@/types/weather";
import { jsonFetcher } from "@/utils/fetcher";

export function useWeather(country: string, date: string) {
    return useQuery<CountryWeatherProfile>({
        queryKey: ["weather", country, date],
        queryFn: () =>
            jsonFetcher<CountryWeatherProfile>(
                `/api/weather?country=${country}&date=${date}`
            ),
        enabled: Boolean(country && date)
    });
}