"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { usePassengerData } from "../../hooks/usePassengerData";

export default function PassengerSelector() {
  const { passengers, loading } = usePassengerData();
  const [selectedPassengers, setSelectedPassengers] = useState<string[]>(["GGW"]);
  const [selectedPassenger, setSelectedPassenger] = useState("GGW");
  const [showNewPassenger, setShowNewPassenger] = useState(false);

  function addPassenger() {
    if (selectedPassenger === "add-new") {
      setShowNewPassenger(true);
      return;
    }

    if (!selectedPassengers.includes(selectedPassenger)) {
      setSelectedPassengers([...selectedPassengers, selectedPassenger]);
    }
  }

  function removePassenger(name: string) {
    setSelectedPassengers(selectedPassengers.filter((passenger) => passenger !== name));
  }

  return (
    <section className="rounded-3xl border border-slate-200 p-5">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">Passengers</h2>
        <p className="text-sm text-slate-500">Select a favorite passenger, add them to the trip, or add someone new.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
        <select value={selectedPassenger} onChange={(event) => setSelectedPassenger(event.target.value)} className="input" disabled={loading}>
          <option value="GGW">GGW</option>
          {passengers.filter((passenger) => passenger.name !== "GGW").map((passenger) => (
            <option key={passenger.id} value={passenger.name}>{passenger.name}</option>
          ))}
          <option value="add-new">+ Add New Passenger</option>
        </select>

        <button type="button" onClick={addPassenger} className="rounded-xl bg-[#0066D6] px-5 py-3 font-bold text-white flex items-center justify-center gap-2">
          <Plus size={18} />
          Select / Add
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {selectedPassengers.map((passenger) => (
          <span key={passenger} className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-[#0066D6]">
            {passenger === "GGW" ? "★ GGW" : passenger}
            <button type="button" onClick={() => removePassenger(passenger)} className="rounded-full bg-white p-1 text-slate-500">
              <X size={13} />
            </button>
          </span>
        ))}
      </div>

      {showNewPassenger && (
        <div className="mt-4 rounded-2xl bg-slate-50 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="input bg-white" placeholder="Passenger name" />
          <input className="input bg-white" placeholder="Phone / contact optional" />
          <input className="input bg-white md:col-span-2" placeholder="Notes / preferences" />
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700"><input type="checkbox" /> Favorite passenger / show in dropdown</label>
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700"><input type="checkbox" defaultChecked /> Save passenger in system</label>
        </div>
      )}
    </section>
  );
}
