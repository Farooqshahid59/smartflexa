import Link from "next/link";

export function SitemapInboundLinks() {
  return (
    <section
      className="mt-10 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="sitemap-inbound-heading"
    >
      <h2
        id="sitemap-inbound-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        XML sitemaps
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Build a standards-friendly <code className="rounded bg-muted px-1">urlset</code> with loc,
        changefreq, priority, and optional lastmod—copy or download without uploading your CMS.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>
          <Link
            href="/tools/sitemap-generator"
            className="font-medium text-foreground underline"
          >
            Generate sitemap.xml
          </Link>
        </li>
        <li>
          <Link
            href="/tools/sitemap-generator"
            className="font-medium text-foreground underline"
          >
            XML sitemap generator
          </Link>
        </li>
      </ul>
    </section>
  );
}
