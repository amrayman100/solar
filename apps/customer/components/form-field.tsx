"use client";

import { cloneElement, isValidElement, useId, type ReactElement, type ReactNode } from "react";

type ControlProps = {
  id?: string;
  required?: boolean;
  "aria-describedby"?: string;
  "aria-required"?: boolean;
};

export function FormField({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactElement<ControlProps>;
}) {
  const generatedId = useId();
  if (!isValidElement(children)) return null;

  const id = children.props.id ?? generatedId;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy = [children.props["aria-describedby"], hintId].filter(Boolean).join(" ");
  const control = cloneElement(children, {
    id,
    required: required ?? children.props.required,
    "aria-required": required || undefined,
    "aria-describedby": describedBy || undefined,
  });

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-[#123028]">
        {label}
        {required ? (
          <span className="ms-1 text-red-800" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {control}
      {hint ? (
        <p id={hintId} className="text-sm leading-snug text-[#1f3d32]">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function FormStep({
  step,
  title,
  hint,
  children,
}: {
  step: number;
  title: string;
  hint: string;
  children: ReactNode;
}) {
  const titleId = useId();
  return (
    <section
      aria-labelledby={titleId}
      className="space-y-4 rounded-xl border border-[#015231]/25 bg-white p-4"
    >
      <h3 id={titleId} className="flex items-center gap-2 text-base font-bold text-[#015231]">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#015231] text-sm font-bold text-white">
          {step}
        </span>
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-[#1f3d32]">{hint}</p>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
