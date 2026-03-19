"use client";

interface Props {
    value: string;
    onChange: (date: string) => void;
}

export function DateSelector({ value, onChange }: Props) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400">Date</label>
            <input
                type="date"
                className="rounded border border-slate-700 bg-slate-900 px-3 py-1 text-sm"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}