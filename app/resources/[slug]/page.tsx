import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { ArticleContent } from "@/components/seo/article-content";
import { StructuredData } from "@/components/structured-data";
import { createPageMetadata } from "@/lib/seo";
import {
  RESOURCE_ARTICLES,
  getArticleBySlug,
} from "@/lib/site-content";
import { SITE_URL } from "@/lib/structured-data";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return RESOURCE_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const alternates: { canonical: string; languages?: Record<string, string> } = {
    canonical: `${SITE_URL}/resources/${article.slug}`,
  };

  if (article.alternateSlug) {
    const altArticle = getArticleBySlug(article.alternateSlug);
    if (altArticle) {
      alternates.languages = {
        [article.lang === "en" ? "en" : "ar-EG"]: `${SITE_URL}/resources/${article.slug}`,
        [altArticle.lang === "en" ? "en" : "ar-EG"]: `${SITE_URL}/resources/${altArticle.slug}`,
      };
    }
  }

  return createPageMetadata({
    title: article.title,
    description: article.description,
    path: `/resources/${article.slug}`,
    alternates,
  });
}

export default async function ResourceArticlePage({ params }: Props) {
  const { slug } = await params;
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
    mainEntityOfPage: `${SITE_URL}/resources/${article.slug}`,
  };

  return (
    <>
      <StructuredData id="schema-article" data={articleSchema} />
      <main className="flex-grow w-screen">
        <Header />
        <ArticleContent article={article} />
      </main>
      <Footer />
    </>
  );
}
