"use client";

import { Charger, EVConsumption, EVProposal } from "@/models/product";
import {
  CreateProposal,
  CustomFormStepProps,
  PropSteps,
} from "../create-proposal-form";
import { memo, useState } from "react";
import { createEVProposal } from "@/actions/proposal";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { IoIosArrowDropdown } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ViewEvProposal } from "./view-ev-proposal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NewEVProposal({ chargers }: { chargers: Array<Charger> }) {
  const [consumptionDetails, setConsumptionDetails] = useState<EVConsumption>({
    chargingPower: 0,
  });

  const [chargingPower, setChargingPower] = useState(0);
  const [customMode, setCustomMode] = useState(false);

  const MemoziedLoadsConsumptionForm = memo(function LoadsConsumptionForm(
    props: CustomFormStepProps
  ) {
    const {
      control,
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {},
    });

    const onSubmit: SubmitHandler<{}> = (data) => {
      setConsumptionDetails({
        chargingPower,
      });
      props.navigate("next");
    };

    return (
      <div className="flex">
        <div className="m-10 w-max">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8">
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Select Your Charging Power
                  <IoIosArrowDropdown className="mx-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    key={"template-custom"}
                    onClick={() => {
                      setCustomMode(true);
                    }}
                  >
                    Other
                  </DropdownMenuItem>
                  {chargers?.map((temp, key) => {
                    return (
                      <DropdownMenuItem
                        key={"template-" + key}
                        onClick={() => {
                          setCustomMode(false);
                          setChargingPower(temp.power);
                        }}
                      >
                        {temp.power} {" KW"}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {customMode ? (
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                <Label htmlFor={"device-load-picture-power-"}>
                  Charging Power in KW
                </Label>
                <Input
                  min={1}
                  step={"any"}
                  type="number"
                  value={chargingPower}
                  onChange={(e) => setChargingPower(e.target.valueAsNumber)}
                />
              </div>
            ) : (
              <div className="grid w-full max-w-sm items-center gap-1.5 mt6">
                <Label htmlFor={"device-load-picture-power-"}>
                  Charging Power in KW
                </Label>
                <Input
                  disabled={true}
                  min={1}
                  step={"any"}
                  type="number"
                  value={chargingPower}
                  onChange={(e) => setChargingPower(e.target.valueAsNumber)}
                />
              </div>
            )}

            <div className="w-max mt-4">
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
        consumptionDetails={consumptionDetails}
        address={{ lat: 30, lng: 30, city: "Cairo Governate", fullAddress: "" }}
        createProposalFunc={createEVProposal}
        onProposalCreation={(proposal: EVProposal) => console.log(proposal)}
        ViewProposal={ViewEvProposal}
        customFormSteps={[MemoziedLoadsConsumptionForm]}
      />
    </>
  );
}
