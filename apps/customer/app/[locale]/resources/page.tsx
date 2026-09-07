import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { RESOURCE_ARTICLES } from "@/lib/site-content";
import { createLocalizedPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createLocalizedPageMetadata({
    title: "Solar Resources & Guides | Bolt Energy Egypt",
    description:
      "Free solar energy guides for Egypt — panel costs, net metering, farm irrigation, off-grid vs grid-tied, and how to reduce your electricity bill.",
    pathWithoutLocale: "/resources",
    locale,
    keywords: [
      "solar guides egypt",
      "solar panel cost egypt",
      "net metering egypt",
      "solar irrigation egypt",
      "طاقة شمسية مصر",
      "أسعار الألواح الشمسية",
    ],
  });
}

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const articles = RESOURCE_ARTICLES.filter((article) =>
    locale === "ar" ? article.lang === "ar" || article.lang === "en" : article.lang === "en"
  );
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-(--primary)">Solar resources</h1>
      <div className="mt-8 space-y-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/resources/${article.slug}`}
            className="block rounded-xl border border-(--border) bg-white p-5"
          >
            <h2 className="font-semibold text-(--primary)">{article.title}</h2>
            <p className="mt-1 text-sm text-(--muted-foreground)">{article.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
