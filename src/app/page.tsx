"use client";

import { Character } from "@/features/character/components/Character";
import { useRates } from "@/features/exchange-rate/hooks/use-rates";
import { usePreferences } from "@/features/preferences/store/preferences-store";
import { CURRENCY_BY_CODE } from "@/shared/config/currencies";

export default function Home() {
  const base = usePreferences((s) => s.base);
  const favorites = usePreferences((s) => s.favorites);
  const { data, isLoading, error } = useRates(base, favorites);
  const baseInfo = CURRENCY_BY_CODE[base];

  return (
    <main className="flex flex-1 items-center justify-center p-8">
      <Character>
        <div className="min-w-40 text-sm">
          <div className="mb-1 font-semibold">
            {baseInfo?.flag} {base} 기준
          </div>
          {favorites.length === 0 ? (
            <div className="text-gray-500">
              캐릭터를 클릭해서 통화를 추가하세요
            </div>
          ) : (
            <>
              {isLoading && <div>불러오는 중…</div>}
              {error && <div className="text-red-500">에러</div>}
              {data && (
                <ul className="space-y-0.5">
                  {Object.entries(data.rates).map(([code, rate]) => (
                    <li key={code}>
                      {CURRENCY_BY_CODE[code]?.flag ?? ""} {code}:{" "}
                      {rate.toFixed(2)}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </Character>
    </main>
  );
}
