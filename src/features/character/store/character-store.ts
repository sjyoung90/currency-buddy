"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type CharacterState = {
  x: number;
  y: number;
  setPosition: (x: number, y: number) => void;
};

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set) => ({
      x: 100,
      y: 100,
      setPosition: (x, y) => set({ x, y }),
    }),
    { name: "character-position" },
  ),
);
