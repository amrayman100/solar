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
import { useState } from "react";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

import {
  useLocalStorage,
  useMediaQuery,
  useReadLocalStorage,
} from "usehooks-ts";
import { phoneRegex } from "@/lib/utils";
import { AddressDescription, MapView } from "@/components/map/map";
import { ProductProposal } from "@/models/product";

type ContactForm = {
  email?: string;
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

interface ViewProps<T> {
  proposal: ProductProposal<T>;
}

export interface CustomFormStepProps {
  navigate: (dir: "previous" | "next") => void;
}

type CreateProposalProps<A, T> = {
  consumptionDetails: A;
  address: AddressDescription;
  createProposalFunc: CreateProposalServerFunction<A, T>;
  onProposalCreation: (proposal: ProductProposal<T>) => void;
  ViewProposal: React.FC<ViewProps<T>>;
  customFormSteps?: Array<React.FC<CustomFormStepProps>>;
  steps?: Set<PropSteps>;
};

export type PropSteps = "housing" | "map";

type Step = "housing" | "map" | "contact";

export function CreateProposal<A, T>({
  consumptionDetails,
  address,
  createProposalFunc,
  onProposalCreation,
  ViewProposal,
  customFormSteps,
  steps,
}: CreateProposalProps<A, T>) {
  const [localStorageData, setLocalStorageData] = useLocalStorage<{
    address: AddressDescription;
    email: string;
    name: string;
    phoneNumber: string;
  } | null>("user-proposal-info", null);

  const directionSet = steps || new Set<Step>([]);
  const directions = Array.from(directionSet);

  const [currentStepCounter, setCurrentStepCounter] = useState(0);
  const [currentStep, setCurrentStep] = useState(
    directions.length > 0 ? directions[0] : null
  );

  const [mode, setMode] = useState<"submit" | "view">("submit");
  const [housingType, setHousingType] = useState<"single" | "multi">("single");

  const [addressSubmit, setAddressSubmit] = useState<AddressDescription>(
    localStorageData?.address || address
  );

  const [customFormCounter, setCustomFormCounter] = useState(0);

  const isMobileScreen = useMediaQuery("(max-width: 768px)");

  const mutation = useMutation({
    mutationFn: (req: ProposalRequestInfo<A>) => {
      return createProposalFunc({ ...req, consumptionDetails });
    },
  });

  const form = formFactory.useForm({
    defaultValues: {
      name: localStorageData?.name || "",
      email: localStorageData?.email || "",
      number: localStorageData?.phoneNumber || "",
    },
    onSubmit: async ({ value }) => {
      let addressSubmitReq: { lat: number; long: number; city: string };
      if (!addressSubmit) {
        addressSubmitReq = {
          lat: address?.lat,
          long: address?.lng,
          city: address.city,
        };
      } else {
        addressSubmitReq = {
          lat: addressSubmit?.lat,
          long: addressSubmit?.lng,
          city: addressSubmit.city,
        };
      }

      setLocalStorageData({
        address: addressSubmit,
        name: value.name,
        email: value.email || "",
        phoneNumber: value.number,
      });

      const res = mutation.mutateAsync({
        consumptionDetails: consumptionDetails,
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

  const moveFromCurrentStep = (move: "N" | "P") => {
    debugger;
    if (move === "N" && directions.length == currentStepCounter + 1) {
      setCurrentStep("contact");
      const nextStepCounter = currentStepCounter + 1;
      setCurrentStepCounter(nextStepCounter);
      return;
    }

    if (move === "N") {
      const nextStepCounter = currentStepCounter + 1;
      const nextStep = directions[nextStepCounter];

      setCurrentStep(nextStep);
      setCurrentStepCounter(nextStepCounter);
    } else {
      if (currentStepCounter == 0) {
        setCustomFormCounter(customFormCounter - 1);
        return;
      }
      const nextStepCounter = currentStepCounter - 1;
      const nextStep = directions[nextStepCounter];

      setCurrentStep(nextStep);
      setCurrentStepCounter(nextStepCounter);
    }
  };

  return (
    <>
      {customFormSteps?.length &&
        customFormCounter < customFormSteps?.length && (
          <div className="flex m-auto justify-center align-middle">
            <div className="lg:mt-40 lg:border lg:border-solid p-10 lg:rounded-xl bg-card text-card-foreground shadow">
              {customFormSteps.map((Step, i) => {
                if (i !== customFormCounter) {
                  return null;
                }

                return (
                  <Step
                    key={"custom-form-step-" + i}
                    navigate={(dir: "next" | "previous") => {
                      if (dir === "next") {
                        setCustomFormCounter(customFormCounter + 1);
                      } else {
                        setCustomFormCounter(customFormCounter - 1);
                      }

                      if (directions.length == 0) {
                        setCurrentStep("contact");
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      {mode == "submit" &&
        (!customFormSteps?.length ||
          customFormCounter == customFormSteps?.length) && (
          <div className="mx-auto lg:mt-5 md:mt-5 lg:border lg:border-solid p-10 lg:rounded-xl bg-card text-card-foreground shadow w-max">
            {currentStep == "map" && (
              <div>
                <div className="flex flex-col space-y-2 mb-4">
                  <TypographyH3
                    className="font-semibold mb-4"
                    text="Locate your roof"
                  />
                  {addressSubmit && (
                    <MapView
                      actionButton={() => (
                        <>
                          {customFormSteps?.length && (
                            <Button
                              size={"lg"}
                              variant="secondary"
                              type="submit"
                              onClick={() =>
                                // setCustomFormCounter(customFormCounter - 1)
                                moveFromCurrentStep("P")
                              }
                            >
                              Previous
                            </Button>
                          )}
                          <Button
                            size={"lg"}
                            onClick={() => moveFromCurrentStep("N")}
                          >
                            Next
                          </Button>{" "}
                        </>
                      )}
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
              </div>
            )}
            {currentStep == "housing" && (
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
                  <Button size={"lg"} onClick={() => moveFromCurrentStep("N")}>
                    Next
                  </Button>
                  <Button
                    size={"lg"}
                    variant="secondary"
                    type="submit"
                    onClick={() => moveFromCurrentStep("P")}
                  >
                    Previous
                  </Button>
                </div>
              </>
            )}

            {currentStep == "contact" && (
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
                      type="button"
                      variant="secondary"
                      onClick={() => moveFromCurrentStep("P")}
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
