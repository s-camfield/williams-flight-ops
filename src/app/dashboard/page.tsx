import DashboardLayout from "../../components/layout/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Williams Flight Department Scheduler
        </h1>
        <p className="text-slate-500 mt-2">
          Dashboard shell is working. Calendar build comes next.
        </p>
      </div>
    </DashboardLayout>
  );
}