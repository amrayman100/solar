import { getOffGridProduct } from "@/actions/proposal";
import { OffGridProposal } from "@/components/product/off-grid/off-grid-proposal";

export default async function OffGridProposalPage() {
  const product = await getOffGridProduct();

  console.log(product);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="">
        <OffGridProposal product={product} />
      </div>
    </main>
  );
}
