"use client";

import Link from "next/link";
import { formatMoney } from "@/lib/format";
import type {
  ConstructionProposalDetails,
  EVProposalDetails,
  GridTiedProposalDetails,
  OffGridProposalDetails,
  ProposalBilling,
  SolarHeatingProposalDetails,
  SolarIrrigationProposalDetails,
  WholeSaleProposalDetails,
} from "@bolt-energy/models";

function Panel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-xl border border-(--border) bg-(--card) p-4 shadow-sm ${className}`}>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-(--muted-foreground)">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-(--secondary) px-3 py-2">
      <p className="text-xs text-(--muted-foreground)">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-(--foreground)">{value}</p>
    </div>
  );
}

function MoneyTable({
  rows,
}: {
  rows: Array<{ label: string; amount: number; bold?: boolean }>;
}) {
  return (
    <table className="w-full text-sm">
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="border-b border-(--border)/70 last:border-0">
            <td className={`py-2 ${row.bold ? "font-semibold" : ""}`}>{row.label}</td>
            <td className={`py-2 text-end tabular-nums ${row.bold ? "font-semibold" : ""}`}>
              {formatMoney(Math.round(row.amount))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function BillingPanel({ billing }: { billing: ProposalBilling }) {
  return (
    <Panel title="Payment milestones">
      <MoneyTable
        rows={[
          { label: "Down payment", amount: billing.downPaymentFee },
          { label: "Components supply", amount: billing.componentsSupplyFee },
          { label: "Installation", amount: billing.installationFee },
          { label: "Commissioning", amount: billing.commissionFee },
        ]}
      />
    </Panel>
  );
}

function GridTiedBody({ details }: { details: GridTiedProposalDetails }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title="System">
        <div className="grid gap-2 sm:grid-cols-2">
          <Stat label="System size" value={`${details.systemSize} kW`} />
          <Stat label="Panels" value={details.numberOfPanels} />
          <Stat label="Inverter" value={details.inverter.inverterInfo.brand} />
          <Stat
            label="Inverter capacity"
            value={`${details.inverter.inverterInfo.capacity} kW`}
          />
          <Stat label="Current monthly bill" value={formatMoney(details.currentMonthlyBill)} />
          <Stat
            label="1st year monthly bill"
            value={formatMoney(Math.round(details.firstYearMonthlyBill))}
          />
          <Stat label="1st year savings" value={formatMoney(Math.round(details.firstYearSavings))} />
          <Stat
            label="25yr savings"
            value={formatMoney(Math.round(details.twentyFifthYearSavings))}
          />
        </div>
      </Panel>
      <Panel title="Quotation">
        <MoneyTable
          rows={[
            { label: "Total cost", amount: details.totalCost },
            { label: "Selling price", amount: details.sellingCost, bold: true },
            { label: "Price / watt", amount: details.pricePerWatt },
          ]}
        />
      </Panel>
      <BillingPanel billing={details.billing} />
      <Panel title="Cost breakdown">
        <MoneyTable
          rows={[
            { label: "Panels", amount: details.costOfPanels },
            { label: "Inverter base", amount: details.inverter.inverterBaseCost },
            { label: "AC cable", amount: details.inverter.inverterACCableCost },
            { label: "AC earth", amount: details.inverter.inverterACCableEarthCost },
            { label: "Circuit breaker", amount: details.inverter.inverterCircuitBreaker },
            { label: "VSN", amount: details.inverter.inverterVSNCost },
            { label: "Flexible", amount: details.inverter.inverterFlexibleCost },
            { label: "Mounting", amount: details.mountingStructureCost },
            { label: "Concrete footing", amount: details.concreteFootingCost },
            { label: "DC cable", amount: details.dcCableCost },
            { label: "DC earth", amount: details.dcEarthCableCost },
            { label: "Switch box", amount: details.switchBoxCost },
            { label: "Earth leakage", amount: details.earthLeakageCost },
            { label: "Earth", amount: details.earthCost },
            { label: "Fuse", amount: details.fuseCost },
            { label: "MC4", amount: details.mc4Cost },
            { label: "Labour", amount: details.labourCost },
            { label: "Transport", amount: details.transportationCost },
            { label: "Maintenance", amount: details.maintenanceCost },
            { label: "Utility checkup", amount: details.electricityCompanyCost },
            { label: "Cleaning tool", amount: details.cleaningToolPrice },
          ]}
        />
      </Panel>
    </div>
  );
}

function OffGridBody({ details }: { details: OffGridProposalDetails }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title="System">
        <div className="grid gap-2 sm:grid-cols-2">
          <Stat
            label="Grid connected"
            value={details.isConnectedToGrid ? "Yes" : "No"}
          />
          <Stat label="Batteries" value={details.numberOfBatteries} />
          <Stat label="Battery brand" value={details.battery.brand} />
          {!details.isConnectedToGrid ? (
            <>
              <Stat label="Panels" value={details.numberOfPanels} />
              <Stat label="Panel brand" value={details.panel.brand} />
            </>
          ) : null}
          <Stat label="Inverter" value={details.inverter.inverterInfo.brand} />
          <Stat
            label="Inverter capacity"
            value={`${details.inverter.inverterInfo.capacity} kW`}
          />
          <Stat label="Loads" value={details.deviceLoads.length} />
        </div>
      </Panel>
      <Panel title="Quotation">
        <MoneyTable
          rows={[
            { label: "Total cost", amount: details.totalCost },
            { label: "Selling price", amount: details.sellingCost, bold: true },
          ]}
        />
      </Panel>
      <BillingPanel billing={details.billing} />
      <Panel title="Cost breakdown">
        <MoneyTable
          rows={[
            { label: "Panels", amount: details.costOfPanels },
            { label: "Batteries", amount: details.batteriesCost },
            { label: "Battery cables", amount: details.batteryCableCosts },
            { label: "Battery stand", amount: details.batteryStandCost },
            {
              label: "Battery breaker",
              amount: details.batteryCircuitBreakerCost,
            },
            { label: "AC cable", amount: details.inverter.inverterACCableCost },
            {
              label: "AC earth",
              amount: details.inverter.inverterACCableEarthCost,
            },
            {
              label: "Circuit breaker",
              amount: details.inverter.inverterCircuitBreaker,
            },
            { label: "Mounting", amount: details.mountingStructureCost },
            { label: "DC cable", amount: details.dcCableCosts },
            { label: "Manual transfer", amount: details.manualTransferSwitchCost },
            { label: "Switch box", amount: details.switchBoxCost },
            { label: "Fuse", amount: details.fuseCost },
            { label: "MC4", amount: details.mc4Cost },
            { label: "Labour", amount: details.labourCost },
            { label: "Cleaning tool", amount: details.cleaningToolCost },
          ]}
        />
      </Panel>
      {details.deviceLoads.length > 0 ? (
        <Panel title="Device loads" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-(--secondary)">
                <tr>
                  <th className="px-2 py-1.5">Name</th>
                  <th className="px-2 py-1.5">Qty</th>
                  <th className="px-2 py-1.5">Power</th>
                  <th className="px-2 py-1.5">Hours</th>
                </tr>
              </thead>
              <tbody>
                {details.deviceLoads.map((load, index) => (
                  <tr key={`${load.name}-${index}`} className="border-t border-(--border)">
                    <td className="px-2 py-1.5">{load.name}</td>
                    <td className="px-2 py-1.5">{load.quantity}</td>
                    <td className="px-2 py-1.5">
                      {load.powerWatt} W
                      {load.unit === "hp" ? " (HP-based)" : ""}
                    </td>
                    <td className="px-2 py-1.5">
                      {load.workingHours ??
                        `am ${load.morningHours ?? 0} / pm ${load.eveningHours ?? 0}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      ) : null}
    </div>
  );
}

