import Script from "next/script";

export function StructuredData({
  data,
  id,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
  id: string;
}) {
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
