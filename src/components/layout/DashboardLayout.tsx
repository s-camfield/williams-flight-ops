import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-100 flex">
      <Sidebar />

      <section className="flex-1 min-w-0">
        <Header />
        <div className="p-5">{children}</div>
      </section>
    </main>
  );
}