function SolarIrrigationBody({ details }: { details: SolarIrrigationProposalDetails }) {
  return (
    <Panel title="Irrigation">
      <div className="grid gap-2 sm:grid-cols-2">
        <Stat label="Pump capacity" value={`${details.pumpCapacity} HP`} />
        <Stat label="Estimated cost" value={formatMoney(details.cost)} />
      </div>
    </Panel>
  );
}

function SolarHeatingBody({ details }: { details: SolarHeatingProposalDetails }) {
  return (
    <Panel title="Heating">
      <div className="grid gap-2 sm:grid-cols-2">
        <Stat label="Type" value={details.type} />
        {details.numberOfRooms !== undefined ? (
          <Stat label="Rooms" value={details.numberOfRooms} />
        ) : null}
        {details.poolVolume !== undefined ? (
          <Stat label="Pool volume" value={`${details.poolVolume} m³`} />
        ) : null}
        <Stat label="Heater" value={details.heater?.brand ?? "—"} />
        <Stat
          label="Price"
          value={details.heater ? formatMoney(details.heater.price) : "—"}
        />
      </div>
    </Panel>
  );
}

function EvBody({ details }: { details: Partial<EVProposalDetails> & { charger?: EVProposalDetails["charger"] } }) {
  return (
    <Panel title="EV charger">
      <div className="grid gap-2 sm:grid-cols-2">
        <Stat
          label="Power"
          value={
            details.charger
              ? `${details.charger.power} kW`
              : details.chargingPower
                ? `${details.chargingPower} kW`
                : "—"
          }
        />
        <Stat
          label="Price"
          value={details.charger ? formatMoney(details.charger.price) : "—"}
        />
      </div>
    </Panel>
  );
}

