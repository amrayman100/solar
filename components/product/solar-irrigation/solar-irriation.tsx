"use client";

import {
  SolarIrrigationConsumption,
  SolarIrrigationProposal,
} from "@/models/product";
import { CreateProposal, CustomFormStepProps } from "../create-proposal-form";
import { memo, useState } from "react";
import { createSolarIrrigationProposal } from "@/actions/proposal";
import { ViewSolarIrrigationProposal } from "./view-solar-irrigation-proposal";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function NewSolarIrrigationProposal() {
  const [consumptionDetails, setConsumptionDetails] =
    useState<SolarIrrigationConsumption>({
      pumpCapacity: 0,
    });

  const MemoziedLoadsConsumptionForm = memo(function LoadsConsumptionForm(
    props: CustomFormStepProps
  ) {
    const {
      control,
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<SolarIrrigationConsumption>({
      defaultValues: consumptionDetails,
    });

    const onSubmit: SubmitHandler<SolarIrrigationConsumption> = (data) => {
      setConsumptionDetails({
        ...data,
      });
      props.navigate("next");
    };

    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor={"device-load-picture-power-"}>
              Enter your Pump Capacity in horse power
            </Label>
            <Input
              min={1}
              step={"any"}
              type="number"
              key={"pumpCapacity-input-"}
              {...register(`pumpCapacity`)}
            />
          </div>
          <div className="w-max mt-4">
            <div className="flex justify-center align-middle">
              <Button type="submit">Next</Button>
            </div>
          </div>
        </form>
      </div>
    );
  });

  return (
    <>
      <CreateProposal
        customStepsClassName="lg:mt-40"
        consumptionDetails={consumptionDetails}
        address={{ lat: 30, lng: 30, city: "Cairo Governate", fullAddress: "" }}
        createProposalFunc={createSolarIrrigationProposal}
        onProposalCreation={(proposal: SolarIrrigationProposal) =>
          console.log(proposal)
        }
        ViewProposal={ViewSolarIrrigationProposal}
        customFormSteps={[MemoziedLoadsConsumptionForm]}
      />
    </>
  );
}
