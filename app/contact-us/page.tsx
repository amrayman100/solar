import { ContactForm } from "@/components/contact/contact-form";
import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { StructuredData } from "@/components/structured-data";
import { createPageMetadata } from "@/lib/seo";
import { BUSINESS_INFO, SITE_URL } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Contact Bolt Energy | Solar Company in Giza, Egypt",
  description:
    "Contact Bolt Energy for a free solar quote. Call 010 444 38446 or visit us in 6th of October, Giza. Grid-tied, off-grid, and irrigation solar systems.",
  path: "/contact-us",
  keywords: [
    "contact bolt energy",
    "solar quote egypt",
    "solar company giza contact",
  ],
});

export default async function ContactUs() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Bolt Energy",
    url: `${SITE_URL}/contact-us`,
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
      <main className="flex-grow">
        <Header />
        <div className="flex mx-auto align-center justify-center mt-10">
          <div className="mg-5 lg:m-10 lg:w-1/3 lg:mt-5 md:mt-5 p-10">
            <h1 className="sr-only">Contact Bolt Energy — Solar Company in Egypt</h1>
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
