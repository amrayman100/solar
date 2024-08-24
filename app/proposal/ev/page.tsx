import { getEV } from "@/actions/proposal";
import { NewEVProposal } from "@/components/product/ev/ev";

export default async function EVProposalPage() {
  const evProduct = await getEV();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="">
        <NewEVProposal chargers={evProduct.parameters.chargers} />
      </div>
    </main>
  );
}
