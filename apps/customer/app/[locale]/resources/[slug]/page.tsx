import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { StructuredData } from "@/components/structured-data";
import {
  RESOURCE_ARTICLES,
  getArticleBySlug,
} from "@/lib/site-content";
import { createLocalizedPageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/structured-data";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return RESOURCE_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const languages: Record<string, string> = {
    en: `${SITE_URL}/en/resources/${article.slug}`,
    ar: `${SITE_URL}/ar/resources/${article.slug}`,
    "x-default": `${SITE_URL}/en/resources/${article.slug}`,
  };

  if (article.alternateSlug) {
    const altArticle = getArticleBySlug(article.alternateSlug);
    if (altArticle) {
      languages.en =
        article.lang === "en"
          ? `${SITE_URL}/en/resources/${article.slug}`
          : `${SITE_URL}/en/resources/${altArticle.slug}`;
      languages.ar =
        article.lang === "ar"
          ? `${SITE_URL}/ar/resources/${article.slug}`
          : `${SITE_URL}/ar/resources/${altArticle.slug}`;
      languages["x-default"] = languages.en;
    }
  }

  return createLocalizedPageMetadata({
    title: article.title,
    description: article.description,
    pathWithoutLocale: `/resources/${article.slug}`,
    locale,
    alternates: { languages },
  });
}

export default async function ResourceArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: "Bolt Energy",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Bolt Energy",
      url: SITE_URL,
    },
    inLanguage: article.lang === "ar" ? "ar-EG" : "en",
    mainEntityOfPage: `${SITE_URL}/${locale}/resources/${article.slug}`,
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <StructuredData id="schema-article" data={articleSchema} />
      <h1 className="text-3xl font-bold text-(--primary)">{article.title}</h1>
      <p className="mt-3 text-(--muted-foreground)">{article.description}</p>
      <div className="mt-8 space-y-6 leading-relaxed">
        {article.sections.map((section, index) => (
          <section key={index}>
            {section.heading ? <h2 className="mb-2 text-xl font-semibold">{section.heading}</h2> : null}
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mb-3">{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        {article.relatedLinks.map((link) => (
          <Link key={link.href} href={link.href} className="text-(--primary) underline">
            {link.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
