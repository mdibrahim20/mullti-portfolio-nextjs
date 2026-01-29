"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Terminal,
  Cpu,
  Activity,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Clock,
  ChevronRight,
  Binary,
} from "lucide-react";

import { submitContact } from "@/lib/api";

// --- DATA SOURCE (local fallback) ---
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
      footerPrimary: [],
      footerUtility: [],
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
          { label: "Open to work", text: "Open to freelance, contract, or full-time roles where craft matters." },
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
      principles: [
        {
          title: "Design like an engineer",
          description: "Systems, constraints, components. Pretty is good — predictable is better.",
        },
      ],
    },
    projects: {
      id: "projects",
      kicker: "02 • Projects",
      headline: "Projects",
      search: { placeholder: "Search projects..." },
      filters: ["All", "Open Source", "Performance", "UI", "Misc"],
      items: [],
    },
    skills: {
      id: "skills",
      kicker: "03 • Skills",
      headline: "A stack that's pragmatic — and a little obsessive.",
      subheadline: "I pick tools that help teams ship: strong typing, composable UI, clear APIs, and stable deployments.",
      groups: [{ name: "Frontend", items: ["React", "Next.js", "TypeScript"] }],
      radar: { title: "Skill signal", axes: [], note: "" },
    },
    experience: {
      id: "experience",
      kicker: "04 • Experience",
      headline: "A trail of shipped work.",
      subheadline: "Roles and chapters that shaped my style: systems thinking, craft, and delivery.",
      items: [],
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
        actions: [{ id: "email", label: "Email me", href: "mailto:email@example.com" }],
      },
      form: {
        title: "Quick message",
        fields: [],
        primaryButton: { label: "Send Message" },
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
        connectCard: { label: "Online", links: [] },
        statusCard: {
          label: "Local time",
          showClock: true,
          availabilityPill: { status: "AVAILABLE", note: "Open to freelance & full-time" },
        },
        ctaCard: { headline: "Building fast, reliable web products", icon: "mail", links: [], version: "v.2026.01" },
      },
      credits: { left: "", middle: "", right: "" },
    },
  },
} as const;

// ---- Tailwind-safe color mapping (fix for bg-${color}-500) ----
type MetricColor = "violet" | "emerald" | "fuchsia" | "amber";
const METRIC_DOT_CLASS: Record<MetricColor, string> = {
  violet: "bg-violet-500",
  emerald: "bg-emerald-500",
  fuchsia: "bg-fuchsia-500",
  amber: "bg-amber-500",
};

// --- Sub-components ---
function Metric({
  label,
  value,
  unit,
  color = "violet",
}: {
  label: string;
  value: string;
  unit: string;
  color?: MetricColor;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
        <div className={`w-1 h-1 rounded-full ${METRIC_DOT_CLASS[color]}`} />
        {label}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-black text-white tracking-tighter">{value}</span>
        <span className="text-[10px] font-mono text-zinc-600">{unit}</span>
      </div>
    </div>
  );
}

function Noise() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
    </div>
  );
}

function SectionMarker({ kicker }: { kicker: string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <div className="h-px w-12 bg-white/10" />
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 whitespace-nowrap">
        {kicker}
      </span>
      <div className="h-px w-full bg-white/10" />
    </div>
  );
}

function PerspectiveCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setRotate({ x: rotateX, y: rotateY });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

