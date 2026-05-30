import { Users, Fuel, Hotel, Car, Utensils } from "lucide-react";
import {
  passengers,
  fbos,
  hotels,
  rentalCars,
  cateringVendors,
} from "../../data/library";

export default function LibraryOverview() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <LibrarySection
        title="Frequent Passengers"
        icon={Users}
        items={passengers.map((item) => ({
          title: item.name,
          subtitle: item.role || "Passenger",
          detail: item.preferences || "",
          badge: item.vip ? "★ Owner" : undefined,
        }))}
      />

      <LibrarySection
        title="FBO Directory"
        icon={Fuel}
        items={fbos.map((item) => ({
          title: `${item.name} ${item.airport}`,
          subtitle: item.phone,
          detail: item.address,
          badge: item.preferred ? "Preferred" : undefined,
        }))}
      />

      <LibrarySection
        title="Saved Hotels"
        icon={Hotel}
        items={hotels.map((item) => ({
          title: item.name,
          subtitle: item.airport,
          detail: item.notes || item.phone || "",
          badge: item.preferred ? "Preferred" : undefined,
        }))}
      />

      <LibrarySection
        title="Rental Cars"
        icon={Car}
        items={rentalCars.map((item) => ({
          title: item.company,
          subtitle: item.airport,
          detail: item.vehiclePreference || item.notes || "",
          badge: item.preferred ? "Preferred" : undefined,
        }))}
      />

      <LibrarySection
        title="Catering Vendors"
        icon={Utensils}
        items={cateringVendors.map((item) => ({
          title: item.vendor,
          subtitle: item.airport,
          detail: item.notes || item.phone || "",
          badge: item.preferred ? "Preferred" : undefined,
        }))}
      />
    </div>
  );
}

function LibrarySection({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: React.ElementType;
  items: {
    title: string;
    subtitle: string;
    detail: string;
    badge?: string;
  }[];
}) {
  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-11 w-11 rounded-2xl bg-blue-50 flex items-center justify-center">
          <Icon size={21} className="text-[#0066D6]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500">{items.length} saved records</p>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={`${title}-${item.title}-${item.subtitle}`}
            className="rounded-2xl border border-slate-200 p-4 hover:bg-slate-50 transition"
          >
            <div className="flex justify-between gap-3">
              <div>
                <p className="font-bold text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-500">{item.subtitle}</p>
              </div>
              {item.badge && (
                <span className="h-fit rounded-full bg-blue-50 text-[#0066D6] px-3 py-1 text-xs font-bold">
                  {item.badge}
                </span>
              )}
            </div>
            {item.detail && (
              <p className="text-sm text-slate-500 mt-3">{item.detail}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
