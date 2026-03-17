import { CountryMusicProfile } from "@/types/music";
import { CountryWeatherProfile } from "@/types/weather";
import {
    CorrelationResult,
    GraphEdge,
    GraphNode
} from "@/types/analysis";

export function analyzeCorrelation(
    music: CountryMusicProfile,
    weather: CountryWeatherProfile
): CorrelationResult[] {
    // TODO: real correlation – for now, static example
    const results: CorrelationResult[] = [
        {
            variableA: "temperature",
            variableB: "valence",
            coefficient: -0.3,
            description:
                "Lower temperatures in this dataset seem to align with slightly lower valence."
        },
        {
            variableA: "cloudCover",
            variableB: "energy",
            coefficient: -0.4,
            description:
                "Higher cloud cover is modestly associated with lower energy."
        }
    ];
    return results;
}

export function buildGraph(
    correlations: CorrelationResult[]
): { nodes: GraphNode[]; edges: GraphEdge[] } {
    const nodeMap = new Map<string, GraphNode>();

    const addNode = (id: string, type: GraphNode["type"]) => {
        if (!nodeMap.has(id)) {
            nodeMap.set(id, {
                id,
                label: id,
                type
            });
        }
    };

    correlations.forEach((c) => {
        const weatherVars = ["temperature", "precipitation", "cloudCover"];
        const emotionVars = ["valence", "energy", "danceability", "tempo"];

        const typeA = weatherVars.includes(c.variableA)
            ? "weather"
            : emotionVars.includes(c.variableA)
                ? "emotion"
                : "mood";

        const typeB = weatherVars.includes(c.variableB)
            ? "weather"
            : emotionVars.includes(c.variableB)
                ? "emotion"
                : "mood";

        addNode(c.variableA, typeA);
        addNode(c.variableB, typeB);
    });

    const nodes = Array.from(nodeMap.values());

    const edges: GraphEdge[] = correlations.map((c, idx) => ({
        id: `edge-${idx}`,
        source: c.variableA,
        target: c.variableB,
        strength: Math.abs(c.coefficient)
    }));

    return { nodes, edges };
}