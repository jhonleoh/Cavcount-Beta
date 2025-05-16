import { getSchemaByPathname } from "@/lib/schema";

export function SchemaOrg({
  title,
  description,
  pathname
}: {
  title?: string;
  description?: string;
  pathname: string;
}) {
  // Generate schemas based on the provided pathname
  const schemas = getSchemaByPathname({
    pathname,
    title,
    description,
  });

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
