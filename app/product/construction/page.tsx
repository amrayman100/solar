import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import {
  TypographyH3,
  TypographyH4Light,
} from "@/components/shared/typography";
import Image from "next/image";
import Link from "next/link";

export default async function EV() {
  return (
    <>
      <main className="flex-grow">
        <Header />
        <div className="m-10">
          <div className="flex place-items-center gap-3">
            <TypographyH3
              text="Construction"
              className="font-bold self-center"
            />
          </div>
          <div className="mt-2 lg:flex gap-4 flex-row">
            <Image
              alt="Construction"
              src={"/contact-man.jpeg"}
              blurDataURL={"/contact-man.jpeg"}
              placeholder="blur"
              quality={100}
              height={500}
              width={500}
              sizes="100vw"
              className="lg:w-1/3 h-auto"
            />
            <div className="flex justify-center h-full">
              <div className="m-auto flex flex-col">
                <TypographyH3 text="Bolt construction is Bolt’s civil and implementation arm." />
                <TypographyH3
                  text="Our services are spread across three segments:"
                  className="font-normal mt-2"
                />
                <ul className="mt-4">
                  <li>
                    <TypographyH4Light text="• Solar plants Installations" />
                  </li>
                  <li>
                    <TypographyH4Light text="• Home finishing" />
                  </li>
                  <li>
                    <TypographyH4Light text="• General contracting" />
                  </li>
                </ul>
                <div className="mt-4">
                  <Link
                    className="text-2xl scroll-m-20 font-extrabold tracking-tight text-primary"
                    href={"/proposal/construction"}
                  >
                    Click here for a free consultation!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
