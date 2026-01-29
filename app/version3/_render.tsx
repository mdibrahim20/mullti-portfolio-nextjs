import Version3Client from "./Version3Client";
import { mapLaravelToV3 } from "@/lib/portfolioMappers";

export default function Version3Render({ data }: { data: any }) {
  const mapped = mapLaravelToV3(data);
  return <Version3Client data={mapped} />;
}
