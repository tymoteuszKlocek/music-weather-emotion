"use client";

import { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
            <header className="border-b border-slate-800 px-6 py-4">
                <h1 className="text-lg font-semibold">
                    Music x Weather Emotion Explorer
                </h1>
                <p className="mt-1 text-xs text-slate-400">
                    Explore how weather and music-derived emotions interact across
                    countries and time.
                </p>
            </header>
            <main className="flex-1">{children}</main>
        </div>
    );
}