import Link from "next/link";

import { SitemapGeneratorTool } from "@/app/tools/sitemap-generator/sitemap-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function XmlSitemapGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.xmlSitemapGenerator)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main
        id="main-content"
        className="flex-1 bg-background"
        aria-labelledby="xml-sitemap-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">XML sitemap generator</span>
          </nav>

          <h1
            id="xml-sitemap-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            XML sitemap generator
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Engineers searching for an <strong className="text-foreground">XML sitemap generator</strong>{" "}
              usually care about namespace correctness, stable attribute ordering for diffs, and
              escaping rules for query-heavy <code className="rounded bg-muted px-1">loc</code> values.
              SmartFlexa emits the standard{" "}
              <code className="rounded bg-muted px-1">http://www.sitemaps.org/schemas/sitemap/0.9</code>{" "}
              urlset wrapper so validators stop complaining, while still letting you paste relative
              paths that resolve against your declared site URL.
            </p>
            <p>
              Use bulk mode when exporting from a spreadsheet, then trim rows that should stay out of
              search—login screens, internal APIs, and duplicate parameter variants. For pricing pages
              framed around “free” positioning, see{" "}
              <Link href="/free-sitemap-generator" className="font-medium text-foreground underline">
                free sitemap generator
              </Link>
              ; for browser-only messaging, open{" "}
              <Link
                href="/sitemap-generator-online"
                className="font-medium text-foreground underline"
              >
                sitemap generator online
              </Link>
              .
            </p>
            <p>
              Full FAQ and crawl companion tools live on the main{" "}
              <Link href="/tools/sitemap-generator" className="font-medium text-foreground underline">
                SmartFlexa sitemap generator
              </Link>
              .
            </p>
          </div>

          <div className="mt-10">
            <SitemapGeneratorTool />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/xml-sitemap-generator" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
