"use client";

import { useMemo, useState } from "react";
import { Plane, CalendarDays, Clock, MapPin, Users, Fuel, Hotel, Car, Utensils, Plus, Save } from "lucide-react";
import { aircraft } from "../../data/aircraft";
import { passengers, fbos, hotels, rentalCars, cateringVendors } from "../../data/library";

export default function NewFlightForm() {
  const [destination, setDestination] = useState("KTEB");
  const [selectedPassengers, setSelectedPassengers] = useState<number[]>([1]);
  const [ownerOnboard, setOwnerOnboard] = useState(true);

  const airportFbos = useMemo(
    () => fbos.filter((fbo) => fbo.airport === destination),
    [destination]
  );

  const airportHotels = useMemo(
    () => hotels.filter((hotel) => hotel.airport === destination),
    [destination]
  );

  const airportCars = useMemo(
    () => rentalCars.filter((car) => car.airport === destination),
    [destination]
  );

  const airportCatering = useMemo(
    () => cateringVendors.filter((vendor) => vendor.airport === destination),
    [destination]
  );

  function togglePassenger(id: number) {
    setSelectedPassengers((current) =>
      current.includes(id)
        ? current.filter((passengerId) => passengerId !== id)
        : [...current, id]
    );

    const passenger = passengers.find((item) => item.id === id);
    if (passenger?.name === "GGW") {
      setOwnerOnboard(!selectedPassengers.includes(id));
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-5">
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="mb-6">
          <p className="text-sm uppercase font-bold text-[#007DB8]">Create Trip</p>
          <h1 className="text-3xl font-bold text-slate-900">New Flight</h1>
          <p className="text-slate-500 mt-1">
            Enter the core trip details first. Saved resources will auto-filter by destination airport.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Field label="Aircraft" icon={Plane}>
            <select className="input">
              {aircraft.map((item) => (
                <option key={item.tail}>
                  {item.tail} · {item.model}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Status" icon={Plane}>
            <select className="input">
              <option>Draft</option>
              <option>Tentative</option>
              <option>Confirmed</option>
            </select>
          </Field>

          <Field label="Date" icon={CalendarDays}>
            <input type="date" defaultValue="2026-08-05" className="input" />
          </Field>

          <Field label="Departure Time" icon={Clock}>
            <input type="time" defaultValue="08:00" className="input" />
          </Field>

          <Field label="Origin" icon={MapPin}>
            <input defaultValue="KDET" className="input" />
          </Field>

          <Field label="Destination" icon={MapPin}>
            <select
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              className="input"
            >
              <option>KTEB</option>
              <option>KLAS</option>
              <option>KBOS</option>
              <option>KEGE</option>
            </select>
          </Field>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Passengers</h2>
              <p className="text-sm text-slate-500">
                Select saved frequent flyers. GGW automatically marks owner onboard.
              </p>
            </div>

            {ownerOnboard && (
              <div className="bg-[#062A55] text-white rounded-full px-5 py-3 font-bold flex gap-2 items-center">
                <span className="text-amber-400">★</span> GGW
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {passengers.map((passenger) => {
              const selected = selectedPassengers.includes(passenger.id);

              return (
                <button
                  key={passenger.id}
                  type="button"
                  onClick={() => togglePassenger(passenger.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    selected
                      ? "border-[#0066D6] bg-blue-50"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold text-slate-900">{passenger.name}</p>
                    {passenger.vip && <span className="text-amber-500">★</span>}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{passenger.role}</p>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {passenger.preferences}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SavedSelect
            icon={Fuel}
            title="FBO"
            subtitle="Filtered by destination"
            options={airportFbos.map((item) => ({
              label: `${item.name} ${item.airport}`,
              detail: `${item.phone} · ${item.address}`,
            }))}
          />

          <SavedSelect
            icon={Hotel}
            title="Pilot Hotel"
            subtitle="Saved preferred hotels"
            options={airportHotels.map((item) => ({
              label: item.name,
              detail: item.notes || item.phone || "No notes",
            }))}
          />

          <SavedSelect
            icon={Car}
            title="Rental Car"
            subtitle="Saved vehicle preferences"
            options={airportCars.map((item) => ({
              label: item.company,
              detail: item.vehiclePreference || item.notes || "No notes",
            }))}
          />

          <SavedSelect
            icon={Utensils}
            title="Catering"
            subtitle="Saved catering vendors"
            options={airportCatering.map((item) => ({
              label: item.vendor,
              detail: item.notes || item.phone || "No notes",
            }))}
          />
        </div>

        <div className="mt-8">
          <label className="text-sm font-bold text-slate-700">Notes</label>
          <textarea
            className="input mt-2 min-h-[120px]"
            placeholder="Trip notes, passenger notes, release notes, special handling..."
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="bg-[#0066D6] text-white rounded-xl px-6 py-3 font-bold flex items-center gap-2">
            <Save size={18} /> Save Draft
          </button>
          <button className="border border-slate-200 rounded-xl px-6 py-3 font-bold flex items-center gap-2">
            <Plus size={18} /> Add Leg
          </button>
          <button className="border border-slate-200 rounded-xl px-6 py-3 font-bold">
            Preview Trip Sheet
          </button>
        </div>
      </section>

      <aside className="space-y-5">
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900">Auto-Fill Preview</h2>
          <p className="text-sm text-slate-500 mt-1">
            Destination: <span className="font-bold text-slate-800">{destination}</span>
          </p>

          <div className="mt-5 space-y-3">
            <PreviewRow label="FBO" value={airportFbos[0]?.name || "No saved FBO"} />
            <PreviewRow label="Hotel" value={airportHotels[0]?.name || "No saved hotel"} />
            <PreviewRow label="Car" value={airportCars[0]?.company || "No saved rental car"} />
            <PreviewRow
              label="Catering"
              value={airportCatering[0]?.vendor || "No saved catering"}
            />
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900">Why this matters</h2>
          <p className="text-sm text-slate-600 mt-3 leading-6">
            Frequent destinations can keep preferred FBOs, hotels, cars, and catering
            saved so schedulers do not retype the same information every trip.
          </p>
        </section>
      </aside>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
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

function SavedSelect({
  icon: Icon,
  title,
  subtitle,
  options,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  options: { label: string; detail: string }[];
}) {
  return (
    <div className="rounded-3xl border border-slate-200 p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center">
          <Icon size={20} className="text-[#0066D6]" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>

      <select className="input">
        {options.length ? (
          options.map((option) => (
            <option key={option.label}>
              {option.label}
            </option>
          ))
        ) : (
          <option>No saved options</option>
        )}
      </select>

      {options[0] && (
        <p className="text-xs text-slate-500 mt-3">{options[0].detail}</p>
      )}
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
