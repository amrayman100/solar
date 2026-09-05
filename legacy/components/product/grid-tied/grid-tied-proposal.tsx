"use client";

import { GridTiedProposal } from "@/models/product";
import { createGridTiedProposal } from "@/actions/proposal";
import {
  CreateProposal,
  CustomFormStepProps,
  PropSteps,
} from "../create-proposal-form";
import { ViewGridTiedProposal } from "./view-grid-tied-proposal";
import { useReadLocalStorage } from "usehooks-ts";
import { AddressDescription } from "@/components/map/map";
import { useSearchParams } from "next/navigation";
import { memo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function NewGridTiedProposal() {
  const searchParams = useSearchParams();
  const startFromBeginning = searchParams.get("startFromBeginning");

  const localStorageData = useReadLocalStorage<{
    address: AddressDescription;
    monthlyConsumption: number;
  } | null>("consumption-details") as {
    address: AddressDescription;
    monthlyConsumption: number;
  };

  console.log(localStorageData);

  const [consumptionDetails, setConsumptionDetails] = useState<{
    monthlyConsumption: number;
  }>({
    monthlyConsumption: localStorageData?.monthlyConsumption || 0,
  });

  const MemoziedLoadsConsumptionForm = memo(function LoadsConsumptionForm(
    props: CustomFormStepProps
  ) {
    const {
      control,
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<{ monthlyConsumption: number }>({
      defaultValues: consumptionDetails,
    });

    const onSubmit: SubmitHandler<{ monthlyConsumption: number }> = (data) => {
      setConsumptionDetails({
        ...data,
      });
      props.navigate("next");
    };

    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Enter your Monthly Consumption Bill In EGP</Label>
            <Input
              min={1}
              step={"any"}
              type="number"
              {...register(`monthlyConsumption`)}
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
      {
        <CreateProposal
          customStepsClassName="lg:mt-40"
          steps={new Set<PropSteps>(["map", "housing"])}
          consumptionDetails={consumptionDetails}
          address={
            localStorageData?.address || {
              lat: 30,
              lng: 30,
            }
          }
          createProposalFunc={createGridTiedProposal}
          onProposalCreation={(proposal: GridTiedProposal) =>
            console.log(proposal)
          }
          ViewProposal={ViewGridTiedProposal}
          customFormSteps={
            startFromBeginning ? [MemoziedLoadsConsumptionForm] : undefined
          }
        />
      }
    </>
  );
}
