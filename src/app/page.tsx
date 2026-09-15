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
        <div className="min-w-44 text-sm">
          <div className="mb-1.5 flex items-center gap-1 font-semibold text-gray-900">
            <span>{baseInfo?.flag}</span>
            <span>{base} 기준</span>
          </div>
          {favorites.length === 0 ? (
            <div className="text-gray-500">
              캐릭터를 클릭해서 통화를 추가하세요
            </div>
          ) : (
            <>
              {isLoading && <div className="text-gray-600">불러오는 중…</div>}
              {error && <div className="text-red-600">불러오기 실패</div>}
              {data && (
                <ul className="space-y-1">
                  {favorites.map((code) => {
                    const rate = data.rates[code];
                    if (rate === undefined) return null;
                    return (
                      <li
                        key={code}
                        className="flex items-center justify-between gap-3 text-gray-800"
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{CURRENCY_BY_CODE[code]?.flag ?? ""}</span>
                          <span className="font-medium">{code}</span>
                        </span>
                        <span className="tabular-nums">{rate.toFixed(2)}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}
        </div>
      </Character>
    </main>
  );
}
