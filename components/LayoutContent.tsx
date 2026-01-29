'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CursorGlow } from '@/components/CursorGlow';
import { NetworkCanvas } from '@/components/NetworkCanvas';
import { CommandMenu } from '@/components/CommandMenu';

interface LayoutContentProps {
  children: React.ReactNode;
  siteConfig: any;
  navItems: { id: string; label: string }[];
  socialLinks: { platform: string; url: string }[];
}

export function LayoutContent({ children, siteConfig, navItems, socialLinks }: LayoutContentProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-xl focus:bg-card focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      {!isAdminRoute && (
        <>
          <CursorGlow />
          <NetworkCanvas />
          <div className="bg-grid pointer-events-none fixed inset-0 -z-10 opacity-[0.35] dark:opacity-[0.25]" />
          <Navbar
            siteConfig={siteConfig}
            navItems={navItems.map(item => ({ ...item, id: Number(item.id) }))}
            socialLinks={socialLinks}
          />
        </>
      )}

      <main id="content" className={isAdminRoute ? "" : "mx-auto w-full max-w-6xl px-6 pb-24 pt-24"}>
        {children}
      </main>

      {!isAdminRoute && (
        <>
          {/* <Footer siteConfig={siteConfig} socialLinks={socialLinks} /> */}
          <CommandMenu />
        </>
      )}
    </>
  );
}
