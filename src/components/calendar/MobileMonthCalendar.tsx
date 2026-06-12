"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Flight, FlightLeg } from "../../types/flight";
import type { CalendarHold } from "../../types/calendar";
import { getAircraftClasses, getHoldClasses } from "../../lib/calendarStyles";

interface MobileMonthCalendarProps {
  flights: Flight[];
  holds: CalendarHold[];
  selectedFlightId: number;
  onSelectFlight: (flight: Flight) => void;
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getFlightDateParts(flight: Flight) {
  const date = new Date(`${flight.date}T12:00:00`);
  return { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
}

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();

  return Array.from({ length: 42 }).map((_, index) => {
    const dayNumber = index - firstDay + 1;
    if (dayNumber < 1) return { day: daysInPreviousMonth + dayNumber, currentMonth: false };
    if (dayNumber > daysInMonth) return { day: dayNumber - daysInMonth, currentMonth: false };
    return { day: dayNumber, currentMonth: true };
  });
}

function editUrl(flight: Flight) {
  return flight.dbId ? `/edit-flight?flight=${flight.dbId}` : "/dashboard";
}

export default function MobileMonthCalendar({ flights, holds, selectedFlightId, onSelectFlight }: MobileMonthCalendarProps) {
  const today = new Date();
  const [visibleMonth, setVisibleMonth] = useState(today.getMonth());
  const [visibleYear, setVisibleYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [expandedFlight, setExpandedFlight] = useState<Flight | null>(null);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 21 }).map((_, index) => currentYear - 5 + index);
  }, []);

  const calendarDays = useMemo(() => getCalendarDays(visibleYear, visibleMonth), [visibleYear, visibleMonth]);

  const selectedDayFlights = useMemo(() => {
    if (!selectedDay) return [];
    return flights.filter((flight) => {
      const parts = getFlightDateParts(flight);
      return parts.year === visibleYear && parts.month === visibleMonth && parts.day === selectedDay;
    });
  }, [flights, selectedDay, visibleMonth, visibleYear]);

  const selectedDayItems = selectedDayFlights.flatMap((flight) =>
    flight.legs.map((leg) => ({ flight, leg }))
  );

  function changeMonth(direction: "prev" | "next") {
    if (direction === "prev") {
      if (visibleMonth === 0) {
        setVisibleMonth(11);
        setVisibleYear((year) => year - 1);
      } else {
        setVisibleMonth((month) => month - 1);
      }
    } else if (visibleMonth === 11) {
      setVisibleMonth(0);
      setVisibleYear((year) => year + 1);
    } else {
      setVisibleMonth((month) => month + 1);
    }

    setSelectedDay(null);
    setExpandedFlight(null);
  }

  function openDay(day: number, currentMonth: boolean) {
    if (!currentMonth) return;

    const dayFlights = flights.filter((flight) => {
      const parts = getFlightDateParts(flight);
      return parts.year === visibleYear && parts.month === visibleMonth && parts.day === day;
    });

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
      <Link
        href="/new-flight"
        scroll={false}
        className="block rounded-3xl bg-[#0066D6] p-5 text-center text-2xl font-black text-white shadow-md active:scale-[0.99] transition"
      >
        Add Trip
      </Link>

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <button type="button" onClick={() => changeMonth("prev")} className="h-11 w-11 rounded-2xl border border-slate-200 flex items-center justify-center" aria-label="Previous month">
            <ChevronLeft size={20} />
          </button>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900">{monthNames[visibleMonth]}</h2>
            <select
              value={visibleYear}
              onChange={(event) => {
                setVisibleYear(Number(event.target.value));
                setSelectedDay(null);
                setExpandedFlight(null);
              }}
              className="mt-1 rounded-xl border border-slate-200 bg-white px-3 py-1 text-sm font-bold text-slate-700"
            >
              {years.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>

          <button type="button" onClick={() => changeMonth("next")} className="h-11 w-11 rounded-2xl border border-slate-200 flex items-center justify-center" aria-label="Next month">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-500">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => <div key={`${day}-${index}`}>{day}</div>)}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-1">
          {calendarDays.map((calendarDay, index) => {
            const dayFlights = flights.filter((flight) => {
              const parts = getFlightDateParts(flight);
              return calendarDay.currentMonth && parts.year === visibleYear && parts.month === visibleMonth && parts.day === calendarDay.day;
            });

            const dayHolds = calendarDay.currentMonth ? holds.filter((hold) => hold.day === calendarDay.day) : [];
            const dayItems = dayFlights.flatMap((flight) => flight.legs.map((leg) => ({ flight, leg })));
            const visibleItems = dayItems.slice(0, 2);
            const remainingCount = Math.max(dayItems.length - visibleItems.length, 0);
            const hasOwner = dayFlights.some((flight) => flight.ownerOnboard);

            return (
              <button
                key={index}
                type="button"
                onClick={() => openDay(calendarDay.day, calendarDay.currentMonth)}
                className={`min-h-[88px] rounded-xl border p-1 text-left transition active:scale-[0.98] ${
                  selectedDay === calendarDay.day && calendarDay.currentMonth
                    ? "border-[#0066D6] bg-blue-50"
                    : calendarDay.currentMonth
                      ? "bg-white border-slate-200"
                      : "bg-slate-50 border-slate-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className={`text-xs font-bold ${calendarDay.currentMonth ? "text-slate-700" : "text-slate-300"}`}>{calendarDay.day}</p>
                  {hasOwner && <span className="text-[11px] text-amber-500">★</span>}
                </div>

                <div className="mt-1 space-y-1">
                  {visibleItems.map(({ flight, leg }) => (
                    <div key={`${flight.id}-${leg.id}`} className={`h-[18px] rounded-md px-1 text-[10px] font-bold leading-[18px] text-white ${getAircraftClasses(flight.aircraft.color)}`}>
                      {leg.departureTime}
                    </div>
                  ))}

                  {remainingCount > 0 && <div className="rounded-md bg-slate-200 px-1 py-0.5 text-[10px] font-bold text-slate-700">+{remainingCount}</div>}

                  {!dayItems.length && dayHolds.slice(0, 1).map((hold) => (
                    <div key={hold.id} className={`rounded-md border px-1 py-0.5 text-[9px] font-bold leading-tight ${getHoldClasses(hold.type)}`}>
                      {shortHoldLabel(hold.type)}
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
              <p className="text-xs uppercase font-bold text-[#007DB8]">{monthNames[visibleMonth]} {selectedDay}</p>
              <h3 className="text-xl font-bold text-slate-900">{selectedDayItems.length || selectedDayFlights.length} Scheduled</h3>
            </div>

            <button type="button" onClick={() => { setSelectedDay(null); setExpandedFlight(null); }} className="h-10 w-10 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-600" aria-label="Close day details">
              <X size={18} />
            </button>
          </div>

          {!expandedFlight && (
            <div className="p-4 space-y-3">
              {selectedDayFlights.map((flight) => (
                <button key={flight.id} type="button" onClick={() => selectFlight(flight)} className="w-full rounded-3xl border border-slate-200 p-4 text-left active:scale-[0.99] transition">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`h-3 w-3 rounded-full ${getAircraftDot(flight.aircraft.color)}`} />
                        <p className="text-lg font-bold text-slate-900">{flight.aircraft.tail}</p>
                      </div>

                      <p className="text-sm text-slate-500">{flight.aircraft.model}</p>
                      <p className="mt-2 text-base font-bold text-slate-900">{flight.route.from} → {flight.route.to}</p>
                      <p className="text-sm text-slate-500">{flight.legs.length} leg{flight.legs.length === 1 ? "" : "s"} · {flight.departureTime}</p>
                    </div>

                    {flight.ownerOnboard && <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700">★ GGW</span>}
                  </div>
                </button>
              ))}

              {!selectedDayFlights.length && <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">No flights scheduled.</p>}
            </div>
          )}

          {expandedFlight && (
            <div className="p-4">
              <button type="button" onClick={() => setExpandedFlight(null)} className="mb-4 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700">
                Back to day
              </button>

              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm uppercase font-bold text-[#007DB8]">Selected Aircraft</p>
                  <h3 className="text-2xl font-bold text-slate-900">{expandedFlight.aircraft.tail}</h3>
                  <p className="text-sm text-slate-500">{expandedFlight.aircraft.model}</p>
                </div>

                {expandedFlight.ownerOnboard && <div className="rounded-full bg-amber-400 px-4 py-2 text-lg font-bold text-white shadow">★ GGW</div>}
              </div>

              <div className="space-y-3">
                {expandedFlight.legs.map((leg, index) => (
                  <LegCard key={leg.id} flight={expandedFlight} leg={leg} index={index} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </section>
  );
}

function LegCard({ flight, leg, index }: { flight: Flight; leg: FlightLeg; index: number }) {
  return (
    <div className="rounded-3xl border border-slate-200 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase text-slate-400">Leg {index + 1}</p>
          <p className="text-xl font-bold text-slate-900">{leg.from} → {leg.to}</p>
        </div>

        {flight.ownerOnboard && <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700">★</span>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Info label="Depart" value={leg.departureTime} />
        <Info label="Passengers" value={`${leg.passengers?.length || flight.passengers.length}`} />
        <Info label="From" value={leg.from} />
        <Info label="To" value={leg.to} />
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-bold uppercase text-slate-400">FBO</p>
        <p className="mt-1 text-lg font-bold text-slate-900">{leg.fbo?.name || flight.fbo?.name || "Not assigned"}</p>
        <p className="text-sm text-slate-500">{leg.fbo?.location || flight.fbo?.airport || ""}</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <Link href={editUrl(flight)} scroll={false} className="rounded-xl bg-[#0066D6] px-3 py-3 text-center text-sm font-bold text-white">
          Edit
        </Link>
        <Link href="/trip-sheet" scroll={false} className="rounded-xl border border-slate-200 px-3 py-3 text-center text-sm font-bold text-slate-700">
          See More
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

function shortHoldLabel(type: string) {
  if (type === "Maintenance") return "MX";
  if (type === "Training") return "TRG";
  if (type === "Major Event") return "EVT";
  return type;
}
