import type { MetadataRoute } from "next";
import { RESOURCE_ARTICLES, TRACK_RECORD_PROJECTS } from "@/lib/site-content";
import { SITE_URL } from "@/lib/structured-data";

const STATIC_ROUTES = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/resources", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/projects", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/contact-us", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/product/grid-tied", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/product/off-grid", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/product/solar-irrigation", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/product/solar-heating", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/product/ev", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/product/construction", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/services/maintenance", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/services/solar-monitoring", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/proposal/whole-sale", changeFrequency: "monthly" as const, priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const articleEntries = RESOURCE_ARTICLES.map((article) => ({
    url: `${SITE_URL}/resources/${article.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const projectEntries = TRACK_RECORD_PROJECTS.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...articleEntries, ...projectEntries];
}
