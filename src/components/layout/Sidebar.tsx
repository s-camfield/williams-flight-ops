"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Plane, Send, FileText, Users, Wrench, MoreHorizontal } from "lucide-react";

const mainItems = [
  { label: "Schedule", icon: CalendarDays, href: "/dashboard" },
  { label: "Add Trip", icon: Plane, href: "/new-flight" },
  { label: "Requests", icon: Send, href: "/requests" },
  { label: "Trip Sheet", icon: FileText, href: "/trip-sheet" },
  { label: "People", icon: Users, href: "/personnel" },
  { label: "Maintenance", icon: Wrench, href: "/maintenance-tracking" },
];

const moreItems = [
  { label: "Aircraft Timeline", href: "/aircraft-timeline" },
  { label: "Crew Availability", href: "/crew-availability" },
  { label: "Libraries", href: "/libraries" },
  { label: "Reports", href: "/reports" },
  { label: "Training", href: "/training" },
  { label: "Major Events", href: "/major-events" },
];

export default function Sidebar() {
  return (
    <aside className="w-[240px] min-h-screen bg-[#062A55] text-white flex flex-col justify-between">
      <div>
        <div className="p-5 border-b border-white/10">
          <Image src="/flight-opp.webp" alt="Williams Flight Department" width={220} height={100} style={{ width: "100%", height: "auto" }} priority />
        </div>

        <nav className="p-3 space-y-2">
          {mainItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href} className="w-full flex items-center gap-3 rounded-2xl px-4 py-4 text-base text-left transition text-white/90 hover:bg-white/10">
                <Icon size={21} />
                <span className="font-bold">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mx-3 mt-4 rounded-3xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-2 px-2 py-2 text-sm font-bold text-white/70">
            <MoreHorizontal size={18} />
            More
          </div>

          <div className="mt-1 space-y-1">
            {moreItems.map((item) => (
              <Link key={item.label} href={item.href} className="block rounded-xl px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 border-t border-white/10">
        <Link href="/owner-request" className="mb-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0066D6] px-4 py-4 font-bold text-white shadow-lg">
          <Send size={18} />
          Flight Request
        </Link>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#007DB8] flex items-center justify-center font-bold">FO</div>
          <div>
            <p className="text-sm font-semibold">Flight Ops</p>
            <p className="text-xs text-white/60">Simple Mode</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
