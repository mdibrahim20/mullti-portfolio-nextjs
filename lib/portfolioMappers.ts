// lib/portfolioMappers.ts

export type LaravelSiteData = any;

/**
 * Helpers
 */
const str = (v: any, fallback = ""): string => (typeof v === "string" ? v : fallback);
const arr = <T = any>(v: any, fallback: T[] = []): T[] => (Array.isArray(v) ? v : fallback);
const obj = (v: any, fallback: Record<string, any> = {}) =>
  v && typeof v === "object" && !Array.isArray(v) ? v : fallback;

function pickFirst<T = any>(v: any): T | null {
  return Array.isArray(v) ? (v[0] ?? null) : null;
}

function splitParagraphs(raw: any): string[] {
  if (Array.isArray(raw)) return raw.filter(Boolean).map((x) => String(x));
  if (typeof raw === "string") {
    return raw
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

/**
 * Map Laravel API response -> Version2 UI expected shape:
 * {
 *   site: { branding, social, navigation, meta },
 *   sections: { hero, about, projects, skills, experience, contact, footer }
 * }
 */
export function mapLaravelToV2(data: LaravelSiteData) {
  const siteConfig = obj(data?.siteConfig ?? data?.site_config ?? {});
  const sectionsRoot = obj(data?.sections ?? {});

  // Laravel sections are arrays (seeded single record)
  const heroSection = pickFirst(obj(sectionsRoot)?.hero);
  const aboutSection = pickFirst(obj(sectionsRoot)?.about);
  const projectsSection = pickFirst(obj(sectionsRoot)?.projects);
  const skillsSection = pickFirst(obj(sectionsRoot)?.skills);
  const experienceSection = pickFirst(obj(sectionsRoot)?.experience);
  const contactSection = pickFirst(obj(sectionsRoot)?.contact);
  const footerSection = pickFirst(obj(sectionsRoot)?.footer);

  const heroSettings = obj(heroSection?.settings);
  const aboutSettings = obj(aboutSection?.settings);
  const projectsSettings = obj(projectsSection?.settings);
  const skillsSettings = obj(skillsSection?.settings);
  const contactSettings = obj(contactSection?.settings);
  const footerSettings = obj(footerSection?.settings);

  const ctas = arr(heroSection?.ctas, []);
  const primaryCta =
    obj(heroSettings?.cta)?.primary ??
    ctas[0] ??
    ({ label: "View Projects", url: "#projects" } as any);

  const secondaryCta =
    obj(heroSettings?.cta)?.secondary ??
    ctas[1] ??
    ({ label: "Contact", url: "#contact" } as any);

  // Projects list comes from data.projects (like v1)
  const projects = arr(data?.projects, []).map((p: any) => {
    const tags = arr(p?.tags, arr(p?.meta?.type, []));
    const badges = arr(p?.stack, arr(p?.tech_stack, tags)).filter(Boolean).slice(0, 6);

    const linksObj = obj(p?.links);
    const href =
      str(linksObj?.live) ||
      str(linksObj?.repo) ||
      str(p?.url) ||
      str(p?.link) ||
      "#";

    return {
      id: str(p?.slug) || String(p?.id ?? "project"),
      title: str(p?.title, "Untitled Project"),
      year: String(p?.meta?.year ?? p?.year ?? ""),
      summary: str(p?.summary_json?.cardDescription) || str(p?.summary) || str(p?.description) || "",
      href,
      badges: badges.map((x: any) => String(x)),
    };
  });

  // Experience list comes from data.experiences
  const experiences = arr(data?.experiences, []).map((e: any) => {
    const tags = arr(e?.tags, arr(e?.meta?.tags, []));
    const start = str(e?.start_date, "");
    const end = e?.is_current ? "Present" : str(e?.end_date, "");
    return {
      title: str(e?.role) || str(e?.title) || "Role",
      company: str(e?.company) || str(e?.org) || "Company",
      location: str(e?.location, ""),
      start: start,
      end: end || "",
      highlights: arr(e?.bullets, []).map((x: any) => String(x)).filter(Boolean),
      tech: tags.map((x: any) => String(x)).filter(Boolean),
    };
  });

  // Skills groups: prefer backend categories if present
  const skillCategories = obj(data?.skills)?.categories;
  const groupsFromBackend =
    Array.isArray(skillCategories) && skillCategories.length
      ? skillCategories.map((c: any) => ({
          name: str(c?.name, "Skills"),
          items: arr(c?.items, arr(c?.skills, [])).map((x: any) => String(x)).filter(Boolean),
        }))
      : [];

  const groupsFromSettings = arr(skillsSettings?.groups, []).map((g: any) => ({
    name: str(g?.name, "Skills"),
    items: arr(g?.items, []).map((x: any) => String(x)).filter(Boolean),
  }));

  const skillsGroups = (groupsFromBackend.length ? groupsFromBackend : groupsFromSettings).filter(
    (g: any) => g.name && g.items?.length
  );

  // Social links: footer/socialLinks fallback
  const socialLinks = arr(data?.socialLinks, arr(footerSection?.social_links, []));
  const socialMap = socialLinks.reduce((acc: any, item: any) => {
    const key = String(item?.platform ?? item?.key ?? "").toLowerCase();
    const href = str(item?.url) || str(item?.href) || "";
    if (!key || !href) return acc;
    acc[key] = href;
    return acc;
  }, {});

  const email =
    str(siteConfig?.email) ||
    str(siteConfig?.contact_email) ||
    str(socialMap?.email) ||
    "email@example.com";

  const github = str(siteConfig?.github_url) || str(socialMap?.github) || "#";
  const linkedin = str(siteConfig?.linkedin_url) || str(socialMap?.linkedin) || "#";

  const siteName = str(siteConfig?.site_name, "Your Name");
  const tagline = str(siteConfig?.tagline, "Full-stack Engineer");

  const navHeader =
    arr(siteConfig?.navigation?.header, []).length
      ? arr(siteConfig?.navigation?.header, [])
      : [
          { id: "home", label: "Home", href: "#home" },
          { id: "about", label: "About", href: "#about" },
          { id: "projects", label: "Projects", href: "#projects" },
          { id: "skills", label: "Skills", href: "#skills" },
          { id: "experience", label: "Experience", href: "#experience" },
          { id: "contact", label: "Contact", href: "#contact" },
        ];

  const infoPanels = arr(heroSettings?.infoPanels, []) as any[];
  const featureCards = arr(heroSettings?.featureCards, []) as any[];

  const terminalHighlights =
    featureCards.length
      ? featureCards.map((c: any) => ({
          label: str(c?.label, ""),
          text: str(c?.value, ""),
        }))
      : [
          {
            label: str(infoPanels?.[0]?.title, "Open"),
            text: str(
              infoPanels?.[0]?.body,
              "Open to freelance, contract, or full-time roles where craft matters."
            ),
          },
          {
            label: str(infoPanels?.[1]?.title, "Shipping"),
            text: str(
              infoPanels?.[1]?.body,
              "I love building end-to-end: crisp UI, robust data models, and production-ready deployments."
            ),
          },
        ];

  // Footer profile tech chips: use first 6 skills items as a nice default
  const defaultTechChips =
    skillsGroups.flatMap((g: any) => arr(g?.items, [])).filter(Boolean).slice(0, 6) ?? [];

  // Footer connect links: from socialLinks with sane defaults
  const footerConnectLinks = [
    { platform: "GitHub", key: "github", href: github },
    { platform: "LinkedIn", key: "linkedin", href: linkedin },
    { platform: "Email", key: "email", href: `mailto:${email}` },
  ].filter((x) => x.href && x.href !== "#");

  const mapped = {
    site: {
      meta: {
        title: str(siteConfig?.site_name, "My Portfolio"),
        description: str(siteConfig?.meta_description, str(siteConfig?.tagline, "")),
        language: "en",
        theme: { defaultMode: "dark", allowToggle: true },
      },
      branding: {
        name: siteName,
        handle: str(siteConfig?.handle, siteName),
        role: tagline,
        location: str(heroSettings?.meta?.location, str(siteConfig?.location, "Remote")),
        availability: {
          status: str(siteConfig?.availability_status, "AVAILABLE"),
          note: str(siteConfig?.availability_note, ""),
        },
      },
      social: {
        github,
        linkedin,
        twitter: str(socialMap?.twitter) || str(socialMap?.x) || "#",
        email,
        whatsapp: str(socialMap?.whatsapp) || "#",
        discord: str(socialMap?.discord) || "#",
      },
      navigation: {
        header: navHeader,
        footerPrimary: [
          { id: "projects", label: "Projects", href: "#projects" },
          { id: "contact", label: "Contact", href: "#contact" },
        ],
        footerUtility: [
          { id: "backToTop", label: "Back to top", href: "#home" },
        ],
      },
    },

    sections: {
      hero: {
        id: "home",
        eyebrow: str(heroSettings?.badge?.text, str(heroSection?.eyebrow, "Kinetic portfolio • motion-first UI • fast")),
        headline: str(heroSection?.headline, siteName),
        subheadline: str(heroSection?.subheadline, tagline),
        primaryCta: { label: str(primaryCta?.label, "View Projects"), href: str(primaryCta?.url, "#projects") },
        secondaryCta: { label: str(secondaryCta?.label, "Contact"), href: str(secondaryCta?.url, "#contact") },
        statusChips: arr(heroSettings?.statusChips, []).length
          ? arr(heroSettings?.statusChips, [])
          : [{ label: str(heroSettings?.badge?.subtext, "") }].filter((x) => x.label),
        terminalCard: {
          title: str(heroSettings?.terminalCard?.title, "cat ./signals.txt"),
          hint: str(heroSettings?.commandHint?.text, "Tip: press ⌘K to jump around"),
          highlights: terminalHighlights
            .filter((h: any) => h.label || h.text)
            .map((h: any) => ({ label: str(h.label, ""), text: str(h.text, "") })),
        },
      },

      about: {
        id: "about",
        kicker: str(aboutSettings?.eyebrow, str(aboutSection?.eyebrow, "01 • About")),
        headline: str(aboutSettings?.header?.title, str(aboutSection?.title, "About")),
        intro: str(aboutSettings?.header?.description, str(aboutSection?.description, "")),
        paragraphs: splitParagraphs(aboutSettings?.content?.paragraphs).length
          ? splitParagraphs(aboutSettings?.content?.paragraphs)
          : splitParagraphs(aboutSettings?.content).length
            ? splitParagraphs(aboutSettings?.content)
            : splitParagraphs(aboutSection?.content).length
              ? splitParagraphs(aboutSection?.content)
              : [],
        callouts: {
          title: str(aboutSettings?.nowBuilding?.label, "Now building"),
          items: arr(aboutSettings?.nowBuilding?.items, []).map((x: any) => String(x)).filter(Boolean),
        },
        principles: arr(aboutSettings?.principles, []).map((p: any) => ({
          title: str(p?.title, ""),
          description: str(p?.description, ""),
        })),
      },

      projects: {
        id: "projects",
        kicker: str(projectsSection?.eyebrow, "02 • Projects"),
        headline: str(projectsSection?.title, "Projects"),
        search: { placeholder: str(projectsSettings?.search?.placeholder, "Search projects...") },
        filters: arr(projectsSettings?.filters, ["All", "Open Source", "Performance", "UI", "Misc"]),
        items: projects,
      },

      skills: {
        id: "skills",
        kicker: str(skillsSection?.eyebrow, "03 • Skills"),
        headline: str(skillsSection?.title, "Skills"),
        subheadline: str(skillsSection?.description, ""),
        groups: skillsGroups.length ? skillsGroups : [{ name: "Skills", items: defaultTechChips }],
        radar: {
          title: str(obj(data?.skills)?.radars?.[0]?.title, "Skill signal"),
          axes: arr(obj(data?.skills)?.radars?.[0]?.axes, []),
          note: str(obj(data?.skills)?.radars?.[0]?.note, ""),
        },
      },

      experience: {
        id: "experience",
        kicker: str(experienceSection?.eyebrow, "04 • Experience"),
        headline: str(experienceSection?.title, "Experience"),
        subheadline: str(experienceSection?.description, ""),
        items: experiences.length ? experiences : [],
      },

      contact: {
        id: "contact",
        kicker: str(contactSettings?.eyebrow, str(contactSection?.eyebrow, "05 • Contact")),
        headline: str(contactSettings?.title, str(contactSection?.title, "Contact")),
        subheadline: str(contactSettings?.description, str(contactSection?.subtitle, "")),
        responseTime: str(contactSettings?.responseTime, "I typically reply within 24–48 hours."),
        directLine: {
          title: str(obj(contactSettings?.directLineCard)?.title, "Direct line"),
          hint: str(obj(contactSettings?.directLineCard)?.hint, "Prefer email? Copy it in one click."),
          email: str(obj(contactSettings?.directLineCard)?.email, email),
          actions: arr(obj(contactSettings?.directLineCard)?.actions, [
            { id: "email", label: "Email me", href: `mailto:${email}` },
          ]),
        },
        form: {
          title: str(obj(contactSettings?.quickMessageForm)?.title, "Quick message"),
          fields: arr(obj(contactSettings?.quickMessageForm)?.fields, [
            { name: "name", label: "Your name", placeholder: "Jane Doe", type: "text", required: true },
            { name: "email", label: "Your email", placeholder: "jane@company.com", type: "email", required: true },
            { name: "subject", label: "Subject", placeholder: "Let's talk about...", type: "text", required: true },
            { name: "message", label: "Message", placeholder: "Tell me what you're building…", type: "textarea", required: true },
          ]),
          primaryButton: obj(obj(contactSettings?.quickMessageForm)?.primaryButton, { label: "Send Message" }),
          secondaryButton: obj(obj(contactSettings?.quickMessageForm)?.secondaryButton, { label: "Preview mailto link" }),
        },
      },

      footer: {
        id: "footer",
        bento: {
          profileCard: {
            icon: "terminal",
            name: siteName,
            titleLine: `${tagline} • ${str(siteConfig?.location, "Remote")}`,
            summary:
              str(footerSettings?.profileCard?.summary) ||
              "Building fast, accessible, and reliable web applications.",
            techChips: defaultTechChips.length ? defaultTechChips : ["React", "TypeScript", "Next.js"],
          },
          connectCard: {
            label: "Online",
            links: footerConnectLinks,
          },
          statusCard: {
            label: "Local time",
            showClock: true,
            availabilityPill: {
              status: str(siteConfig?.availability_status, "AVAILABLE"),
              note: str(siteConfig?.availability_note, ""),
            },
          },
          ctaCard: {
            headline:
              str(footerSettings?.ctaCard?.headline) ||
              "Building fast, reliable web products",
            icon: "mail",
            links: arr(footerSettings?.ctaCard?.links, [
              { label: "Projects", href: "#projects" },
              { label: "Contact", href: "#contact" },
            ]),
            version: str(footerSettings?.ctaCard?.version, "v.2026.01"),
          },
        },
        credits: {
          left: str(obj(footerSection)?.credits?.left, `Designed & developed by ${siteName}`),
          middle: str(obj(footerSection)?.credits?.middle, "Built with Next.js and Laravel"),
          right: str(obj(footerSection)?.credits?.right, "© 2026 — All rights reserved"),
        },
      },
    },
  };

  

  return mapped;
}
// ADD THIS BELOW mapLaravelToV2 (do not remove V2)
export function mapLaravelToV3(data: any) {
  // Version3Client expects the SAME shape as V2's mapped object:
  // { site: {...}, sections: {...}, sections.footer.bento.profileCard... }
  // So we can safely reuse the V2 mapper and optionally enrich footer.utilityRow if needed.

  const mapped = mapLaravelToV2(data);

  // Extra safety: ensure footer structure always exists (prevents the runtime errors you're seeing)
  mapped.sections = mapped.sections ?? {};
  mapped.sections.footer = mapped.sections.footer ?? {
    id: "footer",
    bento: {
      profileCard: { icon: "terminal", name: "", titleLine: "", summary: "", techChips: [] },
      connectCard: { label: "Online", links: [] },
      statusCard: { label: "Local time", showClock: true, availabilityPill: { status: "", note: "" } },
      ctaCard: { headline: "", icon: "mail", links: [], version: "" },
    },
    credits: { left: "", middle: "", right: "" },
  };

  mapped.sections.footer.bento = mapped.sections.footer.bento ?? {
    profileCard: { icon: "terminal", name: "", titleLine: "", summary: "", techChips: [] },
    connectCard: { label: "Online", links: [] },
    statusCard: { label: "Local time", showClock: true, availabilityPill: { status: "", note: "" } },
    ctaCard: { headline: "", icon: "mail", links: [], version: "" },
  };

  mapped.sections.footer.bento.profileCard = mapped.sections.footer.bento.profileCard ?? {
    icon: "terminal",
    name: "",
    titleLine: "",
    summary: "",
    techChips: [],
  };

  mapped.sections.footer.bento.connectCard = mapped.sections.footer.bento.connectCard ?? {
    label: "Online",
    links: [],
  };

  mapped.sections.footer.bento.statusCard = mapped.sections.footer.bento.statusCard ?? {
    label: "Local time",
    showClock: true,
    availabilityPill: { status: "", note: "" },
  };

  mapped.sections.footer.bento.ctaCard = mapped.sections.footer.bento.ctaCard ?? {
    headline: "",
    icon: "mail",
    links: [],
    version: "",
  };

  mapped.sections.footer.credits = mapped.sections.footer.credits ?? { left: "", middle: "", right: "" };

  return mapped;
}
export function mapLaravelToV4(raw: any) {
  const data = raw ?? {};

  const siteConfig = data?.siteConfig ?? data?.site_config ?? {};
  const sections = data?.sections ?? {};

  // Sections usually come as arrays: { hero: [ { settings... } ] }
  const heroSection = sections?.hero?.[0] ?? null;
  const aboutSection = sections?.about?.[0] ?? null;
  const projectsSection = sections?.projects?.[0] ?? null;
  const skillsSection = sections?.skills?.[0] ?? null;
  const experienceSection = sections?.experience?.[0] ?? null;
  const contactSection = sections?.contact?.[0] ?? null;
  const footerSection = sections?.footer?.[0] ?? null;

  const heroSettings = heroSection?.settings ?? {};

  // ✅ Return the exact shape your Version4Client expects
  return {
    site: {
      meta: {
        title: siteConfig?.site_name ?? "My Portfolio",
        description: siteConfig?.tagline ?? "",
        language: siteConfig?.language ?? "en",
        theme: siteConfig?.theme ?? { defaultMode: "light", allowToggle: true },
      },
      branding: {
        name: siteConfig?.site_name ?? "Your Name",
        handle: siteConfig?.handle ?? siteConfig?.site_name ?? "Portfolio",
        role: siteConfig?.tagline ?? "Developer",
        location: heroSettings?.meta?.location ?? siteConfig?.location ?? "Remote",
        availability: {
          status: siteConfig?.availability?.status ?? "AVAILABLE",
          note: siteConfig?.availability?.note ?? "",
        },
      },
      social: {
        github: siteConfig?.github ?? data?.socialLinks?.github ?? "#",
        linkedin: siteConfig?.linkedin ?? data?.socialLinks?.linkedin ?? "#",
        twitter: siteConfig?.twitter ?? data?.socialLinks?.twitter ?? "#",
        email: siteConfig?.email ?? data?.socialLinks?.email ?? "email@example.com",
        whatsapp: siteConfig?.whatsapp ?? "#",
        discord: siteConfig?.discord ?? "#",
      },
      navigation: {
        header:
          siteConfig?.navigation?.header ??
          [
            { id: "home", label: "Home", href: "#home" },
            { id: "about", label: "About", href: "#about" },
            { id: "projects", label: "Projects", href: "#projects" },
            { id: "skills", label: "Skills", href: "#skills" },
            { id: "experience", label: "Experience", href: "#experience" },
            { id: "contact", label: "Contact", href: "#contact" },
          ],
        footerPrimary: siteConfig?.navigation?.footerPrimary ?? [],
        footerUtility: siteConfig?.navigation?.footerUtility ?? [],
      },
    },

    sections: {
      // IMPORTANT:
      // Map each section into the exact keys Version4Client reads.
      // If Version4Client expects v2/v3-like shape, keep that same shape here.
      hero: heroSection?.settings
        ? {
            id: heroSettings?.id ?? "home",
            eyebrow: heroSettings?.badge?.text ?? heroSection?.eyebrow ?? "",
            headline: heroSection?.headline ?? "",
            subheadline: heroSection?.subheadline ?? "",
            primaryCta: heroSettings?.cta?.primary
              ? { label: heroSettings.cta.primary.label ?? "View projects", href: heroSettings.cta.primary.url ?? "#projects" }
              : { label: "View Projects", href: "#projects" },
            secondaryCta: heroSettings?.cta?.secondary
              ? { label: heroSettings.cta.secondary.label ?? "Contact", href: heroSettings.cta.secondary.url ?? "#contact" }
              : { label: "Contact", href: "#contact" },
            terminalCard: heroSettings?.terminalCard ?? heroSettings?.terminal ?? undefined,
          }
        : undefined,

      about: aboutSection?.settings
        ? {
            id: aboutSection?.settings?.id ?? "about",
            kicker: aboutSection?.eyebrow ?? aboutSection?.settings?.eyebrow ?? "01 • About",
            headline: aboutSection?.title ?? "About",
            intro: aboutSection?.subtitle ?? aboutSection?.settings?.header?.description ?? "",
            paragraphs: aboutSection?.settings?.content?.paragraphs ?? [],
            callouts: aboutSection?.settings?.nowBuilding ?? { title: "Now building", items: [] },
            principles: aboutSection?.settings?.principles ?? [],
          }
        : undefined,

      projects: {
        id: projectsSection?.settings?.id ?? "projects",
        kicker: projectsSection?.eyebrow ?? "02 • Projects",
        headline: projectsSection?.title ?? "Projects",
        filters: projectsSection?.settings?.filters ?? ["All"],
        items: Array.isArray(data?.projects)
          ? data.projects.map((p: any) => ({
              id: p?.slug ?? String(p?.id ?? ""),
              title: p?.title ?? "",
              year: (p?.meta?.year ?? p?.year ?? "").toString(),
              summary: p?.summary_json?.cardDescription ?? p?.summary ?? "",
              href: p?.links?.live ?? p?.links?.url ?? "#",
              badges: Array.isArray(p?.stack) ? p.stack : Array.isArray(p?.tech_stack) ? p.tech_stack : [],
            }))
          : [],
      },

      skills: {
        id: skillsSection?.settings?.id ?? "skills",
        kicker: skillsSection?.eyebrow ?? "03 • Skills",
        headline: skillsSection?.title ?? "Skills",
        subheadline: skillsSection?.description ?? "",
        groups: data?.skills?.categories ?? [],
        radar: data?.skills?.radars?.[0] ?? null,
      },

      experience: {
        id: experienceSection?.settings?.id ?? "experience",
        kicker: experienceSection?.eyebrow ?? "04 • Experience",
        headline: experienceSection?.title ?? "Experience",
        subheadline: experienceSection?.description ?? "",
        items: Array.isArray(data?.experiences)
          ? data.experiences.map((e: any) => ({
              title: e?.role ?? e?.title ?? "",
              company: e?.company ?? "",
              location: e?.location ?? "",
              start: e?.start_date ?? "",
              end: e?.is_current ? "Present" : e?.end_date ?? "",
              highlights: Array.isArray(e?.bullets) ? e.bullets : [],
              tech: Array.isArray(e?.tags) ? e.tags : Array.isArray(e?.meta?.tags) ? e.meta.tags : [],
            }))
          : [],
      },

      contact: {
        id: contactSection?.settings?.id ?? "contact",
        kicker: contactSection?.eyebrow ?? "05 • Contact",
        headline: contactSection?.title ?? "Contact",
        subheadline: contactSection?.subtitle ?? contactSection?.settings?.description ?? "",
        directLine: {
          title: contactSection?.settings?.directLineCard?.title ?? "Direct line",
          hint: contactSection?.settings?.directLineCard?.hint ?? "",
          email: siteConfig?.email ?? "email@example.com",
          actions: contactSection?.settings?.directLineCard?.actions ?? [],
        },
        form: contactSection?.settings?.quickMessageForm ?? contactSection?.settings?.form ?? { fields: [] },
      },

      footer: footerSection?.settings
        ? footerSection.settings
        : {
            bento: {
              profileCard: {
                name: siteConfig?.site_name ?? "Your Name",
                titleLine: siteConfig?.tagline ?? "",
                summary: footerSection?.subtitle ?? "",
                techChips: [],
              },
              connectCard: { label: "Online", links: [] },
              statusCard: { label: "Local time", showClock: true, availabilityPill: { status: "AVAILABLE", note: "" } },
              ctaCard: { headline: "Let’s build", links: [], version: "" },
            },
            credits: { left: "", middle: "", right: "" },
          },
    },
  };
}
