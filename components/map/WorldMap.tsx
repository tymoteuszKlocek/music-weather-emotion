"use client";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { COUNTRIES, getCountryByCode } from "@/lib/map";
import { Country } from "@/types/country";

const MapContainer = dynamic(
    async () => (await import("react-leaflet")).MapContainer,
    { ssr: false }
);
const TileLayer = dynamic(
    async () => (await import("react-leaflet")).TileLayer,
    { ssr: false }
);
const CircleMarker = dynamic(
    async () => (await import("react-leaflet")).CircleMarker,
    { ssr: false }
);

interface WorldMapProps {
    selectedCountry?: string;
    onSelectCountry: (code: string) => void;
}

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    // This forces Leaflet to recalculate its bounds once the DOM is ready
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}

export function WorldMap({
    selectedCountry,
    onSelectCountry
}: WorldMapProps) {
    const center = useMemo<[number, number]>(() => [20, 0], []);

    return (
        <div className="h-full w-full min-h-[300px]"> {/* Ensure min-height */}
            <MapContainer
                center={center}
                zoom={2}
                scrollWheelZoom={true}
                className="h-full w-full"
            >
                <MapResizer /> {/* Add the resizer here */}
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {COUNTRIES.map((c) => {
                    const isSelected = c.code === selectedCountry;
                    return (
                        <CircleMarker
                            key={c.code}
                            center={[c.lat, c.lon]}
                            radius={isSelected ? 8 : 5}
                            color={isSelected ? "#22c55e" : "#38bdf8"}
                            eventHandlers={{
                                click: () => onSelectCountry(c.code)
                            }}
                        />
                    );
                })}
            </MapContainer>
        </div>
    );
}