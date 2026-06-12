"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  CalendarDays,
  Car,
  ChevronDown,
  ChevronUp,
  Clock,
  Fuel,
  Hotel,
  Plane,
  Plus,
  Save,
  Trash2,
  Utensils,
  Users,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useAircraftData } from "../../hooks/useAircraftData";
import { useCrewData } from "../../hooks/useCrewData";
import AirportField from "./AirportField";

type DraftLeg = {
  id: number;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
};

type TravelGroup = {
  hotel: string;
  saveHotel: boolean;
  rentalCar: string;
  saveRentalCar: boolean;
  catering: string;
  saveCatering: boolean;
  fboFuel: string;
  saveFboFuel: boolean;
  notes: string;
};

const fallbackCrew = [
  { id: "fallback-carson", name: "Carson", role: "Pilot" },
  { id: "fallback-adam", name: "Adam Smith", role: "Pilot" },
  { id: "fallback-bill", name: "Bill", role: "Pilot" },
  { id: "fallback-don", name: "Don", role: "Pilot" },
  { id: "fallback-joel", name: "Joel Camfield", role: "Pilot" },
  { id: "fallback-olivia", name: "Olivia", role: "Flight Attendant / Owner Assistant" },
];

const blankTravelGroup: TravelGroup = {
  hotel: "",
  saveHotel: false,
  rentalCar: "",
  saveRentalCar: false,
  catering: "",
  saveCatering: false,
  fboFuel: "",
  saveFboFuel: false,
  notes: "",
};

