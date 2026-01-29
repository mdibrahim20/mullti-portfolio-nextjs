"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

function Signature({ signatureText }: { signatureText: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/70 p-5 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted">Signature</div>
        <div className="font-mono text-[11px] text-accent">craft()</div>
      </div>

      <svg viewBox="0 0 420 140" className="mt-3 w-full">
        <defs>
          <linearGradient id="sig" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.9" />
            <stop offset="55%" stopColor="rgb(var(--accent2))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <motion.path
          d="M18 82 C 52 20, 92 120, 132 72 S 220 76, 248 52 S 312 98, 354 60 S 394 72, 404 44"
          fill="none"
          stroke="url(#sig)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </svg>

      <div className="mt-2 text-sm text-muted">
        {signatureText}
      </div>
    </div>
  );
}

export function About({ siteConfig, aboutData }: { siteConfig: any; aboutData?: any }) {
  const site = siteConfig || { principles: [], role: "Software Developer" };
  const about = aboutData || {
    eyebrow: '01 • About',
    title: 'Engineer mind. Designer taste. Builder energy.',
    description: 'I care about the details people feel — and the foundations they never see.',
    paragraph1: 'I\'m a Software Developer who loves turning ideas into polished products. My sweet spot is the intersection of design systems, motion, and performance.',
    paragraph2: 'I build interfaces that are clean, fast, and easy to maintain — with predictable components, good accessibility defaults, and thoughtful state architecture.',
    signatureText: 'I design systems, craft interfaces, and ship features with clarity.',
    nowBuildingItem1: 'A reusable UI kit with motion primitives and tokens',
    nowBuildingItem2: 'Performance-first patterns for Next.js apps',
    nowBuildingItem3: 'Better developer experience through tooling + docs',
  };
  return (
    <section id="about" className="scroll-mt-28">
      <SectionHeader
        eyebrow={about.eyebrow}
        title={about.title}
        desc={about.description}
      />

      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div className="space-y-4">
          <Reveal>
            <p className="text-muted leading-relaxed" dangerouslySetInnerHTML={{
              __html: about.paragraph1.replace(
                site.role,
                `<span class="text-fg font-medium">${site.role}</span>`
              )
            }} />
          </Reveal>

          <Reveal delay={0.05}>
            <p className="text-muted leading-relaxed">
              {about.paragraph2}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border/80 bg-card/70 p-5 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted">{about.nowBuildingLabel}</div>
                <div className="font-mono text-[11px] text-accent2">{about.nowBuildingTag}</div>

              </div>

              <ul className="mt-3 space-y-2 text-sm text-muted">
                {(about.nowBuildingItems || []).map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>

            </div>
          </Reveal>
        </div>

        <div className="space-y-4">
          <Signature signatureText={about.signatureText} />

          <div className="grid gap-3">
            {(about.principles || []).map((p: any, idx: number) => (

              <Reveal key={p.title} delay={0.06 * idx}>
                <div className="rounded-2xl border border-border/80 bg-card/70 p-5 shadow-sm backdrop-blur">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium tracking-tight">{p.title}</div>
                    <div className="font-mono text-[11px] text-muted">p{idx + 1}</div>
                  </div>
                  <div className="mt-2 text-sm text-muted leading-relaxed">{p.body}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
