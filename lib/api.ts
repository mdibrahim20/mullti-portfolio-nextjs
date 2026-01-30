const API_BASE = process.env.NEXT_PUBLIC_API_URL 
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
  : "https://api.ibrahimlogs.me";

// Fallback data for when API is not available
function getFallbackData() {
  return {
    data: {
      siteConfig: {
        site_name: "Portfolio",
        tagline: "Full-stack Developer",
        github_url: "#",
        linkedin_url: "#",
      },
      portfolioSettings: {
        active_version: "v1",
      },
      navItems: [],
      socialLinks: [],
      sections: {
        hero: [{ settings: {}, ctas: [] }],
        about: [{}],
        projects: [{}],
        skills: [{}],
        experience: [{}],
        contact: [{}],
        footer: [{}],
      },
      projects: [],
      experiences: [],
      skills: { categories: [], radars: [] },
      highlights: [],
      principles: [],
    },
  };
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  try {
    const url = `${API_BASE}${path}`;
    console.log('Fetching from:', url);
    
    const res = await fetch(url, {
      // For static export, allow caching during build
      ...init,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
      // Add timeout for static builds
      next: { revalidate: false },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`${init?.method || "GET"} ${path} failed (${res.status}): ${text}`);
    }

    // Handle 204 No Content responses (successful but no body)
    if (res.status === 204) {
      return {} as T;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.warn(`API call failed, using fallback data: ${path}`, error);
    return getFallbackData() as T;
  }
}

export type SiteDataResponse = {
  data: {
    siteConfig: any;
    portfolioSettings?: any;
    navItems: any[];
    socialLinks: any[];
    sections: {
      hero: any[];
      about: any[];
      projects: any[];
      skills: any[];
      experience: any[];
      contact: any[];
      footer: any[];
    };
    projects: any[];
    experiences: any[];
    skills: { categories: any[]; radars: any[] };
    highlights: any[];
    principles: any[];
  };
};

export async function fetchSiteData() {
  return apiFetch<SiteDataResponse>("/api/public/site-data");
}

export async function submitContact(payload: {
  name?: string;
  email: string;
  subject?: string;
  message: string;
}) {
  return apiFetch<{ message: string }>("/api/public/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
