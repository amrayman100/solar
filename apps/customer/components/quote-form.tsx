"use client";

import { useMutation, useQuery } from "convex/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { api } from "@convex/_generated/api";
import { Button } from "@bolt-energy/ui/components/button";
import { Input, Select, Textarea } from "@bolt-energy/ui/components/inputs";
import { computeProposal } from "@/lib/compute-proposal";
import { useRouter } from "@/i18n/navigation";
import type { DeviceLoad, DeviceLoadTemplate } from "@bolt-energy/models";
import { parseParametersJson } from "@bolt-energy/models";
import { FormField, FormStep } from "@/components/form-field";

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

type LoadRow = DeviceLoad & { rowId: string };

const KNOWN_DEVICES = new Set([
  "lamp",
  "socket",
  "router",
  "tv",
  "fridge",
  "ac",
  "ac-inverter",
  "fan",
  "motor",
  "shutter",
  "waterHeater",
  "camera",
]);

const submitClassName =
  "h-12 w-full rounded-lg bg-[#015231] text-base font-bold text-white hover:bg-[#014028] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015231] focus-visible:ring-offset-2";

function toDeviceLoad(row: LoadRow): DeviceLoad {
  const { rowId: _rowId, ...load } = row;
  return load;
}

export function QuoteForm({ slug, defaults, variant = "default" }: Props) {
  const t = useTranslations("quote");
  const devices = useTranslations("quote.devices");
  const locale = useLocale();
  const router = useRouter();
  const solution = useQuery(api.proposals.getSolution, { slug });
  const createProposal = useMutation(api.proposals.createProposal);
  const formRef = useRef<HTMLFormElement>(null);
  const headingId = useId();
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
  const [loads, setLoads] = useState<LoadRow[]>([]);
  const [deviceToAdd, setDeviceToAdd] = useState("");
  const [wholesaleNotes, setWholesaleNotes] = useState("");
  const rowCounter = useRef(0);

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

  useEffect(() => {
    if (!error) return;
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    formRef.current?.querySelector<HTMLElement>("[data-quote-heading]")?.focus({ preventScroll: true });
  }, [error]);

  function deviceLabel(name: string) {
    return KNOWN_DEVICES.has(name) ? devices(name) : name;
  }

  function deviceSize(template: DeviceLoadTemplate) {
    if (template.unit === "hp") {
      const hp = template.powerWatt / 745;
      return t("deviceHp", {
        hp: new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(hp),
      });
    }
    return t("deviceWatts", {
      watts: new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(template.powerWatt),
    });
  }

  function updateLoad(rowId: string, patch: Partial<DeviceLoad>) {
    setLoads((current) =>
      current.map((row) => (row.rowId === rowId ? { ...row, ...patch } : row))
    );
  }

  if (solution === null || solution?.isEnabled === false) {
    return <p className="text-sm font-medium text-[#123028]">{t("disabled")}</p>;
  }

  const contactStep = slug === "off-grid" ? 3 : 2;

  return (
    <form
      ref={formRef}
      aria-labelledby={headingId}
      className={
        variant === "embedded"
          ? "mx-auto w-full max-w-2xl scroll-mt-24 space-y-4 text-start"
          : "scroll-mt-24 space-y-4 rounded-[39px] border border-[#015231]/15 bg-[#f6f6f6] p-4 sm:p-6 lg:p-8"
      }
      onSubmit={async (event) => {
        event.preventDefault();
        if (!solution) {
          setError(t("loadingSettings"));
          return;
        }
        if (slug === "off-grid") {
          if (loads.length === 0) {
            setError(t("noDevices"));
            return;
          }
          const missingQuantity = loads.some((load) => !load.quantity || load.quantity < 1);
          if (missingQuantity) {
            setError(t("quantityRequired"));
            return;
          }
          const missingHours = loads.some((load) => {
            if (isConnectedToGrid) return (load.workingHours ?? 0) <= 0;
            return (load.morningHours ?? 0) + (load.eveningHours ?? 0) <= 0;
          });
          if (missingHours) {
            setError(t("zeroHours"));
            return;
          }
        }
        setError("");
        setLoading(true);
        try {
          const details: Record<string, unknown> =
            slug === "grid-tied"
              ? { monthlyConsumption: Number(monthlyConsumption) }
              : slug === "off-grid"
                ? {
                    isConnectedToGrid,
                    placeBatteriesIndoors,
                    deviceLoads: loads.map(toDeviceLoad),
                  }
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
          setError(err instanceof Error ? err.message : t("failed"));
        } finally {
          setLoading(false);
        }
      }}
    >
      <div className="space-y-2">
        <h2
          id={headingId}
          data-quote-heading
          tabIndex={-1}
          className={`text-xl font-bold text-[#015231] outline-none lg:text-2xl ${
            variant === "embedded" ? "text-center" : ""
          }`}
        >
          {t("title")}
        </h2>
        <p className={`text-sm leading-relaxed text-[#1f3d32] ${variant === "embedded" ? "text-center" : ""}`}>
          {t("intro")}
        </p>
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-md border border-red-800 bg-red-50 px-3 py-2 text-sm font-medium text-red-900"
        >
          {error}
        </p>
      ) : null}

      {slug === "off-grid" ? (
        <>
          <FormStep step={1} title={t("stepSite")} hint={t("stepSiteHint")}>
            <label className="flex min-h-11 items-start gap-3 rounded-md border border-[#015231]/20 bg-[#f7fbf9] p-3 text-[#123028]">
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 accent-[#015231]"
                checked={isConnectedToGrid}
                onChange={(event) => setIsConnectedToGrid(event.target.checked)}
              />
              <span>
                <span className="block text-sm font-semibold">{t("connectedToGrid")}</span>
                <span className="mt-1 block text-sm font-normal leading-snug text-[#1f3d32]">
                  {t("connectedToGridHint")}
                </span>
              </span>
            </label>
            <label className="flex min-h-11 items-start gap-3 rounded-md border border-[#015231]/20 bg-[#f7fbf9] p-3 text-[#123028]">
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 accent-[#015231]"
                checked={placeBatteriesIndoors}
                onChange={(event) => setPlaceBatteriesIndoors(event.target.checked)}
              />
              <span>
                <span className="block text-sm font-semibold">{t("batteriesIndoors")}</span>
                <span className="mt-1 block text-sm font-normal leading-snug text-[#1f3d32]">
                  {t("batteriesIndoorsHint")}
                </span>
              </span>
            </label>
          </FormStep>

          <FormStep step={2} title={t("stepLoads")} hint={t("stepLoadsHint")}>
            <FormField label={t("chooseDevice")} hint={t("chooseDeviceHint")}>
              <Select
                value={deviceToAdd}
                onChange={(event) => {
                  const template = templates.find((row) => row.name === event.target.value);
                  setDeviceToAdd("");
                  if (!template) return;
                  rowCounter.current += 1;
                  setLoads((current) => [
                    ...current,
                    {
                      ...template,
                      rowId: `${template.name}-${rowCounter.current}`,
                      quantity: 1,
                      workingHours: 4,
                      morningHours: 2,
                      eveningHours: 4,
                      isCustom: false,
                    },
                  ]);
                }}
              >
                <option value="">{t("chooseDevicePlaceholder")}</option>
                {templates.map((template) => (
                  <option key={template.name} value={template.name}>
                    {deviceLabel(template.name)} — {deviceSize(template)}
                  </option>
                ))}
              </Select>
            </FormField>

            {loads.length === 0 ? (
              <p className="text-sm text-[#1f3d32]">{t("emptyLoads")}</p>
            ) : (
              <ul className="space-y-3">
                {loads.map((load) => (
                  <li
                    key={load.rowId}
                    className="space-y-3 rounded-lg border border-[#015231]/20 bg-[#f7fbf9] p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold text-[#123028]">{deviceLabel(load.name)}</p>
                        <p className="text-sm text-[#1f3d32]">{deviceSize(load)}</p>
                      </div>
                      <button
                        type="button"
                        className="inline-flex min-h-11 items-center justify-center rounded-md border border-red-800 px-3 text-sm font-semibold text-red-800 hover:bg-red-50"
                        aria-label={t("removeDevice", { name: deviceLabel(load.name) })}
                        onClick={() =>
                          setLoads((current) => current.filter((row) => row.rowId !== load.rowId))
                        }
                      >
                        {t("remove")}
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <FormField label={t("quantity")} hint={t("quantityHint")} required>
                        <Input
                          type="number"
                          inputMode="numeric"
                          min={1}
                          value={load.quantity}
                          onChange={(event) =>
                            updateLoad(load.rowId, { quantity: Number(event.target.value) })
                          }
                        />
                      </FormField>
                      {isConnectedToGrid ? (
                        <FormField label={t("hoursPerDay")} hint={t("hoursPerDayHint")} required>
                          <Input
                            type="number"
                            inputMode="decimal"
                            min={0}
                            max={24}
                            step={0.5}
                            value={load.workingHours ?? 0}
                            onChange={(event) =>
                              updateLoad(load.rowId, { workingHours: Number(event.target.value) })
                            }
                          />
                        </FormField>
                      ) : (
                        <>
                          <FormField label={t("daytimeHours")} hint={t("daytimeHoursHint")} required>
                            <Input
                              type="number"
                              inputMode="decimal"
                              min={0}
                              max={24}
                              step={0.5}
                              value={load.morningHours ?? 0}
                              onChange={(event) =>
                                updateLoad(load.rowId, { morningHours: Number(event.target.value) })
                              }
                            />
                          </FormField>
                          <FormField label={t("eveningHours")} hint={t("eveningHoursHint")} required>
                            <Input
                              type="number"
                              inputMode="decimal"
                              min={0}
                              max={24}
                              step={0.5}
                              value={load.eveningHours ?? 0}
                              onChange={(event) =>
                                updateLoad(load.rowId, { eveningHours: Number(event.target.value) })
                              }
                            />
                          </FormField>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </FormStep>
        </>
      ) : (
        <FormStep step={1} title={t("stepSystem")} hint={t("stepSystemHint")}>
          {slug === "grid-tied" ? (
            <FormField label={t("monthlyConsumption")} hint={t("monthlyConsumptionHint")} required>
              <Input
                type="number"
                inputMode="decimal"
                min={1}
                value={monthlyConsumption}
                onChange={(event) => setMonthlyConsumption(event.target.value)}
              />
            </FormField>
          ) : null}
          {slug === "solar-irrigation" ? (
            <FormField label={t("pumpCapacity")} hint={t("pumpCapacityHint")} required>
              <Input
                type="number"
                inputMode="decimal"
                min={1}
                value={pumpCapacity}
                onChange={(event) => setPumpCapacity(event.target.value)}
              />
            </FormField>
          ) : null}
          {slug === "solar-heating" ? (
            <>
              <FormField label={t("heatingUse")} hint={t("heatingUseHint")} required>
                <Select
                  value={isHousehold ? "home" : "pool"}
                  onChange={(event) => setIsHousehold(event.target.value === "home")}
                >
                  <option value="home">{t("household")}</option>
                  <option value="pool">{t("pool")}</option>
                </Select>
              </FormField>
              {isHousehold ? (
                <FormField label={t("rooms")} hint={t("roomsHint")} required>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    value={numberOfRooms}
                    onChange={(event) => setNumberOfRooms(event.target.value)}
                  />
                </FormField>
              ) : (
                <FormField label={t("poolVolume")} hint={t("poolVolumeHint")} required>
                  <Input
                    type="number"
                    inputMode="decimal"
                    min={1}
                    value={poolVolume}
                    onChange={(event) => setPoolVolume(event.target.value)}
                  />
                </FormField>
              )}
            </>
          ) : null}
          {slug === "ev" ? (
            <FormField label={t("chargerPower")} hint={t("chargerPowerHint")} required>
              <Select value={chargerPower} onChange={(event) => setChargerPower(event.target.value)}>
                <option value="7">{t("charger7")}</option>
                <option value="11">{t("charger11")}</option>
                <option value="22">{t("charger22")}</option>
              </Select>
            </FormField>
          ) : null}
          {slug === "construction" ? (
            <>
              <FormField label={t("workType")} hint={t("workTypeHint")} required>
                <Select
                  value={constructionType}
                  onChange={(event) => setConstructionType(event.target.value)}
                >
                  <option value="homeFinishing">{t("finishing")}</option>
                  <option value="solar-panel-installations">{t("solarInstall")}</option>
                  <option value="generalContracting">{t("contracting")}</option>
                </Select>
              </FormField>
              {constructionType === "homeFinishing" ? (
                <>
                  <FormField label={t("finishingLevel")} hint={t("finishingLevelHint")} required>
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
                  </FormField>
                  <FormField label={t("area")} hint={t("areaHint")} required>
                    <Input
                      type="number"
                      inputMode="decimal"
                      min={1}
                      value={m2}
                      onChange={(event) => setM2(event.target.value)}
                    />
                  </FormField>
                </>
              ) : null}
              {constructionType === "solar-panel-installations" ? (
                <FormField label={t("plantSize")} hint={t("plantSizeHint")} required>
                  <Input
                    type="number"
                    inputMode="decimal"
                    min={1}
                    value={plantSizeKws}
                    onChange={(event) => setPlantSizeKws(event.target.value)}
                  />
                </FormField>
              ) : null}
              {constructionType === "generalContracting" ? (
                <FormField label={t("subject")} hint={t("subjectHint")} required>
                  <Textarea
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    rows={4}
                  />
                </FormField>
              ) : null}
            </>
          ) : null}
          {slug === "whole-sale" ? (
            <FormField label={t("subject")} hint={t("wholesaleHint")} required>
              <Textarea
                rows={5}
                value={wholesaleNotes}
                onChange={(event) => setWholesaleNotes(event.target.value)}
              />
            </FormField>
          ) : null}
        </FormStep>
      )}

      <FormStep step={contactStep} title={t("stepContact")} hint={t("stepContactHint")}>
        <p className="text-sm text-[#1f3d32]">{t("requiredNote")}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label={t("name")} hint={t("nameHint")} required>
            <Input
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormField>
          <FormField label={t("phone")} hint={t("phoneHint")} required>
            <Input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </FormField>
          <FormField label={t("email")} hint={t("emailHint")}>
            <Input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormField>
          <FormField label={t("city")} required>
            <Input
              autoComplete="address-level2"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </FormField>
        </div>
      </FormStep>

      <Button type="submit" disabled={loading || !solution} className={submitClassName}>
        {loading ? t("submitting") : t("submit")}
      </Button>
      <p className="text-sm leading-snug text-[#1f3d32]">{t("indicative")}</p>
    </form>
  );
}
