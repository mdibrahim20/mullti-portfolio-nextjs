"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail, Sparkles } from "lucide-react";

import { cn } from "@/lib/cn";
import { Magnetic } from "@/components/Magnetic";
import { TerminalCard } from "@/components/TerminalCard";

function formatLocalTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function Hero({ siteConfig, heroData }: { siteConfig: any; heroData?: any }) {
  const site = siteConfig || {
    name: "Your Name",
    role: "Software Developer",
    location: "Remote",
    description: "Building great things",
    highlights: [],
    links: {}
  };
  const hero = heroData || {
    badgeText: 'Kinetic portfolio • motion-first UI • fast',
    heading: 'I build products that feel alive',
    subheading: 'Creating exceptional digital experiences',
    ctaPrimaryText: 'View projects',
    ctaPrimaryLink: '#projects',
    ctaSecondaryText: 'Contact',
    ctaSecondaryLink: '#contact',
    commandHint: 'Press ⌘K for the command menu',
    infoCard1Title: 'ready_to_collab()',
    infoCard1Body: 'Open to freelance, contract, or full-time roles where craft matters.',
    infoCard2Title: 'shipping',
    infoCard2Body: 'I love building end-to-end: crisp UI, robust data models, and production-ready deployments.',
  };
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    setTime(formatLocalTime(new Date()));
    const t = window.setInterval(() => setTime(formatLocalTime(new Date())), 10_000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative">
      <div className="grid items-start gap-10 md:grid-cols-2 md:gap-12">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-3 py-1 text-xs text-muted shadow-sm backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="font-mono tracking-wide">{hero.badgeText}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 }}
            className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-accent via-accent2 to-accent bg-clip-text text-transparent">
                {hero.heading}
              </span>
              <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="mt-5 max-w-xl text-muted"
          >
            I&apos;m <span className="text-fg font-medium">{site.name}</span> — {hero.subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.22 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href={hero.ctaPrimaryLink}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-95"
              >
                {hero.ctaPrimaryText} <ArrowDown className="h-4 w-4" />
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href={hero.ctaSecondaryLink}
                className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/70 px-4 py-2.5 text-sm font-medium text-fg shadow-sm backdrop-blur transition hover:bg-card/90"
              >
                {hero.ctaSecondaryText} <Mail className="h-4 w-4" />
              </a>
            </Magnetic>

            <div className="ml-1 flex items-center gap-2 text-xs text-muted">
              <span className="rounded-lg border border-border/70 bg-bg/50 px-2 py-1 font-mono">
                {site.location}
              </span>
              {time ? (
                <span className="rounded-lg border border-border/70 bg-bg/50 px-2 py-1 font-mono">
                  Local {time}
                </span>
              ) : null}
            </div>
          </motion.div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {(site.highlights || []).map((h: any, idx: number) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.28 + idx * 0.06 }}
                className="rounded-2xl border border-border/80 bg-card/70 px-4 py-3 shadow-sm backdrop-blur"
              >
                <div className="text-xs text-muted">{h.label}</div>
                <div className="mt-1 text-sm font-medium tracking-tight">{h.value}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mt-8 flex items-center gap-3 text-xs text-muted"
          >
            <span className="h-px w-10 bg-border/80" />
            <span className="font-mono">{hero.commandHint}</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut", delay: 0.22 }}
          className="md:pt-2"
        >
          <TerminalCard className="md:ml-auto" />
          <div className="mt-4 grid gap-3">
            <div className="rounded-2xl border border-border/80 bg-card/70 px-4 py-3 text-sm text-muted shadow-sm backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px]">Now</span>
                <span className="font-mono text-[11px] text-accent">{hero.infoCard1Title}</span>
              </div>
              <div className="mt-2 leading-relaxed">
                {hero.infoCard1Body}
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card/70 px-4 py-3 text-sm text-muted shadow-sm backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px]">Signal</span>
                <span className="font-mono text-[11px] text-accent2">{hero.infoCard2Title}</span>
              </div>
              <div className="mt-2 leading-relaxed">
                {hero.infoCard2Body}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="mt-14 flex items-center justify-center">
        <a
          href="#about"
          className={cn(
            "group inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-4 py-2 text-xs text-muted shadow-sm backdrop-blur transition",
            "hover:bg-card/90"
          )}
        >
          <span className="font-mono">Scroll</span>
          <span className="grid h-6 w-6 place-items-center rounded-full border border-border/70 bg-bg/50 transition group-hover:translate-y-[1px]">
            <ArrowDown className="h-3.5 w-3.5" />
          </span>
        </a>
      </div>
    </section>
  );
}
