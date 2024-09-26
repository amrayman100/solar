import { ContactForm } from "@/components/contact/contact-form";
import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import Image from "next/image";

export default async function ContactUs() {
  return (
    <>
      <main className="flex-grow">
        <Header />
        <div className="flex mx-auto align-center justify-center mt-10">
          <div className="mg-5 lg:m-10 lg:w-1/3 lg:mt-5 md:mt-5 p-10">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
