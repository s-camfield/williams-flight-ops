import { aircraft } from "../../data/aircraft";
import { flights } from "../../data/flights";

export default function AircraftUtilization() {
  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      <div className="mb-6">
        <p className="text-sm uppercase font-bold text-[#007DB8]">Reports</p>
        <h1 className="text-3xl font-bold text-slate-900">
          Aircraft Utilization
        </h1>
        <p className="text-slate-500 mt-1">
          Early reporting view for monthly usage, owner trips, and flight count by aircraft.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {aircraft.map((item) => {
          const aircraftFlights = flights.filter(
            (flight) => flight.aircraft.tail === item.tail
          );
          const ownerFlights = aircraftFlights.filter((flight) => flight.ownerOnboard);

          return (
            <div
              key={item.tail}
              className="rounded-3xl border border-slate-200 p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm uppercase font-bold text-slate-400">
                    {item.model}
                  </p>
                  <h2 className="text-3xl font-bold text-slate-900">
                    {item.tail}
                  </h2>
                </div>

                <span className="rounded-full bg-blue-50 text-[#0066D6] px-3 py-1 text-xs font-bold">
                  {item.status}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                <Metric label="Flights" value={`${aircraftFlights.length}`} />
                <Metric label="Owner Trips" value={`${ownerFlights.length}`} />
                <Metric label="Estimated Hours" value={estimateHours(aircraftFlights.length)} />
              </div>

              <div className="mt-6">
                <p className="text-sm font-bold text-slate-700 mb-2">
                  Monthly Usage
                </p>
                <div className="h-4 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-[#0066D6]"
                    style={{ width: `${Math.max(aircraftFlights.length * 25, 8)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-3xl bg-slate-50 border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900">Future reporting ideas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm text-slate-600">
          <p>Monthly aircraft hours and cycles.</p>
          <p>Owner vs. business vs. maintenance usage.</p>
          <p>Crew utilization and trip support costs.</p>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 flex justify-between gap-3">
      <p className="font-bold text-[#0066D6] uppercase text-sm">{label}</p>
      <p className="font-bold text-slate-900">{value}</p>
    </div>
  );
}

function estimateHours(flightCount: number) {
  if (flightCount === 0) return "0.0";
  return `${(flightCount * 2.4).toFixed(1)}`;
}
