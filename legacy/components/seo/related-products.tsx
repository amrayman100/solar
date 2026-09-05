import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RELATED_PRODUCTS } from "@/lib/site-content";

export function RelatedProducts() {
  return (
    <section className="px-4 py-12 bg-[#f6f6f6]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#015231] mb-6 text-center">
          Explore Our Solar Solutions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {RELATED_PRODUCTS.map((product) => (
            <Link
              key={product.href}
              href={product.href}
              className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-[#015231]/10"
            >
              <h3 className="font-semibold text-[#015231]">{product.label}</h3>
              <p className="text-sm text-gray-600 mt-1">{product.description}</p>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-8 gap-4 flex-wrap">
          <Button asChild className="bg-[#00bd70] hover:bg-[#00bd70]/90">
            <Link href="/resources">Solar Guides & Resources</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/projects">View Our Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
