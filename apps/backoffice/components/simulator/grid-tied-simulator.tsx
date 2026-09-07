"use client";

import { useMemo, useState } from "react";
import { useMutation } from "convex/react";
import { useForm } from "@tanstack/react-form";
import {
  getGridTiedProposal,
  parseParametersJson,
  stringifyParametersJson,
  type GridTiedParams,
  type GridTiedProposalDetails,
} from "@bolt-energy/models";
import { api } from "@convex/_generated/api";
import { Button } from "@bolt-energy/ui/components/button";
import { errorMessage, formatMoney } from "@/lib/format";
import {
  FieldInput,
  FieldSelect,
  ResultRows,
  SectionCard,
  SectionTabs,
} from "@/components/simulator/form-fields";
import {
  GRID_TIED_CITIES,
  blankGridTiedInverter,
} from "@/components/simulator/templates";

export type SolutionMeta = {
  name: string;
  currency: string;
  isEnabled: boolean;
  parametersJson: string;
};

type FormValues = {
  name: string;
  currency: string;
  isEnabled: boolean;
  parameters: GridTiedParams;
};

const TABS = [
  { id: "panel", label: "Panel" },
  { id: "rates", label: "Rates" },
  { id: "inverter", label: "Inverters" },
  { id: "cables", label: "Cables" },
  { id: "protection", label: "Protection" },
  { id: "billing", label: "Billing" },
  { id: "labour", label: "Labour" },
  { id: "maintenance", label: "Maintenance" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function parseParams(json: string): GridTiedParams {
  return parseParametersJson<GridTiedParams>(json);
}

export function GridTiedSimulator({ solution }: { solution: SolutionMeta }) {
  const upsert = useMutation(api.proposals.upsertSolution);
  const [mode, setMode] = useState<TabId>("panel");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [saveError, setSaveError] = useState("");
  const [simError, setSimError] = useState("");
  const [details, setDetails] = useState<GridTiedProposalDetails | null>(null);

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: solution.name,
      currency: solution.currency,
      isEnabled: solution.isEnabled,
      parameters: parseParams(solution.parametersJson),
    }),
    [solution]
  );

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      setSaving(true);
      setSaveError("");
      setSaveMsg("");
      try {
        await upsert({
          slug: "grid-tied",
          name: value.name,
          currency: value.currency,
          isEnabled: value.isEnabled,
          parametersJson: stringifyParametersJson(value.parameters),
        });
        setSaveMsg("Saved grid-tied settings");
      } catch (err) {
        setSaveError(errorMessage(err, "Save failed"));
      } finally {
        setSaving(false);
      }
    },
  });

  const simulationForm = useForm({
    defaultValues: {
      monthlyConsumption: 1400,
      city: GRID_TIED_CITIES[0],
    },
    onSubmit: ({ value }) => {
      setSimError("");
      try {
        const proposal = getGridTiedProposal(
          form.state.values.parameters,
          1,
          value.city,
          value.monthlyConsumption,
          "",
          ""
        );
        setDetails(proposal.proposalDetails);
      } catch (err) {
        setDetails(null);
        setSimError(errorMessage(err, "Simulation failed"));
      }
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-(--primary)">Grid-tied simulator</h1>
          <p className="mt-1 text-sm text-(--muted-foreground)">
            Edit calculator parameters and run a live cost preview (same as the old admin).
          </p>
        </div>
        <Button
          type="button"
          disabled={saving}
          onClick={() => void form.handleSubmit()}
        >
          {saving ? "Saving…" : "Save settings"}
        </Button>
      </div>
      {saveMsg ? <p className="text-sm text-emerald-800">{saveMsg}</p> : null}
      {saveError ? <p className="text-sm text-red-700">{saveError}</p> : null}

      <SectionTabs tabs={TABS} value={mode} onChange={setMode} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            void form.handleSubmit();
          }}
        >
          <SectionCard title="Product">
            <form.Field name="name">
              {(field) => <FieldInput field={field} label="Name" />}
            </form.Field>
            <form.Field name="currency">
              {(field) => <FieldInput field={field} label="Currency" />}
            </form.Field>
            <form.Field name="isEnabled">
              {(field) => (
                <label className="flex items-center gap-2 text-sm sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(event) => field.handleChange(event.target.checked)}
                  />
                  Enabled on customer site
                </label>
              )}
            </form.Field>
          </SectionCard>

          {mode === "panel" ? (
            <SectionCard title="Panel">
              <form.Field name="parameters.panel.brand">
                {(field) => <FieldInput field={field} label="Brand" />}
              </form.Field>
              <form.Field name="parameters.panel.powerOutputWatt">
                {(field) => (
                  <FieldInput field={field} label="Power output (W)" type="number" />
                )}
              </form.Field>
              <form.Field name="parameters.panel.pricePerWatt">
                {(field) => (
                  <FieldInput field={field} label="Price per watt" type="number" step="0.01" />
                )}
              </form.Field>
              <form.Field name="parameters.panel.width">
                {(field) => <FieldInput field={field} label="Width (m)" type="number" step="0.01" />}
              </form.Field>
            </SectionCard>
          ) : null}

          {mode === "rates" ? (
            <SectionCard title="Rates & structure">
              <form.Field name="parameters.tarif">
                {(field) => <FieldInput field={field} label="Tariff" type="number" step="0.01" />}
              </form.Field>
              <form.Field name="parameters.tarifEscalation">
                {(field) => (
                  <FieldInput field={field} label="Tariff escalation" type="number" step="0.01" />
                )}
              </form.Field>
              <form.Field name="parameters.markup">
                {(field) => <FieldInput field={field} label="Markup" type="number" step="0.01" />}
              </form.Field>
              <form.Field name="parameters.panelDegradation">
                {(field) => (
                  <FieldInput field={field} label="Panel degradation" type="number" step="0.001" />
                )}
              </form.Field>
              <form.Field name="parameters.specificProd">
                {(field) => (
                  <FieldInput field={field} label="Specific production" type="number" step="0.01" />
                )}
              </form.Field>
              <form.Field name="parameters.mountingPrice">
                {(field) => (
                  <FieldInput field={field} label="Mounting price / kW" type="number" />
                )}
              </form.Field>
              <form.Field name="parameters.structureSpan">
                {(field) => <FieldInput field={field} label="Structure span" type="number" />}
              </form.Field>
              <form.Field name="parameters.concreteFootingPrice">
                {(field) => (
                  <FieldInput field={field} label="Concrete footing price" type="number" />
                )}
              </form.Field>
              <form.Field name="parameters.dollarRate">
                {(field) => <FieldInput field={field} label="Dollar rate" type="number" step="0.01" />}
              </form.Field>
              <form.Field name="parameters.truckPrice">
                {(field) => <FieldInput field={field} label="Truck price" type="number" />}
              </form.Field>
              <form.Field name="parameters.cleaningToolPrice">
                {(field) => (
                  <FieldInput field={field} label="Cleaning tool price" type="number" />
                )}
              </form.Field>
            </SectionCard>
          ) : null}

          {mode === "inverter" ? (
            <div className="space-y-4">
              <form.Subscribe selector={(state) => state.values.parameters.inverters}>
                {(inverters) =>
                  inverters.map((_, i) => (
                    <SectionCard key={i} title={`Inverter #${i + 1}`}>
                      <form.Field name={`parameters.inverters[${i}].brand`}>
                        {(field) => <FieldInput field={field} label="Brand" />}
                      </form.Field>
                      <form.Field name={`parameters.inverters[${i}].price`}>
                        {(field) => <FieldInput field={field} label="Price" type="number" />}
                      </form.Field>
                      <form.Field name={`parameters.inverters[${i}].capacity`}>
                        {(field) => (
                          <FieldInput field={field} label="Capacity (kW)" type="number" step="0.1" />
                        )}
                      </form.Field>
                      <form.Field name={`parameters.inverters[${i}].circuitBreaker.brand`}>
                        {(field) => <FieldInput field={field} label="CB brand" />}
                      </form.Field>
                      <form.Field name={`parameters.inverters[${i}].circuitBreaker.rating`}>
                        {(field) => <FieldInput field={field} label="CB rating" />}
                      </form.Field>
                      <form.Field name={`parameters.inverters[${i}].circuitBreaker.price`}>
                        {(field) => <FieldInput field={field} label="CB price" type="number" />}
                      </form.Field>
                      <form.Field name={`parameters.inverters[${i}].circuitBreaker.quantity`}>
                        {(field) => <FieldInput field={field} label="CB qty" type="number" />}
                      </form.Field>
                      <form.Field name={`parameters.inverters[${i}].acCable.brand`}>
                        {(field) => <FieldInput field={field} label="AC cable brand" />}
                      </form.Field>
                      <form.Field name={`parameters.inverters[${i}].acCable.rating`}>
                        {(field) => <FieldInput field={field} label="AC cable rating" />}
                      </form.Field>
                      <form.Field name={`parameters.inverters[${i}].acCable.price`}>
                        {(field) => (
                          <FieldInput field={field} label="AC cable price" type="number" />
                        )}
                      </form.Field>
                      <form.Field name={`parameters.inverters[${i}].acCable.quantity`}>
                        {(field) => (
                          <FieldInput field={field} label="AC cable qty" type="number" />
                        )}
                      </form.Field>
                      <form.Field name={`parameters.inverters[${i}].acCable.acEarthCable.brand`}>
                        {(field) => <FieldInput field={field} label="AC earth brand" />}
                      </form.Field>
                      <form.Field name={`parameters.inverters[${i}].acCable.acEarthCable.rating`}>
                        {(field) => <FieldInput field={field} label="AC earth rating" />}
                      </form.Field>
                      <form.Field name={`parameters.inverters[${i}].acCable.acEarthCable.price`}>
                        {(field) => (
                          <FieldInput field={field} label="AC earth price" type="number" />
                        )}
                      </form.Field>
                      <form.Field name={`parameters.inverters[${i}].acCable.acEarthCable.quantity`}>
                        {(field) => (
                          <FieldInput field={field} label="AC earth qty" type="number" />
                        )}
                      </form.Field>
                      <form.Field name={`parameters.inverters[${i}].flexible.brand`}>
                        {(field) => <FieldInput field={field} label="Flexible brand" />}
                      </form.Field>
                      <form.Field name={`parameters.inverters[${i}].flexible.price`}>
                        {(field) => (
                          <FieldInput field={field} label="Flexible price" type="number" />
                        )}
                      </form.Field>
                      <form.Field name={`parameters.inverters[${i}].flexible.quantity`}>
                        {(field) => (
                          <FieldInput field={field} label="Flexible qty" type="number" />
                        )}
                      </form.Field>
                      <form.Field name={`parameters.inverters[${i}].vsn.price`}>
                        {(field) => <FieldInput field={field} label="VSN price" type="number" />}
                      </form.Field>
                      <form.Field name={`parameters.inverters[${i}].vsn.quantity`}>
                        {(field) => <FieldInput field={field} label="VSN qty" type="number" />}
                      </form.Field>
                      <div className="sm:col-span-2">
                        <Button
                          type="button"
                          className="bg-red-700"
                          onClick={() => form.removeFieldValue("parameters.inverters", i)}
                        >
                          Delete inverter
                        </Button>
                      </div>
                    </SectionCard>
                  ))
                }
              </form.Subscribe>
              <Button
                type="button"
                onClick={() =>
                  form.pushFieldValue("parameters.inverters", blankGridTiedInverter())
                }
              >
                Add inverter
              </Button>
            </div>
          ) : null}

          {mode === "cables" ? (
            <>
              <SectionCard title="DC cable">
                <form.Field name="parameters.dcCable.brand">
                  {(field) => <FieldInput field={field} label="Brand" />}
                </form.Field>
                <form.Field name="parameters.dcCable.rating">
                  {(field) => <FieldInput field={field} label="Rating" />}
                </form.Field>
                <form.Field name="parameters.dcCable.price">
                  {(field) => <FieldInput field={field} label="Price" type="number" />}
                </form.Field>
              </SectionCard>
              <SectionCard title="DC earth cable">
                <form.Field name="parameters.dcEarthCable.brand">
                  {(field) => <FieldInput field={field} label="Brand" />}
                </form.Field>
                <form.Field name="parameters.dcEarthCable.rating">
                  {(field) => <FieldInput field={field} label="Rating" />}
                </form.Field>
                <form.Field name="parameters.dcEarthCable.price">
                  {(field) => <FieldInput field={field} label="Price" type="number" />}
                </form.Field>
                <form.Field name="parameters.dcEarthCable.quantity">
                  {(field) => <FieldInput field={field} label="Quantity" type="number" />}
                </form.Field>
              </SectionCard>
            </>
          ) : null}

          {mode === "protection" ? (
            <>
              <SectionCard title="Earth leakage">
                <form.Field name="parameters.earthLeakage.brand">
                  {(field) => <FieldInput field={field} label="Brand" />}
                </form.Field>
                <form.Field name="parameters.earthLeakage.rating">
                  {(field) => <FieldInput field={field} label="Rating" />}
                </form.Field>
                <form.Field name="parameters.earthLeakage.price">
                  {(field) => <FieldInput field={field} label="Price" type="number" />}
                </form.Field>
                <form.Subscribe
                  selector={(state) => state.values.parameters.earthLeakage.citySpecificities}
                >
                  {(cities) =>
                    cities.map((_, i) => (
                      <div key={i} className="contents">
                        <form.Field
                          name={`parameters.earthLeakage.citySpecificities[${i}].cityName`}
                        >
                          {(field) => <FieldInput field={field} label="City" />}
                        </form.Field>
                        <form.Field
                          name={`parameters.earthLeakage.citySpecificities[${i}].quantity`}
                        >
                          {(field) => <FieldInput field={field} label="Qty" type="number" />}
                        </form.Field>
                      </div>
                    ))
                  }
                </form.Subscribe>
              </SectionCard>
              <SectionCard title="Switch box">
                <form.Field name="parameters.switchBox.brand">
                  {(field) => <FieldInput field={field} label="Brand" />}
                </form.Field>
                <form.Field name="parameters.switchBox.price">
                  {(field) => <FieldInput field={field} label="Price" type="number" />}
                </form.Field>
                <form.Subscribe
                  selector={(state) => state.values.parameters.switchBox.citySpecificities}
                >
                  {(cities) =>
                    cities.map((_, i) => (
                      <div key={i} className="contents">
                        <form.Field name={`parameters.switchBox.citySpecificities[${i}].cityName`}>
                          {(field) => <FieldInput field={field} label="City" />}
                        </form.Field>
                        <form.Field name={`parameters.switchBox.citySpecificities[${i}].quantity`}>
                          {(field) => <FieldInput field={field} label="Qty" type="number" />}
                        </form.Field>
                      </div>
                    ))
                  }
                </form.Subscribe>
              </SectionCard>
              <SectionCard title="Fuse / earth / MC4">
                <form.Field name="parameters.fuse.brand">
                  {(field) => <FieldInput field={field} label="Fuse brand" />}
                </form.Field>
                <form.Field name="parameters.fuse.price">
                  {(field) => <FieldInput field={field} label="Fuse price" type="number" />}
                </form.Field>
                <form.Field name="parameters.earth.brand">
                  {(field) => <FieldInput field={field} label="Earth brand" />}
                </form.Field>
                <form.Field name="parameters.earth.price">
                  {(field) => <FieldInput field={field} label="Earth price" type="number" />}
                </form.Field>
                <form.Field name="parameters.mc4.brand">
                  {(field) => <FieldInput field={field} label="MC4 brand" />}
                </form.Field>
                <form.Field name="parameters.mc4.price">
                  {(field) => <FieldInput field={field} label="MC4 price" type="number" />}
                </form.Field>
              </SectionCard>
            </>
          ) : null}

          {mode === "billing" ? (
            <SectionCard title="Billing percentages">
              <form.Field name="parameters.billingPercentage.downPaymentPercentage">
                {(field) => (
                  <FieldInput field={field} label="Down payment" type="number" step="0.01" />
                )}
              </form.Field>
              <form.Field name="parameters.billingPercentage.componentsSupplyPercentage">
                {(field) => (
                  <FieldInput field={field} label="Components supply" type="number" step="0.01" />
                )}
              </form.Field>
              <form.Field name="parameters.billingPercentage.installationPercentage">
                {(field) => (
                  <FieldInput field={field} label="Installation" type="number" step="0.01" />
                )}
              </form.Field>
              <form.Field name="parameters.billingPercentage.commissionPercentage">
                {(field) => (
                  <FieldInput field={field} label="Commission" type="number" step="0.01" />
                )}
              </form.Field>
            </SectionCard>
          ) : null}

          {mode === "labour" ? (
            <SectionCard title="Labour">
              <form.Field name="parameters.labourBaseCost">
                {(field) => <FieldInput field={field} label="Labour base cost" type="number" />}
              </form.Field>
            </SectionCard>
          ) : null}

          {mode === "maintenance" ? (
            <>
              <SectionCard title="Maintenance">
                <form.Field name="parameters.maintenance.price">
                  {(field) => <FieldInput field={field} label="Price / visit" type="number" />}
                </form.Field>
                <form.Field name="parameters.maintenance.amountOfVisits">
                  {(field) => <FieldInput field={field} label="Visits" type="number" />}
                </form.Field>
              </SectionCard>
              <SectionCard title="Electricity company checkup">
                <form.Field name="parameters.electricityCompanyCheckup.price">
                  {(field) => <FieldInput field={field} label="Price / visit" type="number" />}
                </form.Field>
                <form.Field name="parameters.electricityCompanyCheckup.amountOfVisits">
                  {(field) => <FieldInput field={field} label="Visits" type="number" />}
                </form.Field>
              </SectionCard>
            </>
          ) : null}
        </form>

        <form
          className="space-y-4 xl:sticky xl:top-4 xl:self-start"
          onSubmit={(event) => {
            event.preventDefault();
            void simulationForm.handleSubmit();
          }}
        >
          <SectionCard title="Simulation">
            <simulationForm.Field name="monthlyConsumption">
              {(field) => (
                <FieldInput field={field} label="Monthly consumption (kWh)" type="number" />
              )}
            </simulationForm.Field>
            <simulationForm.Field name="city">
              {(field) => (
                <FieldSelect field={field} label="City">
                  {GRID_TIED_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </FieldSelect>
              )}
            </simulationForm.Field>
            <div className="flex items-end sm:col-span-2">
              <Button type="submit">Simulate</Button>
            </div>
          </SectionCard>

          {simError ? <p className="text-sm text-red-700">{simError}</p> : null}

          {details ? (
            <div className="space-y-4 rounded-xl border border-(--border) bg-(--card) p-4 shadow-sm">
              <h3 className="text-base font-semibold">Simulation results</h3>
              <ResultRows
                rows={[
                  { label: "System size (kW)", value: details.systemSize },
                  { label: "Panels", value: details.numberOfPanels },
                  { label: "Panel cost", value: formatMoney(details.costOfPanels) },
                  { label: "Labour", value: formatMoney(details.labourCost) },
                  { label: "Footing", value: formatMoney(details.concreteFootingCost) },
                  { label: "DC cable", value: formatMoney(details.dcCableCost) },
                  { label: "DC earth", value: formatMoney(details.dcEarthCableCost) },
                  { label: "Earth", value: formatMoney(details.earthCost) },
                  { label: "Fuse", value: formatMoney(details.fuseCost) },
                  { label: "MC4", value: formatMoney(details.mc4Cost) },
                  { label: "Switch box", value: formatMoney(details.switchBoxCost) },
                  { label: "Earth leakage", value: formatMoney(details.earthLeakageCost) },
                  { label: "Cleaning tool", value: formatMoney(details.cleaningToolPrice) },
                  {
                    label: "Electricity company",
                    value: formatMoney(details.electricityCompanyCost),
                  },
                  { label: "Maintenance", value: formatMoney(details.maintenanceCost) },
                  { label: "Mounting", value: formatMoney(details.mountingStructureCost) },
                  { label: "Transport", value: formatMoney(details.transportationCost) },
                  { label: "Total cost", value: formatMoney(details.totalCost) },
                  { label: "Selling cost", value: formatMoney(details.sellingCost) },
                  { label: "1st year savings", value: formatMoney(details.firstYearSavings) },
                  {
                    label: "25y savings",
                    value: formatMoney(details.twentyFifthYearSavings),
                  },
                ]}
              />
              <h4 className="pt-2 text-sm font-semibold">Chosen inverter</h4>
              <ResultRows
                rows={[
                  { label: "Brand", value: details.inverter.inverterInfo.brand },
                  { label: "Capacity", value: details.inverter.inverterInfo.capacity },
                  {
                    label: "Inverter base",
                    value: formatMoney(details.inverter.inverterBaseCost),
                  },
                  {
                    label: "AC cable",
                    value: formatMoney(details.inverter.inverterACCableCost),
                  },
                  {
                    label: "AC earth",
                    value: formatMoney(details.inverter.inverterACCableEarthCost),
                  },
                  {
                    label: "Circuit breaker",
                    value: formatMoney(details.inverter.inverterCircuitBreaker),
                  },
                  { label: "VSN", value: formatMoney(details.inverter.inverterVSNCost) },
                  {
                    label: "Flexible",
                    value: formatMoney(details.inverter.inverterFlexibleCost),
                  },
                ]}
              />
              <h4 className="pt-2 text-sm font-semibold">Billing</h4>
              <ResultRows
                rows={[
                  {
                    label: "Down payment",
                    value: formatMoney(details.billing.downPaymentFee),
                  },
                  {
                    label: "Components",
                    value: formatMoney(details.billing.componentsSupplyFee),
                  },
                  {
                    label: "Installation",
                    value: formatMoney(details.billing.installationFee),
                  },
                  {
                    label: "Commission",
                    value: formatMoney(details.billing.commissionFee),
                  },
                ]}
              />
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
