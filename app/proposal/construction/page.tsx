import { NewConstructionProposal } from "@/components/product/construction/construction";

export default async function ConstructionProposalPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="">
        <NewConstructionProposal />
      </div>
    </main>
  );
}
