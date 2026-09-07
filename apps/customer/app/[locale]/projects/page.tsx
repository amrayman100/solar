import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getTrackRecordProjects } from "@/lib/site-content";
import { createLocalizedPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === "ar";
  return createLocalizedPageMetadata({
    title: isAr
      ? "مشاريع تركيب الطاقة الشمسية في مصر | بولت إنرجي"
      : "Solar Installation Projects in Egypt | Bolt Energy",
    description: isAr
      ? "تصفح مشاريع بولت إنرجي المكتملة في مصر — تركيبات متصلة بالشبكة واحتياطية وتجارية في الشيخ زايد والجيزة والقاهرة الجديدة والمزيد."
      : "Browse Bolt Energy's completed solar projects across Egypt — grid-tied, backup, and commercial installations in Sheikh Zayed, Giza, New Cairo, and more.",
    pathWithoutLocale: "/projects",
    locale,
    keywords: [
      "solar projects egypt",
      "solar installations sheikh zayed",
      "solar company giza",
      "bolt energy projects",
    ],
  });
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const projects = getTrackRecordProjects(locale);
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 lg:px-8">
      <h1 className="text-3xl font-bold text-(--primary)">
        {locale === "ar" ? "المشروعات" : "Projects"}
      </h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className="overflow-hidden rounded-xl border border-(--border) bg-white">
            <div className="relative h-44 w-full">
              <Image src={project.image} alt={project.imageAlt} fill className="object-cover" />
            </div>
            <div className="p-4">
              <p className="text-xs text-(--muted-foreground)">{project.location}</p>
              <h2 className="font-semibold text-(--primary)">{project.title}</h2>
              <p className="text-sm">{project.power}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
