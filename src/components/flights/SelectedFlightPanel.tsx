"use client";

import {
  Plane,
  Users,
  Fuel,
  Hotel,
  Car,
  Utensils,
  Clock,
  MapPin,
  Route,
  FileText,
} from "lucide-react";
import type { Flight } from "../../types/flight";

interface SelectedFlightPanelProps {
  flight: Flight;
}

export default function SelectedFlightPanel({ flight }: SelectedFlightPanelProps) {
  return (
    <aside className="space-y-5">
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex gap-3">
              <span className={`${getBadgeColor(flight.aircraft.color)} text-white rounded-full px-4 py-1 font-bold`}>
                {flight.aircraft.tail}
              </span>
              <span className="bg-green-100 text-green-700 rounded-full px-4 py-1 font-bold">
                {flight.status}
              </span>
            </div>

            <h2 className="text-4xl font-bold mt-6 text-slate-900">
              {flight.route.from} → {flight.route.to}
            </h2>
            <p className="text-slate-500 mt-2">{formatFlightDate(flight.date)}</p>
          </div>

          {flight.ownerOnboard && (
            <div className="bg-[#062A55] text-white rounded-full px-5 py-3 font-bold text-xl flex gap-2 items-center">
              <span className="text-amber-400">★</span> GGW
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-3 mt-6">
          <Info icon={Clock} label="Departure" value={flight.departureTime} />
          <Info icon={Plane} label="Flight Time" value={flight.flightTime || "TBD"} />
          <Info icon={MapPin} label="Destination" value={flight.route.to} />
          <Info icon={Users} label="Passengers" value={`${flight.passengers.length}`} />
        </div>
      </section>

      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-xl font-bold mb-5">Trip Review</h3>

        <div className="space-y-3">
          <details open className="rounded-2xl border border-slate-200 p-4">
            <summary className="cursor-pointer text-sm uppercase font-bold text-[#0066D6]">
              Passenger Information
            </summary>
            <div className="mt-4 space-y-2">
              {flight.passengers.map((passenger) => (
                <Row key={passenger} icon={Users} label={passenger === "GGW" ? "Owner" : "Passenger"} value={passenger === "GGW" ? "★ GGW" : passenger} />
              ))}
            </div>
          </details>

          <details className="rounded-2xl border border-slate-200 p-4">
            <summary className="cursor-pointer text-sm uppercase font-bold text-[#0066D6]">
              Crew Information
            </summary>
            <div className="mt-4 space-y-2">
              {flight.crew.map((crew) => (
                <Row key={crew} icon={Users} label="Crew" value={crew} />
              ))}
            </div>
          </details>

          <details className="rounded-2xl border border-slate-200 p-4">
            <summary className="cursor-pointer text-sm uppercase font-bold text-[#0066D6]">
              Flight Details
            </summary>
            <div className="mt-4 space-y-2">
              <Row icon={Plane} label="Aircraft" value={`${flight.aircraft.tail} · ${flight.aircraft.model}`} />
              <Row icon={Route} label="Legs" value={`${flight.legs.length} Leg`} />
              <Row icon={Fuel} label="FBO" value={flight.fbo ? `${flight.fbo.name} ${flight.fbo.airport}` : "Not assigned"} />
              <Row icon={Hotel} label="Hotel" value={flight.hotel ? `${flight.hotel.name}${flight.hotel.rooms ? ` · ${flight.hotel.rooms} Rooms` : ""}` : "Not assigned"} />
              <Row icon={Car} label="Rental Car" value={flight.rentalCar ? `${flight.rentalCar.company}${flight.rentalCar.vehicle ? ` · ${flight.rentalCar.vehicle}` : ""}` : "Not assigned"} />
              <Row icon={Utensils} label="Catering" value={flight.catering ? `${flight.catering.vendor}${flight.catering.passengers ? ` · ${flight.catering.passengers} Pax` : ""}` : "Not assigned"} />
              <Row icon={FileText} label="Notes" value={flight.notes || "No notes"} />
            </div>
          </details>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">
          <button className="bg-[#0066D6] text-white rounded-xl py-3 font-bold">Edit Flight</button>
          <button className="border border-slate-200 rounded-xl py-3 font-bold">Add Leg</button>
          <button className="border border-red-300 text-red-600 rounded-xl py-3 font-bold">Cancel</button>
        </div>
      </section>
    </aside>
  );
}

function Info({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <Icon size={18} className="text-[#0066D6] mb-2" />
      <p className="text-xs uppercase font-bold text-slate-400">{label}</p>
      <p className="font-bold text-slate-900 mt-1">{value}</p>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Icon size={19} className="text-[#0066D6]" />
        <p className="text-sm uppercase font-bold text-[#0066D6]">{label}</p>
      </div>
      <p className="text-sm font-semibold text-slate-800 text-right">{value}</p>
    </div>
  );
}

function formatFlightDate(date: string) {
  const parsedDate = new Date(`${date}T12:00:00`);
  return parsedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getBadgeColor(color: string) {
  if (color === "blue") return "bg-blue-700";
  if (color === "green") return "bg-green-600";
  if (color === "orange") return "bg-orange-600";
  return "bg-slate-600";
}
