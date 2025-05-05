"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getSchemaByPathname } from "@/lib/schema";

export function SchemaOrg({
  title,
  description
}: {
  title?: string;
  description?: string;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
