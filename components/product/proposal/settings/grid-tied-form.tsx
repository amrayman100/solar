"use client";

import {
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GridTied } from "@/models/product";
import { useForm } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";

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
                            <div
                              className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-10 mx-4 h-max gap-4"
                              key={"invertor-base" + i}
                            >
                              <TypographyH4 text={`Invertor #` + (i + 1)} />
                              <div key={"invertor-brand" + i}>
                                <Label
                                  key={"invertor-brand-label" + i}
                                  htmlFor="picture"
                                  className="mb-2"
                                >
                                  Brand Name
                                </Label>
                                <form.Field
                                  name={`parameters.inverters[${i}].brand`}
                                  validators={{
                                    onChange: ({ value }) =>
                                      !value ? "required" : undefined,
                                  }}
                                  children={(subField) => (
                                    <>
                                      <Input
                                        key={"invertor-brand-input" + i}
                                        defaultValue={subField.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => {
                                          subField.handleChange(e.target.value);
                                        }}
                                      />
                                    </>
                                  )}
                                />
                              </div>
                              <div key={"invertor-price" + i}>
                                <Label
                                  key={"invertor-price-label" + i}
                                  htmlFor="picture"
                                  className="mb-2"
                                >
                                  Price
                                </Label>
                                <form.Field
                                  name={`parameters.inverters[${i}].price`}
                                  validators={{
                                    onChange: ({ value }) =>
                                      !value ? "required" : undefined,
                                  }}
                                  children={(subField) => (
                                    <>
                                      <Input
                                        type="number"
                                        key={"invertor-price-input" + i}
                                        defaultValue={subField.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => {
                                          subField.handleChange(
                                            e.target.valueAsNumber
                                          );
                                        }}
                                      />
                                    </>
                                  )}
                                />
                              </div>
                              <div key={"invertor-capacity" + i}>
                                <Label
                                  key={"invertor-capacity-label" + i}
                                  htmlFor="picture"
                                  className="mb-2"
                                >
                                  Capacity (kw)
                                </Label>
                                <form.Field
                                  name={`parameters.inverters[${i}].capacity`}
                                  validators={{
                                    onChange: ({ value }) =>
                                      !value ? "required" : undefined,
                                  }}
                                  children={(subField) => (
                                    <>
                                      <Input
                                        type="number"
                                        key={"invertor-capacity-input" + i}
                                        defaultValue={subField.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => {
                                          subField.handleChange(
                                            e.target.valueAsNumber
                                          );
                                        }}
                                      />
                                    </>
                                  )}
                                />
                              </div>
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
