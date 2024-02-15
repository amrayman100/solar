"use client";
import { DirectionProvider } from "@radix-ui/react-direction";

export function RTLProvider({ children }: { children: React.ReactNode }) {
  return <DirectionProvider dir="ltr">{children}</DirectionProvider>;
}
