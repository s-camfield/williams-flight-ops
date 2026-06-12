"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import FlightCalendar from "../../components/calendar/FlightCalendar";
import SelectedFlightPanel from "../../components/flights/SelectedFlightPanel";
import AircraftStatusBar from "../../components/aircraft/AircraftStatusBar";
import { useScheduleData } from "../../hooks/useScheduleData";
import type { Flight } from "../../types/flight";

export default function DashboardPage() {
  const { flights, holds, loading, error } = useScheduleData();
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  useEffect(() => {
    if (flights.length > 0) {
      setSelectedFlight((current) => current || flights[0]);
    } else {
      setSelectedFlight(null);
    }
  }, [flights]);

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

      {loading && (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-500">
          Loading schedule from Supabase...
        </div>
      )}

      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-red-700">
          Supabase error: {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_520px] gap-5">
          <div>
            {flights.length === 0 && (
              <div className="mb-5 rounded-3xl border border-slate-200 bg-white p-6">
                <h2 className="text-2xl font-bold text-slate-900">No flights yet</h2>
                <p className="text-slate-500 mt-2">
                  Your calendar is ready. Add a trip or approve a request to start filling the schedule.
                </p>
              </div>
            )}

            <FlightCalendar
              flights={flights}
              holds={holds}
              selectedFlightId={selectedFlight?.id || 0}
              onSelectFlight={setSelectedFlight}
            />
          </div>

          <div className="hidden xl:block">
            {selectedFlight ? (
              <SelectedFlightPanel flight={selectedFlight} />
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900">Trip Details</h2>
                <p className="text-slate-500 mt-2">
                  Select a flight on the calendar to view details here.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
