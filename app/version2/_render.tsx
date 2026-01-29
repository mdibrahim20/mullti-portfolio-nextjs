import Version2Client from "./Version2Client";
import { mapLaravelToV2, type LaravelSiteData } from "@/lib/portfolioMappers";

export default function Version2Page({ siteData }: { siteData: LaravelSiteData }) {
  const mapped = mapLaravelToV2(siteData);
  return <Version2Client data={mapped} />;
}
