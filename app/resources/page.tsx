import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { createPageMetadata } from "@/lib/seo";
import { RESOURCE_ARTICLES } from "@/lib/site-content";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "Solar Resources & Guides | Bolt Energy Egypt",
  description:
    "Free solar energy guides for Egypt — panel costs, net metering, farm irrigation, off-grid vs grid-tied, and how to reduce your electricity bill.",
  path: "/resources",
  keywords: [
    "solar guides egypt",
    "solar panel cost egypt",
    "net metering egypt",
    "solar irrigation egypt",
    "طاقة شمسية مصر",
    "أسعار الألواح الشمسية",
  ],
});

export default function ResourcesPage() {
  const englishArticles = RESOURCE_ARTICLES.filter((a) => a.lang === "en");
  const arabicArticles = RESOURCE_ARTICLES.filter((a) => a.lang === "ar");

  return (
    <>
      <main className="flex-grow w-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#015231] mb-4">
            Solar Energy Resources for Egypt
          </h1>
          <p className="text-lg text-gray-700 mb-10">
            Practical guides to help you understand solar costs, net metering,
            system types, and how to maximize savings — in English and Arabic.
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#015231] mb-6">
              English Guides
            </h2>
            <div className="grid gap-4">
              {englishArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/resources/${article.slug}`}
                  className="block bg-[#f6f6f6] rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-[#015231]">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{article.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#015231] mb-6">
              أدلة بالعربية
            </h2>
            <div className="grid gap-4">
              {arabicArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/resources/${article.slug}`}
                  className="block bg-[#f6f6f6] rounded-xl p-6 hover:shadow-md transition-shadow"
                  dir="rtl"
                  lang="ar"
                >
                  <h3 className="text-xl font-semibold text-[#015231]">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{article.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
