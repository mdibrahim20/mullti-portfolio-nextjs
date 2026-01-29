"use client";

import { useEffect, useMemo, useState } from "react";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Command, FileText, Github, Linkedin } from "lucide-react";
import Image from "next/image";

function openCommandMenu() {
  window.dispatchEvent(new CustomEvent("commandmenu:open"));
}

type NavItem = {
  id: number;
  label: string;
  url?: string | null;
  section_key?: string | null;
};

type SocialLink = {
  platform: string;
  url: string;
  icon?: string | null;
};

interface NavbarProps {
  siteConfig?: any;
  navItems?: NavItem[];
  socialLinks?: SocialLink[];
}

function getAnchorId(item: NavItem): string {
  // Prefer explicit section_key (best)
  if (item.section_key) return item.section_key;

  // Fallback: if url is "#about" => "about"
  if (item.url && item.url.startsWith("#")) return item.url.slice(1);

  // Fallback: if url is "/" => "home"
  if (item.url === "/") return "home";

  // Last resort: string version of DB id
  return String(item.id);
}

export function Navbar({ siteConfig, navItems = [], socialLinks = [] }: NavbarProps) {
  const config = {
  name: siteConfig?.site_name ?? "Your Name",
  role: siteConfig?.tagline ?? "Developer",
  logoUrl: siteConfig?.logo_url ?? null,
  resumeUrl: siteConfig?.settings?.resumeUrl ?? null,
};


  const links = useMemo(() => {
    // normalize keys to lowercase
    return socialLinks.reduce((acc, link) => {
      const key = (link.platform || "").toLowerCase(); // "github", "linkedin"
      acc[key] = link.url;
      return acc;
    }, {} as Record<string, string>);
  }, [socialLinks]);

  const items = useMemo(() => {
    return navItems.map((n) => ({
      ...n,
      anchorId: getAnchorId(n),
    }));
  }, [navItems]);

  const active = useActiveSection(items.map((n) => n.anchorId));
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3",
          scrolled ? "glass rounded-b-2xl shadow-sm" : "bg-transparent"
        )}
      >
        <a href="#home" className="group inline-flex items-center gap-2">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-card shadow-sm ring-1 ring-border/80 overflow-hidden">
  {config.logoUrl ? (
    <Image
      src={config.logoUrl}
      alt={`${config.name} logo`}
      width={36}
      height={36}
      className="h-full w-full object-contain"
      priority
    />
  ) : (
    <span className="text-base">✦</span>
  )}

  <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100 gradient-border" />
</span>

          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">{config.name}</div>
            <div className="text-xs text-muted">{config.role}</div>
          </div>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {items.map((item) => {
            const isActive = active === item.anchorId;
            return (
              <a
                key={item.id}
                href={`#${item.anchorId}`}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm transition",
                  "hover:bg-card/70 hover:text-fg",
                  isActive ? "bg-card/80 text-fg shadow-sm" : "text-muted"
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-xl border border-border/80 bg-card/70 p-2 text-muted shadow-sm backdrop-blur transition hover:bg-card/90 hover:text-fg sm:inline-flex"
              aria-label="GitHub"
              title="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          )}

          {links.linkedin && (
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-xl border border-border/80 bg-card/70 p-2 text-muted shadow-sm backdrop-blur transition hover:bg-card/90 hover:text-fg sm:inline-flex"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}

          <button
            type="button"
            onClick={openCommandMenu}
            className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/70 px-3 py-2 text-sm text-muted shadow-sm backdrop-blur transition hover:bg-card/90 hover:text-fg"
            aria-label="Open command menu"
            title="Open command menu"
          >
            <Command className="h-4 w-4" />
            <span className="hidden sm:inline">Menu</span>
            <span className="ml-1 hidden items-center gap-1 rounded-lg border border-border/70 bg-bg/60 px-2 py-1 font-mono text-[11px] text-muted sm:inline-flex">
              <span>⌘</span>
              <span>K</span>
            </span>
          </button>

          {(links.resume || config.resumeUrl) && (
            <a
              href={links.resume || config.resumeUrl}
              className="hidden items-center gap-2 rounded-xl bg-accent px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-95 md:inline-flex"
            >
              <FileText className="h-4 w-4" />
              Resume
            </a>
          )}

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
