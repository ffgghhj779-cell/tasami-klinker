import { getOrganizationJsonLd, getWebSiteJsonLd } from '@/lib/seo';

export function JsonLd() {
  const schemas = [getOrganizationJsonLd(), getWebSiteJsonLd()];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
