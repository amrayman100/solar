import { Proposal } from "@/components/product/proposal/proposal";

export default async function ProposalPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="">
        <Proposal />
      </div>
    </main>
  );
}
