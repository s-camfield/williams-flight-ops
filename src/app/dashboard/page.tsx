"use client";

import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import FlightCalendar from "../../components/calendar/FlightCalendar";
import SelectedFlightPanel from "../../components/flights/SelectedFlightPanel";
import AircraftStatusBar from "../../components/aircraft/AircraftStatusBar";
import { flights } from "../../data/flights";
import { calendarHolds } from "../../data/events";

export default function DashboardPage() {
  const [selectedFlight, setSelectedFlight] = useState(flights[0]);

  return (
    <DashboardLayout>
      <div className="hidden lg:block">
        <div className="mb-5">
          <h2 className="text-3xl font-bold text-slate-900">Schedule</h2>
          <p className="text-slate-500 mt-1">
            Main flight calendar with aircraft, owner, maintenance, and training visibility.
          </p>
        </div>
        <AircraftStatusBar />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_520px] gap-5">
        <FlightCalendar
          flights={flights}
          holds={calendarHolds}
          selectedFlightId={selectedFlight.id}
          onSelectFlight={setSelectedFlight}
        />

        <div className="hidden xl:block">
          <SelectedFlightPanel flight={selectedFlight} />
        </div>
      </div>
    </DashboardLayout>
  );
}
