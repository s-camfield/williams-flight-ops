"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Bell, CalendarDays, Plane, Search, Send } from "lucide-react";

function getTitle(pathname: string) {
  if (pathname === "/dashboard") return "Schedule";
  if (pathname === "/new-flight") return "Add Trip";
  if (pathname === "/owner-request") return "Request Flight";
  if (pathname === "/trip-sheet") return "Trip Sheet";
  if (pathname === "/personnel") return "People";
  if (pathname === "/requests") return "Requests";
  if (pathname === "/maintenance-tracking") return "Maintenance";
  return "Flight Ops";
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="hidden lg:flex h-[78px] items-center justify-between px-7">
        <div>
          <p className="text-xs uppercase font-bold text-[#007DB8]">Williams Flight Department</p>
          <h1 className="text-2xl font-bold text-slate-900">{getTitle(pathname)}</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
            <CalendarDays size={18} />
            Schedule
          </Link>

          <Link href="/new-flight" className="flex items-center gap-2 rounded-2xl bg-[#0066D6] px-5 py-3 text-sm font-bold text-white shadow">
            <Plane size={18} />
            Add Trip
          </Link>

          <Link href="/owner-request" className="flex items-center gap-2 rounded-2xl bg-[#062A55] px-5 py-3 text-sm font-bold text-white shadow">
            <Send size={18} />
            Request
          </Link>

          <div className="hidden xl:flex items-center gap-2 border border-slate-200 rounded-2xl px-4 py-3 w-[280px] bg-white">
            <Search size={17} className="text-slate-400" />
            <input placeholder="Search..." className="w-full outline-none text-sm" />
          </div>

          <div className="relative ml-2">
            <Bell size={22} className="text-slate-700" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">3</span>
          </div>
        </div>
      </div>

      <div className="lg:hidden px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {!isDashboard && (
              <button type="button" onClick={() => router.back()} className="h-11 w-11 shrink-0 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-700" aria-label="Go back">
                <ArrowLeft size={20} />
              </button>
            )}

            <div className="min-w-0">
              <p className="text-xs uppercase font-bold text-[#007DB8]">Williams Flight Dept.</p>
              <h1 className="text-xl font-bold text-slate-900 truncate">{getTitle(pathname)}</h1>
            </div>
          </div>

          <Link href="/owner-request" scroll={false} className="shrink-0 rounded-2xl bg-[#0066D6] text-white px-4 py-3 font-bold flex items-center gap-2 shadow">
            <Send size={18} />
            Request
          </Link>
        </div>
      </div>
    </header>
  );
}
