import Version4Page from "./_render";
import { fetchSiteData } from "@/lib/api";

async function getSiteData() {
  const res = await fetchSiteData();
  return res?.data ?? null;
}

export default async function Page() {
  const data = await getSiteData();

  // Always pass something (null-safe)
  return <Version4Page data={data ?? {}} />;
}
