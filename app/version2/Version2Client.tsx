"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Zap,
  Compass,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Binary,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

import { submitContact } from "@/lib/api";

// --- DATA SOURCE (From Dashboard JSON) ---
const DATA = {
  site: {
    meta: {
      title: "My Portfolio",
      description: "Full-stack developer building clean, scalable apps.",
      language: "en",
      theme: { defaultMode: "light", allowToggle: true },
    },
    branding: {
      name: "Your Name",
      handle: "My Portfolio",
      role: "Full-stack Engineer",
      location: "Location",
      availability: { status: "AVAILABLE", note: "Open to freelance & full-time" },
    },
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "email@example.com",
      whatsapp: "#",
      discord: "#",
    },
    navigation: {
      header: [
        { id: "home", label: "Home", href: "#home" },
        { id: "about", label: "About", href: "#about" },
        { id: "projects", label: "Projects", href: "#projects" },
        { id: "skills", label: "Skills", href: "#skills" },
        { id: "experience", label: "Experience", href: "#experience" },
        { id: "contact", label: "Contact", href: "#contact" },
      ],
      footerPrimary: [
        { id: "projects", label: "Projects", href: "#projects" },
        { id: "resume", label: "Resume", href: "#resume" },
        { id: "contact", label: "Contact", href: "#contact" },
      ],
      footerUtility: [
        { id: "privacy", label: "Privacy", href: "#privacy" },
        { id: "terms", label: "Terms", href: "#terms" },
        { id: "backToTop", label: "Back to top", href: "#home" },
      ],
    },
  },
  sections: {
    hero: {
      id: "home",
      eyebrow: "Kinetic portfolio • motion-first UI • fast",
      headline: "Hi, I'm Your Name 👋",
      subheadline: "I'm My Portfolio — Full-stack developer building clean, scalable apps.",
      primaryCta: { label: "View Projects", href: "#projects" },
      secondaryCta: { label: "Contact Me", href: "#contact" },
      statusChips: [{ label: "Open to freelance, contract, or full-time roles where craft matters." }],
      terminalCard: {
        title: "cat ./signals.txt",
        hint: "Tip: press ⌘K to jump around",
        highlights: [
          {
            label: "Now shipping",
            text: "I love building end-to-end: crisp UI, robust data models, and production-ready deployments.",
          },
          {
            label: "Open to work",
            text: "Open to freelance, contract, or full-time roles where craft matters.",
          },
        ],
      },
    },
    about: {
      id: "about",
      kicker: "01 • About Section",
      headline: "Engineer mind. Designer taste. Builder energy.",
      intro: "I care about the details people feel — and the foundations they never see.",
      paragraphs: [
        "I'm a software developer who loves turning ideas into polished products.",
        "My sweet spot is the intersection of design systems, motion, and performance.",
        "I build interfaces that are clean, fast, and easy to maintain — with predictable components, good accessibility defaults, and thoughtful state architecture.",
      ],
      callouts: {
        title: "Now building",
        items: [
          "A reusable UI kit with motion primitives and tokens",
          "Performance-first patterns for Next.js apps",
          "Better developer experience through tooling + docs",
        ],
      },
      principles: [
        {
          title: "Design like an engineer",
          description: "Systems, constraints, components. Pretty is good — predictable is better.",
        },
        {
          title: "Motion with purpose",
          description: "Animation should guide attention, explain hierarchy, and feel effortless.",
        },
        {
          title: "Performance is a feature",
          description: "Fast pages win trust. I obsess over loading, rendering, and polish.",
        },
      ],
    },
    projects: {
      id: "projects",
      kicker: "02 • Projects",
      headline: "Projects",
      search: { placeholder: "Search projects..." },
      filters: ["All", "Open Source", "Performance", "UI", "Misc"],
      items: [
        {
          id: "portfolio-platform",
          title: "Portfolio Platform",
          year: "2025",
          summary: "A modern modular portfolio system.",
          href: "#",
          badges: ["Laravel", "MySQL", "Filament", "Next.js"],
        },
        {
          id: "atlas-ui",
          title: "Atlas UI",
          year: "2025",
          summary:
            "A modern UI component library with a token system, accessibility defaults, and delightful microinteractions.",
          href: "#",
          badges: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
        },
        {
          id: "ecommerce-admin",
          title: "E-commerce Admin",
          year: "2025",
          summary: "A Filament-based admin for operations.",
          href: "#",
          badges: ["Laravel", "Filament", "MySQL"],
        },
      ],
    },
    skills: {
      id: "skills",
      kicker: "03 • Skills",
      headline: "A stack that's pragmatic — and a little obsessive.",
      subheadline:
        "I pick tools that help teams ship: strong typing, composable UI, clear APIs, and stable deployments.",
      groups: [
        { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Accessibility"] },
        { name: "Backend", items: ["Node.js", "PostgreSQL", "Prisma", "REST", "GraphQL", "Redis"] },
        { name: "Tooling", items: ["Git", "CI/CD", "Docker", "Testing", "Storybook", "Monorepos"] },
      ],
      radar: {
        title: "Skill signal",
        axes: ["UI Engineering", "Architecture", "Performance", "Product Sense", "Backend", "DevOps", "Testing"],
        note: "A quick visual of where I'm strongest right now — updated as I grow.",
      },
    },
    experience: {
      id: "experience",
      kicker: "04 • Experience",
      headline: "A trail of shipped work.",
      subheadline: "Roles and chapters that shaped my style: systems thinking, craft, and delivery.",
      items: [
        {
          title: "Full-stack Developer",
          company: "Acme Studio",
          location: "Remote",
          start: "2024-01",
          end: "Present",
          highlights: [
            "Designed REST APIs for frontend apps",
            "Improved query performance and caching",
            "Shipped UI components with accessibility defaults",
          ],
          tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
        },
        {
          title: "Backend Engineer",
          company: "Beta Agency",
          location: "Dhaka, BD",
          start: "2023-01",
          end: "2023-12",
          highlights: ["Payment gateway integrations", "CI/CD and automation improvements", "Stability and performance tuning"],
          tech: ["Node.js", "PostgreSQL", "Prisma"],
        },
      ],
    },
    contact: {
      id: "contact",
      kicker: "05 • Contact",
      headline: "Let's make something people remember.",
      subheadline: "If you have a project or role in mind, I'd love to hear about it.",
      responseTime: "I typically reply within 24–48 hours.",
      directLine: {
        title: "Direct line",
        hint: "Prefer email? Copy it in one click.",
        email: "email@example.com",
        actions: [
          { id: "email", label: "Email me", href: "mailto:email@example.com" },
          { id: "whatsapp", label: "WhatsApp", href: "#" },
          { id: "discord", label: "Discord", href: "#" },
        ],
      },
      form: {
        title: "Quick message",
        fields: [
          { name: "name", label: "Your name", placeholder: "Jane Doe", type: "text", required: true },
          { name: "email", label: "Your email", placeholder: "jane@company.com", type: "email", required: true },
          { name: "subject", label: "Subject", placeholder: "Let's talk about...", type: "text", required: true },
          { name: "message", label: "Message", placeholder: "Tell me what you're building…", type: "textarea", required: true },
        ],
        primaryButton: { label: "Send Message" },
        secondaryButton: { label: "Preview mailto link" },
      },
    },
    footer: {
      id: "footer",
      bento: {
        profileCard: {
          icon: "terminal",
          name: "Your Name",
          titleLine: "Full-stack Engineer • Remote",
          summary: "Building fast, accessible, and reliable web applications.",
          techChips: ["React", "TypeScript", "Node.js", "Tailwind", "Testing"],
        },
        connectCard: {
          label: "Online",
          links: [
            { platform: "GitHub", key: "github", href: "#" },
            { platform: "LinkedIn", key: "linkedin", href: "#" },
            { platform: "Twitter / X", key: "twitter", href: "#" },
            { platform: "Email", key: "email", href: "mailto:email@example.com" },
          ],
        },
        statusCard: {
          label: "Local time",
          showClock: true,
          availabilityPill: { status: "AVAILABLE", note: "Open to freelance & full-time" },
        },
        ctaCard: {
          headline: "Building fast, reliable web products",
          icon: "mail",
          links: [
            { label: "Projects", href: "#projects" },
            { label: "Resume", href: "#resume" },
            { label: "Contact", href: "#contact" },
          ],
          version: "v.2026.01",
        },
      },
      credits: {
        left: "Designed & developed by Your Name",
        middle: "Built with Next.js and Laravel",
        right: "© 2026 — All rights reserved",
      },
    },
  },
};

