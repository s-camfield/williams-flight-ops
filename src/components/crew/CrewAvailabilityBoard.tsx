import { crewMembers, crewAvailability } from "../../data/crew";

const days = Array.from({ length: 31 }, (_, index) => index + 1);

export default function CrewAvailabilityBoard() {
  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      <div className="flex flex-wrap justify-between gap-4 mb-6">
        <div>
          <p className="text-sm uppercase font-bold text-[#007DB8]">
            Crew Scheduling
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            Crew Availability Board
          </h1>
          <p className="text-slate-500 mt-1">
            Pilot availability, scheduled flights, training, and upcoming expiration awareness.
          </p>
        </div>

        <button className="rounded-xl bg-[#0066D6] text-white px-5 py-3 font-bold">
          Add Crew Hold
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-5">
        <div className="overflow-x-auto rounded-3xl border border-slate-200 p-4">
          <div className="min-w-[1000px]">
            <div className="grid grid-cols-[170px_repeat(31,minmax(30px,1fr))] gap-1 mb-2">
              <div />
              {days.map((day) => (
                <div key={day} className="text-center text-xs font-bold text-slate-500">
                  {day}
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {crewMembers.map((member) => (
                <div
                  key={member.id}
                  className="grid grid-cols-[170px_repeat(31,minmax(30px,1fr))] gap-1"
                >
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                    <p className="font-bold text-slate-900">{member.name}</p>
                    <p className="text-xs text-slate-500">{member.role}</p>
                    <span className={getStatusClass(member.status)}>
                      {member.status}
                    </span>
                  </div>

                  {days.map((day) => {
                    const assignment = crewAvailability.find(
                      (entry) => entry.day === day && entry.crew === member.name
                    );

                    return (
                      <div
                        key={`${member.id}-${day}`}
                        className="min-h-[82px] rounded-xl border border-slate-100 bg-white p-1"
                      >
                        {assignment && (
                          <div className={getAssignmentClass(assignment.type)}>
                            <p className="font-bold">{assignment.label}</p>
                            <p>{assignment.type}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          {crewMembers.map((member) => (
            <div
              key={member.id}
              className="rounded-3xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-slate-900">{member.name}</h2>
                  <p className="text-sm text-slate-500">{member.role}</p>
                </div>
                <span className={getStatusClass(member.status)}>
                  {member.status}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <Info label="Medical" value={`Expires ${member.medicalExpires}`} />
                <Info label="Passport" value={`Expires ${member.passportExpires}`} />
                <Info label="Training" value={member.training} />
              </div>

              <p className="text-sm text-slate-500 mt-4">{member.notes}</p>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2">
      <span className="font-bold text-[#0066D6]">{label}</span>
      <span className="text-slate-700 text-right">{value}</span>
    </div>
  );
}

function getStatusClass(status: string) {
  if (status === "Available") {
    return "inline-block mt-3 rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-bold";
  }

  if (status === "Training") {
    return "inline-block mt-3 rounded-full bg-teal-100 text-teal-700 px-3 py-1 text-xs font-bold";
  }

  return "inline-block mt-3 rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-bold";
}

function getAssignmentClass(type: string) {
  if (type === "Training") {
    return "h-full rounded-lg border border-teal-300 bg-teal-50 text-teal-700 p-2 text-xs";
  }

  return "h-full rounded-lg border border-blue-300 bg-blue-50 text-blue-700 p-2 text-xs";
}
