import Link from "next/link";

import { SitemapGeneratorTool } from "@/app/tools/sitemap-generator/sitemap-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function CreateSitemapXmlPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.createSitemapXml)} />
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
        aria-labelledby="create-sitemap-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Create sitemap XML</span>
          </nav>

          <h1
            id="create-sitemap-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Create sitemap XML
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              The query <strong className="text-foreground">create sitemap XML</strong> often lands
              right after a migration ticket is filed: engineering needs a file they can diff, while
              SEO needs reassurance that every canonical route is represented. This page loads the
              same SmartFlexa editor so you can paste relative paths, merge CSV exports from analytics,
              and watch the <code className="rounded bg-muted px-1">urlset</code> grow in real time
              before committing to production.
            </p>
            <p>
              Treat priority and changefreq as hints, not promises—search engines may ignore values
              that disagree with observed crawl patterns. Focus first on complete, escaped loc tags
              and accurate lastmod dates tied to genuine deploy timestamps.
            </p>
            <p>
              Browse{" "}
              <Link href="/xml-sitemap-generator" className="font-medium text-foreground underline">
                XML sitemap generator
              </Link>{" "}
              for schema-focused wording, or return to{" "}
              <Link href="/tools/sitemap-generator" className="font-medium text-foreground underline">
                /tools/sitemap-generator
              </Link>{" "}
              for FAQs and related crawl utilities.
            </p>
          </div>

          <div className="mt-10">
            <SitemapGeneratorTool />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/create-sitemap-xml" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
