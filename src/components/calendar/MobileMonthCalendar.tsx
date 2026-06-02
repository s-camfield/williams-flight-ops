"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import type { Flight, FlightLeg } from "../../types/flight";
import type { CalendarHold } from "../../types/calendar";
import { getAircraftClasses, getHoldClasses } from "../../lib/calendarStyles";

interface MobileMonthCalendarProps {
  flights: Flight[];
  holds: CalendarHold[];
  selectedFlightId: number;
  onSelectFlight: (flight: Flight) => void;
}

type DayItem = {
  flight: Flight;
  leg: FlightLeg;
};

export default function MobileMonthCalendar({
  flights,
  holds,
  selectedFlightId,
  onSelectFlight,
}: MobileMonthCalendarProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [expandedFlight, setExpandedFlight] = useState<Flight | null>(null);

  const days = Array.from({ length: 35 }).map((_, i) => i - 2);

  const selectedDayItems = useMemo(() => {
    if (!selectedDay) return [];

    return flights
      .filter((flight) => flight.day === selectedDay)
      .flatMap((flight) =>
        flight.legs.map((leg) => ({
          flight,
          leg,
        }))
      );
  }, [flights, selectedDay]);

  const selectedDayFlights = useMemo(() => {
    if (!selectedDay) return [];

    return flights.filter((flight) => flight.day === selectedDay);
  }, [flights, selectedDay]);

  function openDay(day: number) {
    if (day < 1 || day > 31) return;

    const dayFlights = flights.filter((flight) => flight.day === day);

    setSelectedDay(day);

    if (dayFlights.length === 1) {
      selectFlight(dayFlights[0]);
    } else {
      setExpandedFlight(null);
    }
  }

  function selectFlight(flight: Flight) {
    onSelectFlight(flight);
    setExpandedFlight(flight);
  }

  return (
    <section className="lg:hidden space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/new-flight"
          scroll={false}
          className="rounded-3xl bg-white border border-slate-200 p-4 shadow-sm active:scale-[0.99] transition"
        >
          <p className="text-xs uppercase font-bold text-[#007DB8]">
            Confirmed
          </p>
          <p className="text-xl font-bold text-slate-900 mt-1">Add Trip</p>
          <p className="text-xs text-slate-500 mt-1">
            Flight is already going
          </p>
        </Link>

        <Link
          href="/owner-request"
          scroll={false}
          className="rounded-3xl bg-[#062A55] p-4 text-white shadow-sm active:scale-[0.99] transition"
        >
          <p className="text-xs uppercase font-bold text-white/70">
            Request
          </p>
          <p className="text-xl font-bold mt-1">Flight Request</p>
          <p className="text-xs text-white/75 mt-1">Needs approval</p>
        </Link>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">August 2026</h2>
            <p className="text-sm text-slate-500">Tap a day to view flights</p>
          </div>

          <Link
            href="/dashboard"
            scroll={false}
            className="rounded-xl bg-[#0066D6] px-4 py-2 text-sm font-bold text-white"
          >
            Today
          </Link>
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

            const dayItems = dayFlights.flatMap((flight) =>
              flight.legs.map((leg) => ({ flight, leg }))
            );

            const visibleItems = dayItems.slice(0, 2);
            const remainingCount = Math.max(dayItems.length - visibleItems.length, 0);
            const hasOwner = dayFlights.some((flight) => flight.ownerOnboard);

            return (
              <button
                key={index}
                type="button"
                onClick={() => openDay(day)}
                className={`min-h-[88px] rounded-xl border p-1 text-left transition active:scale-[0.98] ${
                  selectedDay === day
                    ? "border-[#0066D6] bg-blue-50"
                    : validDay
                      ? "bg-white border-slate-200"
                      : "bg-slate-50 border-slate-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p
                    className={`text-xs font-bold ${
                      validDay ? "text-slate-700" : "text-slate-300"
                    }`}
                  >
                    {day < 1 ? 29 + day : day > 31 ? day - 31 : day}
                  </p>

                  {hasOwner && (
                    <span className="text-[11px] text-amber-500">★</span>
                  )}
                </div>

                <div className="mt-1 space-y-1">
                  {visibleItems.map(({ flight, leg }) => (
                    <div
                      key={`${flight.id}-${leg.id}`}
                      className={`h-[18px] rounded-md px-1 text-[10px] font-bold leading-[18px] text-white ${getAircraftClasses(
                        flight.aircraft.color
                      )}`}
                    >
                      {leg.departureTime}
                    </div>
                  ))}

                  {remainingCount > 0 && (
                    <div className="rounded-md bg-slate-200 px-1 py-0.5 text-[10px] font-bold text-slate-700">
                      +{remainingCount}
                    </div>
                  )}

                  {!dayItems.length &&
                    dayHolds.slice(0, 1).map((hold) => (
                      <div
                        key={hold.id}
                        className={`rounded-md border px-1 py-0.5 text-[9px] font-bold leading-tight ${getHoldClasses(
                          hold.type
                        )}`}
                      >
                        {hold.type === "Major Event" ? "Event" : hold.type}
                      </div>
                    ))}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {selectedDay && (
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 p-4">
            <div>
              <p className="text-xs uppercase font-bold text-[#007DB8]">
                August {selectedDay}
              </p>
              <h3 className="text-xl font-bold text-slate-900">
                {selectedDayItems.length || selectedDayFlights.length} Scheduled
              </h3>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedDay(null);
                setExpandedFlight(null);
              }}
              className="h-10 w-10 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-600"
              aria-label="Close day details"
            >
              <X size={18} />
            </button>
          </div>

          {!expandedFlight && (
            <div className="p-4 space-y-3">
              {selectedDayFlights.map((flight) => (
                <button
                  key={flight.id}
                  type="button"
                  onClick={() => selectFlight(flight)}
                  className="w-full rounded-3xl border border-slate-200 p-4 text-left active:scale-[0.99] transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-3 w-3 rounded-full ${getAircraftDot(
                            flight.aircraft.color
                          )}`}
                        />
                        <p className="text-lg font-bold text-slate-900">
                          {flight.aircraft.tail}
                        </p>
                      </div>

                      <p className="text-sm text-slate-500">
                        {flight.aircraft.model}
                      </p>

                      <p className="mt-2 text-base font-bold text-slate-900">
                        {flight.route.from} → {flight.route.to}
                      </p>

                      <p className="text-sm text-slate-500">
                        {flight.legs.length} leg{flight.legs.length === 1 ? "" : "s"} · {flight.departureTime}
                      </p>
                    </div>

                    {flight.ownerOnboard && (
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700">
                        ★ GGW
                      </span>
                    )}
                  </div>
                </button>
              ))}

              {!selectedDayFlights.length && (
                <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                  No flights scheduled. Holds or events may be listed on the calendar.
                </p>
              )}
            </div>
          )}

          {expandedFlight && (
            <div className="p-4">
              <button
                type="button"
                onClick={() => setExpandedFlight(null)}
                className="mb-4 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700"
              >
                Back to day
              </button>

              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm uppercase font-bold text-[#007DB8]">
                    Selected Aircraft
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {expandedFlight.aircraft.tail}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {expandedFlight.aircraft.model}
                  </p>
                </div>

                {expandedFlight.ownerOnboard && (
                  <div className="rounded-full bg-amber-400 px-4 py-2 text-lg font-bold text-white shadow">
                    ★ GGW
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {expandedFlight.legs.map((leg, index) => (
                  <LegCard
                    key={leg.id}
                    flight={expandedFlight}
                    leg={leg}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </section>
  );
}

function LegCard({
  flight,
  leg,
  index,
}: {
  flight: Flight;
  leg: FlightLeg;
  index: number;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase text-slate-400">
            Leg {index + 1}
          </p>
          <p className="text-xl font-bold text-slate-900">
            {leg.from} → {leg.to}
          </p>
        </div>

        {flight.ownerOnboard && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700">
            ★
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Info label="Depart" value={leg.departureTime} />
        <Info label="Passengers" value={`${leg.passengers?.length || flight.passengers.length}`} />
        <Info label="From" value={leg.from} />
        <Info label="To" value={leg.to} />
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-bold uppercase text-slate-400">FBO</p>
        <p className="mt-1 text-lg font-bold text-slate-900">
          {leg.fbo?.name || flight.fbo?.name || "Not assigned"}
        </p>
        <p className="text-sm text-slate-500">
          {leg.fbo?.location || flight.fbo?.airport || ""}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <Link
          href="/edit-flight"
          scroll={false}
          className="rounded-xl bg-[#0066D6] px-3 py-3 text-center text-sm font-bold text-white"
        >
          Edit
        </Link>
        <Link
          href="/trip-sheet"
          scroll={false}
          className="rounded-xl border border-slate-200 px-3 py-3 text-center text-sm font-bold text-slate-700"
        >
          See More
        </Link>
        <Link
          href="/edit-flight"
          scroll={false}
          className="rounded-xl border border-slate-200 px-3 py-3 text-center text-sm font-bold text-slate-700"
        >
          Add Leg
        </Link>
      </div>
    </div>
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

function getAircraftDot(color: string) {
  if (color === "blue") return "bg-blue-700";
  if (color === "green") return "bg-green-600";
  if (color === "orange") return "bg-orange-600";
  return "bg-slate-500";
}
