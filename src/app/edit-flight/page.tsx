import { Suspense } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import EditFlightForm from "../../components/flights/EditFlightForm";

export default function EditFlightPage() {
  return (
    <DashboardLayout>
      <Suspense
        fallback={
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-500">
            Loading trip editor...
          </div>
        }
      >
        <EditFlightForm />
      </Suspense>
    </DashboardLayout>
  );
}