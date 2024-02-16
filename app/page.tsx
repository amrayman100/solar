import Background from "@/components/shared/background";
import Header from "@/components/shared/header";
import { TypographyH1 } from "@/components/shared/typography";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="w-screen h-96 relative mt-2 bg-gradient-to-r from-primary via-yellow-400 to-primary">
        <div className="flex justify-center">
          <div className="mt-6">
            <TypographyH1 text="Get Your Free Solar Quote Instantly" />
          </div>
        </div>
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>
    </main>
  );
}
