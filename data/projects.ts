export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  tags: string[];
  stack: string[];
  highlights: string[];
  links?: { label: string; href: string }[];
  cover?: { emoji: string; title: string };
};

export const projects: Project[] = [
  {
    slug: "atlas-ui",
    title: "Atlas UI",
    summary:
      "A motion-first component library with a token system, accessibility defaults, and delightful microinteractions.",
    year: "2025",
    tags: ["Web", "Open Source"],
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    highlights: [
      "Token-driven theming + dark mode",
      "Motion primitives for consistent transitions",
      "A11y-first components with sensible defaults"
    ],
    links: [
      { label: "Live", href: "https://example.com" },
      { label: "Repo", href: "https://github.com/yourhandle/atlas-ui" }
    ],
    cover: { emoji: "🧭", title: "Design system" }
  },
  {
    slug: "relay-analytics",
    title: "Relay Analytics",
    summary:
      "A realtime dashboard that turns raw events into insights — with streaming updates and careful performance work.",
    year: "2024",
    tags: ["Web", "Data"],
    stack: ["React", "Node.js", "PostgreSQL", "WebSockets"],
    highlights: [
      "Realtime charts with smart throttling",
      "Server-side aggregation + caching",
      "Responsive layouts with keyboard navigation"
    ],
    links: [{ label: "Case Study", href: "https://example.com" }],
    cover: { emoji: "📡", title: "Realtime" }
  },
  {
    slug: "prism-notes",
    title: "Prism Notes",
    summary:
      "A crisp note-taking app with offline-first behavior, instant search, and cross-device sync.",
    year: "2024",
    tags: ["Product", "Mobile"],
    stack: ["React", "IndexedDB", "Sync", "PWA"],
    highlights: [
      "Offline-first with conflict resolution",
      "Instant search with ranking",
      "Installable PWA with background sync"
    ],
    links: [{ label: "Live", href: "https://example.com" }],
    cover: { emoji: "📝", title: "Offline-first" }
  },
  {
    slug: "edge-commerce",
    title: "Edge Commerce",
    summary:
      "A high-performance storefront optimized for Core Web Vitals, with edge caching and a clean checkout experience.",
    year: "2023",
    tags: ["Web", "Performance"],
    stack: ["Next.js", "Edge", "Stripe", "PostgreSQL"],
    highlights: [
      "Optimized routing + caching strategy",
      "Checkout UX improvements increased conversion",
      "Instrumentation + performance budgets"
    ],
    cover: { emoji: "⚡️", title: "Speed" }
  }
];
