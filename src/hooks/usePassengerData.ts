"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type PassengerOption = {
  id: string;
  name: string;
  initials: string | null;
  role: string | null;
  is_favorite: boolean | null;
  is_owner: boolean | null;
  phone: string | null;
  email: string | null;
  preferences: string | null;
  notes: string | null;
};

export function usePassengerData() {
  const [passengers, setPassengers] = useState<PassengerOption[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPassengers() {
    const { data } = await supabase
      .from("passengers")
      .select("*")
      .or("is_favorite.eq.true,is_owner.eq.true")
      .order("is_owner", { ascending: false })
      .order("name", { ascending: true });

    setPassengers((data || []) as PassengerOption[]);
    setLoading(false);
  }

  useEffect(() => {
    loadPassengers();
  }, []);

  return { passengers, loading, reload: loadPassengers };
}
