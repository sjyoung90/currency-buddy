"use client";

import { Character } from "@/features/character/components/Character";
import { useRates } from "@/features/exchange-rate/hooks/use-rates";

export default function Home() {
  const { data, isLoading, error } = useRates("USD", ["KRW", "JPY", "EUR"]);

  return (
    <main className="flex flex-1 items-center justify-center p-8">
      <Character>
        <div className="min-w-40 text-sm">
          <div className="mb-1 font-semibold">USD 기준</div>
          {isLoading && <div>불러오는 중…</div>}
          {error && <div className="text-red-500">에러</div>}
          {data && (
            <ul className="space-y-0.5">
              {Object.entries(data.rates).map(([code, rate]) => (
                <li key={code}>
                  {code}: {rate.toFixed(2)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Character>
    </main>
  );
}
