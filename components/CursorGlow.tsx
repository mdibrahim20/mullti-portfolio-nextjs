"use client";

import { useEffect } from "react";

export function CursorGlow() {
  useEffect(() => {
    const root = document.documentElement;

    const onMove = (e: PointerEvent) => {
      root.style.setProperty("--mx", `${e.clientX}px`);
      root.style.setProperty("--my", `${e.clientY}px`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(900px circle at var(--mx) var(--my), rgb(var(--accent) / 0.12), transparent 55%), radial-gradient(700px circle at calc(var(--mx) + 120px) calc(var(--my) + 140px), rgb(var(--accent2) / 0.10), transparent 60%)"
      }}
    />
  );
}
