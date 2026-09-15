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
        className="fixed z-50 flex select-none flex-col items-center"
        style={{ left: x, top: y, cursor: dragging.current ? "grabbing" : "grab" }}
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
        {children && (
          <div className="relative mb-5 rounded-2xl bg-white px-4 py-3 text-gray-900 shadow-xl">
            {children}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: "-8px",
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "8px solid white",
              }}
              aria-hidden
            />
          </div>
        )}
        <span className="text-5xl drop-shadow-md" aria-label="캐릭터">
          🐣
        </span>
      </div>
      <CurrencyPicker open={pickerOpen} onClose={() => setPickerOpen(false)} />
    </>
  );
}
