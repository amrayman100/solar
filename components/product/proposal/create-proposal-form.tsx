"use client";
import {
  CreateProposalServerFunction,
  ProposalRequestInfo,
} from "@/actions/proposal";
import { TypographyH3, TypographyH4 } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { createFormFactory } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Building, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

import { useMediaQuery, useReadLocalStorage } from "usehooks-ts";
import { phoneRegex } from "@/lib/utils";
import { AddressDescription, MapView } from "@/components/map/map";
import { ProductProposal } from "@/models/product";

type ContactForm = {
  email: string;
  name: string;
  number: string;
};

type ConsumptionDetails = {
  address: AddressDescription;
  monthlyConsumption: number;
};

const formFactory = createFormFactory<ContactForm>({
  defaultValues: {
    email: "",
    name: "",
    number: "",
  },
});

interface ViewProps<T> {
  proposal: ProductProposal<T>;
}

type CreateProposalProps<T> = {
  createProposalFunc: CreateProposalServerFunction<T>;
  onProposalCreation: (proposal: ProductProposal<T>) => void;
  ViewProposal: React.FC<ViewProps<T>>;
};

export function CreateProposal<T>({
  createProposalFunc,
  onProposalCreation,
  ViewProposal,
}: CreateProposalProps<T>) {
  const [mode, setMode] = useState<"submit" | "view">("submit");
  const [housingType, setHousingType] = useState<"single" | "multi">("single");
  const [formStage, setFormStage] = useState<"housing" | "contact" | "map">(
    "map"
  );

  const consumptionDetails = useReadLocalStorage<ConsumptionDetails | null>(
    "consumption-details"
  ) as ConsumptionDetails;

  const [addressSubmit, setAddressSubmit] = useState<AddressDescription>();

  const isMobileScreen = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    consumptionDetails?.address && setAddressSubmit(consumptionDetails.address);
  }, [consumptionDetails]);

  const mutation = useMutation({
    mutationFn: (req: ProposalRequestInfo) => {
      return createProposalFunc(req);
    },
  });

  const form = formFactory.useForm({
    onSubmit: async ({ value }) => {
      let addressSubmitReq: { lat: number; long: number; city: string };
      if (!addressSubmit) {
        addressSubmitReq = {
          lat: consumptionDetails?.address?.lat,
          long: consumptionDetails?.address?.lng,
          city: consumptionDetails.address.city,
        };
      } else {
        addressSubmitReq = {
          lat: addressSubmit?.lat,
          long: addressSubmit?.lng,
          city: addressSubmit.city,
        };
      }

      debugger;

      const res = mutation.mutateAsync({
        monthlyConsumption: consumptionDetails?.monthlyConsumption,
        name: value.name,
        email: value.email,
        phoneNumber: value.number,
        ...addressSubmitReq,
      });
      res.then((res) => {
        setMode("view");
        onProposalCreation(res);
      });
    },
  });

  return (
    <>
      {mode == "submit" && (
        <div className="mx-auto lg:mt-24 md:mt-24 lg:border lg:border-solid p-10 lg:rounded-xl bg-card text-card-foreground shadow w-max">
          {formStage == "map" && (
            <div>
              <div className="flex flex-col space-y-2 mb-4">
                <TypographyH3
                  className="font-semibold mb-4"
                  text="Locate your roof"
                />
                {addressSubmit && (
                  <MapView
                    setAddressDescription={(arg: AddressDescription) =>
                      setAddressSubmit(arg)
                    }
                    address={addressSubmit}
                    style={{
                      width: isMobileScreen ? "100%" : 800,
                      height: 400,
                    }}
                  />
                )}
              </div>
              <div className="w-full flex place-content-center mb-4 gap-2">
                <Button size={"lg"} onClick={() => setFormStage("housing")}>
                  Next
                </Button>
              </div>
            </div>
          )}
          {formStage == "housing" && (
            <>
              <div>
                <div className="flex flex-col space-y-2 mb-4 w-100 min-w-0">
                  <TypographyH3
                    className="font-semibold break-all overflow-auto break-normal max-w-80 lg:max-w-full"
                    text="What type of housing do you live in?"
                  />
                  <div className="flex flex-col lg:flex-row md:flex-row gap-10 place-content-center py-12 w-100">
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
                        text="Villa"
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
                        text="Apartment"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full flex place-content-center mb-4 gap-2">
                <Button size={"lg"} onClick={() => setFormStage("contact")}>
                  Next
                </Button>
                <Button
                  size={"lg"}
                  variant="secondary"
                  type="submit"
                  onClick={() => setFormStage("map")}
                >
                  Previous
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
                      onChange: z.string().email("Email is required"),
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
                          placeholder="Email"
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
                      onChange: ({ value }) =>
                        !value ? "Name is required" : undefined,
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
                    name="number"
                    validatorAdapter={zodValidator}
                    validators={{
                      onChange: z.string().regex(phoneRegex, "Invalid Number"),
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
                          placeholder="Phone Number"
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
                    <Button
                      size={"lg"}
                      variant="secondary"
                      type="submit"
                      onClick={() => setFormStage("housing")}
                    >
                      Previous
                    </Button>
                    <Button variant="default" type="submit" size={"lg"}>
                      Submit
                      {mutation.isPending && (
                        <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
                      )}
                    </Button>
                  </div>
                </form>
              </form.Provider>
              {mutation.isSuccess && (
                <div className="mt-4">
                  <div>Your Request is saved</div>
                </div>
              )}
            </>
          )}
        </div>
      )}
      {mutation.isSuccess && mode == "view" && mutation.data && (
        <ViewProposal proposal={mutation.data} />
      )}
    </>
  );
}
