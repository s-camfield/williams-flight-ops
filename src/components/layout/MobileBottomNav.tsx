"use client";

import Link from "next/link";
import { CalendarDays, Plane, Send, UserRound } from "lucide-react";

const items = [
  { label: "Schedule", href: "/dashboard", icon: CalendarDays },
  { label: "Request", href: "/owner-request", icon: Send, primary: true },
  { label: "Trip", href: "/trip-sheet", icon: Plane },
  { label: "People", href: "/personnel", icon: UserRound },
];

export default function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white lg:hidden">
      <div className="grid grid-cols-4 px-2 py-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-xs font-bold text-slate-600"
            >
              <span
                className={
                  item.primary
                    ? "h-12 w-12 rounded-full bg-[#0066D6] text-white flex items-center justify-center shadow-lg -mt-7"
                    : "h-8 w-8 flex items-center justify-center"
                }
              >
                <Icon size={item.primary ? 24 : 20} />
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
