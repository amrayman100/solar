import { NewWholeSaleProposal } from "@/components/product/whole-sale/whole-sale";

export default async function WholeSalePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="">
        <NewWholeSaleProposal />
      </div>
    </main>
  );
}
