"use client";

import { useEffect, useMemo, useState } from "react";
import { CURRENCIES } from "@/shared/config/currencies";
import {
  FREE_FAVORITE_LIMIT,
  usePreferences,
} from "../store/preferences-store";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CurrencyPicker({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const base = usePreferences((s) => s.base);
  const favorites = usePreferences((s) => s.favorites);
  const setBase = usePreferences((s) => s.setBase);
  const toggleFavorite = usePreferences((s) => s.toggleFavorite);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CURRENCIES;
    return CURRENCIES.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.nameKo.includes(query.trim()),
    );
  }, [query]);

  if (!open) return null;

  const atLimit = favorites.length >= FREE_FAVORITE_LIMIT;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 text-gray-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">통화 설정</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <label
            htmlFor="base-currency"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            기준 통화
          </label>
          <select
            id="base-currency"
            value={base}
            onChange={(e) => setBase(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code} — {c.nameKo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              즐겨찾기 ({favorites.length}/{FREE_FAVORITE_LIMIT})
            </label>
            {atLimit && (
              <span className="text-xs text-orange-600">
                무료 플랜은 최대 {FREE_FAVORITE_LIMIT}개
              </span>
            )}
          </div>
          <input
            type="text"
            placeholder="검색 (코드, 이름)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mb-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400"
          />
          <div className="max-h-64 overflow-y-auto rounded-md border border-gray-200 bg-white">
            {filtered.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                검색 결과가 없습니다
              </div>
            ) : (
              filtered.map((c) => {
                const checked = favorites.includes(c.code);
                const isBase = c.code === base;
                const disabled = isBase || (!checked && atLimit);
                return (
                  <label
                    key={c.code}
                    className={`flex items-center gap-3 border-b border-gray-100 px-3 py-2 last:border-b-0 ${
                      disabled
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked && !isBase}
                      disabled={disabled}
                      onChange={() => toggleFavorite(c.code)}
                      className="h-4 w-4 accent-blue-600"
                    />
                    <span className="text-xl">{c.flag}</span>
                    <span className="flex-1 text-sm">
                      <span className="font-medium text-gray-900">{c.code}</span>
                      <span className="ml-2 text-gray-500">{c.nameKo}</span>
                      {isBase && (
                        <span className="ml-2 text-xs text-gray-400">
                          (기준 통화)
                        </span>
                      )}
                    </span>
                  </label>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
