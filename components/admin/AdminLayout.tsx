'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Briefcase, 
  Settings, 
  Target,
  MessageSquare,
  LogOut,
  Sparkles,
  Info,
  Folder,
  Code
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/cn';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Hero Section', href: '/admin/hero', icon: Sparkles },
  { name: 'About Section', href: '/admin/about', icon: Info },
  { name: 'Projects Section', href: '/admin/projects-section', icon: Folder },
  { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { name: 'Skills Section', href: '/admin/skills-section', icon: Code },
  { name: 'Skills', href: '/admin/skills', icon: Target },
  { name: 'Experience Section', href: '/admin/experience-section', icon: Briefcase },
  { name: 'Experience', href: '/admin/experience', icon: Briefcase },
  { name: 'Contact Section', href: '/admin/contact-section', icon: MessageSquare },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Site Config', href: '/admin/site-config', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-zinc-200 dark:border-zinc-800 px-6">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            Portfolio Admin
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 p-4">
        <Link
          href="/"
          target="_blank"
          className="mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
