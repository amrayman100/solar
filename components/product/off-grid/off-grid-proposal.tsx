"use client";

import { OffGrid, OffGridConsumption, OffGridProposal } from "@/models/product";
import { createOffGridProposal } from "@/actions/proposal";
import { CreateProposal, CustomFormStepProps } from "../create-proposal-form";
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

const hpToWatt = 735.5;

export function OffGridProposal({ product }: { product: OffGrid }) {
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
      const deviceLoads = data.deviceLoads.map((load) => {
        return {
          ...load,
          powerWatt: load.powerHP ? load.powerHP * hpToWatt : 0,
        };
      });
      setConsumptionDetails({ ...data, deviceLoads });
      props.navigate("next");
    };

    return (
      <div className="w-max">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-max mb-4">
            <Controller
              name="isConnectedToGrid"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <Label className="mb-4">
                    Are you connected to a governmental grid?
                  </Label>
                  <RadioGroup
                    defaultValue="true"
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

          <div className="w-max mb-4">
            <Controller
              name="isConnectedToGrid"
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
                    {...register(`placeBatteriesIndoors`, { required: false })}
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
          {fields.map((field, i) => (
            <div className="flex gap-4 mb-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Name</Label>
                <Input
                  type="text"
                  // disabled={true}
                  key={"deviceLoad-name-input" + i}
                  {...register(`deviceLoads.${i}.name`)}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Power in Horse Power</Label>
                <Input
                  step={"any"}
                  type="number"
                  key={"deviceLoad-name-input" + i}
                  {...register(`deviceLoads.${i}.powerHP`)}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Quantity</Label>
                <Input
                  type="number"
                  key={"deviceLoad-quantity-input" + i}
                  {...register(`deviceLoads.${i}.quantity`)}
                />
              </div>
              {isConnectedToGridField && (
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">Morning Hours</Label>
                  <Input
                    type="number"
                    key={"deviceLoad-morningHours-input" + i}
                    {...register(`deviceLoads.${i}.morningHours`)}
                  />
                </div>
              )}
              {isConnectedToGridField && (
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">Evening Hours</Label>
                  <Input
                    type="number"
                    key={"deviceLoad-eveningHours-input" + i}
                    {...register(`deviceLoads.${i}.eveningHours`)}
                  />
                </div>
              )}
            </div>
          ))}
          <div className="m-10 w-max">
            <DropdownMenu>
              <DropdownMenuTrigger>Add New Device</DropdownMenuTrigger>
              <DropdownMenuContent>
                {product?.parameters?.deviceLoadTemplates.map((temp, key) => {
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
                          quantity: 0,
                          hasManualTransferSwitch: temp.hasManualTransferSwitch,
                          isCustom: false,
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
          <Button type="submit">Next</Button>
        </form>
      </div>
    );
  });

  return (
    <>
      <CreateProposal
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
