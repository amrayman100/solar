"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { QuoteForm } from "@/components/quote-form";
import { RelatedProducts } from "@/components/related-products";
import { StructuredData } from "@/components/structured-data";
import type { ProductPageContent } from "@/lib/product-pages";
import { getServiceSchema } from "@/lib/structured-data";

export function ProductLanding({ content }: { content: ProductPageContent }) {
  const [showQuote, setShowQuote] = useState(false);
  const t = useTranslations("cta");

  return (
    <main className="w-full flex-1">
      {content.schemaKey ? (
        <StructuredData
          id={`schema-${content.slug}`}
          data={getServiceSchema(content.schemaKey)}
        />
      ) : null}

      <div className="flex justify-center px-4 py-8 lg:py-16">
        <div className="flex w-full max-w-[1122px] flex-col items-center gap-6 overflow-hidden rounded-[39px] bg-[#f6f6f6] p-6 lg:flex-row lg:items-stretch lg:gap-[21px] lg:p-0">
          {!showQuote ? (
            <>
              <div className="relative h-[300px] w-full shrink-0 lg:h-auto lg:min-h-[646px] lg:w-[363px]">
                <Image
                  alt={content.imageAlt}
                  src={content.image}
                  placeholder="blur"
                  blurDataURL={content.image}
                  quality={75}
                  fill
                  sizes="(max-width: 1024px) 100vw, 363px"
                  className="rounded-lg object-cover lg:rounded-none"
                />
              </div>
              <div className="flex w-full flex-col items-start gap-4 px-4 pb-6 text-black lg:w-[703px] lg:justify-center lg:gap-4 lg:px-0 lg:py-8 lg:pe-8 lg:pb-8">
                <h1 className="text-2xl font-bold leading-normal text-[#015231] lg:text-[32px]">
                  {content.heading}
                </h1>
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold text-[#015231] lg:text-[24px]">
                    {content.subheading}
                  </h2>
                  <p className="text-base leading-normal text-black">{content.intro}</p>
                </div>
                {content.sections.map((section) => (
                  <div key={section.title} className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-[#015231] lg:text-[24px]">
                      {section.title}
                    </h3>
                    <ul className="list-inside list-disc space-y-1 text-base text-black">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                {content.more?.length ? (
                  <p className="text-sm text-gray-600">
                    {content.moreLabel ? `${content.moreLabel} ` : null}
                    {content.more.map((link, index) => (
                      <span key={link.href}>
                        {index > 0 ? " · " : null}
                        <Link href={link.href} className="text-[#00bd70] hover:underline">
                          {link.label}
                        </Link>
                      </span>
                    ))}
                  </p>
                ) : null}

                <div className="mt-2 flex w-full flex-col items-center gap-3 sm:max-w-[383px] sm:self-center">
                  <p className="text-center text-base font-bold text-[#015231] lg:text-lg">
                    {content.cta}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowQuote(true)}
                    className="flex h-[39px] w-full items-center justify-center rounded-[8px] bg-[#00bd70] px-8 text-base font-bold text-white transition-colors hover:bg-[#00bd70]/90"
                  >
                    {t("calculateNow")}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="relative flex min-h-[420px] w-full flex-col items-center justify-center px-4 py-10 lg:min-h-[520px] lg:px-8 lg:py-12">
              <button
                type="button"
                onClick={() => setShowQuote(false)}
                className="mb-6 inline-flex items-center gap-2 self-start text-sm font-medium text-[#015231] hover:text-[#00bd70] lg:absolute lg:start-8 lg:top-8 lg:mb-0"
              >
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                {t("backToProduct")}
              </button>
              <div className="mx-auto w-full max-w-2xl">
                <QuoteForm slug={content.slug} variant="embedded" />
              </div>
            </div>
          )}
        </div>
      </div>

      {content.path.startsWith("/product/") ? (
        <RelatedProducts currentHref={content.path} />
      ) : null}
    </main>
  );
}
