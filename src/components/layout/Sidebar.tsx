"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Plane, Users, MapPin, Hotel, Car, Utensils, Wrench, GraduationCap, Star, BarChart3, FileText, Settings, Route, Printer, Send } from "lucide-react";

const navItems = [
  { label: "Calendar", icon: CalendarDays, href: "/dashboard" },
  { label: "Owner Requests", icon: Send, href: "/requests" },
  { label: "Aircraft Timeline", icon: Route, href: "/aircraft-timeline" },
  { label: "Trip Sheet", icon: Printer, href: "/trip-sheet" },
  { label: "New Flight", icon: Plane, href: "/new-flight" },
  { label: "Edit Flight", icon: FileText, href: "/edit-flight" },
  { label: "Personnel", icon: Users, href: "/personnel" },
  { label: "Crew Availability", icon: Users, href: "/crew-availability" },
  { label: "Libraries", icon: Users, href: "/libraries" },
  { label: "Maintenance Tracking", icon: Wrench, href: "/maintenance-tracking" },
  { label: "Training", icon: GraduationCap, href: "/training" },
  { label: "Major Events", icon: Star, href: "/major-events" },
  { label: "Reports", icon: BarChart3, href: "/reports" },
  { label: "Settings", icon: Settings, href: "/dashboard" },
];

export default function Sidebar() {
  return (
    <aside className="w-[230px] min-h-screen bg-[#062A55] text-white flex flex-col justify-between">
      <div>
        <div className="p-5 border-b border-white/10">
          <Image src="/flight-opp.webp" alt="Williams Flight Department" width={220} height={100} style={{ width: "100%", height: "auto" }} priority />
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href} className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-left transition text-white/85 hover:bg-white/10">
                <Icon size={19} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-5 border-t border-white/10">
        <Link href="/owner-request" className="mb-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0066D6] px-4 py-3 font-bold text-white shadow-lg">
          <Send size={18} /> Owner Request
        </Link>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#007DB8] flex items-center justify-center font-bold">FO</div>
          <div>
            <p className="text-sm font-semibold">Flight Ops</p>
            <p className="text-xs text-white/60">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
