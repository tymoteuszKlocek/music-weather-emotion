import { NextRequest, NextResponse } from "next/server";
import { fetchCountryMusicProfile } from "@/lib/spotify";

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
        const profile = await fetchCountryMusicProfile(country, date);
        return NextResponse.json(profile);
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Failed to fetch music profile" },
            { status: 500 }
        );
    }
}