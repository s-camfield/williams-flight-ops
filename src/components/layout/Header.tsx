import { Bell, ChevronDown, Search, ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="h-[78px] bg-white border-b border-slate-200 flex items-center justify-between px-7">
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Flight Department Scheduler
        </h1>
        <p className="text-sm text-slate-500">
          Scheduling, Crew, Maintenance & Trip Planning
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden md:flex items-center gap-2 border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium">
          All Aircraft <ChevronDown size={16} />
        </button>

        <div className="hidden lg:flex items-center gap-2 border border-slate-200 rounded-xl px-4 py-2 w-[360px]">
          <Search size={17} className="text-slate-400" />
          <input
            placeholder="Search flights, tail #, airport..."
            className="w-full outline-none text-sm"
          />
        </div>

        <div className="hidden xl:flex items-center gap-2 text-sm text-slate-600">
          <ShieldCheck size={18} className="text-[#007DB8]" />
          IT Review Mode
        </div>

        <div className="relative">
          <Bell size={22} className="text-slate-700" />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </div>
      </div>
    </header>
  );
}