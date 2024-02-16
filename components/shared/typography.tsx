type TypographyProps = { text: string };

export function TypographyH1({ text }: TypographyProps) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {text}
    </h1>
  );
}

export function TypographyH2({ text }: TypographyProps) {
  return (
    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight">
      {text}
    </h2>
  );
}

export function TypographyH3({ text }: TypographyProps) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {text}
    </h3>
  );
}