export default function NewFlightForm() {
  const router = useRouter();
  const { aircraft, loading: aircraftLoading } = useAircraftData();
  const { crew, loading: crewLoading } = useCrewData();

  const crewOptions = crew.length > 0 ? crew : fallbackCrew;

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [aircraftId, setAircraftId] = useState("");
  const [flightDate, setFlightDate] = useState(new Date().toISOString().slice(0, 10));
  const [ownerMode, setOwnerMode] = useState("Outbound and return");
  const [excludeCrewFromTripSheet, setExcludeCrewFromTripSheet] = useState(false);
  const [notes, setNotes] = useState("");

  const [legs, setLegs] = useState<DraftLeg[]>([
    { id: 1, origin: "", destination: "", departureTime: "", arrivalTime: "" },
  ]);

  const [passengersOpen, setPassengersOpen] = useState(true);
  const [crewOpen, setCrewOpen] = useState(true);

  const [selectedPassenger, setSelectedPassenger] = useState("Guest Passenger");
  const [selectedPassengers, setSelectedPassengers] = useState<string[]>([]);
  const [passengerTravel, setPassengerTravel] = useState<TravelGroup>(blankTravelGroup);

  const [showNewPassenger, setShowNewPassenger] = useState(false);
  const [newPassengerName, setNewPassengerName] = useState("");
  const [newPassengerFavorite, setNewPassengerFavorite] = useState(true);

  const [selectedCrewMember, setSelectedCrewMember] = useState("");
  const [selectedCrew, setSelectedCrew] = useState<string[]>([]);
  const [crewTravel, setCrewTravel] = useState<TravelGroup>(blankTravelGroup);

  const activeAircraftId = aircraftId || aircraft[0]?.id || "";
  const ownerOnboard = ownerMode !== "Not onboard";

  function updateLeg(id: number, field: keyof DraftLeg, value: string) {
    setLegs((current) => current.map((leg) => (leg.id === id ? { ...leg, [field]: value } : leg)));
  }

  function addLeg() {
    const lastLeg = legs[legs.length - 1];

    setLegs((current) => [
      ...current,
      {
        id: Date.now(),
        origin: lastLeg?.destination || "",
        destination: "",
        departureTime: "",
        arrivalTime: "",
      },
    ]);
  }

  function removeLeg(id: number) {
    if (legs.length === 1) return;
    setLegs((current) => current.filter((leg) => leg.id !== id));
  }

  function addPassenger() {
    if (selectedPassenger === "add-new") {
      setShowNewPassenger(true);
      return;
    }

    if (!selectedPassenger) return;

    if (!selectedPassengers.includes(selectedPassenger)) {
      setSelectedPassengers((current) => [...current, selectedPassenger]);
    }
  }

  function removePassenger(name: string) {
    setSelectedPassengers((current) => current.filter((passenger) => passenger !== name));
  }

  function addCrew() {
    if (!selectedCrewMember) return;

    if (!selectedCrew.includes(selectedCrewMember)) {
      setSelectedCrew((current) => [...current, selectedCrewMember]);
    }
  }

  function removeCrew(name: string) {
    setSelectedCrew((current) => current.filter((member) => member !== name));
  }

  function updatePassengerTravel(field: keyof TravelGroup, value: string | boolean) {
    setPassengerTravel((current) => ({ ...current, [field]: value }));
  }

  function updateCrewTravel(field: keyof TravelGroup, value: string | boolean) {
    setCrewTravel((current) => ({ ...current, [field]: value }));
  }

  async function saveNewPassenger() {
    const cleanName = newPassengerName.trim();

    if (!cleanName) {
      setMessage("Add a passenger name first.");
      return;
    }

    if (newPassengerFavorite) {
      const { error } = await supabase.from("passengers").insert({
        name: cleanName,
        initials: cleanName.split(" ").map((part) => part[0]).join("").toUpperCase().slice(0, 3),
        role: "Passenger",
        is_favorite: true,
        is_owner: false,
      });

      if (error) {
        setMessage(`Passenger save error: ${error.message}`);
        return;
      }
    }

    setSelectedPassengers((current) => (current.includes(cleanName) ? current : [...current, cleanName]));
    setNewPassengerName("");
    setShowNewPassenger(false);
    setMessage("Passenger added.");
  }

  async function saveLibraryItems(group: TravelGroup, type: "passenger" | "crew") {
    const airport = legs[0]?.destination || null;

    if (group.saveHotel && group.hotel.trim()) {
      await supabase.from("hotels").insert({
        name: group.hotel.trim(),
        airport,
        notes: `${type} hotel`,
      });
    }

    if (group.saveRentalCar && group.rentalCar.trim()) {
      await supabase.from("rental_cars").insert({
        company: group.rentalCar.trim(),
        airport,
        notes: `${type} rental car`,
      });
    }

    if (group.saveCatering && group.catering.trim()) {
      await supabase.from("catering_vendors").insert({
        vendor: group.catering.trim(),
        airport,
        notes: `${type} catering`,
      });
    }

    if (group.saveFboFuel && group.fboFuel.trim()) {
      await supabase.from("fbos").insert({
        name: group.fboFuel.trim(),
        airport,
        phone: null,
        notes: `${type} FBO/fuel`,
      });
    }
  }

  function groupSummary(group: TravelGroup) {
    return [
      `Hotel: ${group.hotel || "TBD"}`,
      `Car: ${group.rentalCar || "TBD"}`,
      `Catering: ${group.catering || "TBD"}`,
      group.fboFuel ? `FBO/Fuel: ${group.fboFuel}` : "",
      group.notes ? `Notes: ${group.notes}` : "",
    ]
      .filter(Boolean)
      .join(" | ");
  }

  async function saveTrip() {
    setSaving(true);
    setMessage("");

    if (!activeAircraftId) {
      setMessage("Select an aircraft first.");
      setSaving(false);
      return;
    }

    if (!legs[0]?.origin || !legs[0]?.destination || !legs[0]?.departureTime) {
      setMessage("Add origin, destination, and departure time for Leg 1.");
      setSaving(false);
      return;
    }

    if (selectedCrew.length === 0) {
      setMessage("Add at least one pilot or crew member.");
      setSaving(false);
      return;
    }

    const firstLeg = legs[0];
    const lastLeg = legs[legs.length - 1];

    const { data: flightData, error: flightError } = await supabase
      .from("flights")
      .insert({
        aircraft_id: activeAircraftId,
        flight_date: flightDate,
        status: "Confirmed",
        owner_onboard: ownerOnboard,
        departure_time: firstLeg.departureTime,
        origin: firstLeg.origin,
        destination: lastLeg.destination || firstLeg.destination,
        notes: [notes, excludeCrewFromTripSheet ? "Exclude flight crew from trip sheet." : ""].filter(Boolean).join("\\n"),
      })
      .select("id")
      .single();

    if (flightError || !flightData) {
      setMessage(`Flight save error: ${flightError?.message || "No flight returned."}`);
      setSaving(false);
      return;
    }

    const legRows = legs.map((leg, index) => ({
      flight_id: flightData.id,
      leg_order: index + 1,
      origin: leg.origin,
      destination: leg.destination,
      departure_time: leg.departureTime || null,
      arrival_time: leg.arrivalTime || null,
      passenger_names: selectedPassengers,
      crew_names: excludeCrewFromTripSheet ? [] : selectedCrew,
      fbo_name: crewTravel.fboFuel || null,
      fbo_location: leg.destination || null,
      fbo_phone: null,
      fuel_name: crewTravel.fboFuel || null,
      fuel_location: leg.destination || null,
      fuel_phone: null,
      passenger_hotel: passengerTravel.hotel || null,
      passenger_car: passengerTravel.rentalCar || null,
      passenger_catering: passengerTravel.catering || null,
      passenger_notes: groupSummary(passengerTravel) || null,
      crew_hotel: crewTravel.hotel || null,
      crew_car: crewTravel.rentalCar || null,
      crew_catering: crewTravel.catering || null,
      crew_notes: groupSummary(crewTravel) || null,
    }));

    const { error: legError } = await supabase.from("flight_legs").insert(legRows);

    if (legError) {
      setMessage(`Leg save error: ${legError.message}`);
      setSaving(false);
      return;
    }

    await saveLibraryItems(passengerTravel, "passenger");
    await saveLibraryItems(crewTravel, "crew");

    setMessage("Trip saved. Go back to Schedule to see it on the calendar.");
    setSaving(false);
  }

  function previewTripSheet() {
    router.push("/trip-sheet");
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-5">
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="mb-6">
          <p className="text-sm uppercase font-bold text-[#007DB8]">Create Trip</p>
          <h1 className="text-3xl font-bold text-slate-900">New Flight</h1>
          <p className="text-slate-500 mt-1">Add a confirmed trip directly to the schedule.</p>
        </div>

        {message && (
          <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-700">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Field label="Aircraft" icon={Plane}>
            <select value={activeAircraftId} onChange={(event) => setAircraftId(event.target.value)} className="input" disabled={aircraftLoading}>
              {aircraft.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.tail_number} · {item.model}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Date" icon={CalendarDays}>
            <input type="date" value={flightDate} onChange={(event) => setFlightDate(event.target.value)} className="input" />
          </Field>
        </div>

        <section className="mt-8 rounded-3xl border border-slate-200 p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Departure Info</h2>
              <p className="text-sm text-slate-500">Each stop can be added as its own leg.</p>
            </div>

            <button type="button" onClick={addLeg} className="rounded-xl bg-[#0066D6] px-4 py-3 font-bold text-white flex items-center gap-2">
              <Plus size={18} />
              Add Leg
            </button>
          </div>

          <div className="space-y-4">
            {legs.map((leg, index) => (
              <div key={leg.id} className="rounded-3xl bg-slate-50 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900">Leg {index + 1}</h3>

                  {legs.length > 1 && (
                    <button type="button" onClick={() => removeLeg(leg.id)} className="rounded-xl border border-red-200 px-3 py-2 text-sm font-bold text-red-600 flex items-center gap-2">
                      <Trash2 size={16} />
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <AirportField label="Origin" value={leg.origin} onChange={(value) => updateLeg(leg.id, "origin", value)} />
                  <AirportField label="Destination" value={leg.destination} onChange={(value) => updateLeg(leg.id, "destination", value)} />

                  <Field label="Departure Time" icon={Clock}>
                    <input type="time" value={leg.departureTime} onChange={(event) => updateLeg(leg.id, "departureTime", event.target.value)} className="input" />
                  </Field>

                  <Field label="Arrival Time" icon={Clock}>
                    <input type="time" value={leg.arrivalTime} onChange={(event) => updateLeg(leg.id, "arrivalTime", event.target.value)} className="input" />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 p-5 bg-blue-50/40">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">GGW</h2>
              <p className="text-sm text-slate-500">Choose whether GGW is onboard this trip or only one direction.</p>
            </div>
            <div className="bg-[#062A55] text-white rounded-full px-5 py-3 font-bold flex gap-2 items-center">
              <span className="text-amber-400">★</span> GGW
            </div>
          </div>

          <select value={ownerMode} onChange={(event) => setOwnerMode(event.target.value)} className="input bg-white">
            <option>Outbound and return</option>
            <option>Outbound only / drop-off</option>
            <option>Return only / pick-up</option>
            <option>Not onboard</option>
          </select>
        </section>

        <TravelGroupSection
          title="Passengers"
          description="List passengers once, then add one hotel, rental car, catering, and notes section for the group."
          open={passengersOpen}
          setOpen={setPassengersOpen}
          selectValue={selectedPassenger}
          setSelectValue={setSelectedPassenger}
          loading={false}
          options={[
            { value: "Guest Passenger", label: "Guest Passenger" },
          ]}
          addLabel="Add Passenger"
          addPerson={addPassenger}
          people={selectedPassengers}
          removePerson={removePassenger}
          group={passengerTravel}
          updateGroup={updatePassengerTravel}
          showFboFuel={false}
          onAddNewPerson={() => setShowNewPassenger(true)}
        />

        {showNewPassenger && (
          <section className="mt-4 rounded-3xl border border-slate-200 bg-white p-5">
            <h2 className="text-xl font-bold text-slate-900">Add New Passenger</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
              <input className="input" placeholder="New passenger name" value={newPassengerName} onChange={(event) => setNewPassengerName(event.target.value)} />
              <button type="button" onClick={saveNewPassenger} className="rounded-xl bg-[#0066D6] px-5 py-3 font-bold text-white">
                Save Passenger
              </button>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 md:col-span-2">
                <input type="checkbox" checked={newPassengerFavorite} onChange={(event) => setNewPassengerFavorite(event.target.checked)} />
                Save to passenger list dropdown
              </label>
            </div>
          </section>
        )}

        <TravelGroupSection
          title="Flight Crew"
          description="List crew once, then add one shared hotel, rental car, catering, FBO/fuel, and notes section for the crew."
          open={crewOpen}
          setOpen={setCrewOpen}
          selectValue={selectedCrewMember}
          setSelectValue={setSelectedCrewMember}
          loading={crewLoading && crewOptions.length === 0}
          options={[
            { value: "", label: "Select crew member" },
            ...crewOptions.map((member) => ({ value: member.name, label: `${member.name} · ${member.role}` })),
          ]}
          addLabel="Add Crew"
          addPerson={addCrew}
          people={selectedCrew}
          removePerson={removeCrew}
          group={crewTravel}
          updateGroup={updateCrewTravel}
          showFboFuel
        />

        <label className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700">
          <input
            type="checkbox"
            checked={excludeCrewFromTripSheet}
            onChange={(event) => setExcludeCrewFromTripSheet(event.target.checked)}
          />
          Exclude flight crew from trip sheet
        </label>

        <div className="mt-8">
          <label className="text-sm font-bold text-slate-700">Trip Notes</label>
          <textarea className="input mt-2 min-h-[120px]" placeholder="Trip notes, release notes, special handling..." value={notes} onChange={(event) => setNotes(event.target.value)} />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={saveTrip} disabled={saving} className="bg-[#0066D6] text-white rounded-xl px-6 py-3 font-bold flex items-center gap-2 disabled:opacity-60">
            <Save size={18} />
            {saving ? "Saving..." : "Save Trip"}
          </button>

          <button type="button" onClick={addLeg} className="border border-slate-200 rounded-xl px-6 py-3 font-bold flex items-center gap-2">
            <Plus size={18} />
            Add Leg
          </button>

          <button type="button" onClick={previewTripSheet} className="border border-slate-200 rounded-xl px-6 py-3 font-bold">
            Preview Trip Sheet
          </button>
        </div>
      </section>

      <aside className="space-y-5">
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900">Testing Notes</h2>
          <p className="text-sm text-slate-600 mt-3 leading-6">
            Passenger and crew travel info is now entered once per group, not once per person.
          </p>
        </section>
      </aside>
    </div>
  );
}

function TravelGroupSection({
  title,
  description,
  open,
  setOpen,
  selectValue,
  setSelectValue,
  loading,
  options,
  addLabel,
  addPerson,
  people,
  removePerson,
  group,
  updateGroup,
  showFboFuel,
  onAddNewPerson,
}: {
  title: string;
  description: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectValue: string;
  setSelectValue: (value: string) => void;
  loading: boolean;
  options: { value: string; label: string }[];
  addLabel: string;
  addPerson: () => void;
  people: string[];
  removePerson: (name: string) => void;
  group: TravelGroup;
  updateGroup: (field: keyof TravelGroup, value: string | boolean) => void;
  showFboFuel: boolean;
  onAddNewPerson?: () => void;
}) {
  return (
    <section className="mt-8 rounded-3xl border border-slate-200 p-5">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="mb-4 flex w-full items-start justify-between gap-4 text-left"
      >
        <div>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
        <span className="rounded-full bg-slate-50 p-2">
          {open ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
        </span>
      </button>

      {open && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
            <select value={selectValue} onChange={(event) => setSelectValue(event.target.value)} className="input" disabled={loading}>
              {options.map((option) => (
                <option key={`${title}-${option.value}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button type="button" onClick={addPerson} className="rounded-xl bg-[#0066D6] px-5 py-3 font-bold text-white flex items-center justify-center gap-2">
              <Users size={18} />
              {addLabel}
            </button>
          </div>

          {onAddNewPerson && (
            <button
              type="button"
              onClick={onAddNewPerson}
              className="mt-3 w-full rounded-xl border border-[#0066D6] bg-white px-5 py-3 font-bold text-[#0066D6]"
            >
              + Add New Passenger
            </button>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {people.map((person) => (
              <button
                type="button"
                key={person}
                onClick={() => removePerson(person)}
                className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-[#0066D6]"
              >
                {person} ×
              </button>
            ))}

            {people.length === 0 && (
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500 w-full">
                Nothing added yet.
              </div>
            )}
          </div>

          <div className="mt-5 rounded-3xl bg-slate-50 p-4">
            <h3 className="mb-4 text-lg font-bold text-slate-900">{title} Travel Details</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <TravelInput
                icon={Hotel}
                placeholder="Hotel / location staying"
                value={group.hotel}
                onChange={(value) => updateGroup("hotel", value)}
                saveValue={group.saveHotel}
                onSaveChange={(value) => updateGroup("saveHotel", value)}
                saveLabel="Save hotel to library"
              />

              <TravelInput
                icon={Car}
                placeholder="Rental car / pickup location"
                value={group.rentalCar}
                onChange={(value) => updateGroup("rentalCar", value)}
                saveValue={group.saveRentalCar}
                onSaveChange={(value) => updateGroup("saveRentalCar", value)}
                saveLabel="Save rental car to library"
              />

              <TravelInput
                icon={Utensils}
                placeholder="Catering / meals"
                value={group.catering}
                onChange={(value) => updateGroup("catering", value)}
                saveValue={group.saveCatering}
                onSaveChange={(value) => updateGroup("saveCatering", value)}
                saveLabel="Save catering to library"
              />

              {showFboFuel && (
                <TravelInput
                  icon={Fuel}
                  placeholder="FBO / fuel"
                  value={group.fboFuel}
                  onChange={(value) => updateGroup("fboFuel", value)}
                  saveValue={group.saveFboFuel}
                  onSaveChange={(value) => updateGroup("saveFboFuel", value)}
                  saveLabel="Save FBO/fuel to library"
                />
              )}

              <div className="lg:col-span-2">
                <div className="flex items-start gap-3 rounded-2xl bg-white p-3">
                  <Building2 size={20} className="mt-3 text-[#0066D6]" />
                  <textarea
                    className="min-h-[90px] w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0066D6]"
                    placeholder="Notes"
                    value={group.notes}
                    onChange={(event) => updateGroup("notes", event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function TravelInput({
  icon: Icon,
  placeholder,
  value,
  onChange,
  saveValue,
  onSaveChange,
  saveLabel,
}: {
  icon: React.ElementType;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  saveValue: boolean;
  onSaveChange: (value: boolean) => void;
  saveLabel: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-3">
      <div className="flex items-center gap-3">
        <Icon size={20} className="text-[#0066D6]" />
        <input
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0066D6]"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>

      <label className="mt-2 flex items-center gap-2 pl-8 text-xs font-bold text-slate-500">
        <input type="checkbox" checked={saveValue} onChange={(event) => onSaveChange(event.target.checked)} />
        {saveLabel}
      </label>
    </div>
  );
}

function Field({ label, icon: Icon, children }: { label: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <label>
      <div className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
        <Icon size={17} className="text-[#0066D6]" />
        {label}
      </div>
      {children}
    </label>
  );
}
