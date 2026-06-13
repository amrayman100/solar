import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { RelatedProducts } from "@/components/seo/related-products";
import { StructuredData } from "@/components/structured-data";
import { createPageMetadata } from "@/lib/seo";
import { SITE_URL, BUSINESS_INFO } from "@/lib/structured-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = createPageMetadata({
  title: "About Bolt Energy | Solar Company in Egypt",
  description:
    "Learn about Bolt Energy — Egypt's trusted solar installer based in 6th of October, Giza. Expert design, installation, and monitoring for homes, farms, and businesses.",
  path: "/about",
  keywords: [
    "about bolt energy",
    "solar company egypt",
    "solar installer giza",
    "solar company 6th of october",
    "شركة طاقة شمسية مصر",
  ],
});

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Bolt Energy",
    url: `${SITE_URL}/about`,
    description: BUSINESS_INFO.description,
    mainEntity: {
      "@type": "LocalBusiness",
      name: BUSINESS_INFO.name,
      url: SITE_URL,
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
      <StructuredData id="schema-about" data={aboutSchema} />
      <main className="flex-grow w-screen">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#015231] mb-6">
            About Bolt Energy — Solar Energy Solutions in Egypt
          </h1>

          <div className="space-y-6 text-gray-800 leading-relaxed">
            <p>
              Bolt Energy is a solar energy company headquartered in 6th of
              October, Giza, Egypt. We design, install, and support solar
              systems for residential homes, commercial properties, farms, and
              industrial facilities across the country.
            </p>
            <p>
              From grid-tied net metering systems that bring electricity bills
              toward zero, to off-grid backup solutions, solar irrigation for
              agriculture, and solar heating — our engineering team delivers
              end-to-end projects with transparent pricing and professional
              commissioning.
            </p>

            <h2 className="text-2xl font-bold text-[#015231] pt-4">
              What we do
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Free technical studies and solar system design</li>
              <li>Grid-tied, off-grid, hybrid, and backup installations</li>
              <li>Solar irrigation and agricultural pumping systems</li>
              <li>Solar water heating for homes and pools</li>
              <li>Smart monitoring and maintenance services</li>
              <li>EgyptERA grid integration and commissioning support</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#015231] pt-4">
              Why customers choose us
            </h2>
            <p>
              With completed projects across Sheikh Zayed, New Cairo, Giza,
              Pyramid Hills, and beyond, Bolt Energy combines competitive
              pricing with hands-on follow-up through installation and
              commissioning. Our clients consistently highlight our
              professionalism, transparent process, and responsive
              troubleshooting support.
            </p>

            <h2 className="text-2xl font-bold text-[#015231] pt-4">
              Our location
            </h2>
            <p>
              6th of October, Giza, Egypt
              <br />
              Phone:{" "}
              <a href="tel:+201044438446" className="text-[#00bd70]">
                010 444 38446
              </a>
              <br />
              Email:{" "}
              <a
                href="mailto:info@bolt-energy.me"
                className="text-[#00bd70]"
              >
                info@bolt-energy.me
              </a>
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-10 justify-center">
            <Button asChild className="bg-[#00bd70] hover:bg-[#00bd70]/90">
              <Link href="/contact-us">Contact Us</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/projects">View Our Projects</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/resources">Solar Resources</Link>
            </Button>
          </div>
        </div>
        <RelatedProducts />
      </main>
      <Footer />
    </>
  );
}
