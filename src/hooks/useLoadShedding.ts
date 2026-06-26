"use client";

import { useState, useEffect } from "react";

interface LoadSheddingInfo {
  stage: number;
  current: boolean;
  nextSlots: { start: string; end: string }[];
  area: string;
}

export function useLoadShedding() {
  const [info, setInfo] = useState<LoadSheddingInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLoadShedding() {
      try {
        const res = await fetch("/api/loadshedding");
        const data = await res.json();
        setInfo(data);
      } catch {
        setInfo({
          stage: 0,
          current: false,
          nextSlots: [],
          area: "Fourways, Sandton",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchLoadShedding();
    const interval = setInterval(fetchLoadShedding, 300000);
    return () => clearInterval(interval);
  }, []);

  return { info, loading };
}
