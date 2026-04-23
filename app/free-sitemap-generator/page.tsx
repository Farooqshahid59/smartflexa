import Link from "next/link";

import { SitemapGeneratorTool } from "@/app/tools/sitemap-generator/sitemap-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function FreeSitemapGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.freeSitemapGenerator)} />
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
        aria-labelledby="free-sitemap-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Free sitemap generator</span>
          </nav>

          <h1
            id="free-sitemap-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Free sitemap generator
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Budget-conscious teams still deserve production-grade output. This{" "}
              <strong className="text-foreground">free sitemap generator</strong> route highlights
              the same SmartFlexa editor as the flagship tool: no account wall, no watermark in the
              XML, and no background upload of your URL list. You keep sensitive staging paths in a
              local tab until you deliberately deploy the finished file to a public host.
            </p>
            <p>
              Pair the export with a robots.txt line that advertises your sitemap, then submit the
              absolute URL in Search Console after DNS and TLS are stable. If you need vocabulary
              tuned to “online” or “XML” keywords, compare{" "}
              <Link
                href="/sitemap-generator-online"
                className="font-medium text-foreground underline"
              >
                sitemap generator online
              </Link>{" "}
              and{" "}
              <Link href="/xml-sitemap-generator" className="font-medium text-foreground underline">
                XML sitemap generator
              </Link>{" "}
              landing pages.
            </p>
            <p>
              Return to{" "}
              <Link href="/tools/sitemap-generator" className="font-medium text-foreground underline">
                /tools/sitemap-generator
              </Link>{" "}
              for the long-form article and FAQ block.
            </p>
          </div>

          <div className="mt-10">
            <SitemapGeneratorTool />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/free-sitemap-generator" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
