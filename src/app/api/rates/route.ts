import { NextResponse } from "next/server";
import { fetchRates } from "@/features/exchange-rate/server/fetch-rates";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const base = searchParams.get("base") ?? "USD";
  const symbols = searchParams.get("symbols")?.split(",") ?? [];

  try {
    const data = await fetchRates(base, symbols);
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
