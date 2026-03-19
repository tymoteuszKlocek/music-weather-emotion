import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Providers } from "./providers";
// app/layout.tsx
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  title: "Music x Weather Emotion Explorer",
  description:
    "Explore relationships between weather conditions and music-derived emotions across countries."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}