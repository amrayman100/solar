import type { ButtonHTMLAttributes } from "react"
import { cn } from "../lib/utils"

export function Button(props: Readonly<ButtonHTMLAttributes<HTMLButtonElement>>) {
  const { className, ...rest } = props
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md h-10 px-4 py-2",
        "text-sm font-semibold leading-none tracking-tight antialiased",
        "bg-(--primary) text-(--primary-foreground)",
        "hover:opacity-90 transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2",
        className
      )}
      {...rest}
    />
  )
}
