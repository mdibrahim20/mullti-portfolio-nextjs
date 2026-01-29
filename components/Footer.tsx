'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowUpRight,
  Terminal,
  Clock,
} from 'lucide-react';

interface FooterProps {
  footerData?: {
    name?: string;
    role?: string;
    location?: string;
    email?: string;
    summary?: string;
    tagline?: string;
    version?: string;
    availability?: 'AVAILABLE' | 'BUSY' | 'OFFLINE';
    availability_note?: string;
    technologies?: string[];
    credit_text?: string;
    stack_text?: string;
    copyright_text?: string;
  };

  socialLinks?: { platform: string; url: string }[];
}

export function Footer({ footerData, socialLinks = [] }: FooterProps) {
  const config = {
    name: footerData?.name ?? 'Your Name',
    role: footerData?.role ?? 'Full-stack Engineer',
    location: footerData?.location ?? 'Location',
    email: footerData?.email ?? 'email@example.com',

    summary: footerData?.summary ?? '',

    tagline: footerData?.tagline ?? 'Building fast, reliable web products',

    version: footerData?.version ?? 'v.2026.01',

    availability: footerData?.availability ?? 'OFFLINE',

    availabilityNote: footerData?.availability_note ?? '',

    technologies: Array.isArray(footerData?.technologies) ? footerData!.technologies : [],

    creditText: footerData?.credit_text ?? 'Designed & developed by',

    stackText: footerData?.stack_text ?? 'Built with Next.js',

    copyrightText: footerData?.copyright_text ?? '',
  };

  const links = useMemo(
    () =>
      socialLinks.reduce(
        (acc, link) => ({ ...acc, [(link.platform || '').toLowerCase()]: link.url }),
        {} as Record<string, string>
      ),
    [socialLinks]
  );

  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const availabilityStyles =
    config.availability === 'AVAILABLE'
      ? {
          wrap: 'bg-emerald-500/10 border-emerald-500/20',
          dot: 'bg-emerald-500',
          text: 'text-emerald-500',
        }
      : config.availability === 'BUSY'
        ? {
            wrap: 'bg-amber-500/10 border-amber-500/20',
            dot: 'bg-amber-500',
            text: 'text-amber-600 dark:text-amber-500',
          }
        : {
            wrap: 'bg-neutral-500/10 border-neutral-500/20',
            dot: 'bg-neutral-400',
            text: 'text-neutral-500',
          };

  const availabilityLabel =
    config.availability === 'AVAILABLE'
      ? 'AVAILABLE'
      : config.availability === 'BUSY'
        ? 'BUSY'
        : 'OFFLINE';

  const copyright =
    config.copyrightText?.trim() ||
    `© ${new Date().getFullYear()} ${config.name}. All rights reserved.`;

  // Theme tokens (match Navbar style)
  const cardClass =
    'rounded-3xl border border-border/80 bg-card/70 p-6 shadow-sm backdrop-blur transition-all hover:bg-card/90';
  const labelClass = 'text-[10px] font-bold uppercase tracking-widest text-muted';
  const subtleText = 'text-muted';
  const strongText = 'text-fg';

  return (
    <footer className="mx-auto w-full max-w-6xl px-6 pb-10">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4 lg:grid-cols-6">
        {/* Profile Card */}
        <div className={`${cardClass} group flex flex-col justify-between md:col-span-2 lg:col-span-2`}>
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-500 transition-transform group-hover:scale-110">
              <Terminal size={24} />
            </div>

            <div className="space-y-2">
              <div>
                <h2 className={`text-xl font-bold tracking-tight ${strongText}`}>{config.name}</h2>
                <p className={`text-sm ${subtleText}`}>
                  {config.role}
                  {config.location ? ` • ${config.location}` : ''}
                </p>
              </div>

              <p className={`text-sm leading-relaxed ${subtleText}`}>{config.summary}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {(config.technologies ?? []).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border/80 bg-bg/60 px-3 py-1 font-mono text-[10px] text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Social Links Bento */}
        <div className={`${cardClass} lg:col-span-1`}>
          <span className={labelClass}>Online</span>

          <div className="mt-4 flex flex-col gap-3">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between text-muted transition-colors hover:text-fg"
                aria-label="GitHub"
              >
                <span className="flex items-center gap-3">
                  <Github size={20} />
                  <span className="text-sm">GitHub</span>
                </span>
                <ArrowUpRight size={14} className="opacity-60 transition-opacity group-hover:opacity-100" />
              </a>
            )}

            {links.linkedin && (
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between text-muted transition-colors hover:text-fg"
                aria-label="LinkedIn"
              >
                <span className="flex items-center gap-3">
                  <Linkedin size={20} />
                  <span className="text-sm">LinkedIn</span>
                </span>
                <ArrowUpRight size={14} className="opacity-60 transition-opacity group-hover:opacity-100" />
              </a>
            )}

            {links.twitter && (
              <a
                href={links.twitter}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between text-muted transition-colors hover:text-fg"
                aria-label="Twitter / X"
              >
                <span className="flex items-center gap-3">
                  <Twitter size={20} />
                  <span className="text-sm">Twitter / X</span>
                </span>
                <ArrowUpRight size={14} className="opacity-60 transition-opacity group-hover:opacity-100" />
              </a>
            )}

            <a
              href={`mailto:${config.email}`}
              className="group flex items-center justify-between text-muted transition-colors hover:text-fg"
              aria-label="Email"
            >
              <span className="flex items-center gap-3">
                <Mail size={20} />
                <span className="text-sm">Email</span>
              </span>
              <ArrowUpRight size={14} className="opacity-60 transition-opacity group-hover:opacity-100" />
            </a>
          </div>
        </div>

        {/* Status & Time Bento */}
        <div className={`${cardClass} flex flex-col justify-between lg:col-span-1`}>
          <div className="space-y-1">
            <span className={labelClass}>Local time</span>

            <div className="flex items-center gap-2 font-mono text-fg">
              <Clock size={14} className="text-muted" />
              {time || '--:--'}
            </div>
          </div>

          <div className="mt-auto space-y-3">
            <div className={`flex w-fit items-center gap-2 rounded-full border px-3 py-1 ${availabilityStyles.wrap}`}>
              <div className={`h-1.5 w-1.5 animate-pulse rounded-full ${availabilityStyles.dot}`} />
              <span className={`text-[10px] font-bold ${availabilityStyles.text}`}>{availabilityLabel}</span>
            </div>

            {config.availabilityNote ? <p className="text-xs text-muted">{config.availabilityNote}</p> : null}
          </div>
        </div>

        {/* Quick Links / CTA (kept gradient on purpose) */}
        <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-blue-600 to-violet-700 p-6 shadow-lg shadow-blue-900/20 md:col-span-2 lg:col-span-2">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-bold text-white">{config.tagline}</h3>
            <Mail size={20} className="text-white/60" />
          </div>

          <div className="mt-8 flex items-end justify-between">
            <nav className="flex gap-4">
              <a href="#projects" className="text-sm font-medium text-white transition-colors hover:text-white/70">
                Projects
              </a>
              <a href="#resume" className="text-sm font-medium text-white transition-colors hover:text-white/70">
                Resume
              </a>
              <a href="#contact" className="text-sm font-medium text-white transition-colors hover:text-white/70">
                Contact
              </a>
            </nav>

            <div className="text-[10px] font-mono text-white/50">{config.version}</div>
          </div>
        </div>

        {/* Footer Credit Line */}
        <div className="flex flex-col items-center justify-between px-2 py-4 text-[11px] uppercase tracking-tighter text-muted md:col-span-4 md:flex-row lg:col-span-6">
          <div className="flex items-center gap-4">
            <span>
              {config.creditText} {config.name}
            </span>
            <span className="hidden md:block">/</span>
            <span>{config.stackText}</span>
          </div>

          <div className="mt-2 opacity-70 md:mt-0">{copyright}</div>
        </div>
      </div>

      {/* Utility row */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-muted">
        <a className="hover:text-fg transition-colors" href={`mailto:${config.email}`}>
          {config.email}
        </a>
        <span className="opacity-50">•</span>
        <a className="hover:text-fg transition-colors" href="#privacy">
          Privacy
        </a>
        <span className="opacity-50">•</span>
        <a className="hover:text-fg transition-colors" href="#terms">
          Terms
        </a>
        <span className="opacity-50">•</span>
        <a className="hover:text-fg transition-colors" href="#home">
          Back to top
        </a>
      </div>
    </footer>
  );
}
