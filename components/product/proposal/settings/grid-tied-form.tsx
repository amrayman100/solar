"use client";

import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
} from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GridTied } from "@/models/product";
import { useForm } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";
import { InvertorForm } from "./invertor-form";
import { PanelForm } from "./panel-form";
import { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { DCCableForm } from "./dc-cable-form";

type GridTiedForm = {};

export function GridTiedForm({ product }: { product: GridTied }) {
  const [mode, setMode] = useState<"panel" | "inverter" | "dcCable">("panel");
  const form = useForm({
    onSubmit: async ({ value }) => {
      console.log(value);
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
            </MenubarContent>
          </MenubarMenu>
          <Button
            variant="default"
            onClick={() => form.handleSubmit()}
            className="w-max px-4"
          >
            Save
          </Button>
        </div>
        <div>
          <TypographyH2
            text="Grid Tied"
            className="bg-gradient-to-r from-primary via-yellow-500 to-primary text-transparent bg-clip-text mx-3"
          />
        </div>
      </Menubar>
      <div className="h-full mt-12">
        {product && (
          <div className="h-full mt-12 w-2/4 flex">
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
                                  debugger;
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
                <TypographyH2 text="DC Cable Setting" className="m-4" />
                <form.Field name="parameters.dcCable" mode="value">
                  {(field) => {
                    return <DCCableForm field={field} />;
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
