import { aircraft } from "../../data/aircraft";
import { flights } from "../../data/flights";
import { calendarHolds } from "../../data/events";
import { getAircraftClasses, getHoldClasses } from "../../lib/calendarStyles";

export default function AircraftTimeline() {
  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-sm uppercase font-bold text-[#007DB8]">
            Aircraft View
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            Monthly Aircraft Timeline
          </h1>
          <p className="text-slate-500 mt-1">
            Aircraft-first view for schedule conflicts, maintenance, and owner travel.
          </p>
        </div>

        <div className="flex gap-2">
          <button className="rounded-xl border border-slate-200 px-4 py-2 font-bold">
            Today
          </button>
          <button className="rounded-xl bg-[#0066D6] text-white px-5 py-2 font-bold">
            August 2026
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[1100px]">
          <div className="grid grid-cols-[170px_repeat(31,minmax(34px,1fr))] gap-1 mb-2">
            <div />
            {days.map((day) => (
              <div key={day} className="text-center text-xs font-bold text-slate-500">
                {day}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {aircraft.map((item) => {
              const aircraftFlights = flights.filter(
                (flight) => flight.aircraft.tail === item.tail
              );
              const aircraftHolds = calendarHolds.filter(
                (hold) => hold.aircraftTail === item.tail
              );

              return (
                <div
                  key={item.tail}
                  className="grid grid-cols-[170px_repeat(31,minmax(34px,1fr))] gap-1 items-stretch"
                >
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                    <p className="text-xl font-bold text-slate-900">{item.tail}</p>
                    <p className="text-xs text-slate-500">{item.model}</p>
                    <span className="inline-block mt-3 rounded-full bg-blue-50 text-[#0066D6] px-3 py-1 text-xs font-bold">
                      {item.status}
                    </span>
                  </div>

                  {days.map((day) => {
                    const flight = aircraftFlights.find((entry) => entry.day === day);
                    const hold = aircraftHolds.find((entry) => entry.day === day);

                    return (
                      <div
                        key={`${item.tail}-${day}`}
                        className="min-h-[92px] rounded-xl border border-slate-100 bg-white p-1"
                      >
                        {flight && (
                          <div
                            className={`h-full rounded-lg border p-2 text-white text-xs shadow-sm ${getAircraftClasses(
                              flight.aircraft.color
                            )}`}
                          >
                            <p className="font-bold">{flight.departureTime}</p>
                            <p>{flight.route.to}</p>
                            {flight.ownerOnboard && <p className="mt-1">★ GGW</p>}
                          </div>
                        )}

                        {hold && (
                          <div
                            className={`h-full rounded-lg border p-2 text-xs ${getHoldClasses(
                              hold.type
                            )}`}
                          >
                            <p className="font-bold">{hold.title}</p>
                            <p>{hold.type}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-4">
            <h2 className="font-bold text-slate-900">Why this view matters</h2>
            <p className="text-sm text-slate-600 mt-2">
              Flight departments often schedule by aircraft first. This view makes it easier
              to spot owner travel, open aircraft, inspection windows, and maintenance conflicts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
