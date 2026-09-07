import Script from "next/script";

interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[];
  id: string;
}

export function StructuredData({ data, id }: StructuredDataProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={`${id}-${index}`}
          id={`${id}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
