"use client";

import { useAircraftData } from "../../hooks/useAircraftData";

export default function AircraftStatusBar() {
  const { aircraft, loading } = useAircraftData();

  if (loading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
            <div className="h-5 w-24 bg-slate-100 rounded mb-3" />
            <div className="h-8 w-32 bg-slate-100 rounded" />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
      {aircraft.map((item) => (
        <div key={item.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase font-bold text-slate-400">{item.model}</p>
            <h2 className="text-2xl font-bold text-slate-900">{item.tail_number}</h2>
          </div>
          <span className={getStatusClasses(item.status || "Available")}>{item.status || "Available"}</span>
        </div>
      ))}
    </section>
  );
}

function getStatusClasses(status: string) {
  if (status === "Available") return "rounded-full bg-green-100 text-green-700 px-4 py-2 text-sm font-bold";
  if (status === "Scheduled") return "rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-bold";
  return "rounded-full bg-purple-100 text-purple-700 px-4 py-2 text-sm font-bold";
}
