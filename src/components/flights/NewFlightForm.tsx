"use client";

import { useMemo, useState } from "react";
import { Plane, CalendarDays, Clock, MapPin, Users, Fuel, Hotel, Car, Utensils, Plus, Save } from "lucide-react";
import { aircraft } from "../../data/aircraft";
import { passengers, fbos, hotels, rentalCars, cateringVendors } from "../../data/library";

export default function NewFlightForm() {
  const [destination, setDestination] = useState("KTEB");
  const [ownerMode, setOwnerMode] = useState("Outbound and return");
  const [showNewPassenger, setShowNewPassenger] = useState(false);
  const [passengerType, setPassengerType] = useState("GGW");

  const airportFbos = useMemo(() => fbos.filter((fbo) => fbo.airport === destination), [destination]);
  const airportHotels = useMemo(() => hotels.filter((hotel) => hotel.airport === destination), [destination]);
  const airportCars = useMemo(() => rentalCars.filter((car) => car.airport === destination), [destination]);
  const airportCatering = useMemo(() => cateringVendors.filter((vendor) => vendor.airport === destination), [destination]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-5">
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="mb-6"><p className="text-sm uppercase font-bold text-[#007DB8]">Create Trip</p><h1 className="text-3xl font-bold text-slate-900">New Flight</h1><p className="text-slate-500 mt-1">Add a confirmed trip directly to the schedule.</p></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Field label="Aircraft" icon={Plane}><select className="input">{aircraft.map((item) => <option key={item.tail}>{item.tail} · {item.model}</option>)}</select></Field>
          <Field label="Date" icon={CalendarDays}><input type="date" defaultValue="2026-08-05" className="input" /></Field>
          <Field label="Departure Time" icon={Clock}><input type="time" defaultValue="08:00" className="input" /></Field>
          <Field label="Origin" icon={MapPin}><input defaultValue="KDET" className="input" /></Field>
          <Field label="Destination" icon={MapPin}><input value={destination} onChange={(event) => setDestination(event.target.value.toUpperCase())} className="input" /></Field>
        </div>
        <section className="mt-8 rounded-3xl border border-slate-200 p-5 bg-blue-50/40"><div className="flex items-center justify-between gap-4 mb-4"><div><h2 className="text-xl font-bold text-slate-900">GGW</h2><p className="text-sm text-slate-500">Choose whether GGW is onboard this trip or only one direction.</p></div><div className="bg-[#062A55] text-white rounded-full px-5 py-3 font-bold flex gap-2 items-center"><span className="text-amber-400">★</span> GGW</div></div><select value={ownerMode} onChange={(event) => setOwnerMode(event.target.value)} className="input bg-white"><option>Outbound and return</option><option>Outbound only / drop-off</option><option>Return only / pick-up</option><option>Not onboard</option></select></section>
        <section className="mt-8 rounded-3xl border border-slate-200 p-5"><div className="flex items-center justify-between mb-4"><div><h2 className="text-xl font-bold text-slate-900">Passengers</h2><p className="text-sm text-slate-500">Select a favorite passenger or add a new person.</p></div></div><Field label="Passenger" icon={Users}><select value={passengerType} onChange={(event) => { setPassengerType(event.target.value); setShowNewPassenger(event.target.value === "add-new"); }} className="input"><option value="GGW">GGW</option>{passengers.filter((p) => p.name !== "GGW").map((passenger) => <option key={passenger.id} value={passenger.name}>{passenger.name}</option>)}<option value="add-new">+ Add New Passenger</option></select></Field>{showNewPassenger && <div className="mt-4 rounded-2xl bg-slate-50 p-4 grid grid-cols-1 md:grid-cols-2 gap-4"><input className="input bg-white" placeholder="Passenger name" /><input className="input bg-white" placeholder="Phone / contact optional" /><input className="input bg-white md:col-span-2" placeholder="Notes / preferences" /><label className="flex items-center gap-2 text-sm font-bold text-slate-700"><input type="checkbox" /> Favorite passenger / show in dropdown</label><label className="flex items-center gap-2 text-sm font-bold text-slate-700"><input type="checkbox" defaultChecked /> Save passenger in system</label></div>}</section>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5"><SavedSelect title="FBO" icon={Fuel} options={airportFbos.map((item) => `${item.name} ${item.airport}`)} /><SavedSelect title="Hotel" icon={Hotel} options={airportHotels.map((item) => item.name)} /><SavedSelect title="Rental Car" icon={Car} options={airportCars.map((item) => item.company)} /><SavedSelect title="Catering" icon={Utensils} options={airportCatering.map((item) => item.vendor)} /></div>
        <div className="mt-8"><label className="text-sm font-bold text-slate-700">Notes</label><textarea className="input mt-2 min-h-[120px]" placeholder="Trip notes, passenger notes, release notes, special handling..." /></div>
        <div className="mt-8 flex flex-wrap gap-3"><button className="bg-[#0066D6] text-white rounded-xl px-6 py-3 font-bold flex items-center gap-2"><Save size={18} /> Save Trip</button><button className="border border-slate-200 rounded-xl px-6 py-3 font-bold flex items-center gap-2"><Plus size={18} /> Add Leg</button><button className="border border-slate-200 rounded-xl px-6 py-3 font-bold">Preview Trip Sheet</button></div>
      </section>
      <aside className="space-y-5"><section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6"><h2 className="text-xl font-bold text-slate-900">Passenger Logic</h2><p className="text-sm text-slate-600 mt-3 leading-6">Everyone can be saved in the system, but only favorites should appear in the dropdown.</p></section></aside>
    </div>
  );
}
function Field({ label, icon: Icon, children }: { label: string; icon: React.ElementType; children: React.ReactNode }) { return <label><div className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2"><Icon size={17} className="text-[#0066D6]" />{label}</div>{children}</label>; }
function SavedSelect({ icon: Icon, title, options }: { icon: React.ElementType; title: string; options: string[] }) { const [showManual, setShowManual] = useState(false); return <div className="rounded-3xl border border-slate-200 p-5"><div className="flex items-center gap-3 mb-4"><div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center"><Icon size={20} className="text-[#0066D6]" /></div><h3 className="font-bold text-slate-900">{title}</h3></div><select className="input">{options.length ? options.map((option) => <option key={option}>{option}</option>) : <option>No saved options for this airport</option>}</select><button type="button" onClick={() => setShowManual(!showManual)} className="mt-3 text-sm font-bold text-[#0066D6]">+ Manually enter new {title}</button>{showManual && <div className="mt-4 rounded-2xl bg-slate-50 p-4 space-y-3"><input className="input bg-white" placeholder={`${title} name`} /><input className="input bg-white" placeholder="Phone / contact" /><input className="input bg-white" placeholder="Address / notes" /><label className="flex items-center gap-2 text-sm font-bold text-slate-700"><input type="checkbox" defaultChecked /> Save this {title} for future trips</label></div>}</div>; }
