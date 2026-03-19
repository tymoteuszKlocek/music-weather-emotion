import { useQuery } from "@tanstack/react-query";
import { CountryMusicProfile } from "@/types/music";
import { jsonFetcher } from "@/utils/fetcher";

export function useCountryMusic(country: string, date: string) {
    return useQuery<CountryMusicProfile>({
        queryKey: ["music", country, date],
        queryFn: () =>
            jsonFetcher<CountryMusicProfile>(
                `/api/music?country=${country}&date=${date}`
            ),
        enabled: Boolean(country && date)
    });
}