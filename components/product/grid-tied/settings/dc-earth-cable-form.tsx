import { Input } from "@/components/ui/input";
import { DCEarthCable, GridTied } from "@/models/product";
import { FieldApi } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";

type Props = {
  field: FieldApi<
    GridTied,
    "parameters.dcEarthCable",
    undefined,
    undefined,
    DCEarthCable
  >;
};

export function DCEarthCableForm({ field }: Props) {
  return (
    <>
      <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-4 mx-4 h-max gap-4">
        <div>
          <Label className="mb-2">Brand Name</Label>
          <field.form.Field
            name={`parameters.dcEarthCable.brand`}
            validators={{
              onChange: ({ value }) => (!value ? "required" : undefined),
            }}
          >
            {(field) => {
              return (
                <Input
                  id={"parameters.dcEarthCable.brand"}
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
            name={`parameters.dcEarthCable.price`}
            validators={{
              onChange: ({ value }) =>
                !value && value != 0 ? "required" : undefined,
            }}
            children={(subField) => (
              <>
                <Input
                  type="number"
                  key={"parameters.dcEarthCable.price"}
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
            Quantity
          </Label>
          <field.form.Field
            name={`parameters.dcEarthCable.quantity`}
            validators={{
              onChange: ({ value }) =>
                !value && value != 0 ? "required" : undefined,
            }}
            children={(subField) => (
              <>
                <Input
                  type="number"
                  key={"parameters.dcEarthCable.quantity"}
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
            name={`parameters.dcEarthCable.rating`}
            validators={{
              onChange: ({ value }) => (!value ? "required" : undefined),
            }}
            children={(subField) => (
              <>
                <Input
                  key={"parameters.dcEarthCable.costPerWatt"}
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
      </div>
    </>
  );
}
