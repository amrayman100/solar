"use client";

import {
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
} from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GridTied } from "@/models/product";
import { UpdaterFn, useForm } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";
import { InvertorForm } from "./invertor-form";
import { zodValidator } from "@tanstack/zod-form-adapter";

type GridTiedForm = {};

export function GridTiedForm({ product }: { product: GridTied }) {
  const form = useForm<GridTied>({
    onSubmit: async ({ value }) => {
      console.log(value);
    },
    defaultValues: product,
  });

  return (
    <>
      <div className="m-auto h-full mt-12">
        {product && (
          <div className="m-auto h-full mt-12 w-2/4">
            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void form.handleSubmit();
              }}
            >
              <Button variant="default" type="submit" className="w-max px-4">
                Save
              </Button>

              <div>
                <TypographyH3 text="Invertors" className="px-4 mb-2" />
                <div className="flex flex-col gap-4 overflow-y-auto h-128">
                  <form.Field name="parameters" mode="value">
                    {(field) => {
                      return field?.state?.value?.inverters.map(
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
            </form>
          </div>
        )}
      </div>
    </>
  );
}
