import { Input } from "@/components/ui/input";
import { GridTied, Panel } from "@/models/product";
import { DeepKeys, FieldApi } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";

interface PanelContainer {
  parameters: {
    panel: Panel;
  };
}

type Props = {
  field: FieldApi<GridTied, "parameters.panel", undefined, undefined, Panel>;
};

export function PanelForm({ field }: Props) {
  return (
    <>
      <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-10 mx-4 h-max gap-4">
        <div>
          <Label className="mb-2">Brand Name</Label>
          <field.form.Field
            name={`parameters.panel.brand`}
            validators={{
              onChange: ({ value }) => (!value ? "required" : undefined),
            }}
          >
            {(field) => {
              return (
                <Input
                  id={"parameters.panel.brand"}
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
            Power Output Watt
          </Label>
          <field.form.Field
            name={`parameters.panel.powerOutputWatt`}
            validators={{
              onChange: ({ value }) =>
                !value && value != 0 ? "required" : undefined,
            }}
            children={(subField) => (
              <>
                <Input
                  type="number"
                  key={"parameters.panel.powerOutputWatt"}
                  value={subField.state.value}
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
          <Label htmlFor="picture" className="mb-2">
            Price Per Watt
          </Label>
          <field.form.Field
            name={`parameters.panel.pricePerWatt`}
            validators={{
              onChange: ({ value }) =>
                value == null || value == undefined ? "required" : undefined,
            }}
            children={(subField) => (
              <>
                <Input
                  type="number"
                  key={"parameters.panel.costPerWatt"}
                  value={subField.state.value}
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
          <Label htmlFor="picture" className="mb-2">
            Width
          </Label>
          <field.form.Field
            name={`parameters.panel.width`}
            validators={{
              onChange: ({ value }) =>
                value == null || value == undefined ? "required" : undefined,
            }}
            children={(subField) => (
              <>
                <Input
                  type="number"
                  key={"parameters.panel.width"}
                  value={subField.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    subField.handleChange(e.target.valueAsNumber);
                  }}
                />
              </>
            )}
          />
        </div>
      </div>
    </>
  );
}
