import { LayoutContent } from "@/components/LayoutContent";
import { fetchSiteData } from "@/lib/api";

async function getShellData() {
  try {
    const res = await fetchSiteData();
    return {
      siteConfig: res.data.siteConfig || null,
      navItems: res.data.navItems || [],
      socialLinks: res.data.socialLinks || [],
    };
  } catch (e) {
    console.error("Error fetching shell data:", e);
    return { siteConfig: null, navItems: [], socialLinks: [] };
  }
}

export default async function V1Shell({ children }: { children: React.ReactNode }) {
  const { siteConfig, navItems, socialLinks } = await getShellData();

  return (
    <LayoutContent siteConfig={siteConfig} navItems={navItems} socialLinks={socialLinks}>
      {children}
    </LayoutContent>
  );
}