// --- Page (Single Page) ---
export default function Version3Client({ data }: { data?: any }) {
  // ✅ SAFE RESOLVE
  const resolved = data ?? DATA;
  const site = resolved?.site ?? DATA.site;
  const sections = resolved?.sections ?? DATA.sections;

  const hero = sections?.hero ?? DATA.sections.hero;
  const about = sections?.about ?? DATA.sections.about;
  const projects = sections?.projects ?? DATA.sections.projects;
  const skills = sections?.skills ?? DATA.sections.skills;
  const experience = sections?.experience ?? DATA.sections.experience;
  const contact = sections?.contact ?? DATA.sections.contact;

  const footer = sections?.footer ?? DATA.sections.footer;
  const bento = footer?.bento ?? DATA.sections.footer.bento;

  const profileCard = bento?.profileCard ?? DATA.sections.footer.bento.profileCard;
  const connectCard = bento?.connectCard ?? DATA.sections.footer.bento.connectCard;
  const ctaCard = bento?.ctaCard ?? DATA.sections.footer.bento.ctaCard;
  const credits = footer?.credits ?? DATA.sections.footer.credits;

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const [activeNav, setActiveNav] = useState<"home" | "about" | "projects" | "skills" | "experience" | "contact">("home");
  const [currentTime, setCurrentTime] = useState("");

  // ---- Contact form state ----
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

    (contact?.form?.fields ?? []).forEach((f: any, index: number) => {
      const fieldKey = f.name || f.key || f.id || fieldNames[index] || `field_${index}`;
      const val = (contactValues[fieldKey] ?? "").trim();
      if (f.required && !val) next[fieldKey] = `${f.label} is required.`;
      if (fieldKey === "message" && val && val.length < 10) next[fieldKey] = "Message must be at least 10 characters.";
    });

    setContactErrors(next);
    return Object.keys(next).length === 0;
  };

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // keep state in sync when navigating via hash / browser back-forward
  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;
      if (["home", "about", "projects", "skills", "experience", "contact"].includes(id)) {
        setActiveNav(id as any);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    onHashChange();
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const scrollPercent = useMemo(() => Math.round(smoothProgress.get() * 100), [smoothProgress]);

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-300 font-sans selection:bg-white selection:text-black">
      <Noise />

      {/* Background HUD Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-screen bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.05)_0%,transparent_50%)]" />
        <svg className="absolute w-full h-full opacity-10">
          <defs>
            <pattern id="dotGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" fillOpacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotGrid)" />
        </svg>
      </div>

      {/* Floating HUD Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] px-1.5 py-1.5 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl flex items-center gap-1">
        {(site?.navigation?.header ?? []).map((nav: any) => (
          <a
            key={nav.id}
            href={nav.href}
            onClick={() => setActiveNav(nav.id as any)}
            className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              activeNav === nav.id ? "bg-white text-black" : "text-zinc-500 hover:text-white"
            }`}
          >
            {nav.label}
          </a>
        ))}
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-20">
        {/* HERO */}
        <section id="home" className="min-h-[70vh] flex flex-col justify-center mb-40">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 mb-8">
                <div className="w-8 h-px bg-violet-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-500">
                  {hero?.eyebrow ?? ""}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-[8vw] font-black text-white leading-[0.85] tracking-tighter uppercase mb-12 italic"
              >
                {hero?.headline ?? ""}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-zinc-500 max-w-2xl leading-relaxed mb-16"
              >
                {hero?.subheadline ?? ""}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-8 items-center"
              >
                <a href={hero?.primaryCta?.href ?? "#projects"} className="group flex items-center gap-4">
                  <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
                    <ArrowUpRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                  </span>
                  <span className="text-xs font-black uppercase tracking-widest text-white group-hover:underline underline-offset-8 decoration-2 decoration-violet-600">
                    {hero?.primaryCta?.label ?? "View Projects"}
                  </span>
                </a>

                <div className="h-10 w-px bg-white/10 mx-4 hidden sm:block" />

                <div className="flex gap-6">
                  <a href={site?.social?.github ?? "#"} aria-label="GitHub">
                    <Github className="w-5 h-5 text-zinc-600 hover:text-white cursor-pointer transition-colors" />
                  </a>
                  <a href={site?.social?.linkedin ?? "#"} aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5 text-zinc-600 hover:text-white cursor-pointer transition-colors" />
                  </a>
                  <a href={`mailto:${site?.social?.email ?? "email@example.com"}`} aria-label="Email">
                    <Mail className="w-5 h-5 text-zinc-600 hover:text-white cursor-pointer transition-colors" />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Dashboard Visual */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="col-span-2 p-8 bg-zinc-900/30 border border-white/5 backdrop-blur-md">
                <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-500" /> Kernel_Diagnostics
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <Metric label="System Uptime" value="99.98" unit="%" />
                  <Metric label="Build Efficiency" value="1.2s" unit="P75" color="emerald" />
                  <Metric label="Local Status" value={site?.branding?.availability?.status ?? ""} unit="" color="fuchsia" />
                  <Metric label="System Time" value={currentTime} unit="UTC" color="amber" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mb-40">
          <SectionMarker kicker={about?.kicker ?? "01 • About"} />
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">{about?.headline ?? ""}</h2>
              <div className="space-y-6 text-zinc-500 font-medium text-lg max-w-xl">
                {(about?.paragraphs ?? []).map((p: any, i: number) => (
                  <p key={i}>{String(p ?? "")}</p>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              {(about?.principles ?? []).map((p: any, i: number) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10 }}
                  className="p-8 border-l border-white/5 bg-white/[0.02] flex flex-col justify-center"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-mono text-violet-500">0{i + 1}_</span>
                    <h3 className="text-sm font-black text-white uppercase tracking-widest">{p?.title ?? ""}</h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed font-mono">{p?.description ?? ""}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mb-40">
          <SectionMarker kicker={projects?.kicker ?? "02 • Projects"} />
          <div className="flex items-end justify-between mb-20 gap-8 flex-wrap">
            <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase">
              {projects?.headline ?? "Projects"}
            </h2>
            <div className="flex flex-wrap gap-3">
              {(projects?.filters ?? []).map((f: any) => (
                <button
                  key={String(f)}
                  type="button"
                  className="px-4 py-2 border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-all"
                >
                  {String(f)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(projects?.items ?? []).map((p: any) => (
              <PerspectiveCard key={p?.id ?? `${p?.title ?? "project"}-${p?.year ?? ""}`} className="h-full">
                <div className="p-10 h-full border border-white/10 bg-[#050505] group hover:border-violet-600/50 transition-colors flex flex-col">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-[10px] font-mono text-zinc-600 italic">RELEASE_{p?.year ?? ""}</span>
                    <Cpu className="w-5 h-5 text-violet-500" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 group-hover:text-violet-500 transition-colors">
                    {p?.title ?? ""}
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono leading-relaxed mb-12 flex-grow">
                    {p?.summary ?? ""}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {(p?.badges ?? []).map((tag: any) => (
                      <span
                        key={String(tag)}
                        className="text-[8px] font-black uppercase tracking-tighter px-2 py-1 bg-white/5 text-zinc-400"
                      >
                        {String(tag)}
                      </span>
                    ))}
                  </div>
                  <motion.a
                    href={p?.href ?? "#"}
                    whileHover={{ x: 5 }}
                    className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white border-b border-white/10 w-fit pb-1"
                  >
                    Examine <ChevronRight className="w-3 h-3" />
                  </motion.a>
                </div>
              </PerspectiveCard>
            ))}
          </div>
        </section>

        {/* SKILLS (added; your nav includes #skills) */}
        <section id="skills" className="mb-40">
          <SectionMarker kicker={skills?.kicker ?? "03 • Skills"} />
          <div className="flex items-end justify-between mb-16 gap-8 flex-wrap">
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              {skills?.headline ?? "Skills"}
            </h2>
            <p className="text-sm text-zinc-500 max-w-2xl">{skills?.subheadline ?? ""}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(skills?.groups ?? []).map((group: any) => (
              <div key={group?.name ?? Math.random()} className="p-10 border border-white/10 bg-[#050505]">
                <div className="flex items-center gap-3 mb-6">
                  <Binary className="w-4 h-4 text-violet-500" />
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                    {group?.name ?? ""}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(group?.items ?? []).map((item: any) => (
                    <span
                      key={String(item)}
                      className="text-[9px] font-black uppercase tracking-tighter px-2 py-1 bg-white/5 text-zinc-400 border border-white/10"
                    >
                      {String(item)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="mb-40">
          <SectionMarker kicker={experience?.kicker ?? "04 • Experience"} />
          <div className="max-w-4xl space-y-24">
            {(experience?.items ?? []).map((job: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-[1fr_2fr] gap-12"
              >
                <div className="space-y-4">
                  <div className="text-[10px] font-black text-violet-500 uppercase tracking-[0.3em] flex items-center gap-3">
                    <Clock className="w-3 h-3" /> {job?.start ?? ""} — {job?.end ?? ""}
                  </div>
                  <div className="text-2xl font-black text-white uppercase italic">{job?.company ?? ""}</div>
                  <div className="text-[10px] font-mono text-zinc-600">{job?.location ?? ""}</div>
                </div>

                <div className="relative pl-8 border-l border-white/5">
                  <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-violet-600 shadow-[0_0_10px_#7c3aed]" />
                  <h3 className="text-2xl font-black text-white mb-6 tracking-tight uppercase">{job?.title ?? ""}</h3>
                  <ul className="space-y-4 mb-8">
                    {(job?.highlights ?? []).map((h: any, hi: number) => (
                      <li key={hi} className="text-sm text-zinc-500 font-medium leading-relaxed flex gap-3 italic">
                        <span className="text-violet-500">→</span> {String(h ?? "")}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {(job?.tech ?? []).map((t: any) => (
                      <span
                        key={String(t)}
                        className="text-[9px] font-black uppercase tracking-tighter bg-white/5 border border-white/10 px-2 py-0.5 text-zinc-500"
                      >
                        {String(t)}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mb-40 grid lg:grid-cols-2 gap-20">
          <div>
            <SectionMarker kicker={contact?.kicker ?? "05 • Contact"} />
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic leading-none mb-12">
              Initiate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-zinc-500">
                Contact
              </span>
            </h2>

            <div className="p-10 border border-white/5 bg-white/[0.02]">
              <div className="text-[10px] font-black text-white uppercase tracking-widest mb-4">
                {contact?.directLine?.title ?? "Direct Communication"}
              </div>
              <p className="text-xs text-zinc-500 font-mono leading-loose mb-10">{contact?.subheadline ?? ""}</p>
              <div className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-12 break-all italic uppercase underline decoration-violet-600 underline-offset-8">
                {contact?.directLine?.email ?? site?.social?.email ?? "email@example.com"}
              </div>
              <div className="flex flex-wrap gap-6">
                {(contact?.directLine?.actions ?? []).map((action: any) => (
                  <a
                    key={action?.id ?? action?.label ?? Math.random()}
                    href={action?.href ?? "#"}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:text-violet-400 transition-colors"
                  >
                    [{action?.label ?? "Link"}]
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-20 lg:pt-0">
            <div className="bg-white/5 p-10 border border-white/10 relative">
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-violet-600 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-widest mb-10">
                {contact?.form?.title ?? "Quick message"}
              </h3>

              <form className="space-y-8" onSubmit={async (e) => {
                e.preventDefault();

                if (!validateContact()) {
                  setContactToast("Please fix the highlighted fields.");
                  return;
                }

                try {
                  await submitContact({
                    name: contactValues.name || contactValues.field_0 || "",
                    email: contactValues.email || contactValues.field_1 || "",
                    subject: contactValues.subject || contactValues.field_2 || "",
                    message: contactValues.message || contactValues.field_3 || "",
                  });

                  setContactToast("Message sent!");
                  setContactValues({ name: "", email: "", subject: "", message: "" });
                  setContactErrors({});
                } catch {
                  setContactToast("Something went wrong.");
                }
              }}>
                {(contact?.form?.fields ?? []).map((field: any, index: number) => {
                  // Use field.name with fallbacks to ensure unique keys
                  const fieldKey = field?.name || field?.key || field?.id || ["name", "email", "subject", "message"][index] || `field_${index}`;
                  const hasError = !!contactErrors[fieldKey];

                  return (
                  <div key={fieldKey}>
                    <label className="block text-[10px] font-bold text-zinc-700 uppercase mb-3 tracking-widest">
                      {field?.label ?? ""} {field?.type ? `// TYPE::${field.type}` : ""}
                    </label>

                    {field?.type === "textarea" ? (
                      <textarea
                        value={contactValues[fieldKey] ?? ""}
                        onChange={(e) => onContactChange(fieldKey, e.target.value)}
                        placeholder={field?.placeholder ?? ""}
                        className={[
                          "w-full bg-transparent border-b py-3 text-sm font-mono text-white focus:outline-none h-24 resize-none transition-colors",
                          hasError ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-white",
                        ].join(" ")}
                      />
                    ) : (
                      <input
                        type={field?.type ?? "text"}
                        value={contactValues[fieldKey] ?? ""}
                        onChange={(e) => onContactChange(fieldKey, e.target.value)}
                        placeholder={field?.placeholder ?? ""}
                        className={[
                          "w-full bg-transparent border-b py-3 text-sm font-mono text-white focus:outline-none transition-colors",
                          hasError ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-white",
                        ].join(" ")}
                      />
                    )}

                    {hasError ? (
                      <div className="mt-2 text-[10px] font-mono text-red-500">{contactErrors[fieldKey]}</div>
                    ) : null}
                  </div>
                )})}

                <button
                  type="submit"
                  className="w-full py-5 bg-white text-black text-xs font-black uppercase tracking-[0.3em] hover:bg-violet-600 hover:text-white transition-all"
                >
                  {contact?.form?.primaryButton?.label ?? "Send Message"}
                </button>

                {contactToast ? (
                  <div className="text-[10px] font-mono text-zinc-300 border border-white/10 bg-white/5 px-3 py-2">
                    {contactToast}
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="footer" className="border-t border-white/5 bg-[#010101]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <div className="text-white font-black text-2xl uppercase italic flex items-center gap-3">
                <Terminal className="w-6 h-6 text-violet-500" /> {profileCard?.name ?? ""}
              </div>

              <p className="text-xs text-zinc-600 font-mono leading-relaxed">{profileCard?.summary ?? ""}</p>

              <div className="flex flex-wrap gap-2 pt-4">
                {(profileCard?.techChips ?? []).map((t: any) => (
                  <span
                    key={String(t)}
                    className="text-[8px] font-mono text-zinc-500 uppercase border border-white/10 px-1.5 py-0.5"
                  >
                    {String(t)}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-2">
                {connectCard?.label ?? "Connect_Nodes"}
              </h4>

              <div className="grid gap-4">
                {(connectCard?.links ?? []).map((link: any) => (
                  <a
                    key={link?.key ?? `${link?.platform ?? "link"}-${link?.href ?? ""}`}
                    href={link?.href ?? "#"}
                    className="text-xs text-zinc-400 hover:text-white flex items-center justify-between group"
                  >
                    <span>{link?.platform ?? "Link"}</span>
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-2">
                Status_Check
              </h4>

              <div className="space-y-2">
                <div className="text-3xl font-black text-white italic tracking-tighter">{currentTime}</div>

                <div className="flex items-center gap-2 text-[9px] font-mono text-emerald-500 uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {site?.branding?.availability?.status ?? ""}
                </div>
              </div>
            </div>

            <div className="p-8 bg-zinc-900/50 border border-white/5 flex flex-col justify-between">
              <h4 className="text-lg font-black text-white italic leading-tight uppercase">{ctaCard?.headline ?? ""}</h4>
              <div className="text-[9px] font-mono text-zinc-700 mt-8">{ctaCard?.version ?? ""} {/* BUILD_PROD */}</div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-mono text-zinc-700 uppercase tracking-widest">
            <div>{credits?.left ?? ""}</div>
            <div className="hidden md:flex gap-12">
              <span>{credits?.middle ?? ""}</span>
              <span>{credits?.right ?? ""}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* GLOBAL HUD SCROLL INDICATOR */}
      <div className="fixed right-8 bottom-8 z-[100] h-32 w-1 border border-white/10 hidden xl:block">
        <motion.div className="w-full bg-violet-600 origin-top" style={{ height: "100%", scaleY: smoothProgress }} />
        <div className="absolute top-0 right-4 text-[8px] font-mono text-zinc-700 rotate-90 origin-top-right translate-x-1 uppercase whitespace-nowrap">
          Scroll_Depth // {scrollPercent}%
        </div>
      </div>
    </div>
  );
}
