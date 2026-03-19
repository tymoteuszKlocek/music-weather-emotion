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
  const results: CorrelationResult[] = [];

  // Logic: Compare normalized values to generate "pseudo-correlations" 
  // for a single data point (since we don't have a time-series array yet)
  
  // Example: Temperature vs Energy
  const temp = weather.metrics.temperature;
  const energy = music.average.energy;

  if (temp > 25 && energy > 0.6) {
    results.push({
      variableA: "temperature",
      variableB: "energy",
      coefficient: 0.8,
      description: "High temperatures in this region align with high musical energy."
    });
  } else if (temp < 10 && energy < 0.5) {
    results.push({
      variableA: "temperature",
      variableB: "energy",
      coefficient: -0.7,
      description: "Cold weather correlates with lower musical energy here."
    });
  }

  // Example: Clouds vs Valence (Positivity)
  if (weather.metrics.cloudCover > 70 && music.average.valence < 0.5) {
    results.push({
      variableA: "cloudCover",
      variableB: "valence",
      coefficient: -0.6,
      description: "Heavy cloud cover matches a more somber (lower valence) musical mood."
    });
  }

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