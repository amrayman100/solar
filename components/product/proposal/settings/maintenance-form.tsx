import { Input } from "@/components/ui/input";
import { GridTied, GridTiedParams } from "@/models/product";
import { FieldApi } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";
import { TypographyH5 } from "@/components/shared/typography";

type Props = {
  field: FieldApi<GridTied, "parameters", undefined, undefined, GridTiedParams>;
};

export function MaintenanceForm({ field }: Props) {
  return (
    <>
      <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-4 mx-4 h-max gap-4">
        <div>
          <Label htmlFor="picture" className="mb-2">
            Cleaning Tool Price
          </Label>
          <field.form.Field
            name={`parameters.cleaningToolPrice`}
            validators={{
              onChange: ({ value }) =>
                !value && value != 0 ? "required" : undefined,
            }}
            children={(subField) => (
              <>
                <Input
                  type="number"
                  key={"parameters.cleaningToolPrice"}
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
          <TypographyH5
            text={"Maintenance Visits"}
            className="font-bold mb-2 overflow-y-auto"
          />
          <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-4 mx-4 h-max gap-4">
            <div>
              <Label htmlFor="picture" className="mb-2">
                Price
              </Label>
              <field.form.Field
                name={`parameters.maintenance.price`}
                validators={{
                  onChange: ({ value }) =>
                    !value && value != 0 ? "required" : undefined,
                }}
                children={(subField) => (
                  <>
                    <Input
                      type="number"
                      key={"parameters.maintenance.price"}
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
                Amount Of Visits
              </Label>
              <field.form.Field
                name={`parameters.maintenance.amountOfVisits`}
                validators={{
                  onChange: ({ value }) =>
                    !value && value != 0 ? "required" : undefined,
                }}
                children={(subField) => (
                  <>
                    <Input
                      type="number"
                      key={"parameters.maintenance.amountOfVisits"}
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
        </div>
        <div>
          <TypographyH5
            text={"Electricity Company Checkups"}
            className="font-bold mb-2 overflow-y-auto"
          />
          <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-4 mx-4 h-max gap-4">
            <div>
              <Label htmlFor="picture" className="mb-2">
                Price
              </Label>
              <field.form.Field
                name={`parameters.electricityCompanyCheckup.price`}
                validators={{
                  onChange: ({ value }) =>
                    !value && value != 0 ? "required" : undefined,
                }}
                children={(subField) => (
                  <>
                    <Input
                      type="number"
                      key={"parameters.electricityCompanyCheckup.price"}
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
                Amount Of Visits
              </Label>
              <field.form.Field
                name={`parameters.electricityCompanyCheckup.amountOfVisits`}
                validators={{
                  onChange: ({ value }) =>
                    !value && value != 0 ? "required" : undefined,
                }}
                children={(subField) => (
                  <>
                    <Input
                      type="number"
                      key={
                        "parameters.electricityCompanyCheckup.amountOfVisits"
                      }
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
        </div>
      </div>
    </>
  );
}
