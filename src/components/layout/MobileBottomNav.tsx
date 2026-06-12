"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, FileText, Plane, Send } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Schedule", icon: CalendarDays },
  { href: "/new-flight", label: "Add Trip", icon: Plane },
  { href: "/requests", label: "Request", icon: Send },
  { href: "/trip-sheet", label: "Trip", icon: FileText },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-4 border-t border-slate-200 bg-white px-2 py-2 lg:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-xs font-black ${
              active ? "bg-blue-50 text-[#0066D6]" : "text-slate-500"
            }`}
          >
            <Icon size={24} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
