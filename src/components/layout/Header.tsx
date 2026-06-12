"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";

function getPageTitle(pathname: string) {
  if (pathname.includes("new-flight")) return "Add Trip";
  if (pathname.includes("edit-flight")) return "Edit Trip";
  if (pathname.includes("requests") || pathname.includes("owner-request")) return "Request";
  if (pathname.includes("trip-sheet")) return "Trip";
  if (pathname.includes("personnel")) return "People";
  if (pathname.includes("maintenance")) return "Maintenance";
  return "Schedule";
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex min-h-[88px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm lg:hidden"
            aria-label="Go back"
          >
            <ArrowLeft size={25} />
          </button>

          <div className="min-w-0">
            <p className="truncate text-sm font-black uppercase tracking-wide text-[#007DB8]">
              Williams Int. Flight Dept.
            </p>
            <h1 className="truncate text-3xl font-black text-slate-900">
              {getPageTitle(pathname)}
            </h1>
          </div>
        </div>

        <Link
          href="/requests"
          className="flex shrink-0 items-center gap-2 rounded-2xl bg-[#0066D6] px-5 py-4 text-lg font-black text-white shadow-md"
        >
          <Send size={25} />
          Request
        </Link>
      </div>
    </header>
  );
}
