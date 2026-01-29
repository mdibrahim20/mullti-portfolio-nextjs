"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

export function Magnetic({
  children,
  className,
  strength = 14
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = `translate3d(0px, 0px, 0)`;
      }}
      style={{ transition: "transform 250ms ease" }}
    >
      {children}
    </div>
  );
}
