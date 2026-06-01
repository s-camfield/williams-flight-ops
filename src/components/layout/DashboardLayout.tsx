import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileBottomNav from "./MobileBottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-100 lg:flex">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <section className="min-w-0 flex-1 pb-24 lg:pb-0">
        <Header />
        <div className="p-3 sm:p-5">{children}</div>
      </section>

      <MobileBottomNav />
    </main>
  );
}
