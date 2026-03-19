"use client";

import { COUNTRIES } from "@/lib/map";

interface Props {
    value?: string;
    onChange: (code: string) => void;
}

export function CountrySelector({ value, onChange }: Props) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400">Country</label>
            <select
                className="rounded border border-slate-700 bg-slate-900 px-3 py-1 text-sm"
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="" disabled>
                    Select a country
                </option>
                {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                        {c.name}
                    </option>
                ))}
            </select>
        </div>
    );
}