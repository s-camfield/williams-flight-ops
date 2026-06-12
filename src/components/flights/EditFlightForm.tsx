"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock,
  Mail,
  Plane,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useAircraftData } from "../../hooks/useAircraftData";
import AirportField from "./AirportField";

type FlightRow = {
  id: string;
  aircraft_id: string | null;
  flight_date: string;
  status: string | null;
  owner_onboard: boolean | null;
  departure_time: string | null;
  origin: string | null;
  destination: string | null;
  notes: string | null;
};

type LegRow = {
  id: string;
  flight_id: string;
  leg_order: number;
  origin: string;
  destination: string;
  departure_time: string | null;
  arrival_time: string | null;
  passenger_names: string[] | null;
  crew_names: string[] | null;
  fbo_name: string | null;
  fbo_location: string | null;
  fbo_phone: string | null;
  fuel_name: string | null;
  fuel_location: string | null;
  fuel_phone: string | null;
  passenger_hotel: string | null;
  passenger_car: string | null;
  passenger_catering: string | null;
  passenger_notes: string | null;
  crew_hotel: string | null;
  crew_car: string | null;
  crew_catering: string | null;
  crew_notes: string | null;
};

type DraftLeg = {
  id: string;
  legOrder: number;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
};

function formatTime(time?: string | null) {
  if (!time) return "";
  return time.slice(0, 5);
}

