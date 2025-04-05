import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { TypographyH4 } from "@/components/shared/typography";
import Image from "next/image";
import { MainentanceForm } from "@/components/services/maintenance/maintenance-form";

export default async function Maintenance() {
  return (
    <>
      <main className="flex-grow w-screen">
        <Header />
        <div className="lg:mt-10 flex flex-col lg:flex-row mx-4 gap-2">
          <Image
            alt="logo-bg"
            src={"/logo-bg.jpg"}
            blurDataURL={"/logo-bg.jpg"}
            placeholder="blur"
            quality={100}
            height={500}
            width={500}
            style={{
              objectFit: "cover",
            }}
          />
          <div
            id="maint"
            className="flex flex-col gap-3 mx-auto border-solid p-10 rounded-xl border bg-card text-card-foreground shadow w-fit"
            style={{ flex: "1 1 0px;" }}
          >
            <TypographyH4
              text="Proactive Measures: The Key to Success"
              className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl"
            />
            <div className="text-[0px]">
              <span className="font-normal text-lg">
                Our maintenance service ensures your installation remains in top
                condition for maximum performance and durability. We will
                inspect, update, and clean your system to guarantee optimal
                performance and prevent obstructions. Additionally, we offer
                personalized advice for any queries, needs, and inverter
                performance, with a commitment to respond within 72 hours. All
                of this is available for 10,000 EGP/year (VAT included).
              </span>
            </div>
            <div className="mt-4">
              <MainentanceForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
