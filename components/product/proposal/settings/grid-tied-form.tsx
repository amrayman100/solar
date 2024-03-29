"use client";

import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
} from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { GridTied } from "@/models/product";
import { useForm } from "@tanstack/react-form";
import { InvertorForm } from "./invertor-form";
import { PanelForm } from "./panel-form";
import { useState } from "react";
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

type GridTiedForm = {};

export function GridTiedForm({ product }: { product: GridTied }) {
  const mutation = useMutation({
    mutationFn: (req: GridTied) => {
      return updateProduct(req);
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

  return (
    <div>
      <Menubar className="p-8 flex justify-between">
        <div className="flex gap-4">
          <MenubarMenu>
            <MenubarTrigger>Settings</MenubarTrigger>
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
            onClick={() => form.handleSubmit()}
            className="w-max px-4"
          >
            Save
            {(mutation.isPending || form.state.isSubmitting) && (
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
      <div className="h-full">
        {product && (
          <div className="h-full w-2/4 flex">
            <form
              className="flex flex-col gap-10 flex-1"
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
            <div className="flex-2">
              <TypographyH2 text="Simulation" className="m-4" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
