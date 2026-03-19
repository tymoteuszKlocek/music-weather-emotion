"use client";

import { AnalysisResponse } from "@/hooks/useAnalysis";

interface Props {
    data?: AnalysisResponse;
}

export function CountryDetailPanel({ data }: Props) {
    if (!data) {
        return (
            <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-400">
                Select a country and date to see details.
            </div>
        );
    }

    const { music, weather, correlations } = data;

    return (
        <div className="flex h-full flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900/40 p-4">
            <div>
                <h2 className="text-sm font-semibold">
                    {music.country} • {music.date}
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                    Emotional profile from Spotify + weather conditions.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded border border-slate-800 bg-slate-950/60 p-3">
                    <h3 className="mb-2 text-[11px] font-semibold text-slate-300">
                        Emotions
                    </h3>
                    <p>Valence: {music.average.valence.toFixed(2)}</p>
                    <p>Energy: {music.average.energy.toFixed(2)}</p>
                    <p>Danceability: {music.average.danceability.toFixed(2)}</p>
                    <p>Tempo: {music.average.tempo.toFixed(1)} bpm</p>
                </div>

                <div className="rounded border border-slate-800 bg-slate-950/60 p-3">
                    <h3 className="mb-2 text-[11px] font-semibold text-slate-300">
                        Weather
                    </h3>
                    <p>Temperature: {weather.metrics.temperature}°C</p>
                    <p>Precipitation: {weather.metrics.precipitation} mm</p>
                    <p>Cloud cover: {weather.metrics.cloudCover}%</p>
                </div>
            </div>

            <div className="mt-1 flex-1 overflow-auto rounded border border-slate-800 bg-slate-950/60 p-3 text-xs">
                <h3 className="mb-2 text-[11px] font-semibold text-slate-300">
                    Insights
                </h3>
                <ul className="space-y-1">
                    {correlations.map((c) => (
                        <li key={`${c.variableA}-${c.variableB}`}>
                            • {c.description}{" "}
                            <span className="text-slate-500">
                                ({c.coefficient.toFixed(2)})
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}