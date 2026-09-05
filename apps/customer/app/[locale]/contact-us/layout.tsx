import { StructuredData } from "@/components/structured-data";
import { createLocalizedPageMetadata } from "@/lib/seo";
import { BUSINESS_INFO, SITE_URL } from "@/lib/structured-data";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return createLocalizedPageMetadata({
    title: "Contact Bolt Energy | Solar Company in Giza, Egypt",
    description:
      "Contact Bolt Energy for a free solar quote. Call 010 444 38446 or visit us in 6th of October, Giza. Grid-tied, off-grid, and irrigation solar systems.",
    pathWithoutLocale: "/contact-us",
    locale,
    keywords: [
      "contact bolt energy",
      "solar quote egypt",
      "solar company giza contact",
    ],
  });
}

export default async function ContactLayout({ children, params }: Props) {
  const { locale } = await params;

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Bolt Energy",
    url: `${SITE_URL}/${locale}/contact-us`,
    mainEntity: {
      "@type": "LocalBusiness",
      name: BUSINESS_INFO.name,
      telephone: BUSINESS_INFO.telephone,
      email: BUSINESS_INFO.email,
      address: {
        "@type": "PostalAddress",
        ...BUSINESS_INFO.address,
      },
    },
  };

  return (
    <>
      <StructuredData id="schema-contact" data={contactSchema} />
      {children}
    </>
  );
}
