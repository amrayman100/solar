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
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDropdown } from "react-icons/io";

type ContactForm = {
  email: string;
  name: string;
  phoneNumber: string;
  type: string;
  contactDesc?: string;
};

const formFactory = createFormFactory<ContactForm>({
  defaultValues: {
    email: "",
    name: "",
    phoneNumber: "",
    type: "",
    contactDesc: "",
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
      mutation.mutate(value);
    },
  });

  if (mutation.isSuccess) {
    return (
      <>
        <TypographyH3
          text="We will contact you in 48 hours"
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
        <form.Field
          name="type"
          validatorAdapter={zodValidator}
          validators={{
            onChange: ({ value }) =>
              !value ? "Subject is required" : undefined,
          }}
        >
          {(field) => (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Choose Subject <IoIosArrowDropdown className="mx-3" />
                </DropdownMenuTrigger>
                <TypographyH4
                  text={form.getFieldValue("type")}
                  className="my-2"
                />
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      field.handleChange("grid-tied");
                    }}
                  >
                    Grid Tied Panels
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      field.handleChange("solar-heating");
                    }}
                  >
                    Solar Heating
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      field.handleChange("solar-irrigation");
                    }}
                  >
                    Solar Irrigation
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      field.handleChange("off-grid");
                    }}
                  >
                    Off Grid Batteries
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      field.handleChange("ev-charging");
                    }}
                  >
                    EV Charging
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      field.handleChange("smart-monitoring");
                    }}
                  >
                    Smart Monitoring
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      field.handleChange("maintenance");
                    }}
                  >
                    Maintenance
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    key={"template-custom"}
                    onClick={() => {
                      field.handleChange("other");
                    }}
                  >
                    Other
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {field.state.meta.errors ? (
                <p role="alert" className="text-red-500 mt-2">
                  {field.state.meta.errors.join(", ")}
                </p>
              ) : null}
            </>
          )}
        </form.Field>
        <form.Field name="contactDesc">
          {(field) => (
            <>
              <Textarea
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Type your inquiry here."
                className="bg-background mb-4 mt-4"
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
