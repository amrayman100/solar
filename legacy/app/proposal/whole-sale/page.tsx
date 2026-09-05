import { NewWholeSaleProposal } from "@/components/product/whole-sale/whole-sale";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Wholesale Solar Panels Egypt | Bulk Solar Equipment",
  description:
    "Wholesale solar panels and equipment in Egypt. Bulk pricing on inverters, panels, and components for installers, contractors, and businesses.",
  path: "/proposal/whole-sale",
  keywords: ["wholesale solar egypt", "bulk solar panels egypt", "solar distributor egypt"],
});

export default async function WholeSalePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1 className="sr-only">Wholesale Solar Panels and Equipment in Egypt</h1>
      <NewWholeSaleProposal />
    </main>
  );
}
