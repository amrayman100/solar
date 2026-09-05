"use client";

import React from "react";
import { cn } from "../lib/utils";

type BaseProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const Input = React.forwardRef<HTMLInputElement, BaseProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base text-gray-900 shadow-sm",
        "focus:border-(--ring) focus:ring-(--ring) focus:outline-none",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base text-gray-900 shadow-sm",
        "focus:border-(--ring) focus:ring-(--ring) focus:outline-none",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "h-11 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base text-gray-900 shadow-sm",
        "focus:border-(--ring) focus:ring-(--ring) focus:outline-none",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";

