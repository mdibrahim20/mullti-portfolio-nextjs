"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { ProjectModal } from "@/components/ProjectModal";
import { cn } from "@/lib/cn";

export type UiProject = {
  id: number;
  slug: string;
  title: string;

  year: number | null;
  tags: string[];
  type: string[];
  status: string;

  summary: string; // cardDescription
  fullDescription: string; // dialog fullDescription

  stack: string[];
  highlights: string[];

  iconUrl: string | null;
  iconAlt: string;

  gallery: { type: string; src: string; alt: string }[];
  links: { label: string; href: string }[];
};

export function Projects({
  projects = [],
  projectsData
}: {
  projects: UiProject[];
  projectsData?: any;
}) {
  const [tag, setTag] = useState<string>("All");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<UiProject | null>(null);

  const projectsSection = projectsData || {
    eyebrow: "02 • Projects",
    title: "Selected work, built end-to-end.",
    description:
      "A few things I shipped recently — each with intentional motion, clean structure, and performance in mind."
  };

  const tags = useMemo(() => {
    const all = new Set<string>();
    projects.forEach((p) => (p.tags || []).forEach((t) => all.add(t)));
    return ["All", ...Array.from(all).sort((a, b) => a.localeCompare(b))];
  }, [projects]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return projects.filter((p) => {
      const tagOk = tag === "All" ? true : (p.tags || []).includes(tag);
      const hay = `${p.title} ${p.summary} ${(p.tags || []).join(" ")} ${(p.stack || []).join(" ")}`
        .toLowerCase();
      const qOk = !query ? true : hay.includes(query);
      return tagOk && qOk;
    });
  }, [q, tag, projects]);

  return (
    <section id="projects" className="scroll-mt-28">
      <SectionHeader
        eyebrow={projectsSection.eyebrow}
        title={projectsSection.title}
        desc={projectsSection.description}
      />

      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTag(t)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs transition",
                  t === tag
                    ? "border-accent/60 bg-accent/15 text-fg"
                    : "border-border/80 bg-card/60 text-muted hover:bg-card/90"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-[260px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects…"
              className="w-full rounded-xl border border-border/80 bg-card/70 py-2 pl-10 pr-3 text-sm outline-none placeholder:text-muted shadow-sm backdrop-blur transition focus:border-accent/50"
            />
          </div>
        </div>
      </Reveal>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {filtered.map((p, idx) => (
          <Magnetic key={p.slug} strength={12}>
            <motion.button
              type="button"
              onClick={() => setSelected(p)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.04 }}
              className={cn(
                "group relative w-full rounded-2xl border border-border/80 bg-card/70 p-5 text-left shadow-sm backdrop-blur transition",
                "hover:bg-card/90"
              )}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100 gradient-border" />

              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-border/70 bg-bg/50">
                      {p.iconUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.iconUrl}
                          alt={p.iconAlt}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-lg">✨</span>
                      )}
                    </span>

                    <div className="min-w-0">
                      <div className="truncate text-base font-semibold tracking-tight">
                        {p.title}
                      </div>
                      <div className="text-xs text-muted">
                        {p.year ?? ""} • {(p.type?.length ? p.type : p.tags).join(" • ")}
                      </div>
                    </div>
                  </div>
                </div>

                <span className="rounded-full border border-border/70 bg-bg/50 px-3 py-1 font-mono text-[11px] text-muted">
                  {p.status || "open"}
                </span>
              </div>

              <p className="mt-4 text-sm text-muted leading-relaxed">{p.summary}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {(p.stack || []).slice(0, 5).map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border/70 bg-bg/50 px-3 py-1 text-xs text-muted"
                  >
                    {s}
                  </span>
                ))}
                {(p.stack || []).length > 5 ? (
                  <span className="rounded-full border border-border/70 bg-bg/50 px-3 py-1 text-xs text-muted">
                    +{p.stack.length - 5}
                  </span>
                ) : null}
              </div>
            </motion.button>
          </Magnetic>
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
