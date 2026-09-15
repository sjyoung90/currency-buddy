"use client";

import { useRef, useState } from "react";
import { useCharacterStore } from "../store/character-store";
import { CurrencyPicker } from "@/features/preferences/components/CurrencyPicker";

const DRAG_THRESHOLD_PX = 5;

type DragState = {
  offsetX: number;
  offsetY: number;
  startX: number;
  startY: number;
  moved: boolean;
};

export function Character({ children }: { children?: React.ReactNode }) {
  const { x, y, setPosition } = useCharacterStore();
  const [pickerOpen, setPickerOpen] = useState(false);
  const dragging = useRef<DragState | null>(null);

  return (
    <>
      <div
        className="fixed z-50 cursor-grab select-none rounded-2xl bg-white/90 p-3 shadow-lg backdrop-blur active:cursor-grabbing"
        style={{ left: x, top: y }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          dragging.current = {
            offsetX: e.clientX - x,
            offsetY: e.clientY - y,
            startX: e.clientX,
            startY: e.clientY,
            moved: false,
          };
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return;
          const dx = e.clientX - dragging.current.startX;
          const dy = e.clientY - dragging.current.startY;
          if (
            !dragging.current.moved &&
            Math.hypot(dx, dy) > DRAG_THRESHOLD_PX
          ) {
            dragging.current.moved = true;
          }
          if (dragging.current.moved) {
            setPosition(
              e.clientX - dragging.current.offsetX,
              e.clientY - dragging.current.offsetY,
            );
          }
        }}
        onPointerUp={() => {
          if (dragging.current && !dragging.current.moved) {
            setPickerOpen(true);
          }
          dragging.current = null;
        }}
      >
        {children ?? <span className="text-2xl">🐣</span>}
      </div>
      <CurrencyPicker open={pickerOpen} onClose={() => setPickerOpen(false)} />
    </>
  );
}
