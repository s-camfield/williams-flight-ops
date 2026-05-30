import DashboardLayout from "../../components/layout/DashboardLayout";

const flights = [
  { day: 5, time: "08:00", route: "KDET → KTEB", tail: "N359W", color: "bg-blue-700", owner: true },
  { day: 12, time: "10:30", route: "KPBI → KLAS", tail: "N358E", color: "bg-green-600", owner: false },
  { day: 14, time: "14:00", route: "KTEB → KBOS", tail: "N442F", color: "bg-orange-600", owner: true },
  { day: 25, time: "09:00", route: "KTEB → KEGE", tail: "N359W", color: "bg-blue-700", owner: true },
];

const holds = [
  { day: 18, title: "All Day Maintenance", type: "Maintenance" },
  { day: 20, title: "NBAA-BACE", type: "Major Event" },
  { day: 28, title: "Pilot Training", type: "Training" },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_520px] gap-5">
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">August 2026</h2>
              <p className="text-sm text-slate-500">Always-visible aircraft schedule</p>
            </div>

            <div className="flex gap-2">
              <button className="rounded-xl border px-4 py-2 font-semibold">Today</button>
              <button className="rounded-xl bg-[#0066D6] text-white px-5 py-2 font-semibold">Month</button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 rounded-2xl border border-slate-200 p-4 mb-5 text-sm font-semibold">
            <Legend color="bg-blue-700" label="N359W" />
            <Legend color="bg-green-600" label="N358E" />
            <Legend color="bg-orange-600" label="N442F" />
            <Legend color="bg-purple-500" label="Maintenance" />
            <Legend color="bg-teal-500" label="Training" />
            <Legend border label="Major Event" />
          </div>

          <div className="grid grid-cols-7 text-center text-sm font-bold text-slate-700 mb-2">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 border border-slate-200 rounded-2xl overflow-hidden">
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i - 2;
              const flight = flights.find((f) => f.day === day);
              const hold = holds.find((h) => h.day === day);

              return (
                <div key={i} className="min-h-[125px] border border-slate-100 p-3 relative bg-white">
                  <div className={day < 1 || day > 31 ? "text-slate-300" : "font-bold text-slate-900"}>
                    {day < 1 ? 29 + day : day > 31 ? day - 31 : day}
                  </div>

                  {flight && (
                    <>
                      {flight.owner && (
                        <div className="absolute top-7 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-amber-400 shadow-lg flex items-center justify-center text-white text-2xl z-10">
                          ★
                        </div>
                      )}

                      <div className={`${flight.color} mt-8 rounded-xl p-3 text-white shadow-md`}>
                        <p className="font-bold">{flight.time}</p>
                        <p className="text-sm">{flight.route}</p>
                        <p className="text-xs opacity-90">{flight.tail}</p>
                        {flight.owner && (
                          <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-xs font-bold">
                            ★ GGW
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {hold && (
                    <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-100/70 p-3 text-sm text-slate-600">
                      <p className="font-bold">{hold.title}</p>
                      <p className="text-xs">{hold.type}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-5 gap-3 mt-5 rounded-2xl border border-slate-200 p-4 text-center">
            <Stat icon="✈" number="8" label="Total Flights" />
            <Stat icon="★" number="3" label="Owner (GGW)" />
            <Stat icon="🔧" number="2" label="Maintenance" />
            <Stat icon="🎓" number="1" label="Training" />
            <Stat icon="▧" number="2" label="Major Events" />
          </div>
        </section>

        <aside className="space-y-5">
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex gap-3">
                  <span className="bg-blue-700 text-white rounded-full px-4 py-1 font-bold">N359W</span>
                  <span className="bg-green-100 text-green-700 rounded-full px-4 py-1 font-bold">Confirmed</span>
                </div>

                <h2 className="text-4xl font-bold mt-6 text-slate-900">KDET → KTEB</h2>
                <p className="text-slate-500 mt-2">Friday, August 5, 2026</p>
              </div>

              <div className="bg-[#062A55] text-white rounded-full px-5 py-3 font-bold text-xl flex gap-2 items-center">
                <span className="text-amber-400">★</span> GGW
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mt-6">
              <Info label="Departure" value="08:00" />
              <Info label="Flight Time" value="01:12" />
              <Info label="Destination" value="KTEB" />
              <Info label="Passengers" value="2" />
            </div>
          </section>

          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-xl font-bold mb-5">Trip Overview</h3>

            <div className="space-y-3">
              <Row label="Crew" value="Capt. Roberts, FO James" />
              <Row label="Passengers" value="2 Listed   ★ GGW" />
              <Row label="Aircraft" value="N359W · Gulfstream G650" />
              <Row label="FBO" value="Atlantic Aviation KTEB" />
              <Row label="Hotel" value="Marriott at Glenpointe · 2 Rooms" />
              <Row label="Rental Car" value="Enterprise · SUV" />
              <Row label="Catering" value="Gourmet Aviation · 2 Pax" />
            </div>

            <div className="grid grid-cols-3 gap-3 mt-6">
              <button className="bg-[#0066D6] text-white rounded-xl py-3 font-bold">Edit Flight</button>
              <button className="border rounded-xl py-3 font-bold">Add Leg</button>
              <button className="border border-red-300 text-red-600 rounded-xl py-3 font-bold">Cancel</button>
            </div>
          </section>
        </aside>
      </div>
    </DashboardLayout>
  );
}

function Legend({ color, label, border }: { color?: string; label: string; border?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-4 w-4 rounded ${border ? "border border-dashed border-slate-400" : color}`} />
      {label}
    </div>
  );
}

function Stat({ icon, number, label }: { icon: string; number: string; label: string }) {
  return (
    <div>
      <div className="text-2xl">{icon}</div>
      <p className="text-xl font-bold">{number}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <p className="text-xs uppercase font-bold text-slate-400">{label}</p>
      <p className="font-bold text-slate-900 mt-1">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4 flex justify-between">
      <p className="text-sm uppercase font-bold text-[#0066D6]">{label}</p>
      <p className="text-sm font-semibold text-slate-800 text-right">{value}</p>
    </div>
  );
}