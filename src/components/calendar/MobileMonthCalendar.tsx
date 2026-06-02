"use client";

import { useState } from "react";
import Link from "next/link";
import type { Flight, FlightLeg } from "../../types/flight";
import type { CalendarHold } from "../../types/calendar";
import { getAircraftClasses, getHoldClasses } from "../../lib/calendarStyles";

interface MobileMonthCalendarProps {
  flights: Flight[];
  holds: CalendarHold[];
  selectedFlightId: number;
  onSelectFlight: (flight: Flight) => void;
}

export default function MobileMonthCalendar({ flights, holds, selectedFlightId, onSelectFlight }: MobileMonthCalendarProps) {
  const [expandedFlight, setExpandedFlight] = useState<Flight | null>(flights[0]);
  const days = Array.from({ length: 35 }).map((_, i) => i - 2);

  function selectFlight(flight: Flight) {
    onSelectFlight(flight);
    setExpandedFlight(flight);
  }

  return (
    <section className="lg:hidden space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Link href="/new-flight" scroll={false} className="rounded-3xl bg-white border border-slate-200 p-4 shadow-sm">
          <p className="text-xs uppercase font-bold text-[#007DB8]">Confirmed</p>
          <p className="text-xl font-bold text-slate-900 mt-1">Add Trip</p>
          <p className="text-xs text-slate-500 mt-1">Flight is already going</p>
        </Link>
        <Link href="/owner-request" scroll={false} className="rounded-3xl bg-[#062A55] p-4 text-white shadow-sm">
          <p className="text-xs uppercase font-bold text-white/70">Request</p>
          <p className="text-xl font-bold mt-1">Flight Request</p>
          <p className="text-xs text-white/75 mt-1">Needs approval</p>
        </Link>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">August 2026</h2>
            <p className="text-sm text-slate-500">Full month schedule</p>
          </div>
          <Link href="/dashboard" scroll={false} className="rounded-xl bg-[#0066D6] px-4 py-2 text-sm font-bold text-white">Schedule</Link>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-500">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => <div key={`${day}-${index}`}>{day}</div>)}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const validDay = day >= 1 && day <= 31;
            const dayFlights = flights.filter((flight) => flight.day === day);
            const dayHolds = holds.filter((hold) => hold.day === day);
            const calendarItems = dayFlights.flatMap((flight) => flight.legs.map((leg) => ({ flight, leg })));
            const visibleItems = calendarItems.slice(0, 2);
            const remainingCount = Math.max(calendarItems.length - visibleItems.length, 0);

            return (
              <div key={index} className={`min-h-[86px] rounded-xl border p-1 ${validDay ? "bg-white border-slate-200" : "bg-slate-50 border-slate-100"}`}>
                <p className={`mb-1 text-xs font-bold ${validDay ? "text-slate-700" : "text-slate-300"}`}>{day < 1 ? 29 + day : day > 31 ? day - 31 : day}</p>
                <div className="space-y-1">
                  {visibleItems.map(({ flight, leg }) => (
                    <button key={`${flight.id}-${leg.id}`} onClick={() => selectFlight(flight)} className={`w-full rounded-lg px-1 py-2 text-left text-[10px] font-bold leading-tight text-white ${getAircraftClasses(flight.aircraft.color)} ${selectedFlightId === flight.id ? "ring-2 ring-amber-300" : ""}`}>
                      <span className="block truncate">{leg.departureTime} {flight.ownerOnboard ? "★" : ""}</span>
                    </button>
                  ))}
                  {remainingCount > 0 && <button onClick={() => dayFlights[0] && selectFlight(dayFlights[0])} className="w-full rounded-lg bg-slate-200 px-1 py-1 text-[10px] font-bold text-slate-700">+{remainingCount}</button>}
                  {!calendarItems.length && dayHolds.slice(0, 1).map((hold) => <div key={hold.id} className={`rounded-lg border px-1 py-1 text-[9px] font-bold leading-tight ${getHoldClasses(hold.type)}`}>{hold.type === "Major Event" ? "Event" : hold.type}</div>)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {expandedFlight && (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-sm uppercase font-bold text-[#007DB8]">Selected Aircraft</p>
              <h3 className="text-2xl font-bold text-slate-900">{expandedFlight.aircraft.tail}</h3>
              <p className="text-sm text-slate-500">{expandedFlight.aircraft.model}</p>
            </div>
            {expandedFlight.ownerOnboard && <div className="rounded-full bg-amber-400 px-4 py-2 text-lg font-bold text-white shadow">★ GGW</div>}
          </div>
          <div className="space-y-3">{expandedFlight.legs.map((leg, index) => <LegCard key={leg.id} flight={expandedFlight} leg={leg} index={index} />)}</div>
        </section>
      )}
    </section>
  );
}

function LegCard({ flight, leg, index }: { flight: Flight; leg: FlightLeg; index: number }) {
  return (
    <div className="rounded-3xl border border-slate-200 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div><p className="text-xs font-bold uppercase text-slate-400">Leg {index + 1}</p><p className="text-xl font-bold text-slate-900">{leg.from} → {leg.to}</p></div>
        {flight.ownerOnboard && <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700">★</span>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Info label="Depart" value={leg.departureTime} />
        <Info label="Passengers" value={`${leg.passengers?.length || flight.passengers.length}`} />
        <Info label="From" value={leg.from} />
        <Info label="To" value={leg.to} />
      </div>
      <div className="mt-4 rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase text-slate-400">FBO</p><p className="mt-1 text-lg font-bold text-slate-900">{leg.fbo?.name || flight.fbo?.name || "Not assigned"}</p><p className="text-sm text-slate-500">{leg.fbo?.location || flight.fbo?.airport || ""}</p></div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        <Link href="/edit-flight" scroll={false} className="rounded-xl bg-[#0066D6] px-3 py-3 text-center text-sm font-bold text-white">Edit</Link>
        <Link href="/trip-sheet" scroll={false} className="rounded-xl border border-slate-200 px-3 py-3 text-center text-sm font-bold text-slate-700">See More</Link>
        <Link href="/edit-flight" scroll={false} className="rounded-xl border border-slate-200 px-3 py-3 text-center text-sm font-bold text-slate-700">Add Leg</Link>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-slate-200 p-3"><p className="text-[11px] font-bold uppercase text-slate-400">{label}</p><p className="mt-1 text-lg font-bold text-slate-900">{value}</p></div>;
}
