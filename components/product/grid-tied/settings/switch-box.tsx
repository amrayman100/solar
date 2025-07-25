import { Input } from "@/components/ui/input";
import { GridTied, SwitchBox } from "@/models/product";
import { FieldApi, UpdaterFn } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";
import { TypographyH4, TypographyH5 } from "@/components/shared/typography";

type Props = {
  field: FieldApi<
    GridTied,
    "parameters.switchBox",
    undefined,
    undefined,
    SwitchBox
  >;
};

export function SwitchBoxForm({ field }: Props) {
  return (
    <>
      <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-4 mx-4 h-max gap-4">
        <div>
          <Label className="mb-2">Brand Name</Label>
          <field.form.Field
            name={`parameters.switchBox.brand`}
            validators={{
              onChange: ({ value }) => (!value ? "required" : undefined),
            }}
          >
            {(field) => {
              return (
                <Input
                  id={"parameters.switchBox.brand"}
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
            name={`parameters.switchBox.price`}
            validators={{
              onChange: ({ value }) =>
                !value && value != 0 ? "required" : undefined,
            }}
            children={(subField) => (
              <>
                <Input
                  type="number"
                  key={"parameters.switchBox.price"}
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
        <div className="flex flex-col gap-4">
          <TypographyH4 text={"City specificity"} />
          <field.form.Field name="parameters.switchBox" mode="array">
            {(field) => {
              return field?.state?.value?.citySpecificities?.map(
                (citySpecificity, i) => {
                  return (
                    <div key={"earth-leakage-citySpecificity" + i}>
                      <TypographyH5
                        text={citySpecificity?.cityName}
                        className="mb-2"
                      />
                      <Label
                        className="mb-2"
                        key={"earth-leakage-citySpecificity-label" + i}
                      >
                        Quantity
                      </Label>
                      <field.form.Field
                        name={`parameters.switchBox.citySpecificities[${i}].quantity`}
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
