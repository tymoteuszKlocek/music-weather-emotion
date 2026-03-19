import { NextRequest, NextResponse } from "next/server";
import { analyzeCorrelation, buildGraph } from "@/lib/analysis";
import { fetchCountryMusicProfile } from "@/lib/spotify";
import { fetchCountryWeatherProfile } from "@/lib/weather";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const country = searchParams.get("country");
    const date = searchParams.get("date");

    if (!country || !date) {
        return NextResponse.json(
            { error: "Missing country or date" },
            { status: 400 }
        );
    }

    try {
        const [music, weather] = await Promise.all([
            fetchCountryMusicProfile(country, date),
            fetchCountryWeatherProfile(country, date)
        ]);

        const correlations = analyzeCorrelation(music, weather);
        const graph = buildGraph(correlations);

        return NextResponse.json({
            music,
            weather,
            correlations,
            graph
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Failed to run analysis" },
            { status: 500 }
        );
    }
}