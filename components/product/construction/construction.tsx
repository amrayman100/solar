"use client";

import {
  Charger,
  ConstructionConsumption,
  ConstructionProposal,
  EVConsumption,
  EVProposal,
} from "@/models/product";
import {
  CreateProposal,
  CustomFormStepProps,
  PropSteps,
} from "../create-proposal-form";
import { memo, useState } from "react";
import {
  createConstructionProposal,
  createEVProposal,
} from "@/actions/proposal";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { IoIosArrowDropdown } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ViewConstructionProposal } from "./view-construction-proposal";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { tree } from "next/dist/build/templates/app-page";

export function NewConstructionProposal() {
  const [consumptionDetails, setConsumptionDetails] =
    useState<ConstructionConsumption>({
      type: "generalContracting",
      subject: "",
    });

  const [type, setType] = useState<
    "homeFinishing" | "generalContracting" | "solar-panel-installations"
  >("generalContracting");

  const [finishingType, setFinishingType] = useState<
    "basic" | "luxury" | "premium"
  >("basic");

  const MemoziedLoadsConsumptionForm = memo(function LoadsConsumptionForm(
    props: CustomFormStepProps
  ) {
    const generalForm = useForm<{ subject: string }>({
      defaultValues: {
        subject:
          consumptionDetails.type === "generalContracting"
            ? consumptionDetails.subject
            : "",
      },
    });

    const onGeneralSubmit: SubmitHandler<{ subject: string }> = (data) => {
      setConsumptionDetails({
        ...data,
        type: "generalContracting",
      });
      props.navigate("next");
    };

    const solarForm = useForm<{
      plantSizeKws: number;
    }>({
      defaultValues: {
        plantSizeKws:
          consumptionDetails.type === "solar-panel-installations"
            ? consumptionDetails.plantSizeKws
            : 0,
      },
    });

    const onSolarSubmit: SubmitHandler<{
      plantSizeKws: number;
    }> = (data) => {
      setConsumptionDetails({
        ...data,
        type: "solar-panel-installations",
      });
      props.navigate("next");
    };

    const homeFinishingForm = useForm<{
      finishingType: "basic" | "premium" | "luxury";
      m2: number;
    }>({
      defaultValues: {
        finishingType:
          consumptionDetails.type === "homeFinishing"
            ? consumptionDetails.finishingType
            : "basic",
        m2:
          consumptionDetails.type === "homeFinishing"
            ? consumptionDetails.m2
            : 0,
      },
    });

    const onHomeFinishingSubmit: SubmitHandler<{
      finishingType: "basic" | "premium" | "luxury";
      m2: number;
    }> = (data) => {
      debugger;
      console.log("data", data);
      setConsumptionDetails({
        ...data,
        finishingType: finishingType,
        type: "homeFinishing",
      });
      props.navigate("next");
    };

    // console.log(homeFinishingForm.formState.errors);

    // const c = homeFinishingForm.watch("finishingType");

    // console.log(c);

    return (
      <div className="flex-col justify-center">
        <div className="m-auto text-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              Select Your Enquiry Type
              <IoIosArrowDropdown className="mx-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                key={"generalContracting"}
                onClick={() => {
                  setType("generalContracting");
                }}
              >
                General Contracting
              </DropdownMenuItem>
              <DropdownMenuItem
                key={"homeFinishing"}
                onClick={() => {
                  setType("homeFinishing");
                }}
              >
                Home Finishing
              </DropdownMenuItem>
              <DropdownMenuItem
                key={"solar-panel-installations"}
                onClick={() => {
                  setType("solar-panel-installations");
                }}
              >
                Solar Panel Installations
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="m-10 w-max">
          {type === "generalContracting" && (
            <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)}>
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                <Label
                  htmlFor={"device-load-picture-power-"}
                  className="text-center mb-4"
                >
                  General Contracting
                </Label>
                <Textarea
                  className=""
                  placeholder="Type your inquiry here."
                  {...generalForm.register(`subject`, {
                    required: false,
                  })}
                />
              </div>
              <div className="w-max mt-4">
                <div className="flex justify-center align-middle">
                  <Button type="submit">Next</Button>
                </div>
              </div>
            </form>
          )}
          {type === "solar-panel-installations" && (
            <form onSubmit={solarForm.handleSubmit(onSolarSubmit)}>
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                <Label
                  htmlFor={"device-load-picture-power-"}
                  className="text-center mb-4"
                >
                  Solar Panel Installations
                </Label>
                <Label htmlFor={"device-load-picture-power-"}>
                  Enter your system size in KWs
                </Label>
                <Input
                  type="number"
                  min="1"
                  className=""
                  placeholder="System Size"
                  {...solarForm.register(`plantSizeKws`, {
                    required: true,
                  })}
                />
              </div>
              <div className="w-max mt-4">
                <div className="flex justify-center align-middle">
                  <Button type="submit">Next</Button>
                </div>
              </div>
            </form>
          )}
          {type === "homeFinishing" && (
            <form
              onSubmit={homeFinishingForm.handleSubmit(onHomeFinishingSubmit)}
            >
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                <Label className="text-center mb-4">Home Finishing</Label>
                <Label>Enter your home area in sq meters</Label>
                <Input
                  type="number"
                  min="1"
                  className=""
                  placeholder="Home Area"
                  {...homeFinishingForm.register(`m2`, {
                    required: true,
                  })}
                />
                <div className="mt-2">
                  <Label className="mb-4">Finishing Type</Label>
                  <RadioGroup
                    defaultValue={finishingType}
                    className="mt-2"
                    {...homeFinishingForm.register(`finishingType`, {
                      required: false,
                    })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="basic"
                        id="r1"
                        onClick={() => setFinishingType("basic")}
                      />
                      <Label htmlFor="r1">Basic</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="premium"
                        id="r2"
                        onClick={() => {
                          // debugger;
                          setFinishingType("premium");
                        }}
                      />
                      <Label htmlFor="r2">Premium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="luxury"
                        id="r3"
                        onClick={() => setFinishingType("luxury")}
                      />
                      <Label htmlFor="r3">Luxury</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-max mt-4">
                  <div className="flex justify-center align-middle">
                    <Button type="submit">Next</Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  });

  return (
    <>
      <CreateProposal
        customStepsClassName="lg:mt-16"
        consumptionDetails={consumptionDetails}
        address={{ lat: 30, lng: 30, city: "Cairo Governate", fullAddress: "" }}
        createProposalFunc={createConstructionProposal}
        onProposalCreation={(proposal: ConstructionProposal) =>
          console.log(proposal)
        }
        ViewProposal={ViewConstructionProposal}
        customFormSteps={[MemoziedLoadsConsumptionForm]}
      />
    </>
  );
}
