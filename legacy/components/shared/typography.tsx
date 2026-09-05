import { cn } from "@/lib/utils";

type TypographyProps = {
  text: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function TypographyH1({ text, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {text}
    </h1>
  );
}

export function TypographyH2({ text, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight",
        className
      )}
    >
      {text}
    </h2>
  );
}

export function TypographyH3({ text, className }: TypographyProps) {
  return (
    <h3 className={cn("text-2xl font-semibold tracking-tight", className)}>
      {text}
    </h3>
  );
}

export function TypographyH4({ text, className }: TypographyProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {text}
    </h4>
  );
}

export function TypographyH4Light({ text, className }: TypographyProps) {
  return (
    <h4 className={cn("scroll-m-20 text-xl tracking-tight", className)}>
      {text}
    </h4>
  );
}

export function TypographyH5({ text, className }: TypographyProps) {
  return (
    <h5 className={cn("scroll-m-20 tracking-tight", className)}>{text}</h5>
  );
}
