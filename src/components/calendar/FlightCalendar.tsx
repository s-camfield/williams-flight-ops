"use client";

import type { Flight } from "../../types/flight";
import type { CalendarHold } from "../../types/calendar";
import { getAircraftClasses, getHoldClasses } from "../../lib/calendarStyles";
import MobileMonthCalendar from "./MobileMonthCalendar";

interface FlightCalendarProps { flights: Flight[]; holds: CalendarHold[]; selectedFlightId: number; onSelectFlight: (flight: Flight) => void; }

export default function FlightCalendar({ flights, holds, selectedFlightId, onSelectFlight }: FlightCalendarProps) {
  return (
    <>
      <MobileMonthCalendar flights={flights} holds={holds} selectedFlightId={selectedFlightId} onSelectFlight={onSelectFlight} />
      <section className="hidden lg:block bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5"><div><h2 className="text-2xl font-bold text-slate-900">August 2026</h2><p className="text-sm text-slate-500">Aircraft schedule</p></div><div className="flex gap-2"><button className="rounded-xl border border-slate-300 px-4 py-2 font-semibold bg-white hover:bg-slate-50">Today</button><button className="rounded-xl bg-[#0066D6] text-white px-5 py-2 font-semibold">Month</button></div></div>
        <div className="flex flex-wrap gap-4 rounded-2xl border border-slate-200 p-4 mb-5 text-sm font-semibold"><Legend color="bg-blue-700" label="N399W" /><Legend color="bg-green-600" label="N590E" /><Legend color="bg-orange-600" label="N44FJ" /><Legend color="bg-purple-500" label="Maintenance" /><Legend color="bg-teal-500" label="Training" /><Legend border label="Major Event" /></div>
        <div className="grid grid-cols-7 text-center text-sm font-bold text-slate-700 mb-2">{["SUN","MON","TUE","WED","THU","FRI","SAT"].map((d)=><div key={d}>{d}</div>)}</div>
        <div className="grid grid-cols-7 border border-slate-200 rounded-2xl overflow-hidden">
          {Array.from({ length: 35 }).map((_, i) => {
            const day = i - 2;
            const dayFlights = flights.filter((flight) => flight.day === day);
            const dayHolds = holds.filter((hold) => hold.day === day);
            return <div key={i} className="min-h-[130px] border border-slate-100 p-3 relative bg-white"><div className={day < 1 || day > 31 ? "text-slate-300" : "font-bold text-slate-900"}>{day < 1 ? 29 + day : day > 31 ? day - 31 : day}</div><div className="mt-3 space-y-2">{dayFlights.map((flight) => <button key={flight.id} onClick={() => onSelectFlight(flight)} className={`relative w-full rounded-xl border p-2 text-left text-white shadow-md transition hover:scale-[1.02] ${getAircraftClasses(flight.aircraft.color)} ${selectedFlightId === flight.id ? "ring-4 ring-amber-300" : ""}`}>{flight.ownerOnboard && <div className="absolute -top-8 left-2 h-10 w-10 rounded-full bg-amber-400 shadow-lg flex items-center justify-center text-white text-2xl z-10">★</div>}<p className="font-bold">{flight.departureTime}</p><p className="text-sm leading-tight">{flight.route.from} → {flight.route.to}</p><p className="text-xs opacity-90">{flight.aircraft.tail}</p>{flight.ownerOnboard && <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-xs font-bold">★ GGW</div>}</button>)}{dayHolds.map((hold) => <div key={hold.id} className={`rounded-xl border p-3 text-sm ${getHoldClasses(hold.type)}`}><p className="font-bold leading-tight">{hold.title}</p>{hold.subtitle && <p className="text-xs mt-1">{hold.subtitle}</p>}</div>)}</div></div>;
          })}
        </div>
      </section>
    </>
  );
}
function Legend({ color, label, border }: { color?: string; label: string; border?: boolean }) { return <div className="flex items-center gap-2"><span className={`h-4 w-4 rounded ${border ? "border border-dashed border-slate-400" : color}`} />{label}</div>; }
