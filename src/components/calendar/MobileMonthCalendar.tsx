"use client";

import { useState } from "react";
import Link from "next/link";
import type { Flight } from "../../types/flight";
import type { CalendarHold } from "../../types/calendar";
import { getAircraftClasses, getHoldClasses } from "../../lib/calendarStyles";

interface MobileMonthCalendarProps {
  flights: Flight[];
  holds: CalendarHold[];
  selectedFlightId: number;
  onSelectFlight: (flight: Flight) => void;
}

export default function MobileMonthCalendar({
  flights,
  holds,
  selectedFlightId,
  onSelectFlight,
}: MobileMonthCalendarProps) {
  const [expandedFlight, setExpandedFlight] = useState<Flight | null>(flights[0]);
  const days = Array.from({ length: 35 }).map((_, i) => i - 2);

  function selectFlight(flight: Flight) {
    onSelectFlight(flight);
    setExpandedFlight(flight);
  }

  return (
    <section className="lg:hidden space-y-4">
      <div className="rounded-3xl bg-[#062A55] p-5 text-white shadow-sm">
        <p className="text-sm uppercase font-bold text-white/70">Owner shortcut</p>
        <p className="text-2xl font-bold mt-1">Need a flight?</p>
        <Link href="/owner-request" className="mt-4 flex w-full items-center justify-center rounded-2xl bg-[#0066D6] px-5 py-4 text-lg font-bold text-white shadow-lg">
          Request Flight
        </Link>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">August 2026</h2>
            <p className="text-sm text-slate-500">Full month schedule</p>
          </div>
          <button className="rounded-xl bg-[#0066D6] px-4 py-2 text-sm font-bold text-white">Today</button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-500">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <div key={`${day}-${index}`}>{day}</div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const validDay = day >= 1 && day <= 31;
            const dayFlights = flights.filter((flight) => flight.day === day);
            const dayHolds = holds.filter((hold) => hold.day === day);

            return (
              <div key={index} className={`min-h-[76px] rounded-xl border p-1 ${validDay ? "bg-white border-slate-200" : "bg-slate-50 border-slate-100"}`}>
                <p className={`mb-1 text-xs font-bold ${validDay ? "text-slate-700" : "text-slate-300"}`}>
                  {day < 1 ? 29 + day : day > 31 ? day - 31 : day}
                </p>

                <div className="space-y-1">
                  {dayFlights.map((flight) => (
                    <button key={flight.id} onClick={() => selectFlight(flight)} className={`w-full rounded-lg px-1 py-1 text-left text-[10px] font-bold leading-tight text-white ${getAircraftClasses(flight.aircraft.color)} ${selectedFlightId === flight.id ? "ring-2 ring-amber-300" : ""}`}>
                      <span className="block truncate">{flight.departureTime}</span>
                      <span className="block truncate">{flight.aircraft.tail} {flight.ownerOnboard ? "★" : ""}</span>
                    </button>
                  ))}

                  {dayHolds.slice(0, 1).map((hold) => (
                    <div key={hold.id} className={`rounded-lg border px-1 py-1 text-[9px] font-bold leading-tight ${getHoldClasses(hold.type)}`}>
                      {hold.type === "Major Event" ? "Event" : hold.type}
                    </div>
                  ))}
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
              <p className="text-sm uppercase font-bold text-[#007DB8]">Selected Flight</p>
              <h3 className="text-2xl font-bold text-slate-900">{expandedFlight.aircraft.tail}</h3>
            </div>

            {expandedFlight.ownerOnboard && (
              <div className="rounded-full bg-amber-400 px-4 py-2 text-lg font-bold text-white shadow">★ GGW</div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Info label="Depart" value={expandedFlight.departureTime} />
            <Info label="Passengers" value={`${expandedFlight.passengers.length}`} />
            <Info label="From" value={expandedFlight.route.from} />
            <Info label="To" value={expandedFlight.route.to} />
          </div>

          <div className="mt-4 rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase text-slate-400">Route</p>
            <p className="mt-1 text-xl font-bold text-slate-900">{expandedFlight.route.from} → {expandedFlight.route.to}</p>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <Link href="/edit-flight" className="rounded-xl bg-[#0066D6] px-3 py-3 text-center text-sm font-bold text-white">Edit</Link>
            <Link href="/trip-sheet" className="rounded-xl border border-slate-200 px-3 py-3 text-center text-sm font-bold text-slate-700">See More</Link>
            <Link href="/edit-flight" className="rounded-xl border border-slate-200 px-3 py-3 text-center text-sm font-bold text-slate-700">Add Leg</Link>
          </div>
        </section>
      )}
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-3">
      <p className="text-[11px] font-bold uppercase text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}
