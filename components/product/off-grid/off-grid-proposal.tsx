"use client";

import {
  OffGrid,
  OffGridConsumption,
  OffGridProposal,
  getOffGridProposal,
  offGridProduct,
} from "@/models/product";
import { createOffGridProposal } from "@/actions/proposal";
import {
  CreateProposal,
  CustomFormStepProps,
  PropSteps,
} from "../create-proposal-form";
import { ViewOffGridProposal } from "./view-off-grid-proposal";
import { Button } from "@/components/ui/button";
import { memo, useEffect, useState } from "react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { TypographyH5 } from "@/components/shared/typography";

const hpToWatt = 746;

export function NewOffGridProposal({ product }: { product: OffGrid }) {
  const [consumptionDetails, setConsumptionDetails] =
    useState<OffGridConsumption>({
      isConnectedToGrid: true,
      placeBatteriesIndoors: false,
      deviceLoads: [],
    });

  const MemoziedLoadsConsumptionForm = memo(function LoadsConsumptionForm(
    props: CustomFormStepProps
  ) {
    const {
      control,
      register,
      watch,
      handleSubmit,
      unregister,
      formState: { errors },
    } = useForm<OffGridConsumption>({
      defaultValues: consumptionDetails,
    });

    const { fields, append, remove } = useFieldArray({
      control,
      name: "deviceLoads",
    });

    const consumptionWatch = watch();

    const isConnectedToGridField = watch("isConnectedToGrid");

    console.log(errors);

    useEffect(() => {
      if (!isConnectedToGridField) {
        fields.forEach((field, i) => {
          register(`deviceLoads.${i}.morningHours`);
          register(`deviceLoads.${i}.eveningHours`);
        });
      } else {
        fields.forEach((field, i) => {
          unregister(`deviceLoads.${i}.morningHours`);
          unregister(`deviceLoads.${i}.eveningHours`);
        });
      }
    }, [isConnectedToGridField, register, unregister]);

    const onSubmit: SubmitHandler<OffGridConsumption> = (data) => {
      debugger;
      if (data.deviceLoads.length == 0) {
        return;
      }
      const deviceLoads = data.deviceLoads.map((load) => {
        if (load.hasSurgePower) {
          return {
            ...load,
            powerWatt: load.powerHP ? load.powerHP * hpToWatt : 0,
          };
        } else {
          return {
            ...load,
          };
        }
      });
      setConsumptionDetails({
        ...data,
        deviceLoads,
        isConnectedToGrid: data.isConnectedToGrid ? true : false,
        placeBatteriesIndoors: data.placeBatteriesIndoors ? true : false,
      });
      props.navigate("next");
    };

    function Status() {
      try {
        const proposal = getOffGridProposal(
          {
            consumptionDetails: consumptionWatch,
            city: "",
            name: "",
            phoneNumber: "",
          },
          1,
          offGridProduct
        );

        const details = proposal.proposalDetails;

        return (
          <>
            <TypographyH5 text="Current Status:" />
            <div className="flex lg:flex-row flex-col gap-2 mt-1 lg:border lg:border-solid p-10 lg:rounded-xl bg-card text-card-foreground shadow w-max">
              <div className="mt-1 lg:mt-1 rounded-xl border bg-card text-card-foreground shadow p-4 w-max">
                <div className="flex-col flex gap-2">
                  <div className="">
                    <span>{"Number of Batteries: "}</span>
                    <span className="font-bold">
                      {details.numberOfBatteries || 0}
                    </span>
                  </div>
                </div>
              </div>
              {!proposal.proposalDetails.isConnectedToGrid && (
                <div className="mt-1 lg:mt-1 rounded-xl border bg-card text-card-foreground shadow p-4 w-max">
                  <div className="flex-col flex gap-2">
                    <div className="">
                      <span>{"Number of Panels: "}</span>
                      <span className="font-bold">
                        {details.numberOfPanels || 0}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-1 lg:mt-1 rounded-xl border bg-card text-card-foreground shadow p-4 w-max">
                <div className="flex-col flex gap-2">
                  <div className="">
                    <span>{"Price: "}</span>
                    <span className="font-bold">
                      {details.sellingCost
                        ? Math.round(details.sellingCost).toLocaleString("en", {
                            useGrouping: true,
                          }) + " E£"
                        : 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      } catch (err) {
        return (
          <>
            <TypographyH5 text="Your current usage will need a custom solution" />
          </>
        );
      }
    }

    return (
      <div className="flex w-[80vw]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex mb-4 gap-4">
            <div>
              <Controller
                name="isConnectedToGrid"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <Label className="mb-4">
                      Are you connected to the governmental grid?
                    </Label>
                    <RadioGroup
                      defaultValue={isConnectedToGridField ? "true" : "false"}
                      className="mt-2"
                      {...register(`isConnectedToGrid`, { required: false })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="true"
                          id="r1"
                          onClick={() => field.onChange(true)}
                        />
                        <Label htmlFor="r1">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="false"
                          id="r2"
                          onClick={() => field.onChange(false)}
                        />
                        <Label htmlFor="r2">No</Label>
                      </div>
                    </RadioGroup>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="placeBatteriesIndoors"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <Label className="mb-4">
                      Do you want to place batteries indoors?
                    </Label>
                    <RadioGroup
                      defaultValue="false"
                      className="mt-2"
                      {...register(`placeBatteriesIndoors`, {
                        required: false,
                      })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="true"
                          id="r3"
                          onClick={() => field.onChange(true)}
                        />
                        <Label htmlFor="r1">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="false"
                          id="r4"
                          onClick={() => field.onChange(false)}
                        />
                        <Label htmlFor="r2">No</Label>
                      </div>
                    </RadioGroup>
                  </>
                )}
              />
            </div>
          </div>
          <div className="mt-10 mb-2 w-max">
            <DropdownMenu>
              <DropdownMenuTrigger>Add New Device</DropdownMenuTrigger>
              <DropdownMenuContent>
                {product?.parameters?.deviceLoadTemplates?.map((temp, key) => {
                  return (
                    <DropdownMenuItem
                      key={"template-" + key}
                      onClick={() =>
                        append({
                          name: temp.name,
                          hasSurgePower: temp.hasSurgePower,
                          powerWatt: temp.powerWatt,
                          powerHP:
                            Math.round((temp.powerWatt / hpToWatt) * 100) / 100,
                          quantity: 1,
                          hasManualTransferSwitch: temp.hasManualTransferSwitch,
                          isCustom: false,
                          unit: temp.unit,
                          morningHours: 1,
                          eveningHours: 1,
                          workingHours: 1,
                        })
                      }
                    >
                      {temp.name}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {fields.map((field, i) => (
            <div
              className="flex gap-4 mb-4 flex-col lg:flex-row"
              key={"device-load-container-" + i}
            >
              <div
                className="grid w-full max-w-sm items-center gap-1.5"
                key={"device-load-grid-" + i}
              >
                <Label
                  htmlFor={"device-load-picture-name-" + i}
                  key={"device-load-label-name-" + i}
                >
                  Name
                </Label>
                <Input
                  type="text"
                  key={"device-load-name-input-" + i}
                  {...register(`deviceLoads.${i}.name`)}
                />
              </div>
              {field.unit == "hp" ? (
                <div
                  className="grid w-full max-w-sm items-center gap-1.5"
                  key={"device-load-power-grid-" + i}
                >
                  <Label
                    htmlFor={"device-load-picture-power-" + i}
                    key={"device-load-label-power-" + i}
                  >
                    Power in Horse Power
                  </Label>
                  <Input
                    step={"any"}
                    type="number"
                    key={"device-load-powerHP-input-" + i}
                    {...register(`deviceLoads.${i}.powerHP`)}
                  />
                </div>
              ) : (
                <div
                  className="grid w-full max-w-sm items-center gap-1.5"
                  key={"device-load-power-grid-watt-" + i}
                >
                  <Label
                    htmlFor={"device-load-picture-power-" + i}
                    key={"device-load-label-power-watt-" + i}
                  >
                    Power in Watt
                  </Label>
                  <Input
                    step={"any"}
                    type="number"
                    key={"device-load-power-watt-input-" + i}
                    {...register(`deviceLoads.${i}.powerWatt`)}
                  />
                </div>
              )}
              <div
                className="grid w-full max-w-sm items-center gap-1.5"
                key={"device-load-quantity-grid-" + i}
              >
                <Label
                  htmlFor={"device-load-picture-quantity-" + i}
                  key={"device-load-label-quantity-" + i}
                >
                  Quantity
                </Label>
                <Input
                  type="number"
                  key={"device-load-quantity-input-" + i}
                  {...register(`deviceLoads.${i}.quantity`)}
                />
              </div>
              {isConnectedToGridField && (
                <div
                  className="grid w-full max-w-sm items-center gap-1.5"
                  key={"device-load-workingHours-grid-" + i}
                >
                  <Label
                    htmlFor={"device-load-picture-workingHours-" + i}
                    key={"device-load-label-workingHours-" + i}
                  >
                    Working Hours
                  </Label>
                  <Input
                    type="number"
                    key={"device-load-workingHours-input-" + i}
                    {...register(`deviceLoads.${i}.workingHours`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
              )}
              {!isConnectedToGridField && (
                <div
                  className="grid w-full max-w-sm items-center gap-1.5"
                  key={"device-load-morningHours-grid-" + i}
                >
                  <Label
                    htmlFor={"device-load-picture-morningHours-" + i}
                    key={"device-load-label-morningHours-" + i}
                  >
                    Morning Hours
                  </Label>
                  <Input
                    type="number"
                    key={"device-load-morningHours-input-" + i}
                    {...register(`deviceLoads.${i}.morningHours`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
              )}
              {!isConnectedToGridField && (
                <div
                  className="grid w-full max-w-sm items-center gap-1.5"
                  key={"device-load-eveningHours-grid-" + i}
                >
                  <Label
                    htmlFor={"device-load-picture-eveningHours-" + i}
                    key={"device-load-label-eveningHours-" + i}
                  >
                    Evening Hours
                  </Label>
                  <Input
                    type="number"
                    key={"device-load-eveningHours-input-" + i}
                    {...register(`deviceLoads.${i}.eveningHours`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
              )}
              <div
                className="flex justify-center align-middle"
                key={"device-load-remove-button-container-" + i}
              >
                <Button
                  type="button"
                  onClick={() => remove(i)}
                  variant="destructive"
                  className="justify-center self-end"
                  key={"device-load-remove-button-" + i}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <div className="my-4">{Status()}</div>
          <Button type="submit">Next</Button>
        </form>
      </div>
    );
  });

  return (
    <>
      <CreateProposal
        customStepsClassName="lg:mt-20"
        steps={new Set<PropSteps>(["map", "housing"])}
        consumptionDetails={consumptionDetails}
        address={{ lat: 30, lng: 30, city: "Cairo Governate", fullAddress: "" }}
        createProposalFunc={createOffGridProposal}
        onProposalCreation={(proposal: OffGridProposal) =>
          console.log(proposal)
        }
        ViewProposal={ViewOffGridProposal}
        customFormSteps={[MemoziedLoadsConsumptionForm]}
      />
    </>
  );
}
