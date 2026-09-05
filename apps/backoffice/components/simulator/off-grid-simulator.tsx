"use client";

import { useMemo, useState } from "react";
import { useMutation } from "convex/react";
import { useForm } from "@tanstack/react-form";
import {
  getOffGridProposal,
  parseParametersJson,
  stringifyParametersJson,
  type DeviceLoad,
  type OffGrid,
  type OffGridParams,
  type OffGridProposalDetails,
} from "@bolt-energy/models";
import { api } from "@convex/_generated/api";
import { Button } from "@bolt-energy/ui/components/button";
import { errorMessage, formatMoney } from "@/lib/format";
import {
  FieldInput,
  ResultRows,
  SectionCard,
  SectionTabs,
} from "@/components/simulator/form-fields";
import { blankOffGridInverter } from "@/components/simulator/templates";

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
  parameters: OffGridParams;
};

type SimLoad = {
  templateIndex: number;
  quantity: number;
  workingHours: number;
  morningHours: number;
  eveningHours: number;
};

const TABS = [
  { id: "panel", label: "Panel" },
  { id: "battery", label: "Battery" },
  { id: "inverter", label: "Inverters" },
  { id: "loads", label: "Load templates" },
  { id: "cables", label: "Cables & extras" },
  { id: "billing", label: "Billing" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function parseParams(json: string): OffGridParams {
  return parseParametersJson<OffGridParams>(json);
}

export function OffGridSimulator({ solution }: { solution: SolutionMeta }) {
  const upsert = useMutation(api.proposals.upsertSolution);
  const [mode, setMode] = useState<TabId>("panel");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [saveError, setSaveError] = useState("");
  const [simError, setSimError] = useState("");
  const [details, setDetails] = useState<OffGridProposalDetails | null>(null);

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
          slug: "off-grid",
          name: value.name,
          currency: value.currency,
          isEnabled: value.isEnabled,
          parametersJson: stringifyParametersJson(value.parameters),
        });
        setSaveMsg("Saved off-grid settings");
      } catch (err) {
        setSaveError(errorMessage(err, "Save failed"));
      } finally {
        setSaving(false);
      }
    },
  });

  const simulationForm = useForm({
    defaultValues: {
      isConnectedToGrid: false,
      placeBatteriesIndoors: true,
      loads: [
        {
          templateIndex: 0,
          quantity: 4,
          workingHours: 4,
          morningHours: 2,
          eveningHours: 4,
        },
      ] as SimLoad[],
    },
    onSubmit: ({ value }) => {
      setSimError("");
      try {
        const templates = form.state.values.parameters.deviceLoadTemplates;
        const deviceLoads: DeviceLoad[] = value.loads.map((load) => {
          const template = templates[load.templateIndex];
          if (!template) {
            throw new Error("Pick a valid load template for every row");
          }
          return {
            ...template,
            quantity: load.quantity,
            workingHours: load.workingHours,
            morningHours: load.morningHours,
            eveningHours: load.eveningHours,
            isCustom: false,
          };
        });

        const product: OffGrid = {
          name: form.state.values.name,
          currency: form.state.values.currency,
          isEnabled: form.state.values.isEnabled,
          parameters: form.state.values.parameters,
        };

        const proposal = getOffGridProposal(
          {
            consumptionDetails: {
              isConnectedToGrid: value.isConnectedToGrid,
              placeBatteriesIndoors: value.placeBatteriesIndoors,
              deviceLoads,
            },
            city: "Giza Governorate",
            name: "Simulator",
            phoneNumber: "0000000000",
          },
          1,
          product
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
          <h1 className="text-3xl font-bold text-(--primary)">Off-grid simulator</h1>
          <p className="mt-1 text-sm text-(--muted-foreground)">
            Edit off-grid calculator parameters and simulate loads the same way as grid-tied.
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
              <form.Field name="parameters.panel.switchBox.brand">
                {(field) => <FieldInput field={field} label="Switch box brand" />}
              </form.Field>
              <form.Field name="parameters.panel.switchBox.price">
                {(field) => (
                  <FieldInput field={field} label="Switch box price" type="number" />
                )}
              </form.Field>
              <form.Field name="parameters.mountingPrice">
                {(field) => (
                  <FieldInput field={field} label="Mounting price / kW" type="number" />
                )}
              </form.Field>
            </SectionCard>
          ) : null}

          {mode === "battery" ? (
            <>
              <SectionCard title="Battery">
                <form.Field name="parameters.battery.brand">
                  {(field) => <FieldInput field={field} label="Brand" />}
                </form.Field>
                <form.Field name="parameters.battery.price">
                  {(field) => <FieldInput field={field} label="Price" type="number" />}
                </form.Field>
                <form.Field name="parameters.battery.capacity">
                  {(field) => <FieldInput field={field} label="Capacity (Ah)" type="number" />}
                </form.Field>
                <form.Field name="parameters.battery.voltage">
                  {(field) => <FieldInput field={field} label="Voltage" type="number" />}
                </form.Field>
                <form.Field name="parameters.battery.depthOfDischarge">
                  {(field) => (
                    <FieldInput field={field} label="Depth of discharge" type="number" step="0.01" />
                  )}
                </form.Field>
                <form.Field name="parameters.battery.meterString">
                  {(field) => <FieldInput field={field} label="Meters / string" type="number" />}
                </form.Field>
                <form.Field name="parameters.battery.cableCost">
                  {(field) => <FieldInput field={field} label="Cable cost / m" type="number" />}
                </form.Field>
                <form.Field name="parameters.battery.circuitBreaker.brand">
                  {(field) => <FieldInput field={field} label="CB brand" />}
                </form.Field>
                <form.Field name="parameters.battery.circuitBreaker.rating">
                  {(field) => <FieldInput field={field} label="CB rating" />}
                </form.Field>
                <form.Field name="parameters.battery.circuitBreaker.price">
                  {(field) => <FieldInput field={field} label="CB price" type="number" />}
                </form.Field>
                <form.Field name="parameters.battery.circuitBreaker.quantity">
                  {(field) => <FieldInput field={field} label="CB qty" type="number" />}
                </form.Field>
              </SectionCard>
              <SectionCard title="Capacity variances (C-rate table)">
                <form.Subscribe
                  selector={(state) => state.values.parameters.battery.capacityVariances}
                >
                  {(rows) =>
                    rows.map((_, i) => (
                      <div key={i} className="contents">
                        <form.Field
                          name={`parameters.battery.capacityVariances[${i}].hoursTillEmpty`}
                        >
                          {(field) => (
                            <FieldInput field={field} label={`Hours #${i + 1}`} type="number" />
                          )}
                        </form.Field>
                        <form.Field name={`parameters.battery.capacityVariances[${i}].capacity`}>
                          {(field) => (
                            <FieldInput field={field} label={`Capacity #${i + 1}`} type="number" />
                          )}
                        </form.Field>
                      </div>
                    ))
                  }
                </form.Subscribe>
              </SectionCard>
            </>
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
                          <FieldInput field={field} label="Capacity (W)" type="number" />
                        )}
                      </form.Field>
                      <form.Field name={`parameters.inverters[${i}].systemVoltage`}>
                        {(field) => (
                          <FieldInput field={field} label="System voltage" type="number" />
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
                      <form.Field name={`parameters.inverters[${i}].acCable.rating`}>
                        {(field) => <FieldInput field={field} label="AC cable rating" />}
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
                  form.pushFieldValue("parameters.inverters", blankOffGridInverter())
                }
              >
                Add inverter
              </Button>
            </div>
          ) : null}

          {mode === "loads" ? (
            <div className="space-y-4">
              <form.Subscribe selector={(state) => state.values.parameters.deviceLoadTemplates}>
                {(templates) =>
                  templates.map((_, i) => (
                    <SectionCard key={i} title={`Template #${i + 1}`}>
                      <form.Field name={`parameters.deviceLoadTemplates[${i}].name`}>
                        {(field) => <FieldInput field={field} label="Name" />}
                      </form.Field>
                      <form.Field name={`parameters.deviceLoadTemplates[${i}].powerWatt`}>
                        {(field) => <FieldInput field={field} label="Watts" type="number" />}
                      </form.Field>
                      <form.Field name={`parameters.deviceLoadTemplates[${i}].unit`}>
                        {(field) => <FieldInput field={field} label="Unit (watt|hp)" />}
                      </form.Field>
                      <form.Field name={`parameters.deviceLoadTemplates[${i}].hasSurgePower`}>
                        {(field) => (
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={Boolean(field.state.value)}
                              onChange={(event) =>
                                field.handleChange(event.target.checked)
                              }
                            />
                            Has surge
                          </label>
                        )}
                      </form.Field>
                      <form.Field
                        name={`parameters.deviceLoadTemplates[${i}].hasManualTransferSwitch`}
                      >
                        {(field) => (
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={Boolean(field.state.value)}
                              onChange={(event) =>
                                field.handleChange(event.target.checked)
                              }
                            />
                            Manual transfer switch
                          </label>
                        )}
                      </form.Field>
                    </SectionCard>
                  ))
                }
              </form.Subscribe>
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
                  {(field) => <FieldInput field={field} label="Price / m" type="number" />}
                </form.Field>
                <form.Field name="parameters.dcCable.meterPerString">
                  {(field) => (
                    <FieldInput field={field} label="Meters / string" type="number" />
                  )}
                </form.Field>
              </SectionCard>
              <SectionCard title="Extras">
                <form.Field name="parameters.labourCost">
                  {(field) => <FieldInput field={field} label="Labour cost" type="number" />}
                </form.Field>
                <form.Field name="parameters.mc4.brand">
                  {(field) => <FieldInput field={field} label="MC4 brand" />}
                </form.Field>
                <form.Field name="parameters.mc4.price">
                  {(field) => <FieldInput field={field} label="MC4 price" type="number" />}
                </form.Field>
                <form.Field name="parameters.fuse.brand">
                  {(field) => <FieldInput field={field} label="Fuse brand" />}
                </form.Field>
                <form.Field name="parameters.fuse.price">
                  {(field) => <FieldInput field={field} label="Fuse price" type="number" />}
                </form.Field>
                <form.Field name="parameters.manualTransferSwitch.brand">
                  {(field) => <FieldInput field={field} label="MTS brand" />}
                </form.Field>
                <form.Field name="parameters.manualTransferSwitch.price">
                  {(field) => <FieldInput field={field} label="MTS price" type="number" />}
                </form.Field>
                <form.Field name="parameters.manualTransferSwitch.quantity">
                  {(field) => <FieldInput field={field} label="MTS qty" type="number" />}
                </form.Field>
                <form.Field name="parameters.cleaningToolPrice">
                  {(field) => (
                    <FieldInput field={field} label="Cleaning tool" type="number" />
                  )}
                </form.Field>
                <form.Field name="parameters.batteryStandPrice.insideHousePrice">
                  {(field) => (
                    <FieldInput field={field} label="Indoor stand" type="number" />
                  )}
                </form.Field>
                <form.Field name="parameters.batteryStandPrice.outsideHousePerFourBatteriesPrice">
                  {(field) => (
                    <FieldInput field={field} label="Outdoor stand / 4 batt" type="number" />
                  )}
                </form.Field>
                <form.Field name="parameters.dollarRate">
                  {(field) => <FieldInput field={field} label="Dollar rate" type="number" />}
                </form.Field>
                <form.Field name="parameters.transportationCost">
                  {(field) => <FieldInput field={field} label="Transport" type="number" />}
                </form.Field>
              </SectionCard>
            </>
          ) : null}

          {mode === "billing" ? (
            <SectionCard title="Billing & markup">
              <form.Field name="parameters.markup">
                {(field) => <FieldInput field={field} label="Markup" type="number" step="0.01" />}
              </form.Field>
              <form.Field name="parameters.billingPercentage.downPaymentPercentage">
                {(field) => (
                  <FieldInput field={field} label="Down payment" type="number" step="0.01" />
                )}
              </form.Field>
              <form.Field name="parameters.billingPercentage.componentsSupplyPercentage">
                {(field) => (
                  <FieldInput field={field} label="Components" type="number" step="0.01" />
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
        </form>

        <form
          className="space-y-4 xl:sticky xl:top-4 xl:self-start"
          onSubmit={(event) => {
            event.preventDefault();
            void simulationForm.handleSubmit();
          }}
        >
          <SectionCard title="Simulation">
            <simulationForm.Field name="isConnectedToGrid">
              {(field) => (
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(event) => field.handleChange(event.target.checked)}
                  />
                  Connected to grid (hybrid loads)
                </label>
              )}
            </simulationForm.Field>
            <simulationForm.Field name="placeBatteriesIndoors">
              {(field) => (
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(event) => field.handleChange(event.target.checked)}
                  />
                  Batteries indoors
                </label>
              )}
            </simulationForm.Field>

            <div className="space-y-3 sm:col-span-2">
              <p className="text-sm font-medium">Loads</p>
              <simulationForm.Subscribe selector={(state) => state.values.loads}>
                {(loads) =>
                  loads.map((_, i) => (
                    <div
                      key={i}
                      className="grid gap-3 rounded-lg border border-(--border) p-3 sm:grid-cols-2"
                    >
                      <simulationForm.Field name={`loads[${i}].templateIndex`}>
                        {(field) => (
                          <label className="space-y-1 text-sm">
                            <span className="font-medium">Device</span>
                            <select
                              className="h-11 w-full rounded-md border border-gray-200 bg-white px-3"
                              value={field.state.value}
                              onChange={(event) =>
                                field.handleChange(Number(event.target.value))
                              }
                            >
                              {form.state.values.parameters.deviceLoadTemplates.map(
                                (template, index) => (
                                  <option key={template.name} value={index}>
                                    {template.name} ({template.powerWatt}W)
                                  </option>
                                )
                              )}
                            </select>
                          </label>
                        )}
                      </simulationForm.Field>
                      <simulationForm.Field name={`loads[${i}].quantity`}>
                        {(field) => <FieldInput field={field} label="Qty" type="number" />}
                      </simulationForm.Field>
                      <simulationForm.Field name={`loads[${i}].workingHours`}>
                        {(field) => (
                          <FieldInput field={field} label="Working hours" type="number" />
                        )}
                      </simulationForm.Field>
                      <simulationForm.Field name={`loads[${i}].morningHours`}>
                        {(field) => (
                          <FieldInput field={field} label="Morning hours" type="number" />
                        )}
                      </simulationForm.Field>
                      <simulationForm.Field name={`loads[${i}].eveningHours`}>
                        {(field) => (
                          <FieldInput field={field} label="Evening hours" type="number" />
                        )}
                      </simulationForm.Field>
                      <div className="flex items-end">
                        <Button
                          type="button"
                          className="bg-red-700"
                          onClick={() => simulationForm.removeFieldValue("loads", i)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))
                }
              </simulationForm.Subscribe>
              <Button
                type="button"
                onClick={() =>
                  simulationForm.pushFieldValue("loads", {
                    templateIndex: 0,
                    quantity: 1,
                    workingHours: 4,
                    morningHours: 2,
                    eveningHours: 4,
                  })
                }
              >
                Add load
              </Button>
            </div>

            <div className="sm:col-span-2">
              <Button type="submit">Simulate</Button>
            </div>
          </SectionCard>

          {simError ? <p className="text-sm text-red-700">{simError}</p> : null}

          {details ? (
            <div className="space-y-4 rounded-xl border border-(--border) bg-(--card) p-4 shadow-sm">
              <h3 className="text-base font-semibold">Simulation results</h3>
              <ResultRows
                rows={[
                  {
                    label: "Grid connected",
                    value: details.isConnectedToGrid ? "Yes" : "No",
                  },
                  { label: "Inverter", value: details.inverter.inverterInfo.brand },
                  {
                    label: "Inverter capacity",
                    value: details.inverter.inverterInfo.capacity,
                  },
                  { label: "Batteries", value: details.numberOfBatteries },
                  { label: "Battery cost", value: formatMoney(details.batteriesCost) },
                  { label: "Panels", value: details.numberOfPanels },
                  { label: "Panel cost", value: formatMoney(details.costOfPanels) },
                  { label: "Mounting", value: formatMoney(details.mountingStructureCost) },
                  { label: "DC cable", value: formatMoney(details.dcCableCosts) },
                  { label: "Battery cable", value: formatMoney(details.batteryCableCosts) },
                  { label: "Labour", value: formatMoney(details.labourCost) },
                  { label: "MC4", value: formatMoney(details.mc4Cost) },
                  { label: "Fuse", value: formatMoney(details.fuseCost) },
                  { label: "Switch box", value: formatMoney(details.switchBoxCost) },
                  {
                    label: "Manual transfer",
                    value: formatMoney(details.manualTransferSwitchCost),
                  },
                  { label: "Battery stand", value: formatMoney(details.batteryStandCost) },
                  { label: "Cleaning tool", value: formatMoney(details.cleaningToolCost) },
                  { label: "Total cost", value: formatMoney(details.totalCost) },
                  { label: "Selling cost", value: formatMoney(details.sellingCost) },
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
