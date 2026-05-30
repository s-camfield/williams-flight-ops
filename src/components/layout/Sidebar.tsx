"use client";

import Image from "next/image";
import {
  CalendarDays,
  Plane,
  Users,
  MapPin,
  Hotel,
  Car,
  Utensils,
  Wrench,
  GraduationCap,
  Star,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Calendar", icon: CalendarDays, active: true },
  { label: "New Flight", icon: Plane },
  { label: "Aircraft", icon: Plane },
  { label: "Crew", icon: Users },
  { label: "Passengers", icon: Users },
  { label: "FBOs", icon: MapPin },
  { label: "Hotels", icon: Hotel },
  { label: "Cars", icon: Car },
  { label: "Catering", icon: Utensils },
  { label: "Maintenance", icon: Wrench },
  { label: "Training", icon: GraduationCap },
  { label: "Major Events", icon: Star },
  { label: "Reports", icon: BarChart3 },
  { label: "Documents", icon: FileText },
  { label: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-[230px] min-h-screen bg-[#062A55] text-white flex flex-col justify-between">
      <div>
        <div className="p-5 border-b border-white/10">
          <Image
            src="/flight-opp.webp"
            alt="Williams Flight Department"
            width={220}
            height={100}
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-left transition ${
                  item.active
                    ? "bg-[#007DB8] text-white shadow"
                    : "text-white/85 hover:bg-white/10"
                }`}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-5 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#007DB8] flex items-center justify-center font-bold">
            FO
          </div>
          <div>
            <p className="text-sm font-semibold">Flight Ops</p>
            <p className="text-xs text-white/60">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
