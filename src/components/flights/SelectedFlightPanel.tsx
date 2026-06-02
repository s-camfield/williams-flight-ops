"use client";

import { Plane, Users, Fuel, Hotel, Car, Utensils, Clock, MapPin, Route, FileText } from "lucide-react";
import type { Flight, FlightLeg } from "../../types/flight";

interface SelectedFlightPanelProps { flight: Flight; }

export default function SelectedFlightPanel({ flight }: SelectedFlightPanelProps) {
  const firstLeg = flight.legs[0];
  return (
    <aside className="space-y-5">
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex gap-3"><span className={`${getBadgeColor(flight.aircraft.color)} text-white rounded-full px-4 py-1 font-bold`}>{flight.aircraft.tail}</span></div>
            <h2 className="text-4xl font-bold mt-6 text-slate-900">{firstLeg.from} → {firstLeg.to}</h2>
            <p className="text-slate-500 mt-2">{formatFlightDate(flight.date)}</p>
          </div>
          {flight.ownerOnboard && <div className="bg-[#062A55] text-white rounded-full px-5 py-3 font-bold text-xl flex gap-2 items-center"><span className="text-amber-400">★</span> GGW</div>}
        </div>
        <div className="grid grid-cols-4 gap-3 mt-6">
          <Info icon={Clock} label="Departure" value={firstLeg.departureTime} />
          <Info icon={Plane} label="Aircraft" value={flight.aircraft.model} />
          <Info icon={MapPin} label="Destination" value={firstLeg.to} />
          <Info icon={Users} label="Passengers" value={`${firstLeg.passengers?.length || flight.passengers.length}`} />
        </div>
      </section>
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-xl font-bold mb-5">Trip Review</h3>
        <div className="space-y-4">{flight.legs.map((leg, index) => <LegReview key={leg.id} leg={leg} flight={flight} index={index} />)}</div>
        <div className="grid grid-cols-3 gap-3 mt-6"><button className="bg-[#0066D6] text-white rounded-xl py-3 font-bold">Edit Flight</button><button className="border border-slate-200 rounded-xl py-3 font-bold">Add Leg</button><button className="border border-red-300 text-red-600 rounded-xl py-3 font-bold">Cancel</button></div>
      </section>
    </aside>
  );
}

function LegReview({ leg, flight, index }: { leg: FlightLeg; flight: Flight; index: number }) {
  return (
    <details open={index === 0} className="rounded-2xl border border-slate-200 p-4">
      <summary className="cursor-pointer text-sm uppercase font-bold text-[#0066D6]">Leg {index + 1}: {leg.from} → {leg.to}</summary>
      <div className="mt-4 space-y-3">
        <details open className="rounded-2xl bg-slate-50 p-4"><summary className="cursor-pointer font-bold text-slate-900">Passenger Info</summary><div className="mt-3 space-y-2">{(leg.passengers || flight.passengers).map((p) => <Row key={p} icon={Users} label={p === "GGW" ? "GGW" : "Passenger"} value={p === "GGW" ? "★ GGW" : p} />)}<Row icon={Hotel} label="Hotel" value={leg.passengerHotel?.name || "Not assigned"} /><Row icon={Car} label="Car" value={`${leg.passengerCar?.name || "Not assigned"}${leg.passengerCar?.location ? ` · ${leg.passengerCar.location}` : ""}`} /><Row icon={Utensils} label="Catering" value={leg.passengerCatering?.name || "Not assigned"} /><Row icon={FileText} label="Notes" value={leg.passengerNotes || "No notes"} /></div></details>
        <details className="rounded-2xl bg-slate-50 p-4"><summary className="cursor-pointer font-bold text-slate-900">Crew Info</summary><div className="mt-3 space-y-2">{(leg.crew || flight.crew).map((c) => <Row key={c} icon={Users} label="Crew" value={c} />)}<Row icon={Hotel} label="Hotel" value={leg.crewHotel?.name || "Not assigned"} /><Row icon={Car} label="Car" value={`${leg.crewCar?.name || "Not assigned"}${leg.crewCar?.location ? ` · ${leg.crewCar.location}` : ""}`} /><Row icon={Utensils} label="Catering" value={leg.crewCatering?.name || "Not assigned"} /><Row icon={FileText} label="Notes" value={leg.crewNotes || "No notes"} /></div></details>
        <details className="rounded-2xl bg-slate-50 p-4"><summary className="cursor-pointer font-bold text-slate-900">FBO / Fuel</summary><div className="mt-3 space-y-2"><Row icon={Fuel} label="FBO" value={`${leg.fbo?.name || flight.fbo?.name || "Not assigned"}${leg.fbo?.location ? ` · ${leg.fbo.location}` : ""}`} /><Row icon={Fuel} label="Fuel" value={`${leg.fuel?.name || "Not assigned"}${leg.fuel?.phone ? ` · ${leg.fuel.phone}` : ""}`} /><Row icon={Route} label="Route" value={`${leg.from} → ${leg.to}`} /></div></details>
      </div>
    </details>
  );
}

function Info({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) { return <div className="rounded-2xl border border-slate-200 p-4"><Icon size={18} className="text-[#0066D6] mb-2" /><p className="text-xs uppercase font-bold text-slate-400">{label}</p><p className="font-bold text-slate-900 mt-1">{value}</p></div>; }
function Row({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) { return <div className="rounded-2xl bg-white p-4 flex items-center justify-between gap-4"><div className="flex items-center gap-3"><Icon size={19} className="text-[#0066D6]" /><p className="text-sm uppercase font-bold text-[#0066D6]">{label}</p></div><p className="text-sm font-semibold text-slate-800 text-right">{value}</p></div>; }
function formatFlightDate(date: string) { return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }); }
function getBadgeColor(color: string) { if (color === "blue") return "bg-blue-700"; if (color === "green") return "bg-green-600"; if (color === "orange") return "bg-orange-600"; return "bg-slate-600"; }
