"use client";

import { GridTied, GridTiedParams, Inverter } from "@/models/product";
import { FieldApi, FormApi } from "@tanstack/react-form";

import { TypographyH4, TypographyH5 } from "@/components/shared/typography";
import { Input } from "@/components/ui/input";
import { UpdaterFn, useForm } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";

type props = {
  form: FormApi<GridTied, undefined>;
  field: FieldApi<GridTied, "parameters", undefined, undefined, GridTiedParams>;
  i: number;
  invertor: Inverter;
};

export function InvertorForm({ form, field, i, invertor }: props) {
  return (
    <>
      <div
        className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-4 mx-4 h-max gap-4"
        key={"invertor-base" + i}
      >
        <TypographyH4
          text={`Invertor #` + (i + 1)}
          key={"invertor-heading" + 1}
        />
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
              onChange: ({ value }) => (!value ? "required" : undefined),
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
                !value && value != 0 ? "required" : undefined,
            }}
            children={(subField) => (
              <>
                <Input
                  type="number"
                  key={"invertor-price-input" + i}
                  defaultValue={subField.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    subField.handleChange(e.target.valueAsNumber);
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
                !value && value != 0 ? "required" : undefined,
            }}
            children={(subField) => (
              <>
                <Input
                  type="number"
                  key={"invertor-capacity-input" + i}
                  defaultValue={subField.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    subField.handleChange(e.target.valueAsNumber);
                  }}
                />
              </>
            )}
          />
        </div>
        <div>
          <TypographyH5
            text={"Circuit Breaker"}
            className="font-bold mb-2"
            key={"circuit-breaker-heading" + i}
          />
          <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-4 mx-4 h-max gap-4">
            <div key={"invertor-circuit-breaker" + i}>
              <Label
                key={"invertor-circuit-breaker-brand-label" + i}
                htmlFor="picture"
                className="mb-2"
              >
                Brand
              </Label>
              <form.Field
                name={`parameters.inverters[${i}].circuitBreaker.brand`}
                validators={{
                  onChange: ({ value }) => (!value ? "required" : undefined),
                }}
                children={(subField) => (
                  <>
                    <Input
                      key={"invertor-circuit-breaker-brand-input" + i}
                      defaultValue={subField.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        console.log(subField.getInfo());
                        subField.handleChange(
                          e.target.value as unknown as UpdaterFn<never, never>
                        );
                      }}
                    />
                    {subField.state.meta.errors ? (
                      <p role="alert" className="text-red-500 mb-2">
                        {subField.state.meta.errors.join(", ")}
                      </p>
                    ) : null}
                  </>
                )}
              />
            </div>
            <div key={"invertor-circuit-breaker-price" + i}>
              <Label
                key={"invertor-circuit-breaker-price-label" + i}
                htmlFor="picture"
                className="mb-2"
              >
                Price
              </Label>
              <form.Field
                name={`parameters.inverters[${i}].circuitBreaker.price`}
                validators={{
                  onChange: ({ value }) =>
                    !value && value != 0 ? "required" : undefined,
                }}
                children={(subField) => (
                  <>
                    <Input
                      type="number"
                      key={"invertor-circuit-breaker-price-" + i}
                      defaultValue={subField.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        console.log(subField.getInfo());
                        subField.handleChange(
                          e.target.valueAsNumber as unknown as UpdaterFn<
                            never,
                            never
                          >
                        );
                      }}
                    />
                    {subField.state.meta.errors ? (
                      <p role="alert" className="text-red-500 mb-2">
                        {subField.state.meta.errors.join(", ")}
                      </p>
                    ) : null}
                  </>
                )}
              />
            </div>
            <div key={"invertor-circuit-breaker-rating" + i}>
              <Label
                key={"invertor-circuit-breaker-rating-label" + i}
                htmlFor="picture"
                className="mb-2"
              >
                Rating
              </Label>
              <form.Field
                name={`parameters.inverters[${i}].circuitBreaker.rating`}
                validators={{
                  onChange: ({ value }) => (!value ? "required" : undefined),
                }}
                children={(subField) => (
                  <>
                    <Input
                      key={"invertor-circuit-breaker-rating-input-" + i}
                      defaultValue={subField.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        console.log(subField.getInfo());
                        subField.handleChange(
                          e.target.value as unknown as UpdaterFn<never, never>
                        );
                      }}
                    />
                    {subField.state.meta.errors ? (
                      <p role="alert" className="text-red-500 mb-2">
                        {subField.state.meta.errors.join(", ")}
                      </p>
                    ) : null}
                  </>
                )}
              />
            </div>
            <div key={"invertor-circuit-breaker-quantity" + i}>
              <Label
                key={"invertor-circuit-breaker-quantity-label" + i}
                htmlFor="picture"
                className="mb-2"
              >
                Quantity
              </Label>
              <form.Field
                name={`parameters.inverters[${i}].circuitBreaker.quantity`}
                validators={{
                  onChange: ({ value }) =>
                    !value && value != 0 ? "required" : undefined,
                }}
                children={(subField) => (
                  <>
                    <Input
                      type="number"
                      key={"invertor-circuit-breaker-quantity-input-" + i}
                      defaultValue={subField.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        console.log(subField.getInfo());
                        subField.handleChange(
                          e.target.valueAsNumber as unknown as UpdaterFn<
                            never,
                            never
                          >
                        );
                      }}
                    />
                    {subField.state.meta.errors ? (
                      <p role="alert" className="text-red-500 mb-2">
                        {subField.state.meta.errors.join(", ")}
                      </p>
                    ) : null}
                  </>
                )}
              />
            </div>
          </div>
        </div>
        <div>
          <TypographyH5
            text={"Flexible"}
            className="font-bold mb-2"
            key={"flexible-heading-" + i}
          />
          <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-4 mx-4 h-max gap-4">
            <div key={"invertor-flexible-" + i}>
              <Label
                key={"invertor-flexible-brand-label-" + i}
                htmlFor="picture"
                className="mb-2"
              >
                Brand
              </Label>
              <form.Field
                name={`parameters.inverters[${i}].flexible.brand`}
                validators={{
                  onChange: ({ value }) => (!value ? "required" : undefined),
                }}
                children={(subField) => (
                  <>
                    <Input
                      key={"invertor-flexible-brand-input" + i}
                      defaultValue={subField.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        subField.handleChange(
                          e.target.value as unknown as UpdaterFn<never, never>
                        );
                      }}
                    />
                    {subField.state.meta.errors ? (
                      <p role="alert" className="text-red-500 mb-2">
                        {subField.state.meta.errors.join(", ")}
                      </p>
                    ) : null}
                  </>
                )}
              />
            </div>
            <div key={"invertor-flexible-price-" + i}>
              <Label
                key={"invertor-flexible-price-label-" + i}
                htmlFor="picture"
                className="mb-2"
              >
                Price
              </Label>
              <form.Field
                name={`parameters.inverters[${i}].flexible.price`}
                validators={{
                  onChange: ({ value }) =>
                    !value && value != 0 ? "required" : undefined,
                }}
                children={(subField) => (
                  <>
                    <Input
                      type="number"
                      key={"invertor-flexible-price-" + i}
                      defaultValue={subField.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        console.log(subField.getInfo());
                        subField.handleChange(
                          e.target.valueAsNumber as unknown as UpdaterFn<
                            never,
                            never
                          >
                        );
                      }}
                    />
                    {subField.state.meta.errors ? (
                      <p role="alert" className="text-red-500 mb-2">
                        {subField.state.meta.errors.join(", ")}
                      </p>
                    ) : null}
                  </>
                )}
              />
            </div>
            <div key={"invertor-flexible-quantity-" + i}>
              <Label
                key={"invertor-flexible-quantity-label-" + i}
                htmlFor="picture"
                className="mb-2"
              >
                Quantity
              </Label>
              <form.Field
                name={`parameters.inverters[${i}].flexible.quantity`}
                validators={{
                  onChange: ({ value }) =>
                    !value && value != 0 ? "required" : undefined,
                }}
                children={(subField) => (
                  <>
                    <Input
                      type="number"
                      key={"invertor-flexible-quantity-input-" + i}
                      defaultValue={subField.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        console.log(subField.getInfo());
                        subField.handleChange(
                          e.target.valueAsNumber as unknown as UpdaterFn<
                            never,
                            never
                          >
                        );
                      }}
                    />
                    {subField.state.meta.errors ? (
                      <p role="alert" className="text-red-500 mb-2">
                        {subField.state.meta.errors.join(", ")}
                      </p>
                    ) : null}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        <div>
          <TypographyH5
            text={"VSN"}
            className="font-bold mb-2"
            key={"vsn-heading-" + i}
          />
          <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-4 mx-4 h-max gap-4">
            <div key={"invertor-vsn-price-" + i}>
              <Label
                key={"invertor-vsn-price-label-" + i}
                htmlFor="picture"
                className="mb-2"
              >
                Price
              </Label>
              <form.Field
                name={`parameters.inverters[${i}].vsn.price`}
                validators={{
                  onChange: ({ value }) =>
                    !value && value != 0 ? "required" : undefined,
                }}
                children={(subField) => (
                  <>
                    <Input
                      type="number"
                      key={"invertor-vsn-price-" + i}
                      defaultValue={subField.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        console.log(subField.getInfo());
                        subField.handleChange(
                          e.target.valueAsNumber as unknown as UpdaterFn<
                            never,
                            never
                          >
                        );
                      }}
                    />
                    {subField.state.meta.errors ? (
                      <p role="alert" className="text-red-500 mb-2">
                        {subField.state.meta.errors.join(", ")}
                      </p>
                    ) : null}
                  </>
                )}
              />
            </div>
            <div key={"invertor-vsn-quantity-" + i}>
              <Label
                key={"invertor-vsn-quantity-label-" + i}
                htmlFor="picture"
                className="mb-2"
              >
                Quantity
              </Label>
              <form.Field
                name={`parameters.inverters[${i}].vsn.quantity`}
                validators={{
                  onChange: ({ value }) =>
                    !value && value != 0 ? "required" : undefined,
                }}
                children={(subField) => (
                  <>
                    <Input
                      type="number"
                      key={"invertor-vsn-quantity-input-" + i}
                      defaultValue={subField.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        console.log(subField.getInfo());
                        subField.handleChange(
                          e.target.valueAsNumber as unknown as UpdaterFn<
                            never,
                            never
                          >
                        );
                      }}
                    />
                    {subField.state.meta.errors ? (
                      <p role="alert" className="text-red-500 mb-2">
                        {subField.state.meta.errors.join(", ")}
                      </p>
                    ) : null}
                  </>
                )}
              />
            </div>
          </div>
        </div>
        <div>
          <TypographyH5
            text={"AC Cable"}
            className="font-bold mb-2"
            key={"ac-cable-heading" + i}
          />
          <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-4 mx-4 h-max gap-4">
            <div key={"invertor-ac-cable-brand" + i}>
              <Label
                key={"invertor-ac-cable-brand-label" + i}
                htmlFor="picture"
                className="mb-2"
              >
                Brand
              </Label>
              <form.Field
                name={`parameters.inverters[${i}].acCable.brand`}
                validators={{
                  onChange: ({ value }) => (!value ? "required" : undefined),
                }}
                children={(subField) => (
                  <>
                    <Input
                      key={"invertor-ac-cable-brand-input" + i}
                      defaultValue={subField.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        console.log(subField.getInfo());
                        subField.handleChange(
                          e.target.value as unknown as UpdaterFn<never, never>
                        );
                      }}
                    />
                    {subField.state.meta.errors ? (
                      <p role="alert" className="text-red-500 mb-2">
                        {subField.state.meta.errors.join(", ")}
                      </p>
                    ) : null}
                  </>
                )}
              />
            </div>
            <div key={"invertor-ac-cable-price" + i}>
              <Label
                key={"invertor-ac-cable-price-label" + i}
                htmlFor="picture"
                className="mb-2"
              >
                Price
              </Label>
              <form.Field
                name={`parameters.inverters[${i}].acCable.price`}
                validators={{
                  onChange: ({ value }) =>
                    !value && value != 0 ? "required" : undefined,
                }}
                children={(subField) => (
                  <>
                    <Input
                      type="number"
                      key={"invertor-ac-cable-price-input" + i}
                      defaultValue={subField.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        console.log(subField.getInfo());
                        subField.handleChange(
                          e.target.valueAsNumber as unknown as UpdaterFn<
                            never,
                            never
                          >
                        );
                      }}
                    />
                    {subField.state.meta.errors ? (
                      <p role="alert" className="text-red-500 mb-2">
                        {subField.state.meta.errors.join(", ")}
                      </p>
                    ) : null}
                  </>
                )}
              />
            </div>
            <div key={"invertor-ac-cable-rating" + i}>
              <Label
                key={"invertor-ac-cable-rating-label" + i}
                htmlFor="picture"
                className="mb-2"
              >
                Rating
              </Label>
              <form.Field
                name={`parameters.inverters[${i}].acCable.rating`}
                validators={{
                  onChange: ({ value }) => (!value ? "required" : undefined),
                }}
                children={(subField) => (
                  <>
                    <Input
                      key={"invertor-ac-cable-rating-input-" + i}
                      defaultValue={subField.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        console.log(subField.getInfo());
                        subField.handleChange(
                          e.target.value as unknown as UpdaterFn<never, never>
                        );
                      }}
                    />
                    {subField.state.meta.errors ? (
                      <p role="alert" className="text-red-500 mb-2">
                        {subField.state.meta.errors.join(", ")}
                      </p>
                    ) : null}
                  </>
                )}
              />
            </div>

            <div key={"invertor-ac-cable-quantity" + i}>
              <Label
                key={"invertor-ac-cable-quantity-label" + i}
                htmlFor="picture"
                className="mb-2"
              >
                Quantity
              </Label>
              <form.Field
                name={`parameters.inverters[${i}].acCable.quantity`}
                validators={{
                  onChange: ({ value }) =>
                    !value && value != 0 ? "required" : undefined,
                }}
                children={(subField) => (
                  <>
                    <Input
                      type="number"
                      key={"invertor-ac-cable-quantity-input-" + i}
                      defaultValue={subField.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        console.log(subField.getInfo());
                        subField.handleChange(
                          e.target.valueAsNumber as unknown as UpdaterFn<
                            never,
                            never
                          >
                        );
                      }}
                    />
                    {subField.state.meta.errors ? (
                      <p role="alert" className="text-red-500 mb-2">
                        {subField.state.meta.errors.join(", ")}
                      </p>
                    ) : null}
                  </>
                )}
              />
            </div>
            {invertor.acCable?.acEarthCable && (
              <div>
                <TypographyH5
                  text={"AC Earth Cable"}
                  className="font-bold mb-2"
                  key={"ac-earth-cable-heading" + i}
                />
                <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-4 mx-4 h-max gap-4">
                  <div key={"invertor-ac-earth-cable-brand" + i}>
                    <Label
                      key={"invertor-ac-earth-cable-brand-label" + i}
                      htmlFor="picture"
                      className="mb-2"
                    >
                      Brand
                    </Label>
                    <form.Field
                      name={`parameters.inverters[${i}].acCable.acEarthCable.brand`}
                      validators={{
                        onChange: ({ value }) =>
                          !value ? "required" : undefined,
                      }}
                      children={(subField) => (
                        <>
                          <Input
                            key={"invertor-ac-earth-cable-brand-input" + i}
                            defaultValue={subField.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => {
                              console.log(subField.getInfo());
                              subField.handleChange(
                                e.target.value as unknown as UpdaterFn<
                                  never,
                                  never
                                >
                              );
                            }}
                          />
                          {subField.state.meta.errors ? (
                            <p role="alert" className="text-red-500 mb-2">
                              {subField.state.meta.errors.join(", ")}
                            </p>
                          ) : null}
                        </>
                      )}
                    />
                  </div>
                  <div key={"invertor-ac-earth-cable-price" + i}>
                    <Label
                      key={"invertor-ac-earth-cable-price-label" + i}
                      htmlFor="picture"
                      className="mb-2"
                    >
                      Price
                    </Label>
                    <form.Field
                      name={`parameters.inverters[${i}].acCable.acEarthCable.price`}
                      validators={{
                        onChange: ({ value }) =>
                          !value && value != 0 ? "required" : undefined,
                      }}
                      children={(subField) => (
                        <>
                          <Input
                            type="number"
                            key={"invertor-ac-earth-cable-price-" + i}
                            defaultValue={subField.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => {
                              console.log(subField.getInfo());
                              subField.handleChange(
                                e.target.valueAsNumber as unknown as UpdaterFn<
                                  never,
                                  never
                                >
                              );
                            }}
                          />
                          {subField.state.meta.errors ? (
                            <p role="alert" className="text-red-500 mb-2">
                              {subField.state.meta.errors.join(", ")}
                            </p>
                          ) : null}
                        </>
                      )}
                    />
                  </div>
                  <div key={"invertor-ac-earth-cable-rating" + i}>
                    <Label
                      key={"invertor-ac-earth-cable-rating-label" + i}
                      htmlFor="picture"
                      className="mb-2"
                    >
                      Rating
                    </Label>
                    <form.Field
                      name={`parameters.inverters[${i}].acCable.acEarthCable.rating`}
                      validators={{
                        onChange: ({ value }) =>
                          !value ? "required" : undefined,
                      }}
                      children={(subField) => (
                        <>
                          <Input
                            key={"invertor-ac-earth-cable-rating-input-" + i}
                            defaultValue={subField.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => {
                              console.log(subField.getInfo());
                              subField.handleChange(
                                e.target.value as unknown as UpdaterFn<
                                  never,
                                  never
                                >
                              );
                            }}
                          />
                          {subField.state.meta.errors ? (
                            <p role="alert" className="text-red-500 mb-2">
                              {subField.state.meta.errors.join(", ")}
                            </p>
                          ) : null}
                        </>
                      )}
                    />
                  </div>
                  <div key={"invertor-ac-earth-cable-quantity" + i}>
                    <Label
                      key={"invertor-ac-earth-cable-quantity-label" + i}
                      htmlFor="picture"
                      className="mb-2"
                    >
                      Quantity
                    </Label>
                    <form.Field
                      name={`parameters.inverters[${i}].acCable.acEarthCable.quantity`}
                      validators={{
                        onChange: ({ value }) =>
                          !value && value != 0 ? "required" : undefined,
                      }}
                      children={(subField) => (
                        <>
                          <Input
                            type="number"
                            key={"invertor-ac-earth-cable-quantity-input-" + i}
                            defaultValue={subField.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => {
                              console.log(subField.getInfo());
                              subField.handleChange(
                                e.target.valueAsNumber as unknown as UpdaterFn<
                                  never,
                                  never
                                >
                              );
                            }}
                          />
                          {subField.state.meta.errors ? (
                            <p role="alert" className="text-red-500 mb-2">
                              {subField.state.meta.errors.join(", ")}
                            </p>
                          ) : null}
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
