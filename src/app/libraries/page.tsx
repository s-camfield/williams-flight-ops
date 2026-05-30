import DashboardLayout from "../../components/layout/DashboardLayout";
import LibraryOverview from "../../components/library/LibraryOverview";

export default function LibrariesPage() {
  return (
    <DashboardLayout>
      <div className="mb-5">
        <p className="text-sm uppercase font-bold text-[#007DB8]">
          Saved Resources
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          Passenger & Vendor Libraries
        </h1>
        <p className="text-slate-500 mt-1">
          Saved passengers, FBOs, hotels, rental cars, and catering vendors for frequent trips.
        </p>
      </div>

      <LibraryOverview />
    </DashboardLayout>
  );
}
