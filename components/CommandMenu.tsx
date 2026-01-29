"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  Copy,
  Github,
  Mail,
  Moon,
  Search,
  Sun,
  TextCursorInput,
  User,
  Wrench,
  Briefcase,
  Code2,
  Linkedin,
  FileText
} from "lucide-react";

import { site } from "@/data/site";
import { cn } from "@/lib/cn";

type Action = {
  id: string;
  label: string;
  hint?: string;
  keywords: string[];
  icon: React.ReactNode;
  run: () => void;
};

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CommandMenu() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isDark = (theme ?? resolvedTheme) === "dark";

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const actions = useMemo<Action[]>(() => {
    const navIcons: Record<string, React.ReactNode> = {
      about: <User className="h-4 w-4" />,
      projects: <Code2 className="h-4 w-4" />,
      skills: <Wrench className="h-4 w-4" />,
      experience: <Briefcase className="h-4 w-4" />,
      contact: <Mail className="h-4 w-4" />
    };

    const nav = site.nav.map((n) => ({
      id: `nav:${n.id}`,
      label: `Go to ${n.label}`,
      hint: `#${n.id}`,
      keywords: [n.label, n.id, "section", "go", "open"],
      icon: navIcons[n.id] ?? <ArrowRight className="h-4 w-4" />,
      run: () => scrollToId(n.id)
    }));

    const quick: Action[] = [
      {
        id: "copy:email",
        label: "Copy email",
        hint: site.email,
        keywords: ["email", "copy", "contact"],
        icon: <Copy className="h-4 w-4" />,
        run: async () => {
          await navigator.clipboard.writeText(site.email);
          setToast("Email copied.");
        }
      },
      {
        id: "open:email",
        label: "Compose email",
        hint: site.email,
        keywords: ["email", "compose", "contact", "mailto"],
        icon: <Mail className="h-4 w-4" />,
        run: () => {
          window.location.href = `mailto:${site.email}`;
        }
      },
      {
        id: "open:github",
        label: "Open GitHub",
        hint: "External",
        keywords: ["github", "code", "repo"],
        icon: <Github className="h-4 w-4" />,
        run: () => window.open(site.links.github, "_blank", "noopener,noreferrer")
      },
      {
        id: "open:linkedin",
        label: "Open LinkedIn",
        hint: "External",
        keywords: ["linkedin", "network"],
        icon: <Linkedin className="h-4 w-4" />,
        run: () => window.open(site.links.linkedin, "_blank", "noopener,noreferrer")
      },
      {
        id: "open:resume",
        label: "Open resume",
        hint: "PDF",
        keywords: ["resume", "cv", "pdf"],
        icon: <FileText className="h-4 w-4" />,
        run: () => window.open(site.links.resume, "_blank", "noopener,noreferrer")
      },
      {
        id: "toggle:theme",
        label: `Switch to ${isDark ? "light" : "dark"} mode`,
        hint: "Theme",
        keywords: ["theme", "dark", "light", "toggle"],
        icon: isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />,
        run: () => setTheme(isDark ? "light" : "dark")
      }
    ];

    return [...nav, ...quick];
  }, [isDark, setTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => {
      const hay = `${a.label} ${a.hint ?? ""} ${a.keywords.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [actions, query]);

  // Open via ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = typeof e.key === "string" ? e.key.toLowerCase() : "";
const isK = key === "k";

      const isCmdK = (e.metaKey || e.ctrlKey) && isK;
      if (isCmdK) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };

    const onOpen = () => setOpen(true);

    window.addEventListener("keydown", onKey);
    window.addEventListener("commandmenu:open", onOpen as EventListener);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("commandmenu:open", onOpen as EventListener);
    };
  }, []);

  // Focus + scroll lock
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setToast(null);
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 1600);
    return () => window.clearTimeout(t);
  }, [toast]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-label="Command menu"
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute inset-0 cursor-default bg-bg/35 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="Close"
          />

          <motion.div
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border/80 bg-card/85 shadow-glow backdrop-blur"
            initial={{ y: 14, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 440, damping: 34 }}
          >
            <div className="flex items-center gap-3 border-b border-border/70 px-4 py-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl border border-border/70 bg-bg/50">
                <Search className="h-4 w-4 text-muted" />
              </div>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search actions…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
              />
              <div className="hidden items-center gap-1 rounded-lg border border-border/70 bg-bg/50 px-2 py-1 font-mono text-[11px] text-muted sm:flex">
                <span>ESC</span>
              </div>
            </div>

            <div className="max-h-[55vh] overflow-auto p-2">
              {filtered.length ? (
                <ul className="space-y-1">
                  {filtered.map((a) => (
                    <li key={a.id}>
                      <button
                        type="button"
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition",
                          "hover:bg-bg/60 active:scale-[0.995]"
                        )}
                        onClick={() => {
                          a.run();
                          setOpen(false);
                        }}
                      >
                        <span className="grid h-9 w-9 place-items-center rounded-xl border border-border/70 bg-bg/50 text-muted">
                          {a.icon}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium">{a.label}</span>
                          {a.hint ? (
                            <span className="block truncate text-xs text-muted">{a.hint}</span>
                          ) : null}
                        </span>

                        <span className="grid h-8 w-8 place-items-center rounded-xl border border-border/70 bg-bg/50 text-muted">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-3 py-10 text-center text-sm text-muted">
                  <TextCursorInput className="mx-auto mb-3 h-5 w-5" />
                  No results for <span className="font-mono">{query}</span>.
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border/70 px-4 py-3">
              <div className="text-xs text-muted">
                Tip: try <span className="font-mono">projects</span> or <span className="font-mono">email</span>
              </div>
              <div className="flex items-center gap-2">
                {toast ? (
                  <span className="rounded-lg border border-border/70 bg-bg/50 px-2 py-1 text-xs text-muted">
                    {toast}
                  </span>
                ) : null}

                <span className="hidden items-center gap-1 rounded-lg border border-border/70 bg-bg/50 px-2 py-1 font-mono text-[11px] text-muted sm:inline-flex">
                  <span>⌘</span>
                  <span>K</span>
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
