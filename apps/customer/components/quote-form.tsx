"use client";

import { useMutation, useQuery } from "convex/react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { api } from "@convex/_generated/api";
import { Button } from "@bolt-energy/ui/components/button";
import { Input, Select, Textarea } from "@bolt-energy/ui/components/inputs";
import { computeProposal } from "@/lib/compute-proposal";
import { useRouter } from "@/i18n/navigation";
import type { DeviceLoad, DeviceLoadTemplate } from "@bolt-energy/models";
import { parseParametersJson } from "@bolt-energy/models";

type QuoteDefaults = {
  city?: string;
  monthlyConsumption?: string;
};

type Props = {
  slug: string;
  defaults?: QuoteDefaults;
  /** Use inside an already-styled product card — no outer grey panel. */
  variant?: "default" | "embedded";
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1 text-sm">
      <span className="font-medium">{label}</span>
      {children}
    </label>
  );
}

export function QuoteForm({ slug, defaults, variant = "default" }: Props) {
  const t = useTranslations("quote");
  const locale = useLocale();
  const router = useRouter();
  const solution = useQuery(api.proposals.getSolution, { slug });
  const createProposal = useMutation(api.proposals.createProposal);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState(defaults?.city ?? "");
  const [monthlyConsumption, setMonthlyConsumption] = useState(
    defaults?.monthlyConsumption ?? "800"
  );
  const [pumpCapacity, setPumpCapacity] = useState("10");
  const [isHousehold, setIsHousehold] = useState(true);
  const [numberOfRooms, setNumberOfRooms] = useState("4");
  const [poolVolume, setPoolVolume] = useState("25");
  const [chargerPower, setChargerPower] = useState("7");
  const [constructionType, setConstructionType] = useState("homeFinishing");
  const [finishingType, setFinishingType] = useState<"basic" | "premium" | "luxury">("basic");
  const [m2, setM2] = useState("150");
  const [plantSizeKws, setPlantSizeKws] = useState("10");
  const [subject, setSubject] = useState("");
  const [isConnectedToGrid, setIsConnectedToGrid] = useState(false);
  const [placeBatteriesIndoors, setPlaceBatteriesIndoors] = useState(true);
  const [loads, setLoads] = useState<DeviceLoad[]>([]);
  const [wholesaleNotes, setWholesaleNotes] = useState("");

  const templates = useMemo(() => {
    if (!solution) return [] as DeviceLoadTemplate[];
    try {
      const params = parseParametersJson<{
        deviceLoadTemplates?: DeviceLoadTemplate[];
      }>(solution.parametersJson);
      return params.deviceLoadTemplates ?? [];
    } catch {
      return [];
    }
  }, [solution]);

  if (solution === null || solution?.isEnabled === false) {
    return <p className="text-sm text-(--muted-foreground)">{t("disabled")}</p>;
  }

  return (
    <form
      className={
        variant === "embedded"
          ? "mx-auto w-full max-w-2xl space-y-4 text-start"
          : "space-y-4 rounded-[39px] border border-[#015231]/10 bg-[#f6f6f6] p-6 lg:p-8"
      }
      onSubmit={async (event) => {
        event.preventDefault();
        if (!solution) {
          setError("Still loading calculator settings. Please try again.");
          return;
        }
        setError("");
        setLoading(true);
        try {
          const details: Record<string, unknown> =
            slug === "grid-tied"
              ? { monthlyConsumption: Number(monthlyConsumption) }
              : slug === "off-grid"
                ? { isConnectedToGrid, placeBatteriesIndoors, deviceLoads: loads }
                : slug === "solar-irrigation"
                  ? { pumpCapacity: Number(pumpCapacity) }
                  : slug === "solar-heating"
                    ? {
                        isHousehold,
                        numberOfRooms: Number(numberOfRooms),
                        poolVolume: Number(poolVolume),
                      }
                    : slug === "ev"
                      ? { chargerPower: Number(chargerPower) }
                      : slug === "construction"
                        ? {
                            type: constructionType,
                            finishingType,
                            m2: Number(m2),
                            plantSizeKws: Number(plantSizeKws),
                            subject,
                          }
                        : { order: { notes: wholesaleNotes } };
          const computed = computeProposal(
            slug,
            parseParametersJson(solution.parametersJson),
            { name, phoneNumber, email: email || undefined, city, details }
          );
          const proposalId = await createProposal({
            solutionSlug: slug,
            customerName: name,
            phoneNumber,
            email: email || undefined,
            city: city || undefined,
            proposalDetailsJson: JSON.stringify(computed),
          });
          sessionStorage.setItem(`proposal-${proposalId}`, JSON.stringify(computed));
          router.push(`/proposal/${slug}/${proposalId}`);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to create proposal");
        } finally {
          setLoading(false);
        }
      }}
    >
      <h2
        className={`text-xl font-bold text-[#015231] lg:text-[24px] ${
          variant === "embedded" ? "text-center" : ""
        }`}
      >
        {t("title")}
      </h2>
      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      ) : null}
      {slug === "grid-tied" ? (
        <Field label={t("monthlyConsumption")}>
          <Input
            type="number"
            min={1}
            required
            value={monthlyConsumption}
            onChange={(event) => setMonthlyConsumption(event.target.value)}
          />
        </Field>
      ) : null}
      {slug === "solar-irrigation" ? (
        <Field label={t("pumpCapacity")}>
          <Input
            type="number"
            min={1}
            required
            value={pumpCapacity}
            onChange={(event) => setPumpCapacity(event.target.value)}
          />
        </Field>
      ) : null}
      {slug === "solar-heating" ? (
        <>
          <Select
            value={isHousehold ? "home" : "pool"}
            onChange={(event) => setIsHousehold(event.target.value === "home")}
          >
            <option value="home">{t("household")}</option>
            <option value="pool">{t("pool")}</option>
          </Select>
          {isHousehold ? (
            <Field label={t("rooms")}>
              <Input
                type="number"
                min={1}
                value={numberOfRooms}
                onChange={(event) => setNumberOfRooms(event.target.value)}
              />
            </Field>
          ) : (
            <Field label={t("poolVolume")}>
              <Input
                type="number"
                min={1}
                value={poolVolume}
                onChange={(event) => setPoolVolume(event.target.value)}
              />
            </Field>
          )}
        </>
      ) : null}
      {slug === "ev" ? (
        <Field label={t("chargerPower")}>
          <Select value={chargerPower} onChange={(event) => setChargerPower(event.target.value)}>
            <option value="7">7 kW</option>
            <option value="11">11 kW</option>
            <option value="22">22 kW</option>
          </Select>
        </Field>
      ) : null}
      {slug === "construction" ? (
        <>
          <Select value={constructionType} onChange={(event) => setConstructionType(event.target.value)}>
            <option value="homeFinishing">{t("finishing")}</option>
            <option value="solar-panel-installations">Solar installation</option>
            <option value="generalContracting">{t("contracting")}</option>
          </Select>
          {constructionType === "homeFinishing" ? (
            <>
              <Select
                value={finishingType}
                onChange={(event) =>
                  setFinishingType(event.target.value as "basic" | "premium" | "luxury")
                }
              >
                <option value="basic">{t("basic")}</option>
                <option value="premium">{t("premium")}</option>
                <option value="luxury">{t("luxury")}</option>
              </Select>
              <Field label={t("area")}>
                <Input type="number" min={1} value={m2} onChange={(event) => setM2(event.target.value)} />
              </Field>
            </>
          ) : null}
          {constructionType === "solar-panel-installations" ? (
            <Field label={t("plantSize")}>
              <Input
                type="number"
                min={1}
                value={plantSizeKws}
                onChange={(event) => setPlantSizeKws(event.target.value)}
              />
            </Field>
          ) : null}
          {constructionType === "generalContracting" ? (
            <Field label={t("subject")}>
              <Textarea value={subject} onChange={(event) => setSubject(event.target.value)} rows={4} />
            </Field>
          ) : null}
        </>
      ) : null}
      {slug === "off-grid" ? (
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isConnectedToGrid}
              onChange={(event) => setIsConnectedToGrid(event.target.checked)}
            />
            {t("connectedToGrid")}
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={placeBatteriesIndoors}
              onChange={(event) => setPlaceBatteriesIndoors(event.target.checked)}
            />
            {t("batteriesIndoors")}
          </label>
          <Select
            defaultValue=""
            onChange={(event) => {
              const template = templates.find((row) => row.name === event.target.value);
              if (!template) return;
              setLoads((current) => [
                ...current,
                {
                  ...template,
                  quantity: 1,
                  workingHours: 4,
                  isCustom: false,
                },
              ]);
            }}
          >
            <option value="">{t("addLoad")}</option>
            {templates.map((template) => (
              <option key={template.name} value={template.name}>
                {template.name}
              </option>
            ))}
          </Select>
          {loads.map((load, index) => (
            <div key={`${load.name}-${index}`} className="grid grid-cols-3 gap-2 text-sm">
              <span className="col-span-1 self-center">{load.name}</span>
              <Input
                type="number"
                min={1}
                value={load.quantity}
                onChange={(event) => {
                  const quantity = Number(event.target.value);
                  setLoads((current) =>
                    current.map((row, rowIndex) =>
                      rowIndex === index ? { ...row, quantity } : row
                    )
                  );
                }}
              />
              <button
                type="button"
                className="text-(--destructive)"
                onClick={() => setLoads((current) => current.filter((_, rowIndex) => rowIndex !== index))}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : null}
      {slug === "whole-sale" ? (
        <Field label={t("subject")}>
          <Textarea
            rows={5}
            value={wholesaleNotes}
            onChange={(event) => setWholesaleNotes(event.target.value)}
          />
        </Field>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={t("name")}>
          <Input required value={name} onChange={(event) => setName(event.target.value)} />
        </Field>
        <Field label={t("phone")}>
          <Input required value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
        </Field>
        <Field label={t("email")}>
          <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </Field>
        <Field label={t("city")}>
          <Input required value={city} onChange={(event) => setCity(event.target.value)} />
        </Field>
      </div>
      <Button
        type="submit"
        disabled={loading || !solution}
        className="h-[39px] w-full rounded-[8px] bg-[#00bd70] text-base font-bold text-white hover:bg-[#00bd70]/90"
      >
        {loading ? "…" : t("submit")}
      </Button>
      <p className="text-xs text-(--muted-foreground)">{locale === "ar" ? "الأسعار استرشادية." : "Indicative pricing only."}</p>
    </form>
  );
}
