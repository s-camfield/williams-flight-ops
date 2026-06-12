"use client";

import { useMemo, useState } from "react";
import { AlertCircle, CheckCircle, MapPin } from "lucide-react";
import { airports } from "../../data/airports";

type AirportFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function AirportField({ label, value, onChange }: AirportFieldProps) {
  const [open, setOpen] = useState(false);

  const matches = useMemo(() => {
    const query = value.trim().toLowerCase();
    if (!query) return airports.slice(0, 8);

    return airports
      .filter((airport) =>
        airport.code.toLowerCase().includes(query) ||
        airport.city.toLowerCase().includes(query) ||
        airport.name.toLowerCase().includes(query) ||
        airport.state.toLowerCase().includes(query)
      )
      .slice(0, 10);
  }, [value]);

  const cleanValue = value.trim().toUpperCase();
  const confirmedAirport = airports.find(
    (airport) => airport.code.toLowerCase() === value.trim().toLowerCase()
  );
  const looksLikeAirportCode = /^[A-Z0-9]{3,4}$/.test(cleanValue);

  return (
    <div className="relative">
      <label>
        <div className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
          <MapPin size={17} className="text-[#0066D6]" />
          {label}
        </div>
        <input
          value={value}
          onChange={(event) => {
            onChange(event.target.value.toUpperCase());
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className="input"
          placeholder="Type city or airport code"
        />
      </label>

      {confirmedAirport && (
        <div className="mt-2 flex items-start gap-2 rounded-2xl bg-green-50 p-3 text-sm text-green-800">
          <CheckCircle size={17} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-bold">Confirmed: {confirmedAirport.code}</p>
            <p>{confirmedAirport.name} · {confirmedAirport.city}, {confirmedAirport.state}</p>
          </div>
        </div>
      )}

      {!confirmedAirport && cleanValue && looksLikeAirportCode && (
        <div className="mt-2 flex items-start gap-2 rounded-2xl bg-amber-50 p-3 text-sm text-amber-800">
          <AlertCircle size={17} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-bold">Manual airport code entered: {cleanValue}</p>
            <p>Not in the quick list yet. It will still save, but confirm before releasing the trip.</p>
          </div>
        </div>
      )}

      {open && matches.length > 0 && (
        <div className="absolute left-0 right-0 top-[76px] z-50 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
          {matches.map((airport) => (
            <button
              key={airport.code}
              type="button"
              onMouseDown={() => {
                onChange(airport.code);
                setOpen(false);
              }}
              className="w-full rounded-xl px-3 py-3 text-left hover:bg-slate-50"
            >
              <p className="font-bold text-slate-900">{airport.code} · {airport.city}, {airport.state}</p>
              <p className="text-sm text-slate-500">{airport.name}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
