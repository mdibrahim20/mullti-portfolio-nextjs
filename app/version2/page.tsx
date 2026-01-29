import { fetchSiteData } from "@/lib/api";
import Version2Page from "./_render";

export default async function Page() {
  const res = await fetchSiteData();
  return <Version2Page siteData={res.data} />;
}
