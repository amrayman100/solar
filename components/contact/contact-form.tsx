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
};

const formFactory = createFormFactory<ContactForm>({
  defaultValues: {
    email: "",
    name: "",
    phoneNumber: "",
  },
});

export function ContactForm() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (req: ContactForm) => {
      return createContactEntry(req);
    },
  });

  const form = formFactory.useForm({
    onSubmit: async ({ value }) => {
      mutation.mutateAsync(value).then(() => {
        router.push("/");
      });
    },
  });

  return (
    <>
      {" "}
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
            onChange: z.string().regex(phoneRegex, "Invalid phoneNumber"),
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
                placeholder="Phone phoneNumber"
              />
              {field.state.meta.errors ? (
                <p role="alert" className="text-red-500 mb-2">
                  {field.state.meta.errors.join(", ")}
                </p>
              ) : null}
            </>
          )}
        </form.Field>
        <div className="w-full flex place-content-center mb-4 gap-2">
          <Button variant="default" type="submit" size={"lg"}>
            Submit
            {mutation.isPending && (
              <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      </form>
      {/* {mutation.isSuccess && (
        <div className="mt-4">
          <div>Your Request is saved</div>
        </div>
      )} */}
    </>
  );
}
