"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; vx: number; vy: number };

function readRgbVar(varName: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const parts = raw.split(/\s+/).map((n) => Number(n));
  if (parts.length >= 3 && parts.every((n) => Number.isFinite(n))) return [parts[0], parts[1], parts[2]];
  return [120, 120, 255];
}

export function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const state = {
      w: 0,
      h: 0,
      dpr: 1,
      points: [] as Point[],
      accent: [99, 102, 241] as [number, number, number],
      border: [39, 39, 42] as [number, number, number],
      pointer: { x: -9999, y: -9999 }
    };

    const resize = () => {
      state.dpr = Math.min(2, window.devicePixelRatio || 1);
      state.w = window.innerWidth;
      state.h = window.innerHeight;
      canvas.width = Math.floor(state.w * state.dpr);
      canvas.height = Math.floor(state.h * state.dpr);
      canvas.style.width = `${state.w}px`;
      canvas.style.height = `${state.h}px`;
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    };

    const seedPoints = () => {
      const count = Math.max(34, Math.round((state.w * state.h) / 50000));
      state.points = Array.from({ length: count }).map(() => ({
        x: Math.random() * state.w,
        y: Math.random() * state.h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35
      }));
    };

    const updateColors = () => {
      state.accent = readRgbVar("--accent");
      state.border = readRgbVar("--border");
    };

    const onPointer = (e: PointerEvent) => {
      state.pointer.x = e.clientX;
      state.pointer.y = e.clientY;
    };

    const onLeave = () => {
      state.pointer.x = -9999;
      state.pointer.y = -9999;
    };

    const draw = () => {
      const { w, h, points, pointer } = state;
      ctx.clearRect(0, 0, w, h);

      // Background fade (keeps it soft)
      ctx.fillStyle = `rgba(${state.border[0]}, ${state.border[1]}, ${state.border[2]}, 0.10)`;
      ctx.fillRect(0, 0, w, h);

      const maxDist = 140;
      const maxDist2 = maxDist * maxDist;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Pointer repulsion (very subtle)
        const dxp = p.x - pointer.x;
        const dyp = p.y - pointer.y;
        const dp2 = dxp * dxp + dyp * dyp;
        if (dp2 < 220 * 220) {
          const f = (1 - dp2 / (220 * 220)) * 0.015;
          p.vx += (dxp / (Math.sqrt(dp2) + 0.001)) * f;
          p.vy += (dyp / (Math.sqrt(dp2) + 0.001)) * f;
        }

        // Damping
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Bounds
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // Connections
        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist2) {
            const t = 1 - d2 / maxDist2;
            ctx.strokeStyle = `rgba(${state.accent[0]}, ${state.accent[1]}, ${state.accent[2]}, ${
              t * 0.18
            })`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // Points
      for (const p of points) {
        ctx.fillStyle = `rgba(${state.accent[0]}, ${state.accent[1]}, ${state.accent[2]}, 0.35)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    seedPoints();
    updateColors();

    // Watch theme changes (class toggles on <html>)
    const mo = new MutationObserver(() => updateColors());
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("resize", () => {
      resize();
      seedPoints();
    });
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });

    if (!prefersReduced) {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      mo.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 -z-10 opacity-50" />;
}
