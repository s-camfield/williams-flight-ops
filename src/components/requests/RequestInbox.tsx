import { Mail, MessageSquare, UserRound } from "lucide-react";
import { notificationRecipients, ownerFlightRequests } from "../../data/requests";

export default function RequestInbox() {
  return (
    <div className="space-y-5">
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-wrap justify-between gap-4 mb-6">
          <div>
            <p className="text-sm uppercase font-bold text-[#007DB8]">Owner Requests</p>
            <h1 className="text-3xl font-bold text-slate-900">Flight Request Inbox</h1>
            <p className="text-slate-500 mt-1">Requests submitted from the simplified owner app view.</p>
          </div>
          <span className="rounded-full bg-amber-100 text-amber-700 px-4 py-2 text-sm font-bold h-fit">
            {ownerFlightRequests.length} New
          </span>
        </div>

        <div className="space-y-4">
          {ownerFlightRequests.map((request) => (
            <div key={request.id} className="rounded-3xl border border-slate-200 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[#0066D6] font-bold">
                    <UserRound size={18} /> {request.requestedBy}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mt-2">{request.destination}</h2>
                  <p className="text-slate-500 mt-1">{request.preferredDate} at {request.preferredTime}</p>
                </div>
                <span className="rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-bold">{request.status}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
                <Info label="Aircraft" value={request.aircraftPreference} />
                <Info label="Notes" value={request.notes || "None"} />
                <Info label="Created" value={request.createdAt} />
              </div>

              <div className="flex flex-wrap gap-3 mt-5">
                <button className="rounded-xl bg-[#0066D6] text-white px-5 py-3 font-bold">Create Trip</button>
                <button className="rounded-xl border border-slate-200 px-5 py-3 font-bold">Mark Reviewed</button>
                <button className="rounded-xl border border-slate-200 px-5 py-3 font-bold">Contact Owner</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-2xl font-bold text-slate-900">Notification Recipients</h2>
        <p className="text-slate-500 mt-1">Adam, Joel, and Gina should be notified when GGW submits a request.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {notificationRecipients.map((recipient) => (
            <div key={recipient.name} className="rounded-3xl border border-slate-200 p-5">
              <h3 className="text-xl font-bold text-slate-900">{recipient.name}</h3>
              <p className="text-sm text-slate-500">{recipient.role}</p>
              <div className="mt-4 space-y-2">
                <NotifyRow icon={Mail} label="Email" enabled={recipient.notifyByEmail} />
                <NotifyRow icon={MessageSquare} label="Text" enabled={recipient.notifyByText} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-5 text-sm text-slate-600">
          Email/text sending will be wired after database/auth. Email can use Resend or Microsoft Graph. Text typically needs Twilio or another SMS provider.
        </div>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase font-bold text-slate-400">{label}</p><p className="font-bold text-slate-800 mt-1">{value}</p></div>;
}

function NotifyRow({ icon: Icon, label, enabled }: { icon: React.ElementType; label: string; enabled: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
      <span className="flex items-center gap-2 font-bold text-[#0066D6]"><Icon size={16} /> {label}</span>
      <span className={enabled ? "text-green-600 font-bold" : "text-slate-400"}>{enabled ? "On" : "Off"}</span>
    </div>
  );
}
