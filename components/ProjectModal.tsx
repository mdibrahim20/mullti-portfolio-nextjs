"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";

import { cn } from "@/lib/cn";
import type { UiProject } from "@/components/Projects";

export function ProjectModal({
  project,
  onClose
}: {
  project: UiProject | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-label="Project details"
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute inset-0 cursor-default bg-bg/45 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close"
          />

          <motion.div
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border/80 bg-card/85 shadow-glow backdrop-blur"
            initial={{ y: 18, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 440, damping: 36 }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border/70 px-6 py-5">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-border/70 bg-bg/50">
                    {project.iconUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.iconUrl}
                        alt={project.iconAlt}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-lg">✨</span>
                    )}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-lg font-semibold tracking-tight">
                      {project.title}
                    </div>
                    <div className="text-sm text-muted">
                      {project.year ?? ""} • {(project.type?.length ? project.type : project.tags).join(" • ")}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-xl border border-border/70 bg-bg/50 text-muted transition hover:bg-bg/70 hover:text-fg"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-6 py-5">
              <p className="text-muted leading-relaxed">
                {project.fullDescription || project.summary}
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/70 bg-bg/40 p-4">
                  <div className="text-xs text-muted">Stack</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(project.stack || []).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border/70 bg-bg/50 px-3 py-1 text-xs text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border/70 bg-bg/40 p-4">
                  <div className="text-xs text-muted">Highlights</div>
                  <ul className="mt-2 space-y-2 text-sm text-muted">
                    {(project.highlights || []).map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Gallery (optional) */}
              {project.gallery?.some((g) => g.src) ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {project.gallery
                    .filter((g) => !!g.src)
                    .slice(0, 4)
                    .map((g, idx) => (
                      <div
                        key={`${g.src}-${idx}`}
                        className="overflow-hidden rounded-2xl border border-border/70 bg-bg/40"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={g.src}
                          alt={g.alt}
                          className="h-40 w-full object-cover"
                        />
                      </div>
                    ))}
                </div>
              ) : null}

              {/* Links */}
              {project.links?.length ? (
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {project.links.map((l) => {
                    const isRepo =
                      /github\.com/i.test(l.href) || l.label.toLowerCase() === "repo";
                    return (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                          "inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/70 px-4 py-2 text-sm shadow-sm backdrop-blur transition",
                          "hover:bg-card/90"
                        )}
                      >
                        {isRepo ? <Github className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                        {l.label}
                      </a>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
