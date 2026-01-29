"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

type ScriptStep = {
  cmd: string;
  out: string[];
};

export function TerminalCard({ className }: { className?: string }) {
  const script = useMemo<ScriptStep[]>(
    () => [
      {
        cmd: "whoami",
        out: ["Your Name — software developer", "Specialty: UI engineering + product build"]
      },
      {
        cmd: "cat ./signals.txt",
        out: ["• fast shipping", "• clean architecture", "• motion with purpose", "• pixel-level polish"]
      },
      {
        cmd: "ls ./recent-projects",
        out: ["atlas-ui/", "relay-analytics/", "prism-notes/", "edge-commerce/"]
      },
      {
        cmd: "echo \"Let’s build something.\"",
        out: ["Let’s build something."]
      }
    ],
    []
  );

  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    const timeouts: number[] = [];

    const current = script[step];
    setTyped("");
    setLines([]);

    const type = (i: number) => {
      if (cancelled) return;
      setTyped(current.cmd.slice(0, i));
      if (i <= current.cmd.length) {
        const delay = 22 + Math.random() * 26;
        timeouts.push(window.setTimeout(() => type(i + 1), delay));
      } else {
        // Reveal outputs
        current.out.forEach((line, idx) => {
          timeouts.push(
            window.setTimeout(() => {
              if (!cancelled) setLines((prev) => [...prev, line]);
            }, 180 + idx * 150)
          );
        });

        // Next step
        timeouts.push(
          window.setTimeout(() => {
            if (!cancelled) setStep((s) => (s + 1) % script.length);
          }, 180 + current.out.length * 150 + 1100)
        );
      }
    };

    timeouts.push(window.setTimeout(() => type(1), 300));

    return () => {
      cancelled = true;
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, [script, step]);

  return (
    <div className={cn("gradient-border rounded-2xl", className)}>
      <div className="glass relative rounded-2xl px-4 py-4 shadow-glow">
        <div className="flex items-center justify-between border-b border-border/70 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          </div>
          <div className="font-mono text-[11px] text-muted">kinetic://terminal</div>
        </div>

        <div className="mt-3 font-mono text-sm">
          <div className="text-muted">
            <span className="text-accent">$</span> {typed}
            <span className="ml-1 inline-block w-[10px] animate-pulse text-accent">▍</span>
          </div>

          <div className="mt-3 space-y-1">
            {lines.map((l, idx) => (
              <div key={idx} className="text-fg/90">
                {l}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-border/70 bg-bg/40 px-3 py-2 text-xs text-muted">
          Tip: press <span className="font-mono">⌘K</span> to jump around.
        </div>
      </div>
    </div>
  );
}
