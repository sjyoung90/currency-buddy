"use client";

import { useRef } from "react";
import { useCharacterStore } from "../store/character-store";

export function Character({ children }: { children?: React.ReactNode }) {
  const { x, y, setPosition } = useCharacterStore();
  const dragging = useRef<{ offsetX: number; offsetY: number } | null>(null);

  return (
    <div
      className="fixed z-50 cursor-grab select-none rounded-2xl bg-white/90 p-3 shadow-lg backdrop-blur active:cursor-grabbing"
      style={{ left: x, top: y }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        dragging.current = {
          offsetX: e.clientX - x,
          offsetY: e.clientY - y,
        };
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        setPosition(
          e.clientX - dragging.current.offsetX,
          e.clientY - dragging.current.offsetY,
        );
      }}
      onPointerUp={() => {
        dragging.current = null;
      }}
    >
      {children ?? <span className="text-2xl">🐣</span>}
    </div>
  );
}
