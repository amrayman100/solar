import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { StructuredData } from "@/components/structured-data";
import {
  TRACK_RECORD_PROJECTS,
  getProjectBySlug,
  pickTrackRecordLocale,
} from "@/lib/site-content";
import { createLocalizedPageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/structured-data";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return TRACK_RECORD_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const localized = pickTrackRecordLocale(project, locale);

  return createLocalizedPageMetadata({
    title: `${localized.title} | Bolt Energy Egypt`,
    description: localized.summary,
    pathWithoutLocale: `/projects/${localized.slug}`,
    locale,
    image: localized.image,
    imageAlt: localized.imageAlt,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const base = getProjectBySlug(slug);
  if (!base) notFound();
  const project = pickTrackRecordLocale(base, locale);

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "Project",
    name: project.title,
    description: project.summary,
    image: `${SITE_URL}${project.image}`,
    location: {
      "@type": "Place",
      name: project.location,
      address: {
        "@type": "PostalAddress",
        addressCountry: "EG",
      },
    },
    provider: {
      "@type": "LocalBusiness",
      name: "Bolt Energy",
      url: SITE_URL,
    },
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <StructuredData id="schema-project" data={projectSchema} />
      <div className="relative mb-6 h-72 w-full overflow-hidden rounded-xl">
        <Image src={project.image} alt={project.imageAlt} fill className="object-cover" />
      </div>
      <p className="text-sm text-(--muted-foreground)">{project.location}</p>
      <h1 className="mt-2 text-3xl font-bold text-(--primary)">{project.title}</h1>
      <p className="mt-4 leading-relaxed">{project.summary}</p>
      <ul className="mt-4 list-disc space-y-1 ps-5">
        {project.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Link href={project.relatedProductPath} className="mt-6 inline-block font-semibold text-(--primary)">
        Related solution →
      </Link>
    </main>
  );
}
