"use client";

import { Plane, Users, Fuel, Hotel, Car, Utensils, Phone, MapPin, FileText, Printer, Download, Mail } from "lucide-react";
import { flights } from "../../data/flights";

export default function TripSheet() {
  const flight = flights[0];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5">
      <section id="trip-sheet" className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 md:p-8 print:shadow-none print:border-none print:rounded-none">
        <div className="flex flex-wrap items-start justify-between gap-5 border-b border-slate-200 pb-6 mb-6">
          <div>
            <p className="text-sm uppercase font-bold text-[#007DB8]">Williams International</p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Flight Department Trip Sheet</h1>
            <p className="text-slate-500 mt-2">Passenger information first, crew information second, then operational details.</p>
          </div>

          {flight.ownerOnboard && (
            <div className="text-right">
              <div className="inline-flex bg-[#062A55] text-white rounded-full px-5 py-3 font-bold text-xl gap-2 items-center">
                <span className="text-amber-400">★</span> GGW
              </div>
              <p className="text-sm text-slate-500 mt-3">Owner Onboard</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Summary icon={Plane} label="Aircraft" value={flight.aircraft.tail} />
          <Summary icon={MapPin} label="Route" value={`${flight.route.from} → ${flight.route.to}`} />
          <Summary icon={FileText} label="Status" value={flight.status} />
          <Summary icon={Users} label="Passengers" value={`${flight.passengers.length}`} />
        </div>

        <AccordionSection title="Passenger Information" defaultOpen>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flight.passengers.map((passenger) => (
              <div key={passenger} className="rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={19} className="text-[#0066D6]" />
                  <h3 className="font-bold text-slate-900">
                    {passenger === "GGW" ? "Owner" : "Passenger"}
                  </h3>
                </div>
                <p className="rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                  {passenger === "GGW" ? "★ GGW" : passenger}
                </p>
              </div>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection title="Crew Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flight.crew.map((crew) => (
              <div key={crew} className="rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={19} className="text-[#0066D6]" />
                  <h3 className="font-bold text-slate-900">Crew</h3>
                </div>
                <p className="rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">{crew}</p>
              </div>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection title="Flight Legs">
          <div className="space-y-3">
            {flight.legs.map((leg, index) => (
              <div key={leg.id} className="grid grid-cols-1 md:grid-cols-[90px_1fr_1fr_1fr] gap-3 rounded-2xl bg-slate-50 p-4">
                <Info label="Leg" value={`${index + 1}`} />
                <Info label="From" value={leg.from} />
                <Info label="To" value={leg.to} />
                <Info label="Depart" value={leg.departureTime} />
              </div>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection title="Trip Services">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ServiceCard icon={Fuel} title="FBO" primary={flight.fbo ? `${flight.fbo.name} ${flight.fbo.airport}` : "Not assigned"} secondary={flight.fbo?.phone || "No phone entered"} />
            <ServiceCard icon={Hotel} title="Hotel" primary={flight.hotel?.name || "Not assigned"} secondary={flight.hotel?.rooms ? `${flight.hotel.rooms} rooms` : "Room count TBD"} />
            <ServiceCard icon={Car} title="Rental Car" primary={flight.rentalCar?.company || "Not assigned"} secondary={flight.rentalCar?.vehicle || "Vehicle TBD"} />
            <ServiceCard icon={Utensils} title="Catering" primary={flight.catering?.vendor || "Not assigned"} secondary={flight.catering?.notes || "No catering notes"} />
          </div>
        </AccordionSection>

        <AccordionSection title="Notes">
          <div className="rounded-2xl bg-slate-50 p-5 text-slate-700">{flight.notes || "No notes entered."}</div>
        </AccordionSection>

        <div className="mt-8 border-t border-slate-200 pt-5 text-xs text-slate-400">
          Draft operational trip sheet. Final operational release should be reviewed by authorized flight department personnel.
        </div>
      </section>

      <aside className="space-y-5 print:hidden">
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900">Trip Sheet Actions</h2>
          <p className="text-sm text-slate-500 mt-2">This page is print-ready now. Native PDF file generation can be wired in later.</p>

          <button onClick={() => window.print()} className="mt-5 w-full rounded-xl bg-[#0066D6] text-white px-5 py-3 font-bold flex items-center justify-center gap-2">
            <Printer size={18} /> Print / Save as PDF
          </button>

          <button onClick={() => window.print()} className="mt-3 w-full rounded-xl border border-slate-200 px-5 py-3 font-bold flex items-center justify-center gap-2">
            <Download size={18} /> Download PDF
          </button>

          <button className="mt-3 w-full rounded-xl border border-slate-200 px-5 py-3 font-bold flex items-center justify-center gap-2">
            <Mail size={18} /> Email Trip Sheet
          </button>
        </section>

        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900">Quick Contacts</h2>
          <div className="mt-4 space-y-3">
            <Contact label="FBO" value={flight.fbo?.phone || "N/A"} />
            <Contact label="Hotel" value="Saved hotel contact" />
            <Contact label="Rental" value="Saved rental contact" />
            <Contact label="Catering" value="Saved catering contact" />
          </div>
        </section>
      </aside>
    </div>
  );
}

function AccordionSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="mb-5 rounded-3xl border border-slate-200 p-5">
      <summary className="cursor-pointer text-xl font-bold text-slate-900">{title}</summary>
      <div className="mt-5">{children}</div>
    </details>
  );
}

function Summary({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return <div className="rounded-2xl border border-slate-200 p-4"><Icon size={20} className="text-[#0066D6] mb-2" /><p className="text-xs uppercase font-bold text-slate-400">{label}</p><p className="font-bold text-slate-900 mt-1">{value}</p></div>;
}

function Info({ label, value }: { label: string; value: string }) {
  return <div><p className="text-xs uppercase font-bold text-slate-400">{label}</p><p className="font-bold text-slate-900">{value}</p></div>;
}

function ServiceCard({ icon: Icon, title, primary, secondary }: { icon: React.ElementType; title: string; primary: string; secondary: string }) {
  return <div className="rounded-2xl border border-slate-200 p-5"><div className="flex items-center gap-2 mb-3"><Icon size={19} className="text-[#0066D6]" /><h3 className="font-bold text-slate-900">{title}</h3></div><p className="font-bold text-slate-800">{primary}</p><p className="text-sm text-slate-500 mt-1">{secondary}</p></div>;
}

function Contact({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl bg-slate-50 p-4 flex justify-between gap-3"><p className="font-bold text-[#0066D6]">{label}</p><p className="text-slate-700 text-right flex items-center gap-2"><Phone size={15} /> {value}</p></div>;
}
