import { NewSolarIrrigationProposal } from "@/components/product/solar-irrigation/solar-irriation";

export default async function OffGridProposalPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="">
        <NewSolarIrrigationProposal />
      </div>
    </main>
  );
}
