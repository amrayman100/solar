import { MonthlyConsumptionForm } from "@/components/product/grid-tied/monthly-consumption-form";
import Header from "@/components/shared/header";
import { TypographyH1 } from "@/components/shared/typography";

export default async function Home() {
  return (
    <main>
      <Header />
      <div
        style={{ backgroundImage: `url(${"/drone-3.jpg"})` }}
        className="bg-cover bg-center w-screen h-96 lg:h-156 relative mt-2 bg-gradient-to-r from-primary via-yellow-400 to-primary"
      >
        <div className="flex justify-center h-full">
          <div className="mt-6 flex flex-col">
            <TypographyH1
              text="Get Your Free Solar Quote Instantly"
              className="bg-gradient-to-r from-primary via-yellow-500 to-primary text-transparent bg-clip-text"
            />
            <MonthlyConsumptionForm />
          </div>
        </div>
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex"></div>
    </main>
  );
}
