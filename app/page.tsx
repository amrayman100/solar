import { MonthlyConsumptionForm } from "@/components/product/grid-tied/monthly-consumption-form";
import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";

export default async function Home() {
  return (
    <>
      <main className="flex-grow w-screen">
        <Header />
        <div
          style={{ backgroundImage: `url(${"/drone-3.jpg"})` }}
          className="bg-cover bg-center w-full h-96 lg:h-156 relative mt-2 bg-gradient-to-r from-primary via-yellow-400 to-primary"
        >
          <div className="flex justify-center h-full">
            <div className="m-auto flex flex-col">
              <div>
                <span className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
                  Get Your Free Solar Quote{" "}
                </span>
                <span className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
                  Instantly
                </span>
              </div>
              <MonthlyConsumptionForm />
            </div>
          </div>
        </div>
        <div className=""></div>
      </main>
      <Footer />
    </>
  );
}