// --- Utility Hooks ---
function useMouseProximity(ref: React.RefObject<HTMLElement>) {
  const [proximity, setProximity] = useState(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);
      setProximity(Math.max(0, 1 - distance / 500));
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [ref]);

  return proximity;
}

// --- Sub-components ---
function SectionHeader({
  kicker,
  headline,
  subheadline,
}: {
  kicker?: string;
  headline: string;
  subheadline?: string;
}) {
  return (
    <div className="mb-16">
      {kicker && (
        <div className="text-violet-500 text-[10px] font-black tracking-[0.4em] mb-4 flex items-center gap-3 uppercase">
          <Compass className="w-4 h-4" /> {kicker}
        </div>
      )}
      <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">{headline}</h2>
      {subheadline && <p className="text-sm text-zinc-500 font-mono max-w-xl">{subheadline}</p>}
    </div>
  );
}

function RegistryModule({
  project,
}: {
  project: { id: string; title: string; year: string; summary: string; href: string; badges: string[] };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const proximity = useMouseProximity(ref);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      style={{ borderColor: `rgba(139, 92, 246, ${0.1 + proximity * 0.4})` }}
      className="group relative bg-[#09090b] border border-white/5 p-8 transition-all duration-500"
    >
      <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-zinc-800 pointer-events-none uppercase">
        ID::{project.id} {/* {project.year} */}
      </div>
      <div className="relative z-10">
        <h3 className="text-2xl font-black text-white mb-3 tracking-tighter uppercase italic group-hover:translate-x-1 transition-transform">
          {project.title}
        </h3>
        <p className="text-sm text-zinc-500 font-mono leading-relaxed mb-8 max-w-sm group-hover:text-zinc-400 transition-colors">
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-2 pt-6 border-t border-zinc-900">
          {project.badges.map((tag) => (
            <span
              key={tag}
              className="text-[9px] px-2 py-0.5 bg-white/5 border border-white/5 text-zinc-500 font-mono uppercase"
            >
              {tag}
            </span>
          ))}
          <motion.a
            href={project.href}
            className="ml-auto text-violet-400 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest hover:text-white"
          >
            Open <ArrowUpRight className="w-3 h-3" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

// --- Page (client UI) ---
// Accepts `data` so the server wrapper can inject Laravel-backed content.
export default function Version2Client({ data }: { data?: any }) {
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const resolved = data ?? DATA;
  const site = resolved?.site ?? DATA.site;
  const sections = resolved?.sections ?? DATA.sections;

  // ---- Contact form state (Version2) ----
  const [contactValues, setContactValues] = useState<Record<string, string>>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [contactToast, setContactToast] = useState<string | null>(null);

  useEffect(() => {
    if (!contactToast) return;
    const t = window.setTimeout(() => setContactToast(null), 1800);
    return () => window.clearTimeout(t);
  }, [contactToast]);

  const onContactChange = (key: string, value: string) => {
    setContactValues((prev) => ({ ...prev, [key]: value }));
    setContactErrors((prev) => {
      if (!prev[key]) return prev;
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };

  const validateContact = () => {
    const next: Record<string, string> = {};
    const fieldNames = ["name", "email", "subject", "message"];

    sections.contact.form.fields.forEach((f: any, index: number) => {
      const fieldKey = f.name || f.key || f.id || fieldNames[index] || `field_${index}`;
      const val = (contactValues[fieldKey] ?? "").trim();
      if (f.required && !val) next[fieldKey] = `${f.label} is required.`;
      if (fieldKey === "message" && val && val.length < 10) next[fieldKey] = "Message must be at least 10 characters.";
    });

    setContactErrors(next);
    return Object.keys(next).length === 0;
  };

  // ✅ SAFE FOOTER FALLBACKS
  const footer = sections?.footer ?? {};
  const bento = footer?.bento ?? {};

  const profileCard = bento?.profileCard ?? {
    name: "",
    titleLine: "",
    summary: "",
    techChips: [] as string[],
  };

  const connectCard = bento?.connectCard ?? {
    links: [] as Array<{ key: string; platform: string; href: string }>,
  };

  const statusCard = bento?.statusCard ?? {
    availabilityPill: { status: "" },
  };

  const ctaCard = bento?.ctaCard ?? {
    headline: "",
    version: "",
    links: [] as Array<{ label: string; href: string }>,
  };

  const credits = footer?.credits ?? { left: "", middle: "", right: "" };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-violet-600 selection:text-white overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern id="main-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.1)" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#main-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto min-h-screen border-x border-white/5 flex flex-col">
        {/* Navigation */}
        <nav className="h-20 border-b border-white/5 bg-black/50 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-sm font-black text-white tracking-widest uppercase">{site.branding.name}</span>
              <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-tighter">{site.branding.role}</span>
            </div>

            <div className="hidden lg:flex items-center gap-6 border-l border-white/5 pl-6">
              {site.navigation.header.map((nav: any) => (
                <a
                  key={nav.id}
                  href={nav.href}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 hover:text-white transition-colors"
                >
                  {nav.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4 text-[9px] font-mono border-r border-white/5 pr-4 mr-2">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]" />
                <span className="text-emerald-500">{site.branding.availability.status}</span>
              </div>
              <span className="text-zinc-600">{currentTime}</span>
            </div>
            <div className="w-8 h-8 bg-zinc-900 border border-white/10 flex items-center justify-center font-black text-white text-[10px]">
              YN
            </div>
          </div>
        </nav>

        {/* Hero */}
        <header id="home" className="px-8 py-24 border-b border-white/5 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-3 px-3 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold uppercase tracking-widest mb-8">
              <Zap className="w-3 h-3" /> {sections.hero.eyebrow}
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9] uppercase italic">
              {sections.hero.headline.split(" ").map((word: string, i: number) => (
                <span
                  key={i}
                  className={i > 2 ? "text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-zinc-500" : ""}
                >
                  {word}{" "}
                </span>
              ))}
            </h1>

            <p className="text-zinc-500 text-lg max-w-xl leading-relaxed mb-10 border-l-2 border-violet-600 pl-6">
              {sections.hero.subheadline}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <a
                href={sections.hero.primaryCta.href}
                className="px-10 py-4 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors shadow-[8px_8px_0px_rgba(139,92,246,0.3)]"
              >
                {sections.hero.primaryCta.label}
              </a>

              <div className="flex gap-4 pl-4">
                <a href={site.social.github} aria-label="GitHub">
                  <Github className="w-5 h-5 text-zinc-600 hover:text-white cursor-pointer" />
                </a>
                <a href={site.social.linkedin} aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5 text-zinc-600 hover:text-white cursor-pointer" />
                </a>
                <a href={`mailto:${site.social.email}`} aria-label="Email">
                  <Mail className="w-5 h-5 text-zinc-600 hover:text-white cursor-pointer" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Hero Terminal */}
          <div className="p-8 bg-zinc-900/30 border border-white/5 backdrop-blur-md">
            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-violet-500" /> {sections.hero.terminalCard.title}
            </div>
            <div className="space-y-6">
              {sections.hero.terminalCard.highlights.map((h: any, i: number) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="text-[9px] font-bold text-violet-500 uppercase tracking-widest opacity-60">
                    &gt; {h.label}
                  </div>
                  <div className="text-sm font-mono text-white leading-relaxed">{h.text}</div>
                </div>
              ))}
              <div className="pt-4 border-t border-white/5 text-[9px] font-mono text-zinc-700 italic">
                {sections.hero.terminalCard.hint}
              </div>
            </div>
          </div>
        </header>

        {/* About */}
        <section id="about" className="p-8 border-b border-white/5">
          <SectionHeader kicker={sections.about.kicker} headline={sections.about.headline} subheadline={sections.about.intro} />

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-6 text-zinc-500 leading-relaxed font-mono text-sm">
              {sections.about.paragraphs.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="bg-white/5 border border-white/5 p-8">
              <div className="text-[10px] font-black text-violet-500 uppercase tracking-widest mb-6">
                {sections.about.callouts.title}
              </div>
              <ul className="space-y-4">
                {sections.about.callouts.items.map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-mono text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {sections.about.principles.map((p: any, i: number) => (
              <div key={i} className="p-6 border border-white/5 bg-zinc-900/20">
                <div className="text-white font-black uppercase text-sm mb-2">{p.title}</div>
                <div className="text-xs text-zinc-500 font-mono leading-relaxed">{p.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="p-8 border-b border-white/5">
          <SectionHeader kicker={sections.projects.kicker} headline={sections.projects.headline} />

          <div className="flex gap-4 mb-12">
            {sections.projects.filters.map((f: string) => (
              <button
                key={f}
                className="px-4 py-1.5 border border-white/5 text-[9px] font-bold uppercase tracking-widest text-zinc-600 hover:text-white hover:bg-white/5 transition-all"
                type="button"
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {sections.projects.items.map((project: any) => (
              <RegistryModule key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="p-8 border-b border-white/5">
          <SectionHeader kicker={sections.skills.kicker} headline={sections.skills.headline} subheadline={sections.skills.subheadline} />

          <div className="grid md:grid-cols-3 gap-8">
            {sections.skills.groups.map((group: any) => (
              <div key={group.name} className="p-8 border border-white/5 bg-zinc-950">
                <div className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <Binary className="w-4 h-4 text-violet-500" /> {group.name}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item: string) => (
                    <span key={item} className="px-3 py-1 bg-white/5 border border-white/5 text-[10px] text-zinc-400 font-mono uppercase">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="p-8 border-b border-white/5">
          <SectionHeader kicker={sections.experience.kicker} headline={sections.experience.headline} subheadline={sections.experience.subheadline} />

          <div className="space-y-12">
            {sections.experience.items.map((job: any, i: number) => (
              <div key={i} className="group flex flex-col md:flex-row gap-8 border-l border-white/5 pl-8 relative">
                <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-violet-600" />
                <div className="w-48 flex-shrink-0">
                  <div className="text-xs font-black text-white">{job.company}</div>
                  <div className="text-[10px] font-mono text-zinc-600 mt-1 uppercase tracking-tighter">
                    {job.start} — {job.end}
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl font-black text-white uppercase italic group-hover:text-violet-400 transition-colors">
                    {job.title}
                  </h3>
                  <div className="text-[10px] text-zinc-500 mt-1 mb-4">{job.location}</div>

                  <ul className="space-y-2 mb-6">
                    {job.highlights.map((h: string, hi: number) => (
                      <li key={hi} className="text-sm text-zinc-500 font-mono leading-relaxed list-disc list-inside">
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {job.tech.map((t: string) => (
                      <span key={t} className="text-[9px] text-violet-500 font-mono">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="p-8 border-b border-white/5 grid lg:grid-cols-2 gap-16">
          <div>
            <SectionHeader kicker={sections.contact.kicker} headline={sections.contact.headline} subheadline={sections.contact.subheadline} />

            <div className="p-8 bg-white/5 border border-white/5">
              <div className="text-[10px] font-black text-white uppercase tracking-widest mb-4">
                {sections.contact.directLine.title}
              </div>
              <p className="text-sm text-zinc-500 mb-6 font-mono">{sections.contact.directLine.hint}</p>
              <div className="text-2xl font-black text-white tracking-tighter mb-8 break-all uppercase italic">
                {sections.contact.directLine.email}
              </div>
              <div className="flex flex-wrap gap-4">
                {sections.contact.directLine.actions.map((action: any) => (
                  <a
                    key={action.id}
                    href={action.href}
                    className="px-6 py-2 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/30 border border-white/5 p-8">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
              <MessageSquare className="w-4 h-4 text-violet-500" /> {sections.contact.form.title}
            </h3>

            <form
              className="space-y-6"
              onSubmit={async (e) => {
                e.preventDefault();

                if (!validateContact()) {
                  setContactToast("Please fix the highlighted fields.");
                  return;
                }

                try {
                  await submitContact({
                    name: contactValues.name,
                    email: contactValues.email,
                    subject: contactValues.subject,
                    message: contactValues.message,
                  });

                  setContactToast("Message sent!");
                  setContactValues({ name: "", email: "", subject: "", message: "" });
                  setContactErrors({});
                } catch {
                  setContactToast("Something went wrong.");
                }
              }}
            >
              {sections.contact.form.fields.map((field: any, index: number) => {
                // Use field.name with fallbacks to ensure unique keys
                const fieldKey = field.name || field.key || field.id || ["name", "email", "subject", "message"][index] || `field_${index}`;
                const hasError = !!contactErrors[fieldKey];

                return (
                  <div key={fieldKey}>
                    <label className="block text-[10px] font-bold text-zinc-600 uppercase mb-2 tracking-widest">
                      {field.label}
                    </label>

                    {field.type === "textarea" ? (
                      <textarea
                        value={contactValues[fieldKey] ?? ""}
                        onChange={(e) => onContactChange(fieldKey, e.target.value)}
                        placeholder={field.placeholder}
                        className={[
                          "w-full bg-white/5 border p-4 text-sm font-mono text-white focus:outline-none h-32 resize-none",
                          hasError ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-violet-600",
                        ].join(" ")}
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={contactValues[fieldKey] ?? ""}
                        onChange={(e) => onContactChange(fieldKey, e.target.value)}
                        placeholder={field.placeholder}
                        className={[
                          "w-full bg-white/5 border p-4 text-sm font-mono text-white focus:outline-none",
                          hasError ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-violet-600",
                        ].join(" ")}
                      />
                    )}

                    {hasError ? (
                      <div className="mt-2 text-[10px] font-mono text-red-500">{contactErrors[fieldKey]}</div>
                    ) : null}
                  </div>
                );
              })}

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-grow px-8 py-4 bg-violet-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-violet-500 transition-colors"
                >
                  {sections.contact.form.primaryButton.label}
                </button>

                <button
                  type="button"
                  className="px-8 py-4 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors"
                  onClick={() => {
                    const to = sections.contact.directLine.email || site?.social?.email || "";
                    const subject = encodeURIComponent(contactValues.subject || "Quick message");
                    const body = encodeURIComponent(
                      `Name: ${contactValues.name}\nEmail: ${contactValues.email}\n\n${contactValues.message}`
                    );
                    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
                  }}
                >
                  {sections.contact.form.secondaryButton.label}
                </button>
              </div>

              {contactToast ? (
                <div className="text-[10px] font-mono text-zinc-300 border border-white/10 bg-white/5 px-3 py-2">
                  {contactToast}
                </div>
              ) : null}
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer id="footer" className="mt-auto bg-zinc-950/50">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border-t border-white/5">
            <div className="p-8 bg-black">
              <div className="text-violet-500 mb-4">
                <Terminal className="w-6 h-6" />
              </div>

              <div className="text-white font-black uppercase text-sm mb-1">{profileCard.name}</div>
              <div className="text-[9px] font-mono text-zinc-500 mb-4">{profileCard.titleLine}</div>
              <p className="text-xs text-zinc-600 leading-relaxed mb-6">{profileCard.summary}</p>

              <div className="flex flex-wrap gap-2">
                {(profileCard.techChips ?? []).map((t: string) => (
                  <span key={t} className="text-[8px] text-zinc-500 border border-white/5 px-1 font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 bg-black flex flex-col">
              <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-6">Connect</div>
              <div className="space-y-4">
                {(connectCard.links ?? []).map((link: any) => (
                  <a
                    key={link.key ?? `${link.platform}-${link.href}`}
                    href={link.href}
                    className="flex items-center justify-between text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    <span>{link.platform}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>

            <div className="p-8 bg-black flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-6">Status</div>
                <div className="text-2xl font-black text-white tracking-tighter mb-1 uppercase italic">{currentTime}</div>
                <div className="text-[9px] font-mono text-zinc-600 uppercase">Local Time (GMT+6)</div>
              </div>

              <div className="mt-8 flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {statusCard.availabilityPill?.status ?? ""}
              </div>
            </div>

            <div className="p-8 bg-violet-600 text-white flex flex-col justify-between">
              <h4 className="text-xl font-black uppercase italic leading-tight">{ctaCard.headline}</h4>

              <div className="mt-8 space-y-4">
                {(ctaCard.links ?? []).map((l: any) => (
                  <a
                    key={`${l.label}-${l.href}`}
                    href={l.href}
                    className="block text-[10px] font-black uppercase tracking-widest hover:translate-x-1 transition-transform"
                  >
                    {l.label}
                  </a>
                ))}

                <div className="pt-4 border-t border-white/20 text-[9px] font-mono opacity-60">{ctaCard.version}</div>
              </div>
            </div>
          </div>

          <div className="p-8 grid md:grid-cols-3 gap-8 text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
            <div>{credits.left}</div>
            <div className="md:text-center">{credits.middle}</div>
            <div className="md:text-right">{credits.right}</div>
          </div>
        </footer>

        {/* Global HUD Overlay */}
        <div className="fixed bottom-8 left-8 z-[100] hidden xl:flex flex-col gap-1">
          <div className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest">Core_Signal</div>
          <div className="w-32 h-1 bg-white/5 overflow-hidden">
            <motion.div
              className="h-full bg-violet-600"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </div>
        </div>
      </div>

      {/* Visual Glitch Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[200] opacity-[0.02] bg-[radial-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" />
    </div>
  );
}
