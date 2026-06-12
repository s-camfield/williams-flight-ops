"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Flight } from "../../types/flight";
import type { CalendarHold } from "../../types/calendar";
import { getAircraftClasses, getHoldClasses } from "../../lib/calendarStyles";
import MobileMonthCalendar from "./MobileMonthCalendar";

interface FlightCalendarProps {
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

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").toUpperCase().slice(0, 3);
}

export default function FlightCalendar({ flights, holds, selectedFlightId, onSelectFlight }: FlightCalendarProps) {
  const today = new Date();
  const [visibleMonth, setVisibleMonth] = useState(today.getMonth());
  const [visibleYear, setVisibleYear] = useState(today.getFullYear());
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 21 }).map((_, index) => currentYear - 5 + index);
  }, []);

  const calendarDays = useMemo(() => getCalendarDays(visibleYear, visibleMonth), [visibleYear, visibleMonth]);

  function chooseFlight(flight: Flight) {
    setSelectedFlight(flight);
    onSelectFlight(flight);
  }

  function changeMonth(direction: "prev" | "next") {
    setSelectedFlight(null);
    if (direction === "prev") {
      if (visibleMonth === 0) {
        setVisibleMonth(11);
        setVisibleYear((year) => year - 1);
      } else {
        setVisibleMonth((month) => month - 1);
      }
    } else {
      if (visibleMonth === 11) {
        setVisibleMonth(0);
        setVisibleYear((year) => year + 1);
      } else {
        setVisibleMonth((month) => month + 1);
      }
    }
  }

  return (
    <>
      <MobileMonthCalendar flights={flights} holds={holds} selectedFlightId={selectedFlightId} onSelectFlight={onSelectFlight} />

      <section className="hidden lg:block bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{monthNames[visibleMonth]} {visibleYear}</h2>
            <p className="text-sm text-slate-500">Aircraft schedule</p>
          </div>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => changeMonth("prev")} className="h-11 w-11 rounded-xl border border-slate-300 flex items-center justify-center bg-white hover:bg-slate-50" aria-label="Previous month">
              <ChevronLeft size={20} />
            </button>

            <select value={visibleMonth} onChange={(event) => setVisibleMonth(Number(event.target.value))} className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold">
              {monthNames.map((month, index) => <option key={month} value={index}>{month}</option>)}
            </select>

            <select value={visibleYear} onChange={(event) => setVisibleYear(Number(event.target.value))} className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold">
              {years.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>

            <button type="button" onClick={() => changeMonth("next")} className="h-11 w-11 rounded-xl border border-slate-300 flex items-center justify-center bg-white hover:bg-slate-50" aria-label="Next month">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 rounded-2xl border border-slate-200 p-4 mb-5 text-sm font-semibold">
          <Legend color="bg-blue-700" label="N399W" />
          <Legend color="bg-green-600" label="N590E" />
          <Legend color="bg-orange-600" label="N44FJ" />
          <Legend color="bg-purple-500" label="MX" />
          <Legend color="bg-teal-500" label="TRG" />
          <Legend border label="Event" />
        </div>

        <div className="grid grid-cols-7 text-center text-sm font-bold text-slate-700 mb-2">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => <div key={d}>{d}</div>)}
        </div>

        <div className="grid grid-cols-7 border border-slate-200 rounded-2xl overflow-hidden">
          {calendarDays.map((calendarDay, index) => {
            const dayFlights = flights.filter((flight) => {
              const parts = getFlightDateParts(flight);
              return calendarDay.currentMonth && parts.year === visibleYear && parts.month === visibleMonth && parts.day === calendarDay.day;
            });
            const dayHolds = calendarDay.currentMonth ? holds.filter((hold) => hold.day === calendarDay.day) : [];

            return (
              <div key={index} className={`min-h-[130px] border border-slate-100 p-3 relative ${calendarDay.currentMonth ? "bg-white" : "bg-slate-50"}`}>
                <div className={calendarDay.currentMonth ? "font-bold text-slate-900" : "text-slate-300"}>{calendarDay.day}</div>
                <div className="mt-3 space-y-2">
                  {dayFlights.map((flight) => (
                    <button
                      key={flight.id}
                      onClick={() => chooseFlight(flight)}
                      className={`relative w-full rounded-xl px-2 py-2 text-left text-white shadow-sm transition hover:scale-[1.02] ${getAircraftClasses(flight.aircraft.color)} ${selectedFlight?.id === flight.id ? "ring-4 ring-amber-300" : ""}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-bold">{flight.departureTime}</p>
                        {flight.ownerOnboard && <span className="text-amber-200 text-lg leading-none">★</span>}
                      </div>
                    </button>
                  ))}

                  {dayHolds.map((hold) => (
                    <div key={hold.id} className={`rounded-xl border p-3 text-sm ${getHoldClasses(hold.type)}`}>
                      <p className="font-bold leading-tight">{shortHoldLabel(hold.type)}</p>
                      {hold.subtitle && <p className="text-xs mt-1">{hold.subtitle}</p>}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {selectedFlight && (
          <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-3 items-center">
              <Summary label="Aircraft" value={selectedFlight.aircraft.tail} subValue={selectedFlight.aircraft.model} />
              <Summary label="Depart" value={selectedFlight.departureTime} subValue={selectedFlight.route.from} />
              <Summary label="Pilots" value={selectedFlight.crew.map(initials).join(" / ") || "TBD"} subValue={`${selectedFlight.crew.length} crew`} />
              <Summary label="Pax" value={`${selectedFlight.passengers.length} pax`} subValue={selectedFlight.ownerOnboard ? "★ GGW onboard" : "No owner"} />

              <Link href={`/edit-flight?flight=${selectedFlight.dbId || ""}`} className="rounded-xl bg-[#0066D6] px-5 py-3 text-center font-bold text-white">
                View / Edit
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function Summary({ label, value, subValue }: { label: string; value: string; subValue: string }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="text-xs uppercase font-bold text-slate-400">{label}</p>
      <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500">{subValue}</p>
    </div>
  );
}

function Legend({ color, label, border }: { color?: string; label: string; border?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-4 w-4 rounded ${border ? "border border-dashed border-slate-400" : color}`} />
      {label}
    </div>
  );
}

function shortHoldLabel(type: string) {
  if (type === "Maintenance") return "MX";
  if (type === "Training") return "TRG";
  if (type === "Major Event") return "EVT";
  return type;
}
