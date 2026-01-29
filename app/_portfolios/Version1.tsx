import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { fetchSiteData } from "@/lib/api";
import { Footer } from "@/components/Footer";

async function getSiteData() {
  const res = await fetchSiteData();
  return res.data;
}

/**
 * Portfolio Version 1 (existing implementation)
 *
 * NOTE: This is intentionally the same logic as your previous app/page.tsx.
 * Root routing now chooses which version to render based on Laravel's setting.
 */
export default async function Version1() {
  const data = await getSiteData();

  const siteConfig = data.siteConfig;

  // Pick the first row from each "section" array (seeded as single-record)
  const heroSection = data.sections?.hero?.[0] ?? null;
  const aboutSection = data.sections?.about?.[0] ?? null;
  const projectsSection = data.sections?.projects?.[0] ?? null;
  const skillsSection = data.sections?.skills?.[0] ?? null;
  const experienceSection = data.sections?.experience?.[0];
  const experiences = data.experiences ?? [];
  const contactSection = data.sections?.contact?.[0] ?? null;
  const footer = data.sections?.footer?.[0] ?? null;

  const heroSettings = heroSection?.settings ?? {};
  const infoPanels = Array.isArray(heroSettings?.infoPanels) ? heroSettings.infoPanels : [];

  const primaryCta = heroSettings?.cta?.primary ?? heroSection?.ctas?.[0] ?? null;
  const secondaryCta = heroSettings?.cta?.secondary ?? heroSection?.ctas?.[1] ?? null;

  const featureCards = Array.isArray(heroSettings?.featureCards) ? heroSettings.featureCards : [];
  const heroSiteConfig = {
    ...(siteConfig ?? {}),
    name: siteConfig?.site_name ?? "Your Name",
    role: siteConfig?.tagline ?? "Developer",
    location: heroSettings?.meta?.location ?? "Remote",
    highlights: featureCards.map((c: any) => ({
      label: c?.label ?? "",
      value: c?.value ?? "",
    })),
  };

  const heroData = heroSection
    ? {
        badgeText: heroSettings?.badge?.text ?? "Kinetic portfolio • motion-first UI • fast",
        heading: heroSection.headline ?? "",
        subheading: heroSection.subheadline ?? "",

        ctaPrimaryText: primaryCta?.label ?? "View projects",
        ctaPrimaryLink: primaryCta?.url ?? "#projects",

        ctaSecondaryText: secondaryCta?.label ?? "Contact",
        ctaSecondaryLink: secondaryCta?.url ?? "#contact",

        commandHint: heroSettings?.commandHint?.text ?? "Press ⌘K for the command menu",

        infoCard1Title: infoPanels?.[0]?.title ?? "ready_to_collab()",
        infoCard1Body:
          infoPanels?.[0]?.body ?? "Open to freelance, contract, or full-time roles where craft matters.",

        infoCard2Title: infoPanels?.[1]?.title ?? "shipping",
        infoCard2Body:
          infoPanels?.[1]?.body ??
          "I love building end-to-end: crisp UI, robust data models, and production-ready deployments.",
      }
    : undefined;

  const aboutSettings = aboutSection?.settings ?? {};
  const aboutData = aboutSection
    ? {
        eyebrow: aboutSettings?.eyebrow ?? "01 • About",
        title: aboutSettings?.header?.title ?? aboutSection.title ?? "About",
        description: aboutSettings?.header?.description ?? "",
        paragraph1: aboutSettings?.content?.paragraphs?.[0] ?? "",
        paragraph2: aboutSettings?.content?.paragraphs?.[1] ?? "",
        signatureText: aboutSettings?.signature?.text ?? "",
        nowBuildingLabel: aboutSettings?.nowBuilding?.label ?? "Now building",
        nowBuildingTag: aboutSettings?.nowBuilding?.tag ?? "focus",
        nowBuildingItems: Array.isArray(aboutSettings?.nowBuilding?.items) ? aboutSettings.nowBuilding.items : [],
        principles: Array.isArray(aboutSettings?.principles) ? aboutSettings.principles : [],
      }
    : undefined;

  const projectsData = projectsSection
    ? {
        eyebrow: projectsSection.eyebrow ?? "02 • Projects",
        title: projectsSection.title ?? "Selected work, built end-to-end.",
        description: projectsSection.description ?? "",
      }
    : null;

  const skillsData = skillsSection
    ? {
        eyebrow: skillsSection.eyebrow,
        title: skillsSection.title,
        description: skillsSection.description,
        layout: skillsSection.layout,
        background: skillsSection.background,
        meta: skillsSection.meta,
        categories: data.skills?.categories ?? [],
        radar: data.skills?.radars?.[0] ?? null,
      }
    : null;

  const experienceData = experienceSection
    ? {
        eyebrow: experienceSection.eyebrow ?? "04 • Experience",
        title: experienceSection.title ?? "Experience",
        description: experienceSection.description ?? "",
      }
    : null;

  const experienceItems = (experiences ?? []).map((e: any) => ({
    id: e.id,
    role: e.role,
    company: e.company,
    location: e.location,
    isCurrent: !!e.is_current,
    startDate: e.start_date,
    endDate: e.end_date,
    description: e.description ?? "",
    bullets: Array.isArray(e.bullets) ? e.bullets : [],
    tags: Array.isArray(e.tags)
      ? e.tags
      : Array.isArray(e.meta?.tags)
        ? e.meta.tags
        : [],
    period: e.period ?? `${e.start_date ?? ""} - ${e.end_date ?? (e.is_current ? "Present" : "")}`,
    title: e.title ?? e.role ?? "",
    org: e.org ?? e.company ?? "",
  }));

  const contactSettings = contactSection?.settings ?? {};
  const contactData = contactSection
    ? {
        id: contactSettings?.id ?? "contact",
        eyebrow: contactSettings?.eyebrow ?? "05 • Contact",
        title: contactSettings?.title ?? contactSection.title ?? "Contact",
        description: contactSettings?.description ?? contactSection.subtitle ?? "",
        layout: contactSettings?.layout ?? {
          type: "two-column",
          left: "direct-line",
          right: "quick-message",
        },
        directLineCard: contactSettings?.directLineCard ?? null,
        quickMessageForm: contactSettings?.quickMessageForm ?? null,
        notifications: contactSettings?.notifications ?? { dashboard: { enabled: true } },
        background: contactSettings?.background ?? null,
        meta: contactSettings?.meta ?? null,
        contact_methods: contactSection.contact_methods ?? [],
      }
    : null;

  const projects = (data.projects ?? []).map((p: any) => {
    const tags = Array.isArray(p.tags) ? p.tags : Array.isArray(p.meta?.type) ? p.meta.type : [];
    const stack = Array.isArray(p.stack) ? p.stack : Array.isArray(p.tech_stack) ? p.tech_stack : [];
    const highlights = Array.isArray(p.highlights) ? p.highlights : [];

    const galleryRaw = Array.isArray(p.gallery) ? p.gallery : Array.isArray(p?.media?.gallery) ? p.media.gallery : [];
    const gallery = galleryRaw.map((g: any) => ({
      type: g?.type ?? "image",
      alt: g?.alt ?? "",
      src: g?.src_url ?? g?.src ?? "",
    }));

    const linksObj = typeof p.links === "object" && p.links !== null ? p.links : {};
    const links = [
      linksObj.live ? { label: "Live", href: linksObj.live } : null,
      linksObj.repo ? { label: "Repo", href: linksObj.repo } : null,
    ].filter(Boolean) as { label: string; href: string }[];

    return {
      id: p.id,
      slug: p.slug,
      title: p.title,
      year: typeof p?.meta?.year === "number" ? p.meta.year : null,
      type: Array.isArray(p?.meta?.type) ? p.meta.type : [],
      status: p?.meta?.status ?? "open",
      tags,
      stack,
      highlights,
      summary: p?.summary_json?.cardDescription ?? p?.summary ?? "",
      fullDescription: p?.summary_json?.fullDescription ?? p?.description ?? "",
      iconUrl: p?.thumbnail_icon_url ?? null,
      iconAlt: p?.thumbnail?.alt ?? p?.title ?? "",
      gallery,
      links,
    };
  });

  return (
    <>
      <Hero siteConfig={heroSiteConfig} heroData={heroData} />
      <div className="mt-20 space-y-24">
        <About siteConfig={siteConfig} aboutData={aboutData} />
        <Projects projects={projects} projectsData={projectsData} />
        <Skills skillsData={skillsData} />
        <Experience experience={experienceItems} experienceData={experienceData} />
        <Contact siteConfig={siteConfig} contactData={contactData} />
        <Footer footerData={footer} socialLinks={footer?.social_links ?? data.socialLinks ?? []} />
      </div>
    </>
  );
}
