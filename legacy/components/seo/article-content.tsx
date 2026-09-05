import Image from "next/image";
import Link from "next/link";
import type { ResourceArticle } from "@/lib/site-content";
import { Button } from "@/components/ui/button";

interface ArticleContentProps {
  article: ResourceArticle;
}

export function ArticleContent({ article }: ArticleContentProps) {
  const isArabic = article.lang === "ar";

  return (
    <article
      className="max-w-3xl mx-auto px-4 py-12"
      dir={isArabic ? "rtl" : "ltr"}
      lang={isArabic ? "ar" : "en"}
    >
      <header className="mb-10">
        <p className="text-sm text-[#015231]/70 mb-2">
          {new Date(article.publishedAt).toLocaleDateString(
            isArabic ? "ar-EG" : "en-EG",
            { year: "numeric", month: "long", day: "numeric" }
          )}
        </p>
        <h1 className="text-3xl lg:text-4xl font-bold text-[#015231] leading-tight">
          {article.title}
        </h1>
        <p className="text-lg text-gray-700 mt-4">{article.description}</p>
      </header>

      <div className="prose prose-lg max-w-none text-gray-800 space-y-8">
        {article.sections.map((section, index) => (
          <section key={index}>
            {section.heading && (
              <h2 className="text-2xl font-bold text-[#015231] mb-3">
                {section.heading}
              </h2>
            )}
            {section.paragraphs.map((paragraph, pIndex) => (
              <p key={pIndex} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      {article.relatedLinks.length > 0 && (
        <nav className="mt-12 pt-8 border-t border-[#015231]/20">
          <h2 className="text-xl font-bold text-[#015231] mb-4">
            {isArabic ? "روابط ذات صلة" : "Related reading"}
          </h2>
          <ul className="space-y-2">
            {article.relatedLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[#00bd70] hover:underline font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="mt-10 flex justify-center">
        <Button
          asChild
          className="bg-[#00bd70] hover:bg-[#00bd70]/90 h-12 px-8 text-lg"
        >
          <Link href={article.ctaPath}>{article.ctaLabel}</Link>
        </Button>
      </div>
    </article>
  );
}
