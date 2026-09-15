"use client";

import { useQuery } from "@tanstack/react-query";
import type { ExchangeRates } from "../server/fetch-rates";

async function getRates(
  base: string,
  symbols: string[],
): Promise<ExchangeRates> {
  const params = new URLSearchParams({ base });
  if (symbols.length > 0) params.set("symbols", symbols.join(","));

  const res = await fetch(`/api/rates?${params}`);
  if (!res.ok) throw new Error("Failed to fetch rates");
  return res.json();
}

export function useRates(base: string, symbols: string[]) {
  return useQuery({
    queryKey: ["rates", base, symbols],
    queryFn: () => getRates(base, symbols),
    refetchInterval: 60 * 1000,
  });
}
