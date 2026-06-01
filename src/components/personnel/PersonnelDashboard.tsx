import { Users, Plane, BadgeAlert, FileWarning } from "lucide-react";
import { personnel, personnelAssignments } from "../../data/personnel";

const days = Array.from({ length: 31 }, (_, index) => index + 1);

export default function PersonnelDashboard() {
  const pilots = personnel.filter((person) => person.category === "Pilot");
  const support = personnel.filter((person) => person.category !== "Pilot");

  return (
    <div className="space-y-5">
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Stat icon={Plane} label="Pilots" value={`${pilots.length}`} />
        <Stat icon={Users} label="Support" value={`${support.length}`} />
        <Stat icon={BadgeAlert} label="Training Flags" value="1" />
        <Stat icon={FileWarning} label="Expiring Soon" value="2" />
      </section>

      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-wrap justify-between gap-4 mb-6">
          <div>
            <p className="text-sm uppercase font-bold text-[#007DB8]">
              Personnel
            </p>
            <h1 className="text-3xl font-bold text-slate-900">
              Personnel Directory
            </h1>
            <p className="text-slate-500 mt-1">
              Pilots, cabin support, owner assistant coverage, training, and expiration tracking.
            </p>
          </div>

          <button className="rounded-xl bg-[#0066D6] text-white px-5 py-3 font-bold">
            Add Personnel
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {personnel.map((person) => (
            <div key={person.id} className="rounded-3xl border border-slate-200 p-5 hover:bg-slate-50 transition">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{person.name}</h2>
                  <p className="text-sm text-slate-500">{person.role}</p>
                </div>
                <span className={getStatusClass(person.status)}>{person.status}</span>
              </div>

              <div className="mt-5 space-y-2">
                <Info label="Category" value={person.category} />
                <Info label="Medical" value={person.medicalExpires || "N/A"} />
                <Info label="Passport" value={person.passportExpires || "N/A"} />
                <Info label="Training" value={person.trainingStatus || "N/A"} />
              </div>

              {person.notes && <p className="mt-4 text-sm text-slate-500">{person.notes}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="mb-6">
          <p className="text-sm uppercase font-bold text-[#007DB8]">Availability</p>
          <h2 className="text-2xl font-bold text-slate-900">Personnel Availability Calendar</h2>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            <div className="grid grid-cols-[180px_repeat(31,minmax(30px,1fr))] gap-1 mb-2">
              <div />
              {days.map((day) => (
                <div key={day} className="text-center text-xs font-bold text-slate-500">{day}</div>
              ))}
            </div>

            <div className="space-y-3">
              {personnel.map((person) => (
                <div key={person.id} className="grid grid-cols-[180px_repeat(31,minmax(30px,1fr))] gap-1">
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                    <p className="font-bold text-slate-900">{person.name}</p>
                    <p className="text-xs text-slate-500">{person.role}</p>
                  </div>

                  {days.map((day) => {
                    const assignment = personnelAssignments.find(
                      (entry) => entry.day === day && entry.person === person.name
                    );

                    return (
                      <div key={`${person.id}-${day}`} className="min-h-[78px] rounded-xl border border-slate-100 bg-white p-1">
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
      </section>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
      <Icon size={22} className="text-[#0066D6] mb-3" />
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 flex justify-between gap-3 text-sm">
      <span className="font-bold text-[#0066D6]">{label}</span>
      <span className="font-semibold text-slate-700 text-right">{value}</span>
    </div>
  );
}

function getStatusClass(status: string) {
  if (status === "Available") return "rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-bold";
  if (status === "Training") return "rounded-full bg-teal-100 text-teal-700 px-3 py-1 text-xs font-bold";
  if (status === "Owner Trip") return "rounded-full bg-amber-100 text-amber-700 px-3 py-1 text-xs font-bold";
  return "rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-bold";
}

function getAssignmentClass(type: string) {
  if (type === "Training") return "h-full rounded-lg border border-teal-300 bg-teal-50 text-teal-700 p-2 text-xs";
  if (type === "Owner Trip") return "h-full rounded-lg border border-amber-300 bg-amber-50 text-amber-700 p-2 text-xs";
  return "h-full rounded-lg border border-blue-300 bg-blue-50 text-blue-700 p-2 text-xs";
}