function splitNames(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function EditFlightForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const flightId = searchParams.get("flight");
  const { aircraft, loading: aircraftLoading } = useAircraftData();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [aircraftId, setAircraftId] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [status, setStatus] = useState("Confirmed");
  const [ownerOnboard, setOwnerOnboard] = useState(false);
  const [notes, setNotes] = useState("");

  const [legs, setLegs] = useState<DraftLeg[]>([]);
  const [passengerNames, setPassengerNames] = useState("");
  const [crewNames, setCrewNames] = useState("");

  const [fboName, setFboName] = useState("");
  const [fboLocation, setFboLocation] = useState("");
  const [fboPhone, setFboPhone] = useState("");
  const [fuelName, setFuelName] = useState("");
  const [fuelLocation, setFuelLocation] = useState("");
  const [fuelPhone, setFuelPhone] = useState("");

  const [passengerHotel, setPassengerHotel] = useState("");
  const [passengerCar, setPassengerCar] = useState("");
  const [passengerCatering, setPassengerCatering] = useState("");
  const [passengerNotes, setPassengerNotes] = useState("");

  const [crewHotel, setCrewHotel] = useState("");
  const [crewCar, setCrewCar] = useState("");
  const [crewCatering, setCrewCatering] = useState("");
  const [crewNotes, setCrewNotes] = useState("");

  useEffect(() => {
    async function loadFlight() {
      if (!flightId) {
        setLoading(false);
        return;
      }

      const [flightResult, legResult] = await Promise.all([
        supabase.from("flights").select("*").eq("id", flightId).single(),
        supabase
          .from("flight_legs")
          .select("*")
          .eq("flight_id", flightId)
          .order("leg_order", { ascending: true }),
      ]);

      if (flightResult.error) {
        setMessage(`Could not load flight: ${flightResult.error.message}`);
        setLoading(false);
        return;
      }

      const flight = flightResult.data as FlightRow;
      const legRows = (legResult.data || []) as LegRow[];
      const firstLeg = legRows[0];

      setAircraftId(flight.aircraft_id || "");
      setFlightDate(flight.flight_date || "");
      setStatus(flight.status || "Confirmed");
      setOwnerOnboard(Boolean(flight.owner_onboard));
      setNotes(flight.notes || "");

      setLegs(
        legRows.length
          ? legRows.map((leg) => ({
              id: leg.id,
              legOrder: leg.leg_order,
              origin: leg.origin,
              destination: leg.destination,
              departureTime: formatTime(leg.departure_time),
              arrivalTime: formatTime(leg.arrival_time),
            }))
          : [
              {
                id: "new-1",
                legOrder: 1,
                origin: flight.origin || "",
                destination: flight.destination || "",
                departureTime: formatTime(flight.departure_time),
                arrivalTime: "",
              },
            ]
      );

      setPassengerNames((firstLeg?.passenger_names || []).join(", "));
      setCrewNames((firstLeg?.crew_names || []).join(", "));

      setFboName(firstLeg?.fbo_name || "");
      setFboLocation(firstLeg?.fbo_location || "");
      setFboPhone(firstLeg?.fbo_phone || "");
      setFuelName(firstLeg?.fuel_name || "");
      setFuelLocation(firstLeg?.fuel_location || "");
      setFuelPhone(firstLeg?.fuel_phone || "");

      setPassengerHotel(firstLeg?.passenger_hotel || "");
      setPassengerCar(firstLeg?.passenger_car || "");
      setPassengerCatering(firstLeg?.passenger_catering || "");
      setPassengerNotes(firstLeg?.passenger_notes || "");

      setCrewHotel(firstLeg?.crew_hotel || "");
      setCrewCar(firstLeg?.crew_car || "");
      setCrewCatering(firstLeg?.crew_catering || "");
      setCrewNotes(firstLeg?.crew_notes || "");

      setLoading(false);
    }

    loadFlight();
  }, [flightId]);

  function updateLeg(id: string, field: keyof DraftLeg, value: string) {
    setLegs((current) =>
      current.map((leg) => (leg.id === id ? { ...leg, [field]: value } : leg))
    );
  }

  function addLeg() {
    const lastLeg = legs[legs.length - 1];

    setLegs((current) => [
      ...current,
      {
        id: `new-${Date.now()}`,
        legOrder: current.length + 1,
        origin: lastLeg?.destination || "",
        destination: "",
        departureTime: "",
        arrivalTime: "",
      },
    ]);
  }

  function removeLeg(id: string) {
    if (legs.length === 1) return;
    setLegs((current) => current.filter((leg) => leg.id !== id));
  }

  async function saveChanges() {
    if (!flightId) return;

    setSaving(true);
    setMessage("");

    const firstLeg = legs[0];
    const lastLeg = legs[legs.length - 1];

    const { error: flightError } = await supabase
      .from("flights")
      .update({
        aircraft_id: aircraftId || null,
        flight_date: flightDate,
        status,
        owner_onboard: ownerOnboard,
        departure_time: firstLeg?.departureTime || null,
        origin: firstLeg?.origin || null,
        destination: lastLeg?.destination || firstLeg?.destination || null,
        notes,
      })
      .eq("id", flightId);

    if (flightError) {
      setMessage(`Flight update error: ${flightError.message}`);
      setSaving(false);
      return;
    }

    const { error: deleteError } = await supabase
      .from("flight_legs")
      .delete()
      .eq("flight_id", flightId);

    if (deleteError) {
      setMessage(`Leg update error: ${deleteError.message}`);
      setSaving(false);
      return;
    }

    const passengerArray = splitNames(passengerNames);
    const crewArray = splitNames(crewNames);

    const legRows = legs.map((leg, index) => ({
      flight_id: flightId,
      leg_order: index + 1,
      origin: leg.origin,
      destination: leg.destination,
      departure_time: leg.departureTime || null,
      arrival_time: leg.arrivalTime || null,
      passenger_names: passengerArray,
      crew_names: crewArray,
      fbo_name: fboName || null,
      fbo_location: fboLocation || null,
      fbo_phone: fboPhone || null,
      fuel_name: fuelName || null,
      fuel_location: fuelLocation || null,
      fuel_phone: fuelPhone || null,
      passenger_hotel: passengerHotel || null,
      passenger_car: passengerCar || null,
      passenger_catering: passengerCatering || null,
      passenger_notes: passengerNotes || null,
      crew_hotel: crewHotel || null,
      crew_car: crewCar || null,
      crew_catering: crewCatering || null,
      crew_notes: crewNotes || null,
    }));

    const { error: legError } = await supabase.from("flight_legs").insert(legRows);

    if (legError) {
      setMessage(`Leg save error: ${legError.message}`);
      setSaving(false);
      return;
    }

    setMessage("Trip updated.");
    setSaving(false);
  }

  async function deleteTrip() {
    if (!flightId) return;

    const confirmDelete = window.confirm("Delete this trip? This cannot be undone.");
    if (!confirmDelete) return;

    const { error } = await supabase.from("flights").delete().eq("id", flightId);

    if (error) {
      setMessage(`Delete error: ${error.message}`);
      return;
    }

    router.push("/dashboard");
  }

  if (!flightId) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8">
        <h1 className="text-2xl font-bold text-slate-900">No trip selected</h1>
        <p className="mt-2 text-slate-500">Go back to Schedule and select a flight to edit.</p>
        <Link href="/dashboard" className="mt-5 inline-block rounded-xl bg-[#0066D6] px-5 py-3 font-bold text-white">
          Back to Schedule
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-500">
        Loading trip...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase font-bold text-[#007DB8]">Edit Trip</p>
          <h1 className="text-3xl font-bold text-slate-900">Trip Details</h1>
          <p className="mt-1 text-slate-500">Update, save, and send feedback.</p>
        </div>

        <Link href="/dashboard" className="rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700">
          Back to Schedule
        </Link>
      </div>

      {message && (
        <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-700">
          {message}
        </div>
      )}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-bold text-slate-900">Flight</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Aircraft" icon={Plane}>
            <select value={aircraftId} onChange={(event) => setAircraftId(event.target.value)} className="input" disabled={aircraftLoading}>
              {aircraft.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.tail_number} · {item.model}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Date" icon={CalendarDays}>
            <input type="date" value={flightDate} onChange={(event) => setFlightDate(event.target.value)} className="input" />
          </Field>

          <label>
            <p className="mb-2 text-sm font-bold text-slate-700">Status</p>
            <select value={status} onChange={(event) => setStatus(event.target.value)} className="input">
              <option>Confirmed</option>
              <option>Tentative</option>
              <option>Draft</option>
              <option>Canceled</option>
            </select>
          </label>

          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 font-bold text-slate-700">
            <input type="checkbox" checked={ownerOnboard} onChange={(event) => setOwnerOnboard(event.target.checked)} />
            Owner / GGW onboard
          </label>
        </div>
      </section>

      <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-900">Legs</h2>
          <button type="button" onClick={addLeg} className="rounded-xl bg-[#0066D6] px-4 py-3 font-bold text-white flex items-center gap-2">
            <Plus size={18} />
            Add Leg
          </button>
        </div>

        <div className="space-y-4">
          {legs.map((leg, index) => (
            <div key={leg.id} className="rounded-3xl bg-slate-50 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Leg {index + 1}</h3>

                {legs.length > 1 && (
                  <button type="button" onClick={() => removeLeg(leg.id)} className="rounded-xl border border-red-200 px-3 py-2 text-sm font-bold text-red-600 flex items-center gap-2">
                    <Trash2 size={16} />
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <AirportField label="From" value={leg.origin} onChange={(value) => updateLeg(leg.id, "origin", value)} />
                <AirportField label="To" value={leg.destination} onChange={(value) => updateLeg(leg.id, "destination", value)} />
                <Field label="Departure Time" icon={Clock}>
                  <input type="time" value={leg.departureTime} onChange={(event) => updateLeg(leg.id, "departureTime", event.target.value)} className="input" />
                </Field>
                <Field label="Arrival Time" icon={Clock}>
                  <input type="time" value={leg.arrivalTime} onChange={(event) => updateLeg(leg.id, "arrivalTime", event.target.value)} className="input" />
                </Field>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Passengers</h2>
          <p className="mb-4 text-sm text-slate-500">Use commas between names.</p>
          <input className="input" value={passengerNames} onChange={(event) => setPassengerNames(event.target.value)} placeholder="GGW, Guest Name" />
          <input className="input mt-3" value={passengerHotel} onChange={(event) => setPassengerHotel(event.target.value)} placeholder="Passenger hotel" />
          <input className="input mt-3" value={passengerCar} onChange={(event) => setPassengerCar(event.target.value)} placeholder="Passenger rental car / location" />
          <input className="input mt-3" value={passengerCatering} onChange={(event) => setPassengerCatering(event.target.value)} placeholder="Passenger catering / food" />
          <textarea className="input mt-3 min-h-[100px]" value={passengerNotes} onChange={(event) => setPassengerNotes(event.target.value)} placeholder="Passenger notes" />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Crew</h2>
          <p className="mb-4 text-sm text-slate-500">Use commas between crew names.</p>
          <input className="input" value={crewNames} onChange={(event) => setCrewNames(event.target.value)} placeholder="Adam Smith, Joel Camfield" />
          <input className="input mt-3" value={crewHotel} onChange={(event) => setCrewHotel(event.target.value)} placeholder="Crew hotel" />
          <input className="input mt-3" value={crewCar} onChange={(event) => setCrewCar(event.target.value)} placeholder="Crew rental car / location" />
          <input className="input mt-3" value={crewCatering} onChange={(event) => setCrewCatering(event.target.value)} placeholder="Crew catering / food" />
          <textarea className="input mt-3 min-h-[100px]" value={crewNotes} onChange={(event) => setCrewNotes(event.target.value)} placeholder="Crew notes / airline home details" />
        </div>
      </section>

      <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">FBO / Fuel</h2>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input className="input" value={fboName} onChange={(event) => setFboName(event.target.value)} placeholder="FBO name" />
          <input className="input" value={fboLocation} onChange={(event) => setFboLocation(event.target.value)} placeholder="FBO location" />
          <input className="input" value={fboPhone} onChange={(event) => setFboPhone(event.target.value)} placeholder="FBO phone" />
          <input className="input" value={fuelName} onChange={(event) => setFuelName(event.target.value)} placeholder="Fuel provider" />
          <input className="input" value={fuelLocation} onChange={(event) => setFuelLocation(event.target.value)} placeholder="Fuel location" />
          <input className="input" value={fuelPhone} onChange={(event) => setFuelPhone(event.target.value)} placeholder="Fuel phone" />
        </div>
      </section>

      <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Trip Notes</h2>
        <textarea className="input mt-4 min-h-[120px]" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Trip notes" />
      </section>

      <div className="sticky bottom-4 mt-5 flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur">
        <button type="button" onClick={saveChanges} disabled={saving} className="rounded-xl bg-[#0066D6] px-5 py-3 font-bold text-white flex items-center gap-2 disabled:opacity-60">
          <Save size={18} />
          {saving ? "Saving..." : "Save Updates"}
        </button>

        <button type="button" className="rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700 flex items-center gap-2">
          <Mail size={18} />
          Email Updates
        </button>

        <button type="button" onClick={deleteTrip} className="rounded-xl border border-red-200 px-5 py-3 font-bold text-red-600">
          Delete Trip
        </button>
      </div>
    </div>
  );
}

function Field({ label, icon: Icon, children }: { label: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <label>
      <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
        <Icon size={17} className="text-[#0066D6]" />
        {label}
      </div>
      {children}
    </label>
  );
}