function ConstructionBody({ details }: { details: ConstructionProposalDetails }) {
  if (details.type === "homeFinishing") {
    return (
      <Panel title="Home finishing">
        <div className="grid gap-2 sm:grid-cols-2">
          <Stat label="Finish" value={details.finishingType} />
          <Stat label="Estimated cost" value={formatMoney(details.cost)} />
        </div>
      </Panel>
    );
  }
  if (details.type === "solar-panel-installations") {
    return (
      <Panel title="Solar installation request">
        <Stat label="Plant size" value={`${details.plantSizeKws} kW`} />
        <p className="mt-3 text-sm text-(--muted-foreground)">
          Lead only — contact customer for a site quote.
        </p>
      </Panel>
    );
  }
  return (
    <Panel title="General contracting">
      <p className="whitespace-pre-wrap text-sm text-(--foreground)">{details.subject}</p>
    </Panel>
  );
}

function WholesaleBody({ details }: { details: WholeSaleProposalDetails }) {
  const order = details.order ?? {};
  const notes =
    typeof (order as { notes?: unknown }).notes === "string"
      ? (order as { notes: string }).notes
      : null;

  return (
    <Panel title="Wholesale request">
      {notes ? (
        <p className="whitespace-pre-wrap text-sm">{notes}</p>
      ) : (
        <pre className="overflow-x-auto rounded-lg bg-(--secondary) p-3 text-xs">
          {JSON.stringify(order, null, 2)}
        </pre>
      )}
    </Panel>
  );
}

function parseProposalPayload(raw: string): {
  proposalDetails: unknown;
  nested?: Record<string, unknown>;
} | null {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const obj = parsed as Record<string, unknown>;
    if ("proposalDetails" in obj) {
      return { proposalDetails: obj.proposalDetails, nested: obj };
    }
    return { proposalDetails: parsed };
  } catch {
    return null;
  }
}

export function ProposalDetailView({
  solutionSlug,
  proposalDetailsJson,
}: {
  solutionSlug: string;
  proposalDetailsJson: string;
}) {
  const parsed = parseProposalPayload(proposalDetailsJson);

  if (!parsed) {
    return (
      <Panel title="Proposal details">
        <p className="text-sm text-red-700">Could not parse proposal JSON.</p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-(--secondary) p-3 text-xs">
          {proposalDetailsJson}
        </pre>
      </Panel>
    );
  }

  const details = parsed.proposalDetails;

  let body: React.ReactNode;
  switch (solutionSlug) {
    case "grid-tied":
      body = <GridTiedBody details={details as GridTiedProposalDetails} />;
      break;
    case "off-grid":
      body = <OffGridBody details={details as OffGridProposalDetails} />;
      break;
    case "solar-irrigation":
      body = <SolarIrrigationBody details={details as SolarIrrigationProposalDetails} />;
      break;
    case "solar-heating":
      body = <SolarHeatingBody details={details as SolarHeatingProposalDetails} />;
      break;
    case "ev":
      body = <EvBody details={details as EVProposalDetails} />;
      break;
    case "construction":
      body = <ConstructionBody details={details as ConstructionProposalDetails} />;
      break;
    case "whole-sale":
      body = <WholesaleBody details={details as WholeSaleProposalDetails} />;
      break;
    default:
      body = (
        <Panel title="Proposal details">
          <pre className="overflow-x-auto rounded-lg bg-(--secondary) p-3 text-xs">
            {JSON.stringify(details, null, 2)}
          </pre>
        </Panel>
      );
  }

  return (
    <div className="space-y-4">
      {body}
      <details className="rounded-xl border border-(--border) bg-(--card) p-4 shadow-sm">
        <summary className="cursor-pointer text-sm font-semibold text-(--muted-foreground)">
          Raw proposal JSON
        </summary>
        <pre className="mt-3 max-h-96 overflow-auto rounded-lg bg-(--secondary) p-3 text-xs">
          {JSON.stringify(parsed.nested ?? parsed.proposalDetails, null, 2)}
        </pre>
      </details>
    </div>
  );
}

export function ProposalContactLinks({
  phoneNumber,
  email,
}: {
  phoneNumber: string;
  email?: string;
}) {
  return (
    <div className="flex flex-wrap gap-3 text-sm">
      <a className="font-medium text-(--primary) hover:underline" href={`tel:${phoneNumber}`}>
        Call {phoneNumber}
      </a>
      {email ? (
        <a className="font-medium text-(--primary) hover:underline" href={`mailto:${email}`}>
          Email {email}
        </a>
      ) : null}
      <a
        className="font-medium text-(--primary) hover:underline"
        href={`https://wa.me/${phoneNumber.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
      <Link href="/proposals" className="text-(--muted-foreground) hover:underline">
        ← All proposals
      </Link>
    </div>
  );
}
