"use client";
import { TypographyH3, TypographyH4 } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GridTied } from "@/models/product";
import { createFormFactory } from "@tanstack/react-form";
import { Building, Home } from "lucide-react";
import { useState } from "react";

type ContactForm = {
  email: string;
  name: string;
  number: string;
};

const formFactory = createFormFactory<ContactForm>({
  defaultValues: {
    email: "",
    name: "",
    number: "",
  },
});

export function GridTiedQuote() {
  const [housingType, setHousingType] = useState<"single" | "multi">("single");
  const [formStage, setFormStage] = useState<"housing" | "contact">("housing");

  const form = formFactory.useForm({
    onSubmit: async ({ value }) => {},
  });

  return (
    <div className="mx-auto mt-10 border-solid p-10 rounded-xl border bg-card text-card-foreground shadow w-max">
      {formStage == "housing" && (
        <>
          <div>
            <div className="flex flex-col space-y-2 mb-4">
              <TypographyH3
                className="font-semibold"
                text="What type of housing do you live in?"
              />
              <div className="flex gap-10 place-content-center w-100 py-12">
                <button
                  className="flex flex-col text-center items-center cursor-pointer"
                  onClick={() => setHousingType("single")}
                >
                  <Home
                    size={100}
                    className={`${
                      housingType == "single" ? "text-primary" : ""
                    }`}
                  />
                  <TypographyH4
                    text="Single-familly"
                    className={`${
                      housingType == "single" ? "text-primary" : ""
                    }`}
                  />
                </button>
                <button
                  className="flex flex-col text-center items-center cursor-pointer"
                  onClick={() => setHousingType("multi")}
                >
                  <Building
                    size={100}
                    className={`${
                      housingType == "multi" ? "text-primary" : ""
                    }`}
                  />
                  <TypographyH4
                    className={`${
                      housingType == "multi" ? "text-primary" : ""
                    }`}
                    text="Multi-familly"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex place-content-center">
            <Button size={"lg"} onClick={() => setFormStage("contact")}>
              Next
            </Button>
          </div>
        </>
      )}

      {formStage == "contact" && (
        <>
          <form.Provider>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                //   void queryform.handleSubmit();
              }}
            >
              <div className="flex flex-col space-y-2 mb-4">
                <TypographyH3
                  className="font-semibold"
                  text="Please enter your contact info"
                />
              </div>
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "email is required" : undefined,
                }}
                children={(field) => (
                  <>
                    <Input
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="bg-background mb-4"
                      placeholder="Email"
                    />
                  </>
                )}
              />
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "name is required" : undefined,
                }}
                children={(field) => (
                  <>
                    <Input
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="bg-background mb-4"
                      placeholder="Name"
                    />
                  </>
                )}
              />
              <form.Field
                name="number"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "number is required" : undefined,
                }}
                children={(field) => (
                  <>
                    <Input
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="bg-background mb-4"
                      placeholder="Phonenumber"
                    />
                  </>
                )}
              />
              <div className="w-full flex place-content-center mb-4 gap-2">
                <Button
                  variant="secondary"
                  type="submit"
                  onClick={() => setFormStage("housing")}
                >
                  Previous
                </Button>
                <Button variant="default" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </form.Provider>
        </>
      )}
    </div>
  );
}
