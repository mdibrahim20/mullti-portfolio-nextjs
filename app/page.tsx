import { fetchSiteData } from "@/lib/api";
import V1Shell from "@/app/_shells/V1Shell";
import Version1 from "@/app/_portfolios/Version1";

// Server wrappers for V2–V4 (data comes from Laravel, UI lives in client components)
import Version2Page from "@/app/version2/_render";
import Version3Page from "@/app/version3/_render";
import Version4Page from "@/app/version4/_render";

function normalizePortfolioKey(key: unknown): "v1" | "v2" | "v3" | "v4" {
  const k = String(key ?? "").toLowerCase().trim();
  if (k === "2" || k === "v2" || k === "version2") return "v2";
  if (k === "3" || k === "v3" || k === "version3") return "v3";
  if (k === "4" || k === "v4" || k === "version4") return "v4";
  return "v1";
}

export default async function Home() {
  // We only need this for the active portfolio selection.
  const res = await fetchSiteData();
  const data = res?.data ?? {};

  /**
   * ✅ Laravel should return which template is active.
   * Recommended field: data.siteConfig.active_portfolio = 'v1' | 'v2' | 'v3' | 'v4'
   * Backwards-compatible fallbacks are included below.
   */
 const active = normalizePortfolioKey(
  data?.portfolioSettings?.active_version ??
  data?.siteConfig?.active_portfolio ??
  data?.siteConfig?.portfolio_version ??
  data?.siteConfig?.template ??
  data?.siteConfig?.theme
);


  console.log(data?.siteConfig, "-> active portfolio:", active);

  switch (active) {
    case "v2":
      return <Version2Page siteData={data} />;
    case "v3":
      return <Version3Page data={data} />;
    case "v4":
      return <Version4Page data={data} />;
    case "v1":
    default:
      // V1 keeps your Navbar/Command Menu shell.
      return (
        <V1Shell>
          <Version1 />
        </V1Shell>
      );
  }
}
