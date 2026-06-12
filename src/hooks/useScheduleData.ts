"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Flight } from "../types/flight";
import { calendarHolds } from "../data/events";

type AircraftRow = {
  id: string;
  tail_number: string;
  model: string;
  color: "blue" | "green" | "orange";
};

type FlightRow = {
  id: string;
  aircraft_id: string | null;
  flight_date: string;
  status: "Confirmed" | "Tentative" | "Draft" | "Canceled";
  owner_onboard: boolean;
  departure_time: string | null;
  flight_time: string | null;
  origin: string | null;
  destination: string | null;
  notes: string | null;
};

type LegRow = {
  id: string;
  flight_id: string;
  leg_order: number;
  origin: string;
  destination: string;
  departure_time: string | null;
  arrival_time: string | null;
  passenger_names: string[] | null;
  crew_names: string[] | null;
  fbo_name: string | null;
  fbo_location: string | null;
  fbo_phone: string | null;
  fuel_name?: string | null;
  fuel_location?: string | null;
  fuel_phone?: string | null;
  passenger_hotel?: string | null;
  passenger_car?: string | null;
  passenger_catering?: string | null;
  passenger_notes?: string | null;
  crew_hotel?: string | null;
  crew_car?: string | null;
  crew_catering?: string | null;
  crew_notes?: string | null;
};

function getDayFromDate(date: string) {
  return new Date(`${date}T12:00:00`).getDate();
}

function formatTime(time?: string | null) {
  if (!time) return "";
  return time.slice(0, 5);
}

export function useScheduleData() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadFlights() {
    setLoading(true);
    setError(null);

    const [flightResult, aircraftResult, legResult] = await Promise.all([
      supabase.from("flights").select("*").order("flight_date", { ascending: true }),
      supabase.from("aircraft").select("*"),
      supabase.from("flight_legs").select("*").order("leg_order", { ascending: true }),
    ]);

    if (flightResult.error) {
      setError(flightResult.error.message);
      setLoading(false);
      return;
    }

    if (aircraftResult.error) {
      setError(aircraftResult.error.message);
      setLoading(false);
      return;
    }

    if (legResult.error) {
      setError(legResult.error.message);
      setLoading(false);
      return;
    }

    const flightRows = (flightResult.data || []) as FlightRow[];
    const aircraftRows = (aircraftResult.data || []) as AircraftRow[];
    const legRows = (legResult.data || []) as LegRow[];

    const mappedFlights: Flight[] = flightRows.map((flight, index) => {
      const aircraft =
        aircraftRows.find((item) => item.id === flight.aircraft_id) || {
          tail_number: "TBD",
          model: "Aircraft TBD",
          color: "blue" as const,
        };

      const legsForFlight = legRows.filter((leg) => leg.flight_id === flight.id);

      const mappedLegs = legsForFlight.map((leg) => ({
        id: leg.leg_order,
        from: leg.origin,
        to: leg.destination,
        departureTime: formatTime(leg.departure_time),
        arrivalTime: formatTime(leg.arrival_time),
        passengers: leg.passenger_names || [],
        crew: leg.crew_names || [],
        fbo: {
          name: leg.fbo_name || undefined,
          location: leg.fbo_location || undefined,
          phone: leg.fbo_phone || undefined,
        },
        fuel: {
          name: leg.fuel_name || undefined,
          location: leg.fuel_location || undefined,
          phone: leg.fuel_phone || undefined,
        },
        passengerHotel: leg.passenger_hotel ? { name: leg.passenger_hotel } : undefined,
        passengerCar: leg.passenger_car ? { name: leg.passenger_car } : undefined,
        passengerCatering: leg.passenger_catering ? { name: leg.passenger_catering } : undefined,
        passengerNotes: leg.passenger_notes || undefined,
        crewHotel: leg.crew_hotel ? { name: leg.crew_hotel } : undefined,
        crewCar: leg.crew_car ? { name: leg.crew_car } : undefined,
        crewCatering: leg.crew_catering ? { name: leg.crew_catering } : undefined,
        crewNotes: leg.crew_notes || undefined,
      }));

      const firstLeg = mappedLegs[0];

      return {
        id: index + 1,
        dbId: flight.id,
        date: flight.flight_date,
        day: getDayFromDate(flight.flight_date),
        status: flight.status || "Confirmed",
        ownerOnboard: flight.owner_onboard,
        aircraft: {
          tail: aircraft.tail_number,
          model: aircraft.model,
          color: aircraft.color,
        },
        departureTime: formatTime(flight.departure_time) || firstLeg?.departureTime || "",
        flightTime: flight.flight_time || undefined,
        route: {
          from: flight.origin || firstLeg?.from || "",
          to: flight.destination || firstLeg?.to || "",
        },
        legs: mappedLegs,
        crew: firstLeg?.crew || [],
        passengers: firstLeg?.passengers || [],
        fbo: firstLeg?.fbo?.name
          ? {
              name: firstLeg.fbo.name,
              airport: firstLeg.fbo.location || "",
              phone: firstLeg.fbo.phone,
            }
          : undefined,
        hotel: firstLeg?.passengerHotel?.name ? { name: firstLeg.passengerHotel.name } : undefined,
        rentalCar: firstLeg?.passengerCar?.name ? { company: firstLeg.passengerCar.name } : undefined,
        catering: firstLeg?.passengerCatering?.name ? { vendor: firstLeg.passengerCatering.name } : undefined,
        notes: flight.notes || undefined,
      };
    });

    setFlights(mappedFlights);
    setLoading(false);
  }

  useEffect(() => {
    loadFlights();
  }, []);

  return {
    flights,
    holds: calendarHolds,
    loading,
    error,
    reload: loadFlights,
  };
}
