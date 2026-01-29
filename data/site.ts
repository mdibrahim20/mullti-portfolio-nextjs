export const site = {
  // Update these 👇
  url: "https://example.com",
  name: "Your Name",
  role: "Software Developer",
  location: "Remote • Your City",
  email: "you@example.com",
  description:
    "I build fast, elegant web products with motion, clarity, and strong engineering fundamentals.",
  keywords: ["Portfolio", "Software Developer", "Full Stack", "Next.js", "React", "TypeScript"],

  // Navigation order matches sections on the homepage
  nav: [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" }
  ],

  links: {
    github: "https://github.com/yourhandle",
    linkedin: "https://www.linkedin.com/in/yourhandle",
    twitter: "https://twitter.com/yourhandle",
    resume: "/resume.pdf"
  },

  highlights: [
    { label: "Ship velocity", value: "Fast + reliable" },
    { label: "Focus", value: "DX • Performance • UI" },
    { label: "Style", value: "Clean + animated" }
  ],

  principles: [
    {
      title: "Design like an engineer",
      body: "Systems, constraints, components. Pretty is good — predictable is better."
    },
    {
      title: "Motion with purpose",
      body: "Animations should guide attention, explain hierarchy, and feel effortless."
    },
    {
      title: "Performance is a feature",
      body: "Fast pages win trust. I obsess over loading, rendering, and polish."
    }
  ],

  // Radar chart (0..1)
  skillRadar: [
    { label: "UI Engineering", value: 0.92 },
    { label: "Architecture", value: 0.82 },
    { label: "Performance", value: 0.86 },
    { label: "Product Sense", value: 0.78 },
    { label: "Backend", value: 0.72 },
    { label: "DevOps", value: 0.64 }
  ],

  // Skill chips
  skills: {
    "Frontend": ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Accessibility"],
    "Backend": ["Node.js", "PostgreSQL", "Prisma", "REST", "GraphQL", "Redis"],
    "Tooling": ["Git", "CI/CD", "Docker", "Testing", "Storybook", "Monorepos"]
  }
} as const;
