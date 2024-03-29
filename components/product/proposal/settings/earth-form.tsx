import { Input } from "@/components/ui/input";
import { Earth, GridTied } from "@/models/product";
import { FieldApi } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";

type Props = {
  field: FieldApi<GridTied, "parameters.earth", undefined, undefined, Earth>;
};

export function EarthForm({ field }: Props) {
  return (
    <>
      <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-10 mx-4 h-max gap-4">
        <div>
          <Label className="mb-2">Brand Name</Label>
          <field.form.Field
            name={`parameters.earth.brand`}
            validators={{
              onChange: ({ value }) => (!value ? "required" : undefined),
            }}
          >
            {(field) => {
              return (
                <Input
                  id={"parameters.earth.brand"}
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
            name={`parameters.earth.price`}
            validators={{
              onChange: ({ value }) =>
                !value && value != 0 ? "required" : undefined,
            }}
            children={(subField) => (
              <>
                <Input
                  type="number"
                  key={"parameters.earth.price"}
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
