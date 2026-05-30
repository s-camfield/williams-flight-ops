"use client";

import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import FlightCalendar from "../../components/calendar/FlightCalendar";
import SelectedFlightPanel from "../../components/flights/SelectedFlightPanel";
import { flights } from "../../data/flights";
import { calendarHolds } from "../../data/events";

export default function DashboardPage() {
  const [selectedFlight, setSelectedFlight] = useState(flights[0]);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_560px] gap-5">
        <FlightCalendar
          flights={flights}
          holds={calendarHolds}
          selectedFlightId={selectedFlight.id}
          onSelectFlight={setSelectedFlight}
        />

        <SelectedFlightPanel flight={selectedFlight} />
      </div>
    </DashboardLayout>
  );
}
