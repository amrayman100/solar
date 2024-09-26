"use client";

import { createFormFactory } from "@tanstack/react-form";
import { TypographyH3, TypographyH4 } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { phoneRegex } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { createContactEntry } from "@/actions/contact";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";

type ContactForm = {
  email: string;
  name: string;
  phoneNumber: string;
  type: string;
  contactDesc?: string;
};

const formFactory = createFormFactory<
  Omit<ContactForm, "type" | "contactDesc">
>({
  defaultValues: {
    email: "",
    name: "",
    phoneNumber: "",
  },
});

export function MonitoringForm() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (req: ContactForm) => {
      return createContactEntry(req);
    },
  });

  const form = formFactory.useForm({
    onSubmit: async ({ value }) => {
      mutation.mutate({ ...value, type: "smart-monitoring" });
    },
  });

  if (mutation.isSuccess) {
    return (
      <>
        <TypographyH3
          text="Amazing, we will contact you as soon as possible!"
          className="font-bold"
        />
      </>
    );
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
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
          validatorAdapter={zodValidator}
          validators={{
            onChange: z
              .string()
              .email("Email is not valid")
              .optional()
              .or(z.literal("")),
          }}
        >
          {(field) => (
            <>
              <Input
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-background mb-4"
                placeholder="Email (Optional)"
              />
              {field.state.meta.errors ? (
                <p role="alert" className="text-red-500 mb-2">
                  {field.state.meta.errors.join(", ")}
                </p>
              ) : null}
            </>
          )}
        </form.Field>
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => (!value ? "Name is required" : undefined),
          }}
        >
          {(field) => (
            <>
              <Input
                type="text"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-background mb-4"
                placeholder="Name"
              />
              {field.state.meta.errors ? (
                <p role="alert" className="text-red-500 mb-2">
                  {field.state.meta.errors.join(", ")}
                </p>
              ) : null}
            </>
          )}
        </form.Field>
        <form.Field
          name="phoneNumber"
          validatorAdapter={zodValidator}
          validators={{
            onChange: z.string().regex(phoneRegex, "Invalid Phone Number"),
          }}
        >
          {(field) => (
            <>
              <Input
                type="text"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-background mb-4"
                placeholder="Phone number"
              />
              {field.state.meta.errors ? (
                <p role="alert" className="text-red-500 mb-2">
                  {field.state.meta.errors.join(", ")}
                </p>
              ) : null}
            </>
          )}
        </form.Field>
        <div className="w-full flex mt-10 gap-2 place-content-center">
          <Button variant="default" type="submit" size={"lg"}>
            Submit
            {mutation.isPending && (
              <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
