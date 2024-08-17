import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { TypographyH2, TypographyH4 } from "@/components/shared/typography";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
                performance, with a commitment to respond within 48 hours. All
                of this is available for 10,000 EGP/year (VAT included).
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:mx-80 mx-10">
          <div
            className="flex flex-col gap-3 mx-auto mt-10 border-solid p-10 rounded-xl border bg-card text-card-foreground shadow w-fit"
            style={{ flex: "1 1 0px;" }}
          >
            <div className="flex flex-col place-items-center w-100 justify-center mt-6 gap-5 mb-4">
              <div className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
                All you need to keep your system optimized
              </div>
            </div>
            <div className="text-[0px]">
              <span className="text-2xl scroll-m ">
                Enhance your solar experience with our expert services, ensuring
                maximum
              </span>
              <span className="text-lg text-primary font-bold">
                {" "}
                efficiency and durability
              </span>
              <span className="text-2xl"> in solar energy solutions.</span>{" "}
            </div>
            <div className="m-auto flex gap-2">
              {/* <Button className="" variant={"secondary"}>
                Maintenance
              </Button> */}
              <Button
                className=""
                variant={"secondary"}
                // onClick={() => {
                //   redirect("/services/solar-monitoring");
                // }}
              >
                <Link
                  // className="text-2xl scroll-m-20 font-extrabold tracking-tight text-primary"
                  href={"/services/solar-monitoring"}
                >
                  Energy Monitoring
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
