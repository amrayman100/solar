"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  calculateCumulativeSavings,
  type ConstructionProposal,
  type EVProposal,
  type GridTiedProposal,
  type OffGridProposal,
  type SolarHeatingProposal,
  type SolarIrrigationProposal,
  type WholeSaleProposal,
} from "@bolt-energy/models";
import { Link } from "@/i18n/navigation";
import { formatEgp } from "@/lib/money";

function formatAmount(value: number, locale: string) {
  return formatEgp(value, locale);
}

function Card({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-(--border) bg-white p-4 text-(--foreground) shadow-sm ${className}`}
    >
      <h3 className="mb-3 text-lg font-bold text-(--primary)">{title}</h3>
      {children}
    </div>
  );
}

function AmountTable({
  rows,
  locale,
  amountLabel,
}: {
  rows: Array<{ label: string; amount: number; bold?: boolean }>;
  locale: string;
  amountLabel: string;
}) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-(--border)">
          <th className="py-2 text-start font-medium" />
          <th className="py-2 text-end font-medium">{amountLabel}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="border-b border-(--border)/60 last:border-0">
            <td className={`py-2 ${row.bold ? "font-bold" : "font-medium"}`}>{row.label}</td>
            <td className={`py-2 text-end ${row.bold ? "font-bold" : ""}`}>
              {formatAmount(row.amount, locale)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function HeroShell({
  backgroundImage,
  title,
  children,
}: {
  backgroundImage?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="relative bg-cover bg-center pb-10"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
    >
      <div className="absolute inset-0 bg-[#015231]/75" />
      <div className="relative mx-auto max-w-6xl px-4 pt-8">
        <h1 className="mb-6 text-3xl font-bold text-white lg:text-4xl">{title}</h1>
        <div className="flex flex-col justify-center gap-6 lg:flex-row">{children}</div>
      </div>
    </section>
  );
}

export function ViewGridTiedProposal({ proposal }: { proposal: GridTiedProposal }) {
  const t = useTranslations("quote");
  const locale = useLocale();
  const details = proposal.proposalDetails;
  const firstYearMonthlyBill = details.firstYearMonthlyBill;

  const billChartData = [
    { name: t("oldBill"), Amount: details.currentMonthlyBill },
    {
      name: t("newBill"),
      Amount: firstYearMonthlyBill < 0 ? 0 : Math.round(firstYearMonthlyBill),
    },
  ];

  const savingsChartData = [
    { name: t("year1"), Savings: details.firstYearSavings },
    {
      name: t("year5"),
      Savings: calculateCumulativeSavings(
        5,
        details.firstYearSavings,
        details.panelDegradation,
        details.tarifEscalation
      ),
    },
    {
      name: t("year10"),
      Savings: calculateCumulativeSavings(
        10,
        details.firstYearSavings,
        details.panelDegradation,
        details.tarifEscalation
      ),
    },
    {
      name: t("year15"),
      Savings: calculateCumulativeSavings(
        15,
        details.firstYearSavings,
        details.panelDegradation,
        details.tarifEscalation
      ),
    },
    {
      name: t("year20"),
      Savings: calculateCumulativeSavings(
        20,
        details.firstYearSavings,
        details.panelDegradation,
        details.tarifEscalation
      ),
    },
    {
      name: t("year25"),
      Savings: calculateCumulativeSavings(
        25,
        details.firstYearSavings,
        details.panelDegradation,
        details.tarifEscalation
      ),
    },
  ];

  return (
    <div>
      <HeroShell backgroundImage="/drone-4.jpeg" title={t("preliminarySolution")}>
        <Card title={t("solarPanels")}>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            <div className="text-center">
              <p className="text-sm text-(--muted-foreground)">{t("systemSize")}</p>
              <p className="text-2xl font-bold">{details.systemSize} kW</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-(--muted-foreground)">{t("numberOfPanels")}</p>
              <p className="text-2xl font-bold">{details.numberOfPanels}</p>
            </div>
          </div>
        </Card>
        <Card title={t("inverter")}>
          <p className="font-bold">{details.inverter.inverterInfo.brand}</p>
          <p className="mt-2 text-sm">
            <span className="font-bold">{details.inverter.inverterInfo.capacity} kW </span>
            {t("totalInverterRating")}
          </p>
        </Card>
        <div className="space-y-4">
          <Card title={t("quotation")}>
            <AmountTable
              locale={locale}
              amountLabel={t("amountEgp")}
              rows={[
                {
                  label: t("totalSystemPrice"),
                  amount: details.sellingCost,
                  bold: true,
                },
              ]}
            />
            <p className="mt-2 text-xs text-(--muted-foreground)">{t("utilityMeterNote")}</p>
          </Card>
          <Card title={t("paymentMilestones")}>
            <AmountTable
              locale={locale}
              amountLabel={t("amountEgp")}
              rows={[
                { label: t("downPayment"), amount: details.billing.downPaymentFee },
                {
                  label: t("componentsSupply"),
                  amount: details.billing.componentsSupplyFee,
                },
                { label: t("installation"), amount: details.billing.installationFee },
                { label: t("commissioning"), amount: details.billing.commissionFee },
              ]}
            />
          </Card>
          <Card title={t("backupStorage")}>
            <Link
              href="/proposal/off-grid"
              className="font-bold text-(--primary) underline-offset-2 hover:underline"
            >
              {t("backupStorageCta")}
            </Link>
          </Card>
        </div>
      </HeroShell>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-6 text-2xl font-bold text-(--primary)">{t("billSavings")}</h2>
        <div className="flex flex-col gap-6 lg:flex-row">
          <Card title={t("firstYearMonthlySavings")} className="flex-1">
            <div className="h-[268px] w-full">
              <ResponsiveContainer>
                <BarChart data={billChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <Tooltip formatter={(value) => `${Number(value).toLocaleString()} EGP`} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => Number(value).toLocaleString()} />
                  <Bar
                    dataKey="Amount"
                    fill="#82ca9d"
                    activeBar={<Rectangle fill="gold" stroke="purple" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title={t("cumulativeSavings")} className="flex-1">
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <ComposedChart
                  data={savingsChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <Tooltip formatter={(value) => `${Number(value).toLocaleString()} EGP`} />
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" scale="band" />
                  <YAxis tickFormatter={(value) => Number(value).toLocaleString()} />
                  <Bar dataKey="Savings" barSize={20} fill="#413ea0" />
                  <Line
                    tooltipType="none"
                    type="monotone"
                    dataKey="Savings"
                    stroke="#ff7300"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

export function ViewOffGridProposal({ proposal }: { proposal: OffGridProposal }) {
  const t = useTranslations("quote");
  const locale = useLocale();
  const details = proposal.proposalDetails;

  return (
    <HeroShell backgroundImage="/drone-2.jpg" title={t("preliminarySolution")}>
      <Card title={t("battery")}>
        <p className="text-sm">
          {t("numberOfBatteries")}:{" "}
          <span className="font-bold">{details.numberOfBatteries}</span>
        </p>
      </Card>
      {!details.isConnectedToGrid ? (
        <Card title={t("panel")}>
          <p className="font-bold">{details.panel.brand}</p>
          <p className="mt-2 text-sm">
            {t("numberOfPanels")}: <span className="font-bold">{details.numberOfPanels}</span>
          </p>
        </Card>
      ) : null}
      <Card title={t("inverter")}>
        <p className="font-bold">{details.inverter.inverterInfo.brand}</p>
        <p className="mt-2 text-sm">
          <span className="font-bold">{details.inverter.inverterInfo.capacity} kW </span>
          {t("totalInverterRating")}
        </p>
      </Card>
      <div className="space-y-4">
        <Card title={t("quotation")}>
          <AmountTable
            locale={locale}
            amountLabel={t("amountEgp")}
            rows={[{ label: t("price"), amount: details.sellingCost, bold: true }]}
          />
        </Card>
        <Card title={t("paymentMilestones")}>
          <AmountTable
            locale={locale}
            amountLabel={t("amountEgp")}
            rows={[
              { label: t("downPayment"), amount: details.billing.downPaymentFee },
              {
                label: t("componentsSupply"),
                amount: details.billing.componentsSupplyFee,
              },
              { label: t("installation"), amount: details.billing.installationFee },
              { label: t("commissioning"), amount: details.billing.commissionFee },
            ]}
          />
        </Card>
      </div>
    </HeroShell>
  );
}

export function ViewSolarIrrigationProposal({
  proposal,
}: {
  proposal: SolarIrrigationProposal;
}) {
  const t = useTranslations("quote");
  const locale = useLocale();
  const details = proposal.proposalDetails;

  return (
    <HeroShell backgroundImage="/drone-7.jpeg" title={t("preliminarySolution")}>
      <Card title={t("irrigationUnit")}>
        <p className="text-sm">
          {t("price")}:{" "}
          <span className="font-bold">{formatAmount(details.cost, locale)}</span>
        </p>
      </Card>
      <Card title={t("pumpCapacityLabel")}>
        <p className="text-center text-2xl font-bold">{details.pumpCapacity} HP</p>
      </Card>
    </HeroShell>
  );
}

export function ViewSolarHeatingProposal({
  proposal,
}: {
  proposal: SolarHeatingProposal;
}) {
  const t = useTranslations("quote");
  const locale = useLocale();
  const details = proposal.proposalDetails;

  if (details.type === "house-hold") {
    return (
      <HeroShell title={t("householdHeatingSolution")}>
        {details.heater ? (
          <>
            <Card title={t("heater")}>
              <p className="font-bold">{details.heater.brand}</p>
              <p className="mt-2 text-sm">
                {t("price")}:{" "}
                <span className="font-bold">{formatAmount(details.heater.price, locale)}</span>
              </p>
            </Card>
            <Card title={t("rooms")}>
              <p className="font-bold">
                {(details.numberOfRooms ?? 0).toString()} {t("bathroomsAndKitchens")}
              </p>
            </Card>
          </>
        ) : (
          <Card title={t("heater")}>
            <p>{t("noMatchingHeater")}</p>
          </Card>
        )}
      </HeroShell>
    );
  }

  return (
    <HeroShell title={t("poolHeatingSolution")}>
      {details.heater ? (
        <>
          <Card title={t("heater")} className="lg:w-1/3">
            <p className="font-bold">{details.heater.brand}</p>
            <p className="mt-2 text-sm">
              {t("price")}:{" "}
              <span className="font-bold">{formatAmount(details.heater.price, locale)}</span>
            </p>
            <p className="mt-2 text-xs text-(--muted-foreground)">{t("priceMayVary")}</p>
          </Card>
          <Card title={t("poolVolume")} className="lg:w-1/3">
            <p className="text-2xl font-bold">{details.poolVolume ?? 0} m³</p>
          </Card>
        </>
      ) : (
        <Card title={t("heater")}>
          <p>{t("noMatchingHeater")}</p>
        </Card>
      )}
    </HeroShell>
  );
}

export function ViewEvProposal({ proposal }: { proposal: EVProposal }) {
  const t = useTranslations("quote");
  const locale = useLocale();
  const charger = proposal.proposalDetails.charger;

  return (
    <HeroShell title={t("evChargingSolution")}>
      {charger ? (
        <Card title={t("charger")}>
          <p className="font-bold">{charger.power} kW</p>
          <p className="mt-2 text-sm">
            {t("price")}:{" "}
            <span className="font-bold">{formatAmount(charger.price, locale)}</span>
          </p>
        </Card>
      ) : (
        <Card title={t("charger")}>
          <p>{t("noMatchingCharger")}</p>
        </Card>
      )}
    </HeroShell>
  );
}

export function ViewConstructionProposal({
  proposal,
}: {
  proposal: ConstructionProposal;
}) {
  const t = useTranslations("quote");
  const locale = useLocale();
  const details = proposal.proposalDetails;

  return (
    <HeroShell title={t("preliminarySolution")}>
      {details.type === "homeFinishing" ? (
        <Card title={t("finishing")}>
          <p className="text-sm">
            {t("price")}:{" "}
            <span className="font-bold">{formatAmount(details.cost, locale)}</span>
          </p>
        </Card>
      ) : (
        <Card title={t("contactSoon")}>
          <p className="text-sm text-(--muted-foreground)">{t("contactSoonBody")}</p>
        </Card>
      )}
    </HeroShell>
  );
}

export function ViewWholeSaleProposal({ proposal: _proposal }: { proposal: WholeSaleProposal }) {
  const t = useTranslations("quote");

  return (
    <HeroShell backgroundImage="/drone-6.jpeg" title={t("wholesaleOrder")}>
      <Card title={t("requestReceived")}>
        <p className="text-sm text-(--muted-foreground)">{t("wholesaleThanks")}</p>
      </Card>
    </HeroShell>
  );
}

export function ProposalResultView({
  slug,
  proposal,
}: {
  slug: string;
  proposal: unknown;
}) {
  if (!proposal || typeof proposal !== "object") return null;
  const value = proposal as { proposalDetails?: unknown };
  if (!value.proposalDetails) return null;

  switch (slug) {
    case "grid-tied":
      return <ViewGridTiedProposal proposal={proposal as GridTiedProposal} />;
    case "off-grid":
      return <ViewOffGridProposal proposal={proposal as OffGridProposal} />;
    case "solar-irrigation":
      return <ViewSolarIrrigationProposal proposal={proposal as SolarIrrigationProposal} />;
    case "solar-heating":
      return <ViewSolarHeatingProposal proposal={proposal as SolarHeatingProposal} />;
    case "ev":
      return <ViewEvProposal proposal={proposal as EVProposal} />;
    case "construction":
      return <ViewConstructionProposal proposal={proposal as ConstructionProposal} />;
    case "whole-sale":
      return <ViewWholeSaleProposal proposal={proposal as WholeSaleProposal} />;
    default:
      return null;
  }
}
