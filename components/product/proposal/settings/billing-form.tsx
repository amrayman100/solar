import { Input } from "@/components/ui/input";
import { GridTied, GridTiedParams } from "@/models/product";
import { FieldApi } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";
import { TypographyH5 } from "@/components/shared/typography";

type Props = {
  field: FieldApi<GridTied, "parameters", undefined, undefined, GridTiedParams>;
};

export function BillingForm({ field }: Props) {
  return (
    <>
      <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-10 mx-4 h-max gap-4">
        <div>
          <Label htmlFor="picture" className="mb-2">
            Dollar Rate
          </Label>
          <field.form.Field
            name={`parameters.dollarRate`}
            validators={{
              onChange: ({ value }) =>
                !value && value != 0 ? "required" : undefined,
            }}
            children={(subField) => (
              <>
                <Input
                  type="number"
                  key={"parameters.dollarRate"}
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
            Tarif
          </Label>
          <field.form.Field
            name={`parameters.tarif`}
            validators={{
              onChange: ({ value }) =>
                !value && value != 0 ? "required" : undefined,
            }}
            children={(subField) => (
              <>
                <Input
                  type="number"
                  key={"parameters.tarif"}
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
            Tarif Escalation
          </Label>
          <field.form.Field
            name={`parameters.tarifEscalation`}
            validators={{
              onChange: ({ value }) =>
                !value && value != 0 ? "required" : undefined,
            }}
            children={(subField) => (
              <>
                <Input
                  type="number"
                  key={"parameters.tarifEscalation"}
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
            Markup
          </Label>
          <field.form.Field
            name={`parameters.markup`}
            validators={{
              onChange: ({ value }) =>
                !value && value != 0 ? "required" : undefined,
            }}
            children={(subField) => (
              <>
                <Input
                  type="number"
                  key={"parameters.markup"}
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
            Panel degradation
          </Label>
          <field.form.Field
            name={`parameters.panelDegradation`}
            validators={{
              onChange: ({ value }) =>
                !value && value != 0 ? "required" : undefined,
            }}
            children={(subField) => (
              <>
                <Input
                  type="number"
                  key={"parameters.panelDegradation"}
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
            Specific Production
          </Label>
          <field.form.Field
            name={`parameters.specificProd`}
            validators={{
              onChange: ({ value }) =>
                !value && value != 0 ? "required" : undefined,
            }}
            children={(subField) => (
              <>
                <Input
                  type="number"
                  key={"parameters.specificProd"}
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
            text={"Billing Percentage"}
            className="font-bold mb-2 overflow-y-auto"
          />
          <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-10 mx-4 h-max gap-4">
            <div>
              <Label htmlFor="picture" className="mb-2">
                Down Payment Percentage
              </Label>
              <field.form.Field
                name={`parameters.billingPercentage.downPaymentPercentage`}
                validators={{
                  onChange: ({ value }) =>
                    !value && value != 0 ? "required" : undefined,
                }}
                children={(subField) => (
                  <>
                    <Input
                      type="number"
                      key={"parameters.billingPercentage.downPaymentPercentage"}
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
                Components Supply Percentage
              </Label>
              <field.form.Field
                name={`parameters.billingPercentage.componentsSupplyPercentage`}
                validators={{
                  onChange: ({ value }) =>
                    !value && value != 0 ? "required" : undefined,
                }}
                children={(subField) => (
                  <>
                    <Input
                      type="number"
                      key={
                        "parameters.billingPercentage.componentsSupplyPercentage"
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
            <div>
              <Label htmlFor="picture" className="mb-2">
                Installation Percentage
              </Label>
              <field.form.Field
                name={`parameters.billingPercentage.installationPercentage`}
                validators={{
                  onChange: ({ value }) =>
                    !value && value != 0 ? "required" : undefined,
                }}
                children={(subField) => (
                  <>
                    <Input
                      type="number"
                      key={
                        "parameters.billingPercentage.installationPercentage"
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
            <div>
              <Label htmlFor="picture" className="mb-2">
                Commission Percentage
              </Label>
              <field.form.Field
                name={`parameters.billingPercentage.commissionPercentage`}
                validators={{
                  onChange: ({ value }) =>
                    !value && value != 0 ? "required" : undefined,
                }}
                children={(subField) => (
                  <>
                    <Input
                      type="number"
                      key={"parameters.billingPercentage.commissionPercentag"}
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
