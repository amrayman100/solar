type TypographyProps = {
  text: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function TypographyH1({ text, className }: TypographyProps) {
  return (
    <h1
      className={
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" +
        className
      }
    >
      {text}
    </h1>
  );
}

export function TypographyH2({ text, className }: TypographyProps) {
  return (
    <h2
      className={
        "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight " + className
      }
    >
      {text}
    </h2>
  );
}

export function TypographyH3({ text, className }: TypographyProps) {
  return (
    <h3
      className={
        "scroll-m-20 text-2xl font-semibold tracking-tight" + className
      }
    >
      {text}
    </h3>
  );
}

export function TypographyH4({ text, className }: TypographyProps) {
  return (
    <h4
      className={
        "scroll-m-20 text-xl font-semibold tracking-tight " + className
      }
    >
      {text}
    </h4>
  );
}
