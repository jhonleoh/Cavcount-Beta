import React from 'react';
import { SchemaOrg } from './schema-org';

type MetadataGeneratorProps = {
  title: string;
  description: string;
  pathname: string;
};

export function MetadataGenerator({ title, description, pathname }: MetadataGeneratorProps) {
  return (
    <>
      <title>{title} | CavCount</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} | CavCount`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`https://cavcount.app${pathname}`} />
      <meta name="twitter:title" content={`${title} | CavCount`} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={`https://cavcount.app${pathname}`} />
      <SchemaOrg title={title} description={description} pathname={pathname} />
    </>
  );
}
