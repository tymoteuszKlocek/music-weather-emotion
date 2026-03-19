import { useQuery } from "@tanstack/react-query";
import { CountryMusicProfile } from "@/types/music";
import { CountryWeatherProfile } from "@/types/weather";
import { CorrelationResult, GraphEdge, GraphNode } from "@/types/analysis";
import { jsonFetcher } from "@/utils/fetcher";

export interface AnalysisResponse {
  music: CountryMusicProfile;
  weather: CountryWeatherProfile;
  correlations: CorrelationResult[];
  graph: {
    nodes: GraphNode[];
    edges: GraphEdge[];
  };
}

export function useAnalysis(country: string, date: string) {
  return useQuery<AnalysisResponse>({
    queryKey: ["analysis", country, date],
    queryFn: () =>
      jsonFetcher<AnalysisResponse>(
        `/api/analysis?country=${country}&date=${date}`
      ),
    enabled: Boolean(country && date)
  });
}

// useQuery({
//     queryKey: ["analysis", country, date],
//     queryFn: () =>
//         jsonFetcher(`/api/analysis?country=${country}&date=${date}`),
//     enabled: country && date
// })