import { NewSolarHeatingProposal } from "@/components/product/solar-heating/solar-heating";

export default async function SolarIrrigationProposalPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="">
        <NewSolarHeatingProposal />
      </div>
    </main>
  );
}
