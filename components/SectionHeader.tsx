"use client";

import { cn } from "@/lib/cn";
import { Reveal } from "@/components/Reveal";

export function SectionHeader({
  eyebrow,
  title,
  desc,
  className
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-8", className)}>
      <Reveal>
        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-3 py-1 text-xs text-muted shadow-sm backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-mono tracking-wide">{eyebrow}</span>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      </Reveal>

      {desc ? (
        <Reveal delay={0.1}>
          <p className="mt-3 max-w-2xl text-muted">{desc}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
