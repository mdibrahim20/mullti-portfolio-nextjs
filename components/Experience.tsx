"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode, Key } from "react";

type ExperienceItem = {
  title: string;
  org: string;
  location?: string;
  period: string;
  tags?: (string | number)[];
  bullets: string[];
};

type Star = { cx: number; cy: number; r: number; o: number };

// Deterministic PRNG (avoids hydration mismatch)
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const stars: Star[] = (() => {
  const rand = mulberry32(1337);
  return Array.from({ length: 26 }).map(() => ({
    cx: rand() * 800,
    cy: rand() * 520,
    r: rand() * 2.2 + 0.6,
    o: rand() * 0.65 + 0.15
  }));
})();

export function Experience({
  experience = [],
  experienceData
}: {
  experience: ExperienceItem[];
  experienceData?: {
    eyebrow: string;
    title: string;
    description: string;
  } | null;
}) {
  const sectionData = experienceData || {
    eyebrow: '04 • Experience',
    title: 'A trail of shipped work.',
    description: 'Roles and chapters that shaped my style: systems thinking, craft, and delivery.',
  };

  return (
    <section id="experience" className="scroll-mt-28">
      <SectionHeader
        eyebrow={sectionData.eyebrow}
        title={sectionData.title}
        desc={sectionData.description}
      />

      <div className="relative">
        {/* Vertical line */}
        <div className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-border/80 sm:block" />

        <div className="space-y-5">
          {experience.map((item, idx) => (
            <Reveal key={item.period + item.title} delay={idx * 0.05}>
              <div className="relative rounded-2xl border border-border/80 bg-card/70 p-5 shadow-sm backdrop-blur sm:pl-12">
                {/* Node */}
                <div className="absolute left-[9px] top-6 hidden h-3.5 w-3.5 rounded-full border border-border bg-bg shadow-sm sm:block">
                  <div className="absolute inset-0 rounded-full bg-accent/35 blur-[6px]" />
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold tracking-tight">
                      {item.title}{" "}
                      <span className="text-muted font-medium">
                        • {item.org}
                        {item.location ? ` • ${item.location}` : ""}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-muted font-mono">{item.period}</div>
                  </div>

                  {(item.tags?.length ?? 0) > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {(item.tags || [])
                        .filter((t): t is string | number => typeof t === "string" || typeof t === "number")
                        .map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-border/70 bg-bg/50 px-3 py-1 text-xs text-muted"
                          >
                            {t}
                          </span>
                        ))}
                    </div>
                  ) : null}

                </div>

                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent2" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* A subtle "constellation" overlay */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14] dark:opacity-[0.12]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.14 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
        >
          <svg viewBox="0 0 800 520" className="h-full w-full">
            <g fill="rgb(var(--accent))">
              {stars.map((s, i) => (
                <circle key={i} cx={s.cx} cy={s.cy} r={s.r} opacity={s.o} />
              ))}
            </g>
            <g stroke="rgb(var(--accent2))" strokeWidth="1" opacity="0.25">
              <path d="M80 120 L180 200 L320 170 L420 260 L560 210 L700 310" fill="none" />
              <path d="M120 380 L220 320 L360 410 L520 360 L660 430" fill="none" />
            </g>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
