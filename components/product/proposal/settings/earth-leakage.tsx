import { Input } from "@/components/ui/input";
import { EarthLeakage, GridTied } from "@/models/product";
import { FieldApi, UpdaterFn } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";
import { TypographyH4, TypographyH5 } from "@/components/shared/typography";

type Props = {
  field: FieldApi<
    GridTied,
    "parameters.earthLeakage",
    undefined,
    undefined,
    EarthLeakage
  >;
};

export function EarthLeakageForm({ field }: Props) {
  return (
    <>
      <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-10 mx-4 h-max gap-4">
        <div>
          <Label className="mb-2">Brand Name</Label>
          <field.form.Field
            name={`parameters.earthLeakage.brand`}
            validators={{
              onChange: ({ value }) => (!value ? "required" : undefined),
            }}
          >
            {(field) => {
              return (
                <Input
                  id={"parameters.earthLeakage.brand"}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                />
              );
            }}
          </field.form.Field>
        </div>
        <div>
          <Label htmlFor="picture" className="mb-2">
            Price
          </Label>
          <field.form.Field
            name={`parameters.earthLeakage.price`}
            validators={{
              onChange: ({ value }) =>
                !value && value != 0 ? "required" : undefined,
            }}
            children={(subField) => (
              <>
                <Input
                  type="number"
                  key={"parameters.earthLeakage.price"}
                  value={subField.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    subField.handleChange(e.target.valueAsNumber);
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
        <div>
          <Label htmlFor="picture" className="mb-2">
            Rating
          </Label>
          <field.form.Field
            name={`parameters.earthLeakage.rating`}
            validators={{
              onChange: ({ value }) => (!value ? "required" : undefined),
            }}
            children={(subField) => (
              <>
                <Input
                  key={"parameters.earthLeakage.rating"}
                  value={subField.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    subField.handleChange(e.target.value);
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
        <div className="flex flex-col gap-4">
          <TypographyH4 text={"City specificity"} />
          <field.form.Field name="parameters.earthLeakage" mode="array">
            {(field) => {
              return field?.state?.value?.citySpecificities?.map(
                (citySpecificity, i) => {
                  return (
                    <div key={"earth-leakage-citySpecificity" + i}>
                      <TypographyH5 text={citySpecificity?.cityName} />
                      <Label
                        className="mb-2"
                        key={"earth-leakage-citySpecificity-label" + i}
                      ></Label>
                      <field.form.Field
                        name={`parameters.earthLeakage.citySpecificities[${i}].quantity`}
                        validators={{
                          onChange: ({ value }) =>
                            !value && value != 0 ? "required" : undefined,
                        }}
                        children={(subField) => (
                          <>
                            <Input
                              type="number"
                              key={
                                "invertor-circuit-breaker-quantity-input-" + i
                              }
                              defaultValue={subField.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) => {
                                subField.handleChange(
                                  e.target
                                    .valueAsNumber as unknown as UpdaterFn<
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
                  );
                }
              );
            }}
          </field.form.Field>
        </div>
      </div>
    </>
  );
}
