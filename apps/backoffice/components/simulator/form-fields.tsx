"use client";

import { Input, Select } from "@bolt-energy/ui/components/inputs";

type FieldLike = {
  name: string;
  state: {
    value: unknown;
    meta: { errors: unknown };
  };
  handleBlur: () => void;
  handleChange: (value: never) => void;
};

export function FieldLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium text-(--foreground)">
      {children}
    </label>
  );
}

export function FieldShell({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: unknown;
}) {
  const message = Array.isArray(error)
    ? error.map(String).filter(Boolean).join(", ")
    : error
      ? String(error)
      : "";
  return (
    <div className="space-y-1">
      <FieldLabel>{label}</FieldLabel>
      {children}
      {message ? <p className="text-xs text-red-600">{message}</p> : null}
    </div>
  );
}

export function FieldInput({
  field,
  label,
  type = "text",
  step,
}: {
  field: FieldLike;
  label: string;
  type?: "text" | "number";
  step?: string;
}) {
  return (
    <FieldShell label={label} error={field.state.meta.errors}>
      <Input
        id={field.name}
        name={field.name}
        type={type}
        step={step}
        value={
          field.state.value === undefined || field.state.value === null
            ? ""
            : String(field.state.value)
        }
        onBlur={field.handleBlur}
        onChange={(event) => {
          if (type === "number") {
            const next = event.target.value;
            field.handleChange(
              (next === "" ? Number.NaN : event.target.valueAsNumber) as never
            );
          } else {
            field.handleChange(event.target.value as never);
          }
        }}
      />
    </FieldShell>
  );
}

export function FieldSelect({
  field,
  label,
  children,
}: {
  field: FieldLike;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <FieldShell label={label} error={field.state.meta.errors}>
      <Select
        id={field.name}
        name={field.name}
        value={String(field.state.value ?? "")}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value as never)}
      >
        {children}
      </Select>
    </FieldShell>
  );
}

export function SectionCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4 rounded-xl border border-(--border) bg-(--card) p-4 shadow-sm">
      {title ? <h3 className="text-base font-semibold text-(--foreground)">{title}</h3> : null}
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </div>
  );
}

export function SectionTabs<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: readonly { id: T; label: string }[];
  value: T;
  onChange: (next: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            value === tab.id
              ? "bg-(--primary) text-(--primary-foreground)"
              : "bg-(--secondary) text-(--secondary-foreground) hover:opacity-90"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function ResultRows({
  rows,
}: {
  rows: readonly { label: string; value: string | number }[];
}) {
  return (
    <dl className="grid gap-2 sm:grid-cols-2">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-baseline justify-between gap-3 rounded-lg border border-(--border) px-3 py-2 text-sm"
        >
          <dt className="text-(--muted-foreground)">{row.label}</dt>
          <dd className="font-medium text-(--foreground)">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
