export interface CorrelationResult {
  variableA: string;
  variableB: string;
  coefficient: number; // -1..1
  description: string;
}

export type NodeType = "weather" | "emotion" | "mood";

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  strength: number;
}