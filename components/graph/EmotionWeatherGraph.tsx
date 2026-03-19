"use client";

import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { GraphEdge, GraphNode } from "@/types/analysis";

interface Props {
    nodes: GraphNode[];
    edges: GraphEdge[];
}

export function EmotionWeatherGraph({ nodes, edges }: Props) {
    const rfNodes = nodes.map((n) => ({
        id: n.id,
        data: { label: n.label },
        position: { x: Math.random() * 400, y: Math.random() * 300 },
        style: {
            padding: 6,
            borderRadius: 999,
            borderWidth: 1,
            borderColor:
                n.type === "weather"
                    ? "#38bdf8"
                    : n.type === "emotion"
                        ? "#a855f7"
                        : "#22c55e",
            background:
                n.type === "weather"
                    ? "#0f172a"
                    : n.type === "emotion"
                        ? "#020617"
                        : "#022c22",
            color: "#e5e7eb",
            fontSize: 10
        }
    }));

    const rfEdges = edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        type: "default" as const,
        style: {
            stroke: "#64748b",
            strokeWidth: 1 + e.strength * 3
        },
        animated: e.strength > 0.4
    }));

    return (
        <div className="h-full w-full rounded-lg border border-slate-800 bg-slate-950/70">
            <ReactFlow nodes={rfNodes} edges={rfEdges} fitView>
                <Background color="#1f2937" gap={16} />
                <Controls />
            </ReactFlow>
        </div>
    );
}