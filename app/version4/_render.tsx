import Version4Client from "./Version4Client";
import { mapLaravelToV4 } from "@/lib/portfolioMappers"; // adjust path to yours

export default function Version4Page({ data }: { data?: any }) {
  // ✅ never assume data exists
  const mapped = mapLaravelToV4(data ?? {});
  return <Version4Client data={mapped} />;
}
