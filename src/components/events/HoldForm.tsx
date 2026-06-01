"use client";

import { CalendarDays, Plane, User, FileText, Save } from "lucide-react";
import { aircraft } from "../../data/aircraft";

interface HoldFormProps {
  type: "Maintenance" | "Training" | "Major Event";
}

export default function HoldForm({ type }: HoldFormProps) {
  const isMajorEvent = type === "Major Event";
  const isTraining = type === "Training";

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-5">
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="mb-6">
          <p className="text-sm uppercase font-bold text-[#007DB8]">
            Create Hold
          </p>
          <h1 className="text-3xl font-bold text-slate-900">{type}</h1>
          <p className="text-slate-500 mt-1">
            {isMajorEvent
              ? "Ghosted calendar hold to help prevent future scheduling conflicts."
              : "Calendar hold to protect aircraft, pilot, or operational availability."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Field label="Title" icon={FileText}>
            <input
              className="input"
              defaultValue={
                isMajorEvent
                  ? "Annual Owner Event"
                  : isTraining
                  ? "Pilot Recurrent Training"
                  : "Scheduled Inspection"
              }
            />
          </Field>

          {!isMajorEvent && (
            <Field label={isTraining ? "Pilot / Crew" : "Aircraft"} icon={isTraining ? User : Plane}>
              {isTraining ? (
                <input className="input" defaultValue="Capt. Roberts" />
              ) : (
                <select className="input">
                  {aircraft.map((item) => (
                    <option key={item.tail}>{item.tail} · {item.model}</option>
                  ))}
                </select>
              )}
            </Field>
          )}

          <Field label="Start Date" icon={CalendarDays}>
            <input type="date" className="input" defaultValue="2026-08-20" />
          </Field>

          <Field label="End Date" icon={CalendarDays}>
            <input type="date" className="input" defaultValue="2026-08-21" />
          </Field>
        </div>

        <div className="mt-8">
          <label className="text-sm font-bold text-slate-700">Notes</label>
          <textarea
            className="input mt-2 min-h-[140px]"
            defaultValue={
              isMajorEvent
                ? "Ghosted major event hold. Trips not yet confirmed."
                : "Do not schedule conflicting flights without approval."
            }
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="bg-[#0066D6] text-white rounded-xl px-6 py-3 font-bold flex items-center gap-2">
            <Save size={18} /> Save Hold
          </button>
          <button className="border border-slate-200 rounded-xl px-6 py-3 font-bold">
            Add Another
          </button>
        </div>
      </section>

      <aside className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 h-fit">
        <h2 className="text-xl font-bold text-slate-900">Calendar Preview</h2>

        <div className="mt-5 rounded-2xl border border-slate-200 p-4">
          <div className={getPreviewClass(type)}>
            <p className="font-bold">
              {isMajorEvent
                ? "Annual Owner Event"
                : isTraining
                ? "Pilot Recurrent Training"
                : "Scheduled Inspection"}
            </p>
            <p className="text-xs mt-1">{type}</p>
          </div>
        </div>

        <p className="text-sm text-slate-500 mt-4">
          {isMajorEvent
            ? "Major events appear ghosted because they are planning holds, not confirmed trips."
            : "This will block schedule visibility on the calendar."}
        </p>
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

function getPreviewClass(type: string) {
  if (type === "Maintenance") {
    return "rounded-xl border border-purple-300 bg-purple-50 text-purple-700 p-4";
  }

  if (type === "Training") {
    return "rounded-xl border border-teal-300 bg-teal-50 text-teal-700 p-4";
  }

  return "rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-500 p-4 opacity-70";
}
