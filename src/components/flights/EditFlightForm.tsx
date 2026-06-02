"use client";

import { useState } from "react";
import {
  Plane,
  CalendarDays,
  Clock,
  MapPin,
  Fuel,
  Hotel,
  Car,
  Utensils,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { aircraft } from "../../data/aircraft";
import { flights } from "../../data/flights";
import { fbos, hotels, rentalCars, cateringVendors } from "../../data/library";
import PassengerSelector from "./PassengerSelector";

export default function EditFlightForm() {
  const flight = flights[0];
  const [legs, setLegs] = useState(flight.legs);
  const [destination, setDestination] = useState(flight.route.to);

  const airportFbos = fbos.filter((item) => item.airport === destination);
  const airportHotels = hotels.filter((item) => item.airport === destination);
  const airportCars = rentalCars.filter((item) => item.airport === destination);
  const airportCatering = cateringVendors.filter((item) => item.airport === destination);

  function addLeg() {
    const lastLeg = legs[legs.length - 1];

    setLegs([
      ...legs,
      {
        id: legs.length + 1,
        from: lastLeg?.to || destination,
        to: "",
        departureTime: "",
      },
    ]);
  }

  function removeLeg(id: number) {
    setLegs(legs.filter((leg) => leg.id !== id));
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-5">
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="mb-6">
          <p className="text-sm uppercase font-bold text-[#007DB8]">Edit Trip</p>
          <h1 className="text-3xl font-bold text-slate-900">{flight.route.from} → {flight.route.to}</h1>
          <p className="text-slate-500 mt-1">Update schedule, passengers, legs, and trip service details.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Field label="Aircraft" icon={Plane}>
            <select className="input" defaultValue={`${flight.aircraft.tail} · ${flight.aircraft.model}`}>
              {aircraft.map((item) => <option key={item.tail}>{item.tail} · {item.model}</option>)}
            </select>
          </Field>

          <Field label="Date" icon={CalendarDays}>
            <input type="date" defaultValue={flight.date} className="input" />
          </Field>

          <Field label="Departure Time" icon={Clock}>
            <input type="time" defaultValue={flight.departureTime} className="input" />
          </Field>

          <Field label="Origin" icon={MapPin}>
            <input defaultValue={flight.route.from} className="input" />
          </Field>

          <Field label="Destination" icon={MapPin}>
            <input value={destination} onChange={(event) => setDestination(event.target.value.toUpperCase())} className="input" />
          </Field>
        </div>

        <section className="mt-8 rounded-3xl border border-slate-200 p-5">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Flight Legs</h2>
              <p className="text-sm text-slate-500">Add multi-stop routing for the same travel day.</p>
            </div>

            <button type="button" onClick={addLeg} className="rounded-xl bg-[#0066D6] text-white px-4 py-3 font-bold flex items-center gap-2">
              <Plus size={18} /> Add Leg
            </button>
          </div>

          <div className="space-y-3">
            {legs.map((leg, index) => (
              <div key={leg.id} className="grid grid-cols-1 lg:grid-cols-[90px_1fr_1fr_160px_48px] gap-3 items-end rounded-2xl bg-slate-50 p-4">
                <div>
                  <p className="text-xs uppercase font-bold text-slate-400">Leg</p>
                  <p className="font-bold text-slate-900">{index + 1}</p>
                </div>

                <label>
                  <p className="text-xs uppercase font-bold text-slate-400 mb-1">From</p>
                  <input defaultValue={leg.from} className="input bg-white" />
                </label>

                <label>
                  <p className="text-xs uppercase font-bold text-slate-400 mb-1">To</p>
                  <input defaultValue={leg.to} className="input bg-white" />
                </label>

                <label>
                  <p className="text-xs uppercase font-bold text-slate-400 mb-1">Depart</p>
                  <input type="time" defaultValue={leg.departureTime} className="input bg-white" />
                </label>

                <button type="button" onClick={() => removeLeg(leg.id)} className="h-12 rounded-xl border border-red-200 text-red-600 flex items-center justify-center">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8">
          <PassengerSelector />
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SavedSelect icon={Fuel} title="FBO" options={airportFbos.map((item) => `${item.name} ${item.airport}`)} />
          <SavedSelect icon={Hotel} title="Hotel" options={airportHotels.map((item) => item.name)} />
          <SavedSelect icon={Car} title="Rental Car" options={airportCars.map((item) => item.company)} />
          <SavedSelect icon={Utensils} title="Catering" options={airportCatering.map((item) => item.vendor)} />
        </div>

        <div className="mt-8">
          <label className="text-sm font-bold text-slate-700">Notes</label>
          <textarea className="input mt-2 min-h-[120px]" defaultValue={flight.notes} />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="bg-[#0066D6] text-white rounded-xl px-6 py-3 font-bold flex items-center gap-2"><Save size={18} /> Save Changes</button>
          <button className="border border-slate-200 rounded-xl px-6 py-3 font-bold">Preview Trip Sheet</button>
          <button className="border border-red-300 text-red-600 rounded-xl px-6 py-3 font-bold">Cancel Flight</button>
        </div>
      </section>

      <aside className="space-y-5">
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900">Edit Preview</h2>
          <div className="mt-5 space-y-3">
            <PreviewRow label="Route" value={`${flight.route.from} → ${destination}`} />
            <PreviewRow label="Legs" value={`${legs.length}`} />
            <PreviewRow label="GGW" value={flight.ownerOnboard ? "★ GGW" : "No"} />
            <PreviewRow label="FBO Options" value={`${airportFbos.length}`} />
          </div>
        </section>
      </aside>
    </div>
  );
}

function Field({ label, icon: Icon, children }: { label: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <label>
      <div className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
        <Icon size={17} className="text-[#0066D6]" />
        {label}
      </div>
      {children}
    </label>
  );
}

function SavedSelect({ icon: Icon, title, options }: { icon: React.ElementType; title: string; options: string[] }) {
  return (
    <div className="rounded-3xl border border-slate-200 p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center">
          <Icon size={20} className="text-[#0066D6]" />
        </div>
        <h3 className="font-bold text-slate-900">{title}</h3>
      </div>

      <select className="input">
        {options.length ? options.map((option) => <option key={option}>{option}</option>) : <option>No saved options</option>}
      </select>
    </div>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 flex justify-between gap-4">
      <p className="text-sm font-bold text-[#0066D6] uppercase">{label}</p>
      <p className="text-sm font-semibold text-slate-800 text-right">{value}</p>
    </div>
  );
}
