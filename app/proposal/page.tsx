import { Proposal } from "@/components/product/proposal/proposal";

export default async function ProposalPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 md:p-24">
      <div className="z-10 w-full items-center justify-between  text-sm lg:flex">
        <Proposal />
      </div>
    </main>
  );
}
