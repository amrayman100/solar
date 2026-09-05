import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { RelatedProducts } from "@/components/seo/related-products";
import { StructuredData } from "@/components/structured-data";
import { createPageMetadata } from "@/lib/seo";
import {
  TRACK_RECORD_PROJECTS,
  getProjectBySlug,
} from "@/lib/site-content";
import { SITE_URL } from "@/lib/structured-data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TRACK_RECORD_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return createPageMetadata({
    title: `${project.title} | Bolt Energy Egypt`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.image,
    imageAlt: project.imageAlt,
  });
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

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
    <>
      <StructuredData id="schema-project" data={projectSchema} />
      <main className="flex-grow w-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="relative w-full h-64 lg:h-96 rounded-2xl overflow-hidden mb-8">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              quality={80}
              priority
            />
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-[#015231] mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            {project.power} · {project.location}
          </p>
          <p className="text-gray-800 leading-relaxed mb-8">{project.summary}</p>

          <h2 className="text-2xl font-bold text-[#015231] mb-4">
            Project highlights
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 mb-10">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-[#00bd70] hover:bg-[#00bd70]/90">
              <Link href={project.relatedProductPath}>
                Learn about this system type
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/projects">All projects</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact-us">Request a similar installation</Link>
            </Button>
          </div>
        </div>
        <RelatedProducts />
      </main>
      <Footer />
    </>
  );
}
