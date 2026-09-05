import { NewGridTiedProposal } from "@/components/product/grid-tied/grid-tied-proposal";
import { Suspense } from "react";

export default async function GridTiedProposalPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="">
        <Suspense>
          <NewGridTiedProposal />
        </Suspense>
      </div>
    </main>
  );
}
