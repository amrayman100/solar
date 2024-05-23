import { getOffGridProduct } from "@/actions/proposal";
import { NewOffGridProposal } from "@/components/product/off-grid/off-grid-proposal";

export default async function OffGridProposalPage() {
  const product = await getOffGridProduct();

  console.log(product);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="">
        <NewOffGridProposal product={product} />
      </div>
    </main>
  );
}
