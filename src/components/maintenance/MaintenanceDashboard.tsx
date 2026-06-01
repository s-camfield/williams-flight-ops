import { Plane, Wrench, AlertTriangle, CalendarDays } from "lucide-react";
import { maintenanceRecords } from "../../data/maintenance";
import { aircraft } from "../../data/aircraft";

export default function MaintenanceDashboard() {
  return (
    <div className="space-y-5">
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Stat icon={Plane} label="Aircraft" value={`${aircraft.length}`} />
        <Stat icon={Wrench} label="Maintenance Items" value={`${maintenanceRecords.length}`} />
        <Stat icon={AlertTriangle} label="Due Soon" value="1" />
        <Stat icon={CalendarDays} label="Protected Holds" value="1" />
      </section>

      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-wrap justify-between gap-4 mb-6">
          <div>
            <p className="text-sm uppercase font-bold text-[#007DB8]">Maintenance</p>
            <h1 className="text-3xl font-bold text-slate-900">Maintenance Tracking</h1>
            <p className="text-slate-500 mt-1">
              Aircraft status, upcoming due items, protected maintenance windows, and conflict awareness.
            </p>
          </div>

          <button className="rounded-xl bg-[#0066D6] text-white px-5 py-3 font-bold">
            Add Maintenance Item
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {maintenanceRecords.map((record) => (
            <div key={record.id} className="rounded-3xl border border-slate-200 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm uppercase font-bold text-slate-400">{record.aircraftTail}</p>
                  <h2 className="text-xl font-bold text-slate-900">{record.title}</h2>
                </div>
                <span className={getStatusClass(record.status)}>{record.status}</span>
              </div>

              <div className="mt-5 space-y-3">
                <Info label="Due Date" value={record.dueDate} />
                <Info label="Hours Remaining" value={record.estimatedHoursRemaining ? `${record.estimatedHoursRemaining} hrs` : "N/A"} />
              </div>

              <div className="mt-5">
                <p className="text-sm font-bold text-slate-700 mb-2">Maintenance Window Risk</p>
                <div className="h-4 rounded-full bg-slate-100 overflow-hidden">
                  <div className={getProgressClass(record.status)} style={{ width: record.status === "Due Soon" ? "82%" : "35%" }} />
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-500">{record.notes}</p>
            </div>
          ))}
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
      <span className="font-semibold text-slate-700">{value}</span>
    </div>
  );
}

function getStatusClass(status: string) {
  if (status === "Due Soon") return "rounded-full bg-amber-100 text-amber-700 px-3 py-1 text-xs font-bold";
  if (status === "In Maintenance" || status === "Grounded") return "rounded-full bg-red-100 text-red-700 px-3 py-1 text-xs font-bold";
  return "rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-bold";
}

function getProgressClass(status: string) {
  if (status === "Due Soon") return "h-full bg-amber-500";
  if (status === "In Maintenance" || status === "Grounded") return "h-full bg-red-500";
  return "h-full bg-green-500";
}
