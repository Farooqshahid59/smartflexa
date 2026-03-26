type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Renders JSON-LD for search engines. Safe in Server and Client Components.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
