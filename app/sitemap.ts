import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "#about", "#projects", "#skills", "#experience", "#contact"].map((hash) => ({
    url: `${site.url}/${hash}`,
    lastModified: new Date()
  }));
  return routes;
}
