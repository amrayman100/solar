"use client";

import { WholeSaleConsumption, WholeSaleProposal } from "@/models/product";
import {
  CreateProposal,
  CustomFormStepProps,
  PropSteps,
} from "../create-proposal-form";
import { memo, useState } from "react";
import { createWholesaleProposal } from "@/actions/proposal";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ViewWholeSaleProposal } from "./view-whole-sale";
import {
  TypographyH2,
  TypographyH4Light,
} from "@/components/shared/typography";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function NewWholeSaleProposal() {
  const [consumptionDetails, setConsumptionDetails] =
    useState<WholeSaleConsumption>({});

  const MemoziedLoadsConsumptionForm = memo(function LoadsConsumptionForm(
    props: CustomFormStepProps
  ) {
    const {
      control,
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<WholeSaleConsumption>({
      defaultValues: {},
    });

    const onSubmit: SubmitHandler<WholeSaleConsumption> = (data) => {
      debugger;
      setConsumptionDetails({
        ...data,
      });
      props.navigate("next");
    };

    return (
      <div className="flex">
        <div className="m-10 mx-auto">
          <TypographyH2
            text="Please enter your order details"
            className="mb-4"
          />
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
              <Label htmlFor={"device-load-picture-name-"}>
                Company Name (optional)
              </Label>
              <Input type="string" {...register(`companyName`)} />
            </div>
            <div>
              <TypographyH4Light text="Meter" className="font-bold" />
              <div className="flex gap-4 my-4 flex-col lg:flex-row">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor={"device-load-picture-name-"}>
                    Meter Capacity in Amperage
                  </Label>
                  <Input
                    step={"any"}
                    type="number"
                    {...register(`meters.meterCapacity`)}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor={"device-load-picture-name-"}>Quantity</Label>
                  <Input
                    defaultValue={0}
                    step={"any"}
                    type="number"
                    {...register(`meters.numberOfMeters`)}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Controller
                    name="meters.type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <>
                        <Label className="mb-4">Type</Label>
                        <RadioGroup
                          defaultValue="mono"
                          className="mt-2"
                          {...register(`meters.type`, { required: false })}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="mono"
                              id="r3"
                              onClick={() => field.onChange("mono")}
                            />
                            <Label htmlFor="r1">Mono-directional</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="bi"
                              id="r4"
                              onClick={() => field.onChange("bi")}
                            />
                            <Label htmlFor="r2">Bi-directional</Label>
                          </div>
                        </RadioGroup>
                      </>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <TypographyH4Light
                text="Solar Street Light"
                className="font-bold"
              />
              <div className="flex gap-4 my-4 flex-col lg:flex-row">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor={"device-load-picture-name-"}>
                    Power in Watt
                  </Label>
                  <Input
                    step={"any"}
                    type="number"
                    {...register(`streetLights.lightPowerWatt`)}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor={"device-load-picture-name-"}>
                    Pole Height
                  </Label>
                  <Input
                    defaultValue={0}
                    step={"any"}
                    type="number"
                    {...register(`streetLights.poleHeight`)}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor={"device-load-picture-name-"}>Quantity</Label>
                  <Input
                    defaultValue={0}
                    step={"any"}
                    type="number"
                    {...register(`streetLights.numberOfLights`)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <TypographyH4Light text="Cables" className="font-bold" />
              <div className="flex gap-4 my-4 flex-col lg:flex-row">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor={"device-load-picture-name-"}>Type</Label>
                  <Input type="string" {...register(`cables.type`)} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor={"device-load-picture-name-"}>Thickness</Label>
                  <Input type="string" {...register(`cables.thickness`)} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor={"device-load-picture-name-"}>Make</Label>
                  <Input type="string" {...register(`cables.make`)} />
                </div>
              </div>
              <div className="flex gap-4 my-4 flex-col lg:flex-row">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor={"device-load-picture-name-"}>Quantity</Label>
                  <Input
                    defaultValue={0}
                    step={"any"}
                    type="number"
                    {...register(`cables.numberOfCables`)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <TypographyH4Light
                text="Mounting Structure"
                className="font-bold"
              />
              <div className="flex gap-4 my-4 flex-col lg:flex-row">
                <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
                  <Controller
                    name="mountingStructures.type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <>
                        <Label className="mb-4">Type</Label>
                        <RadioGroup
                          defaultValue="mono"
                          className="mt-2"
                          {...register(`mountingStructures.type`, {
                            required: false,
                          })}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="mono"
                              id="r3"
                              onClick={() => field.onChange("alum")}
                            />
                            <Label htmlFor="r1">Aluminium</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="bi"
                              id="r4"
                              onClick={() => field.onChange("steel")}
                            />
                            <Label htmlFor="r2">Galvanized Steel</Label>
                          </div>
                        </RadioGroup>
                      </>
                    )}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor={"device-load-picture-name-"}>
                    Quantity Per Metric Ton
                  </Label>
                  <Input
                    type="string"
                    {...register(`mountingStructures.quantityWattPerMetricTon`)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <TypographyH4Light text="Panels" className="font-bold" />
              <div className="flex gap-4 my-4 flex-col lg:flex-row">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor={"device-load-picture-name-"}>
                    Power in Watt
                  </Label>
                  <Input
                    step={"any"}
                    type="number"
                    {...register(`panels.inputWatt`)}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor={"device-load-picture-name-"}>Quantity</Label>
                  <Input
                    defaultValue={0}
                    step={"any"}
                    type="number"
                    {...register(`panels.numberOfPanels`)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <TypographyH4Light text="Inverters" className="font-bold" />
              <div className="flex gap-4 my-4 flex-col lg:flex-row">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor={"device-load-picture-name-"}>
                    Power in Watt
                  </Label>
                  <Input
                    step={"any"}
                    type="number"
                    {...register(`inverters.capacityKW`)}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor={"device-load-picture-name-"}>Quantity</Label>
                  <Input
                    defaultValue={0}
                    step={"any"}
                    type="number"
                    {...register(`inverters.numberOfInverters`)}
                  />
                </div>
              </div>
            </div>
            <div className="w-max mt-10">
              <div className="flex justify-center align-middle">
                <Button type="submit">Next</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  });

  return (
    <>
      <CreateProposal
        steps={new Set<PropSteps>(["map"])}
        consumptionDetails={consumptionDetails}
        address={{ lat: 30, lng: 30, city: "Cairo Governate", fullAddress: "" }}
        createProposalFunc={createWholesaleProposal}
        onProposalCreation={(proposal: WholeSaleProposal) =>
          console.log(proposal)
        }
        ViewProposal={ViewWholeSaleProposal}
        customFormSteps={[MemoziedLoadsConsumptionForm]}
      />
    </>
  );
}
