import "server-only";

const FRANKFURTER_BASE_URL = "https://api.frankfurter.dev/v1";

export type ExchangeRates = {
  base: string;
  date: string;
  rates: Record<string, number>;
};

export async function fetchRates(
  base: string,
  symbols: string[],
): Promise<ExchangeRates> {
  const url = new URL(`${FRANKFURTER_BASE_URL}/latest`);
  url.searchParams.set("base", base);
  if (symbols.length > 0) {
    url.searchParams.set("symbols", symbols.join(","));
  }

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch rates: ${res.status}`);
  }

  return res.json();
}
