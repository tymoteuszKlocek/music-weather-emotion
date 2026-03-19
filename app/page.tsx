"use client";

import { useState } from "react";
import { WorldMap } from "@/components/map/WorldMap";
import { CountrySelector } from "@/features/country-select/CountrySelector";
import { DateSelector } from "@/features/date-range/DateSelector";
import { useAnalysis } from "@/hooks/useAnalysis";
import { Loader } from "@/components/ui/Loader";
import { ErrorState } from "@/components/ui/ErrorState";
import { CountryDetailPanel } from "@/components/panels/CountryDetailPanel";
import { EmotionWeatherGraph } from "@/components/graph/EmotionWeatherGraph";

export default function HomePage() {
  const [country, setCountry] = useState<string>("US");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));

  const { data, isLoading, isError, error } = useAnalysis(country, date);

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col gap-4 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-3">
          <CountrySelector value={country} onChange={setCountry} />
          <DateSelector value={date} onChange={setDate} />
        </div>
        <div className="text-xs text-slate-500">
          Data is illustrative while APIs are being wired in.
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">
        {/* Left: Map + Graph */}
        <div className="flex flex-col gap-4">
          <div className="h-1/2 min-h-55">
            <WorldMap
              selectedCountry={country}
              onSelectCountry={setCountry}
            />
          </div>
          <div className="h-1/2 min-h-55">
            {isLoading && <Loader />}
            {isError && (
              <ErrorState message={(error as Error)?.message} />
            )}
            {!isLoading && !isError && data && (
              <EmotionWeatherGraph
                nodes={data.graph.nodes}
                edges={data.graph.edges}
              />
            )}
          </div>
        </div>

        {/* Right: Detail Panel */}
        <div className="h-full">
          {isLoading && <Loader />}
          {isError && (
            <ErrorState message={(error as Error)?.message} />
          )}
          {!isLoading && !isError && (
            <CountryDetailPanel data={data} />
          )}
        </div>
      </div>
    </div>
  );
}