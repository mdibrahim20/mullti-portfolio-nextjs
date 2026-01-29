import Version3Render from "./_render";
import { fetchSiteData } from "@/lib/api";

// Removed dynamic = "force-dynamic" for static export compatibility

async function getSiteData() {
  const res = await fetchSiteData();
  return res.data;
}

export default async function Version3Page() {
  const data = await getSiteData();
  return <Version3Render data={data} />;
}
