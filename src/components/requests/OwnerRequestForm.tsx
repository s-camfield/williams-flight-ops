"use client";

import { useState } from "react";
import { CalendarDays, Clock, MapPin, Plane, Send, StickyNote, CheckCircle2 } from "lucide-react";
import { aircraft } from "../../data/aircraft";

export default function OwnerRequestForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#062A55] p-5 flex items-center justify-center">
        <section className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-2xl">
          <div className="mx-auto h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 size={44} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mt-6">Request Sent</h1>
          <p className="text-slate-500 mt-3 text-lg">
            Adam, Joel, and Gina will be notified by the selected email/text settings.
          </p>
          <button onClick={() => setSubmitted(false)} className="mt-8 w-full rounded-2xl bg-[#0066D6] text-white px-6 py-4 text-lg font-bold">
            Submit Another Request
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#062A55] p-4 md:p-8">
      <section className="mx-auto max-w-2xl rounded-3xl bg-white p-5 md:p-8 shadow-2xl">
        <div className="mb-8">
          <p className="text-sm uppercase font-bold text-[#007DB8]">Williams Flight Department</p>
          <h1 className="text-4xl font-bold text-slate-900 mt-2">Request a Flight</h1>
          <p className="text-slate-500 mt-2 text-lg">Quick owner request. The flight department will confirm details.</p>
        </div>

        <div className="space-y-5">
          <Field label="Where would you like to go?" icon={MapPin}>
            <input className="owner-input" placeholder="City, airport, or destination" />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Preferred Date" icon={CalendarDays}>
              <input type="date" className="owner-input" />
            </Field>

            <Field label="Preferred Time" icon={Clock}>
              <input type="time" className="owner-input" />
            </Field>
          </div>

          <Field label="Aircraft Preference" icon={Plane}>
            <select className="owner-input">
              <option>No preference</option>
              {aircraft.map((item) => (
                <option key={item.tail}>{item.tail} · {item.model}</option>
              ))}
            </select>
          </Field>

          <Field label="Special Notes" icon={StickyNote}>
            <textarea className="owner-input min-h-[140px]" placeholder="Passengers, catering, car, overnight, timing, etc." />
          </Field>
        </div>

        <button onClick={() => setSubmitted(true)} className="mt-8 w-full rounded-2xl bg-[#0066D6] text-white px-6 py-5 text-xl font-bold flex items-center justify-center gap-3 shadow-lg">
          <Send size={24} /> Submit Flight Request
        </button>

        <p className="text-center text-xs text-slate-400 mt-5">
          Submitting this request does not confirm the flight.
        </p>
      </section>
    </main>
  );
}

function Field({ label, icon: Icon, children }: { label: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-2">
        <Icon size={22} className="text-[#0066D6]" /> {label}
      </div>
      {children}
    </label>
  );
}
