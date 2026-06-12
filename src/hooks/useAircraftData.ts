"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type AircraftOption = {
  id: string;
  tail_number: string;
  model: string;
  color: "blue" | "green" | "orange";
  status: string | null;
};

export function useAircraftData() {
  const [aircraft, setAircraft] = useState<AircraftOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAircraft() {
      const { data } = await supabase
        .from("aircraft")
        .select("*")
        .order("tail_number", { ascending: true });

      setAircraft((data || []) as AircraftOption[]);
      setLoading(false);
    }

    loadAircraft();
  }, []);

  return { aircraft, loading };
}
