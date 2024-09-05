"use client";

import {
  SolarHeatingConsumption,
  SolarHeatingProposal,
  SolarIrrigationConsumption,
  SolarIrrigationProposal,
} from "@/models/product";
import {
  CreateProposal,
  CustomFormStepProps,
  PropSteps,
} from "../create-proposal-form";
import { memo, useState } from "react";
import {
  createSolarHeatingProposal,
  createSolarIrrigationProposal,
} from "@/actions/proposal";
import { ViewSolarHeatingProposal } from "./view-solar-heating-proposal";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function NewSolarHeatingProposal() {
  const [formType, setFormType] = useState("house-hold");
  const [consumptionDetails, setConsumptionDetails] =
    useState<SolarHeatingConsumption>({
      isHousehold: false,
      poolVolume: 0,
    });

  const MemoziedLoadsConsumptionForm = memo(function LoadsConsumptionForm(
    props: CustomFormStepProps
  ) {
    const houseHoldForm = useForm<{ numberOfRooms: number }>({
      defaultValues: {
        numberOfRooms: 0,
      },
    });

    const onHouseHoldSubmit: SubmitHandler<{ numberOfRooms: number }> = (
      data
    ) => {
      setConsumptionDetails({
        isHousehold: true,
        numberOfRooms: data.numberOfRooms,
      });
      props.navigate("next");
    };

    const poolForm = useForm<{ poolVolume: number }>({
      defaultValues: {
        poolVolume: 0,
      },
    });

    const onPoolSubmit: SubmitHandler<{ poolVolume: number }> = (data) => {
      setConsumptionDetails({
        isHousehold: false,
        poolVolume: data.poolVolume,
      });
      props.navigate("next");
    };

    return (
      <div className="">
        <RadioGroup
          defaultValue={formType}
          onValueChange={(val) => setFormType(val)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="house-hold" id="r2" />
            <Label htmlFor="r2">House Hold Heating</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pool" id="r3" />
            <Label htmlFor="r3">Pool Heating</Label>
          </div>
        </RadioGroup>
        {formType == "house-hold" && (
          <div className="flex my-6">
            <form onSubmit={houseHoldForm.handleSubmit(onHouseHoldSubmit)}>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor={"device-load-picture-power-"}>
                  What is the number of bathrooms and kitchens in your house
                  hold
                </Label>
                <Input
                  min={1}
                  step={"any"}
                  type="number"
                  {...houseHoldForm.register(`numberOfRooms`)}
                />
              </div>
              <div className="w-max mt-4">
                <div className="flex justify-center align-middle">
                  <Button type="submit">Next</Button>
                </div>
              </div>
            </form>
          </div>
        )}
        {formType == "pool" && (
          <div className="flex my-6">
            <form onSubmit={poolForm.handleSubmit(onPoolSubmit)}>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor={"device-load-picture-power-"}>
                  What is your pool volume? (mm3)
                </Label>
                <Input
                  min={1}
                  step={"any"}
                  type="number"
                  {...poolForm.register(`poolVolume`)}
                />
              </div>
              <div className="w-max mt-4">
                <div className="flex justify-center align-middle">
                  <Button type="submit">Next</Button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="w-full flex">
      <CreateProposal
        customStepsClassName="lg:mt-40"
        steps={new Set<PropSteps>(["map"])}
        consumptionDetails={consumptionDetails}
        address={{ lat: 30, lng: 30, city: "Cairo Governate", fullAddress: "" }}
        createProposalFunc={createSolarHeatingProposal}
        onProposalCreation={(proposal: SolarHeatingProposal) =>
          console.log(proposal)
        }
        ViewProposal={ViewSolarHeatingProposal}
        customFormSteps={[MemoziedLoadsConsumptionForm]}
      />
    </div>
  );
}
