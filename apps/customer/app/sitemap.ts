import type { MetadataRoute } from "next";
import { LOCALES } from "@bolt-energy/models";
import { RESOURCE_ARTICLES, TRACK_RECORD_PROJECTS } from "@/lib/site-content";
import { SITE_URL } from "@/lib/structured-data";

const STATIC_ROUTES = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/resources", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/projects", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/contact-us", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/shop", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/product/grid-tied", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/product/off-grid", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/product/solar-irrigation", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/product/solar-heating", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/product/ev", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/product/construction", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/services/maintenance", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/services/solar-monitoring", changeFrequency: "monthly" as const, priority: 0.7 },
];

function localizedEntry(
  pathWithoutLocale: string,
  options: {
    lastModified: Date;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }
): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => {
    const path = `/${locale}${pathWithoutLocale}`;
    return {
      url: `${SITE_URL}${path}`,
      lastModified: options.lastModified,
      changeFrequency: options.changeFrequency,
      priority: options.priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((alt) => [alt, `${SITE_URL}/${alt}${pathWithoutLocale}`])
        ),
      },
    };
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries = STATIC_ROUTES.flatMap((route) =>
    localizedEntry(route.path, {
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })
  );

  const articleEntries = RESOURCE_ARTICLES.flatMap((article) =>
    localizedEntry(`/resources/${article.slug}`, {
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  const projectEntries = TRACK_RECORD_PROJECTS.flatMap((project) =>
    localizedEntry(`/projects/${project.slug}`, {
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    })
  );

  return [...staticEntries, ...articleEntries, ...projectEntries];
}
