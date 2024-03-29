import { Input } from "@/components/ui/input";
import { GridTied, MC4 } from "@/models/product";
import { FieldApi } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";

type Props = {
  field: FieldApi<GridTied, "parameters.mc4", undefined, undefined, MC4>;
};

export function Mc4Form({ field }: Props) {
  return (
    <>
      <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-10 mx-4 h-max gap-4">
        <div>
          <Label className="mb-2">Brand Name</Label>
          <field.form.Field
            name={`parameters.mc4.brand`}
            validators={{
              onChange: ({ value }) => (!value ? "required" : undefined),
            }}
          >
            {(field) => {
              return (
                <Input
                  id={"parameters.mc4.brand"}
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
            name={`parameters.mc4.price`}
            validators={{
              onChange: ({ value }) =>
                !value && value != 0 ? "required" : undefined,
            }}
            children={(subField) => (
              <>
                <Input
                  type="number"
                  key={"parameters.mc4.price"}
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
      </div>
    </>
  );
}
