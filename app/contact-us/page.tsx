import { ContactForm } from "@/components/contact/contact-form";
import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";

export default async function ContactUs() {
  return (
    <>
      <main className="flex-grow">
        <Header />
        <div className="m-10 w-1/3 mx-auto mx-auto lg:mt-5 md:mt-5 lg:border lg:border-solid p-10 lg:rounded-xl bg-card text-card-foreground shadow">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
