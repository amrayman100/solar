"use client";

import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
} from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import {
  GridTied,
  GridTiedProposal,
  getGridTiedProposal,
} from "@/models/product";
import { useForm } from "@tanstack/react-form";
import { InvertorForm } from "./invertor-form";
import { PanelForm } from "./panel-form";
import { useEffect, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { DCCableForm } from "./dc-cable-form";
import { DCEarthCableForm } from "./dc-earth-cable-form";
import { EarthLeakageForm } from "./earth-leakage";
import { SwitchBoxForm } from "./switch-box";
import { FuseForm } from "./fuse-form";
import { EarthForm } from "./earth-form";
import { Mc4Form } from "./mc4-form";
import { BillingForm } from "./billing-form";
import { LabourForm } from "./labour-form";
import { MaintenanceForm } from "./maintenance-form";
import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "@/actions/proposal";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function GridTiedForm({ product }: { product: GridTied }) {
  const [isLoading, setIsLoading] = useState(false);
  const [gridTiedProposal, setGridTiedProposal] =
    useState<GridTiedProposal | null>(null);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (req: GridTied) => {
      await updateProduct(req);
      setIsLoading(false);
      toast({
        title: "Updated Grid Tied Product Successfully",
      });
    },
  });

  const [mode, setMode] = useState<
    | "panel"
    | "inverter"
    | "dcCable"
    | "dcEarthCable"
    | "earthLeakage"
    | "switchBox"
    | "fuse"
    | "earth"
    | "mc4"
    | "billing"
    | "labour"
    | "maintenance"
  >("panel");
  const form = useForm({
    onSubmit: async ({ value }) => {
      console.log(value);
      mutation.mutateAsync({
        ...value,
        updated: { by: "admin", at: new Date().toUTCString() },
      });
    },
    defaultValues: product,
  });

  const simulationForm = useForm({
    defaultValues: {
      monthlyConsumption: 1400,
      city: "Giza Governorate",
    },
    onSubmit: async ({ value }) => {
      if (!form.state.isValid) {
        toast({
          title: "Please fix the form errors",
        });
      }

      const paramaters = form.state.values.parameters;
      setGridTiedProposal(
        getGridTiedProposal(
          paramaters,
          1,
          value.city,
          value.monthlyConsumption,
          "",
          ""
        )
      );
    },
  });

  return (
    <div className="">
      <Menubar className="p-8 flex justify-between">
        <div className="flex gap-4">
          <MenubarMenu>
            <MenubarTrigger>
              <TypographyH5 text="Settings" className="font-bold" />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => setMode("panel")}>Panel</MenubarItem>
              <MenubarItem onClick={() => setMode("inverter")}>
                Inverter
              </MenubarItem>
              <MenubarItem onClick={() => setMode("dcCable")}>
                DC Cable
              </MenubarItem>
              <MenubarItem onClick={() => setMode("dcEarthCable")}>
                DC Earth Cable
              </MenubarItem>
              <MenubarItem onClick={() => setMode("earthLeakage")}>
                Earth Leakage
              </MenubarItem>
              <MenubarItem onClick={() => setMode("switchBox")}>
                Switch Box
              </MenubarItem>
              <MenubarItem onClick={() => setMode("fuse")}>Fuse</MenubarItem>
              <MenubarItem onClick={() => setMode("earth")}>Earth</MenubarItem>
              <MenubarItem onClick={() => setMode("mc4")}>MC4</MenubarItem>
              <MenubarItem onClick={() => setMode("billing")}>
                Billing
              </MenubarItem>
              <MenubarItem onClick={() => setMode("maintenance")}>
                Maintenance
              </MenubarItem>
              <MenubarItem onClick={() => setMode("labour")}>
                Labour
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <Button
            variant="default"
            onClick={() => {
              setIsLoading(true);
              form.handleSubmit();
            }}
            className="w-max px-4"
          >
            Save
            {(mutation.isPending || isLoading) && (
              <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
        <div>
          <TypographyH2
            text="Grid Tied"
            className="bg-gradient-to-r from-primary via-yellow-500 to-primary text-transparent bg-clip-text mx-3"
          />
        </div>
      </Menubar>
      <div className="max-h-screen">
        {product && (
          <div className="w-full flex">
            <form
              className="flex flex-col gap-10 flex-2 w-1/3"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void form.handleSubmit();
              }}
            >
              <div style={{ display: mode === "panel" ? "block" : "none" }}>
                <TypographyH2 text="Panel Settings" className="m-4" />
                <form.Field name="parameters.panel" mode="value">
                  {(field) => {
                    return <PanelForm field={field} />;
                  }}
                </form.Field>
              </div>

              <div style={{ display: mode === "inverter" ? "block" : "none" }}>
                <TypographyH2 text="Inverter Settings" className="m-4" />
                <div className="flex flex-col gap-4 overflow-y-auto h-128">
                  <form.Field name="parameters" mode="value">
                    {(field) => {
                      return field?.state?.value?.inverters?.map(
                        (invertor, i) => {
                          return (
                            <div key={"b" + i}>
                              <InvertorForm
                                key={"invertor-child-" + i}
                                field={field}
                                form={form}
                                invertor={invertor}
                                i={i}
                              />
                              <Button
                                className="w-max px-4 mx-4 mt-2"
                                variant={"destructive"}
                                key={"invertor-delete-" + i}
                                onClick={() => {
                                  form.removeFieldValue(
                                    `parameters.inverters`,
                                    i
                                  );
                                }}
                              >
                                Delete Invertor
                              </Button>
                            </div>
                          );
                        }
                      );
                    }}
                  </form.Field>
                </div>
              </div>

              <div style={{ display: mode === "dcCable" ? "block" : "none" }}>
                <TypographyH2 text="DC Cable Settings" className="m-4" />
                <form.Field name="parameters.dcCable" mode="value">
                  {(field) => {
                    return <DCCableForm field={field} />;
                  }}
                </form.Field>
              </div>
              <div
                style={{ display: mode === "dcEarthCable" ? "block" : "none" }}
              >
                <TypographyH2 text="DC Earth Cable Settings" className="m-4" />
                <form.Field name="parameters.dcEarthCable" mode="value">
                  {(field) => {
                    return <DCEarthCableForm field={field} />;
                  }}
                </form.Field>
              </div>
              <div
                style={{ display: mode === "earthLeakage" ? "block" : "none" }}
              >
                <TypographyH2 text="Earth Leakage Settings" className="m-4" />
                <form.Field name="parameters.earthLeakage" mode="value">
                  {(field) => {
                    return <EarthLeakageForm field={field} />;
                  }}
                </form.Field>
              </div>
              <div style={{ display: mode === "switchBox" ? "block" : "none" }}>
                <TypographyH2 text="Switch Box Settings" className="m-4" />
                <form.Field name="parameters.switchBox" mode="value">
                  {(field) => {
                    return <SwitchBoxForm field={field} />;
                  }}
                </form.Field>
              </div>
              <div style={{ display: mode === "fuse" ? "block" : "none" }}>
                <TypographyH2 text="Fuse Settings" className="m-4" />
                <form.Field name="parameters.fuse" mode="value">
                  {(field) => {
                    return <FuseForm field={field} />;
                  }}
                </form.Field>
              </div>
              <div style={{ display: mode === "earth" ? "block" : "none" }}>
                <TypographyH2 text="Earth Settings" className="m-4" />
                <form.Field name="parameters.earth" mode="value">
                  {(field) => {
                    return <EarthForm field={field} />;
                  }}
                </form.Field>
              </div>
              <div style={{ display: mode === "mc4" ? "block" : "none" }}>
                <TypographyH2 text="MC4 Settings" className="m-4" />
                <form.Field name="parameters.mc4" mode="value">
                  {(field) => {
                    return <Mc4Form field={field} />;
                  }}
                </form.Field>
              </div>
              <div
                style={{ display: mode === "billing" ? "block" : "none" }}
                className="overflow-y-auto h-5/6"
              >
                <TypographyH2 text="Billing Setting" className="m-4" />
                <form.Field name="parameters" mode="value">
                  {(field) => {
                    return <BillingForm field={field} />;
                  }}
                </form.Field>
              </div>
              <div style={{ display: mode === "labour" ? "block" : "none" }}>
                <TypographyH2 text="Labour Rate Settings" className="m-4" />
                <form.Field name="parameters" mode="value">
                  {(field) => {
                    return <LabourForm field={field} />;
                  }}
                </form.Field>
              </div>
              <div
                style={{ display: mode === "maintenance" ? "block" : "none" }}
              >
                <TypographyH2 text="Mainetenance Settings" className="m-4" />
                <form.Field name="parameters" mode="value">
                  {(field) => {
                    return <MaintenanceForm field={field} />;
                  }}
                </form.Field>
              </div>
            </form>
            <form
              className="flex-1"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void simulationForm.handleSubmit();
              }}
            >
              <TypographyH2 text="Simulation" className="m-4" />
              <div className="flex flex-row rounded-xl border bg-card text-card-foreground shadow p-10 mx-4 h-max gap-4">
                <div>
                  <Label className="mb-2">Monthly Consumption</Label>
                  <simulationForm.Field
                    name={`monthlyConsumption`}
                    validators={{
                      onChange: ({ value }) =>
                        !value && value != 0 ? "required" : undefined,
                    }}
                    children={(field) => (
                      <>
                        <Input
                          type="number"
                          key={"monthlyConsumption"}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => {
                            field.handleChange(e.target.valueAsNumber);
                          }}
                        />
                      </>
                    )}
                  />
                </div>
                <div>
                  <Label className="mb-2">City</Label>
                  <simulationForm.Field
                    name={`city`}
                    validators={{
                      onChange: ({ value }) =>
                        !value ? "required" : undefined,
                    }}
                    children={(field) => (
                      <>
                        <Select
                          onValueChange={(e) => {
                            field.setValue(e);
                          }}
                          name={field.name}
                          value={field.state.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="City" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Giza Governorate">
                              Giza Governate
                            </SelectItem>
                            <SelectItem value="Cairo Governorate">
                              Cairo Governate
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </>
                    )}
                  />
                </div>
                <div>
                  <Button
                    variant="default"
                    type="submit"
                    className="w-max px-4 my-6 mx-3"
                  >
                    Simulate
                    {(mutation.isPending || isLoading) && (
                      <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
                    )}
                  </Button>
                </div>
              </div>
              {gridTiedProposal && (
                <div className="overflow-y-auto h-128">
                  <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-10 mx-4 gap-4 mt-4">
                    <TypographyH3 text="Simulation Results" className="m-4" />
                    <div className="flex gap-4 mx-4 mb-2 flex-wrap w-full">
                      <div className="flex gap-2 w-96">
                        <TypographyH5 text="System Size:" />
                        <TypographyH5
                          className="font-normal"
                          text={gridTiedProposal.proposalDetails.systemSize.toString()}
                        />
                      </div>
                      <div className="flex gap-2 w-96">
                        <TypographyH5 text="Cost Of Panels:" />
                        <TypographyH5
                          className="font-normal"
                          text={gridTiedProposal.proposalDetails.costOfPanels.toString()}
                        />
                      </div>
                      <div className="flex gap-2 w-96">
                        <TypographyH5 text="Number Of Panels:" />
                        <TypographyH5
                          className="font-normal"
                          text={gridTiedProposal.proposalDetails.numberOfPanels.toString()}
                        />
                      </div>
                      <div className="flex gap-2 w-96">
                        <TypographyH5 text="Labour  Costs:" />
                        <TypographyH5
                          className="font-normal"
                          text={gridTiedProposal.proposalDetails.labourCost.toString()}
                        />
                      </div>
                      <div className="flex gap-2 w-96">
                        <TypographyH5 text="Concrete Footing  Costs:" />
                        <TypographyH5
                          className="font-normal"
                          text={gridTiedProposal.proposalDetails.concreteFootingCost.toString()}
                        />
                      </div>
                      <div className="flex gap-2 w-96">
                        <TypographyH5 text="DC Cable  Costs:" />
                        <TypographyH5
                          className="font-normal"
                          text={gridTiedProposal.proposalDetails.dcCableCost.toString()}
                        />
                      </div>
                      <div className="flex gap-2 w-96">
                        <TypographyH5 text="DC Earth Cable  Costs:" />
                        <TypographyH5
                          className="font-normal"
                          text={gridTiedProposal.proposalDetails.dcEarthCableCost.toString()}
                        />
                      </div>
                      <div className="flex gap-2 w-96">
                        <TypographyH5 text="Earth  Costs:" />
                        <TypographyH5
                          className="font-normal"
                          text={gridTiedProposal.proposalDetails.earthCost.toString()}
                        />
                      </div>
                      <div className="flex gap-2 w-96">
                        <TypographyH5 text="Fuse  Costs:" />
                        <TypographyH5
                          className="font-normal"
                          text={gridTiedProposal.proposalDetails.fuseCost.toString()}
                        />
                      </div>
                      <div className="flex gap-2 w-96">
                        <TypographyH5 text="MC4  Costs:" />
                        <TypographyH5
                          className="font-normal"
                          text={gridTiedProposal.proposalDetails.mc4Cost.toString()}
                        />
                      </div>
                      <div className="flex gap-2 w-96">
                        <TypographyH5 text="Switch Box  Costs:" />
                        <TypographyH5
                          className="font-normal"
                          text={gridTiedProposal.proposalDetails.switchBoxCost.toString()}
                        />
                      </div>
                      <div className="flex gap-2 w-96">
                        <TypographyH5 text="Earth Leakage Costs:" />
                        <TypographyH5
                          className="font-normal"
                          text={gridTiedProposal.proposalDetails.earthLeakageCost.toString()}
                        />
                      </div>
                      <div className="flex gap-2 w-96">
                        <TypographyH5 text="Cleaning Tool Costs:" />
                        <TypographyH5
                          className="font-normal"
                          text={gridTiedProposal.proposalDetails.cleaningToolPrice.toString()}
                        />
                      </div>
                      <div className="flex gap-2 w-96">
                        <TypographyH5 text="Electricty Company:" />
                        <TypographyH5
                          className="font-normal"
                          text={gridTiedProposal.proposalDetails.electricityCompanyCost.toString()}
                        />
                      </div>
                      <div className="flex gap-2 w-96">
                        <TypographyH5 text="Maintenance Cost Visits Costs:" />
                        <TypographyH5
                          className="font-normal"
                          text={gridTiedProposal.proposalDetails.maintenanceCost.toString()}
                        />
                      </div>
                      <div className="flex gap-2 w-96">
                        <TypographyH5 text="Mounting Structure Costs:" />
                        <TypographyH5
                          className="font-normal"
                          text={gridTiedProposal.proposalDetails.mountingStructureCost.toString()}
                        />
                      </div>
                      <div className="flex gap-2 w-96">
                        <TypographyH5 text="Transportation Costs:" />
                        <TypographyH5
                          className="font-normal"
                          text={gridTiedProposal.proposalDetails.transportationCost.toString()}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-10 mx-4 gap-4 mt-4">
                      <TypographyH3 text="Chosen Inverter" className="m-4" />
                      <div className="flex flex-row gap-4 mx-4 mb-2 w-full">
                        <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-10 mx-4 gap-4 mt-4">
                          <TypographyH4 text="Inverter Info" />
                          <div className="flex gap-2 w-96">
                            <TypographyH5 text="Inverter Brand:" />
                            <TypographyH5
                              className="font-normal"
                              text={
                                gridTiedProposal.proposalDetails.inverter
                                  .inverterInfo.brand
                              }
                            />
                          </div>
                          <div className="flex gap-2 w-96">
                            <TypographyH5 text="Inverter Capacity:" />
                            <TypographyH5
                              className="font-normal"
                              text={gridTiedProposal.proposalDetails.inverter.inverterInfo.capacity.toString()}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-10 mx-4 gap-4 mt-4">
                          <TypographyH4 text="Inverter Costs" />
                          <div className="flex gap-2 w-96">
                            <TypographyH5 text="Inverter Base Costs:" />
                            <TypographyH5
                              className="font-normal"
                              text={gridTiedProposal.proposalDetails.inverter.inverterBaseCost.toString()}
                            />
                          </div>
                          <div className="flex gap-2 w-96">
                            <TypographyH5 text="Inverter AC Cable Costs:" />
                            <TypographyH5
                              className="font-normal"
                              text={gridTiedProposal.proposalDetails.inverter.inverterACCableCost.toString()}
                            />
                          </div>
                          <div className="flex gap-2 w-96">
                            <TypographyH5 text="Inverter AC Earth Cable Costs:" />
                            <TypographyH5
                              className="font-normal"
                              text={gridTiedProposal.proposalDetails.inverter.inverterACCableEarthCost.toString()}
                            />
                          </div>
                          <div className="flex gap-2 w-96">
                            <TypographyH5 text="Inverter Circuit Breaker Costs:" />
                            <TypographyH5
                              className="font-normal"
                              text={gridTiedProposal.proposalDetails.inverter.inverterCircuitBreaker.toString()}
                            />
                          </div>
                          <div className="flex gap-2 w-96">
                            <TypographyH5 text="Inverter VSN Costs:" />
                            <TypographyH5
                              className="font-normal"
                              text={gridTiedProposal.proposalDetails.inverter.inverterVSNCost.toString()}
                            />
                          </div>
                          <div className="flex gap-2 w-96">
                            <TypographyH5 text="Inverter Flexible Costs:" />
                            <TypographyH5
                              className="font-normal"
                              text={gridTiedProposal.proposalDetails.inverter.inverterFlexibleCost.toString()}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-10 mx-4 gap-4 mt-4">
                      <TypographyH3 text="Client Billing" className="m-4" />
                      <div className="flex flex-row gap-4 mx-4 mb-2 w-full">
                        <div className="flex gap-2 w-full">
                          <div className="rounded-xl border bg-card text-card-foreground shadow p-10 flex-1 flex-grow w-full">
                            <TypographyH4 text="Quotation" />
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead></TableHead>
                                  <TableHead className="text-right">
                                    Amount (EGP)
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-bold">
                                    Total System Price
                                  </TableCell>
                                  <TableCell className="text-right font-bold">
                                    {Math.round(
                                      gridTiedProposal.proposalDetails
                                        .sellingCost
                                    ).toLocaleString("en", {
                                      useGrouping: true,
                                    })}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">
                                    Price Per Watt
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {Math.round(
                                      gridTiedProposal.proposalDetails
                                        .pricePerWatt
                                    ).toLocaleString("en", {
                                      useGrouping: true,
                                    })}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                          <div className="rounded-xl border bg-card text-card-foreground shadow p-10 flex-1 flex-grow  w-full">
                            <TypographyH4 text="Payment Milestones" />
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead></TableHead>
                                  <TableHead className="text-right">
                                    Amount (EGP)
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium">
                                    Commission Fee
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {Math.round(
                                      gridTiedProposal.proposalDetails.billing
                                        ?.commissionFee
                                    ).toLocaleString("en", {
                                      useGrouping: true,
                                    })}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">
                                    Upon Contract Signature
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {Math.round(
                                      gridTiedProposal.proposalDetails.billing
                                        ?.downPaymentFee
                                    ).toLocaleString("en", {
                                      useGrouping: true,
                                    })}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">
                                    Upon components delivery
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {Math.round(
                                      gridTiedProposal.proposalDetails.billing
                                        ?.componentsSupplyFee
                                    ).toLocaleString("en", {
                                      useGrouping: true,
                                    })}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">
                                    Upon Installation
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {Math.round(
                                      gridTiedProposal.proposalDetails.billing
                                        ?.installationFee
                                    ).toLocaleString("en", {
                                      useGrouping: true,
                                    })}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
