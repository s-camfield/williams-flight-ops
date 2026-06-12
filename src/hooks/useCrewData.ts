"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type CrewOption = {
  id: string;
  name: string;
  role: string;
  phone: string | null;
  email: string | null;
  notes: string | null;
};

export function useCrewData() {
  const [crew, setCrew] = useState<CrewOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCrew() {
      const { data } = await supabase
        .from("crew")
        .select("id, name, role, phone, email, notes")
        .order("name", { ascending: true });

      setCrew((data || []) as CrewOption[]);
      setLoading(false);
    }

    loadCrew();
  }, []);

  return { crew, loading };
}
