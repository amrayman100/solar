import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { TrackRecordCard } from "@/components/home/track-record-card";
import { createPageMetadata } from "@/lib/seo";
import { TRACK_RECORD_PROJECTS } from "@/lib/site-content";

export const metadata = createPageMetadata({
  title: "Solar Installation Projects in Egypt | Bolt Energy",
  description:
    "Browse Bolt Energy's completed solar projects across Egypt — grid-tied, backup, and commercial installations in Sheikh Zayed, Giza, New Cairo, and more.",
  path: "/projects",
  keywords: [
    "solar projects egypt",
    "solar installations sheikh zayed",
    "solar company giza",
    "bolt energy projects",
  ],
});

export default function ProjectsPage() {
  return (
    <>
      <main className="flex-grow w-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#015231] mb-4 text-center">
            Our Solar Installation Projects in Egypt
          </h1>
          <p className="text-lg text-gray-700 mb-10 text-center max-w-2xl mx-auto">
            Real installations delivered by Bolt Energy across Giza, Cairo, and
            nationwide — from residential rooftops to commercial-scale systems.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {TRACK_RECORD_PROJECTS.map((project) => (
              <TrackRecordCard
                key={project.slug}
                title={project.systemType}
                power={project.power}
                location={project.location}
                image={project.image}
                imageAlt={project.imageAlt}
                href={`/projects/${project.slug}`}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
