"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const FREE_FAVORITE_LIMIT = 3;

type PreferencesState = {
  base: string;
  favorites: string[];
  setBase: (code: string) => void;
  toggleFavorite: (code: string) => void;
};

export const usePreferences = create<PreferencesState>()(
  persist(
    (set) => ({
      base: "USD",
      favorites: ["KRW", "JPY", "EUR"],
      setBase: (code) =>
        set((state) => ({
          base: code,
          favorites: state.favorites.filter((c) => c !== code),
        })),
      toggleFavorite: (code) =>
        set((state) => {
          if (state.favorites.includes(code)) {
            return { favorites: state.favorites.filter((c) => c !== code) };
          }
          if (state.favorites.length >= FREE_FAVORITE_LIMIT) {
            return state;
          }
          return { favorites: [...state.favorites, code] };
        }),
    }),
    { name: "currency-buddy-preferences" },
  ),
);
