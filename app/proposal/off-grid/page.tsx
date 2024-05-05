import { GridTiedProposal } from "@/components/product/grid-tied/grid-tied-proposal";

export default async function OffGridProposalPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="">
        <GridTiedProposal />
      </div>
    </main>
  );
}
