import Link from "next/link";

import { SitemapGeneratorTool } from "@/app/tools/sitemap-generator/sitemap-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function SitemapGeneratorOnlinePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.sitemapGeneratorOnline)} />
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
        aria-labelledby="sitemap-online-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Sitemap generator online</span>
          </nav>

          <h1
            id="sitemap-online-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Sitemap generator online
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Marketing laptops on hotel Wi-Fi are the classic use case for a{" "}
              <strong className="text-foreground">sitemap generator online</strong>: you need a valid
              file before the CDN cache clears, but you cannot run local CLI scripts. SmartFlexa
              keeps parsing, escaping, and deduplication in the browser so airport networks never see
              your unpublished URL list hit a third-party API you have not reviewed with security.
            </p>
            <p>
              The preview updates as you merge bulk rows, so PMs can sanity-check counts before
              engineering drops the XML into Git. When you are ready for evergreen documentation, use
              the main{" "}
              <Link href="/tools/sitemap-generator" className="font-medium text-foreground underline">
                sitemap generator hub
              </Link>{" "}
              or the{" "}
              <Link href="/create-sitemap-xml" className="font-medium text-foreground underline">
                create sitemap XML
              </Link>{" "}
              walkthrough page.
            </p>
            <p>
              Alternate intents:{" "}
              <Link href="/free-sitemap-generator" className="font-medium text-foreground underline">
                free sitemap generator
              </Link>
              ,{" "}
              <Link href="/xml-sitemap-generator" className="font-medium text-foreground underline">
                XML sitemap generator
              </Link>
              .
            </p>
          </div>

          <div className="mt-10">
            <SitemapGeneratorTool />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/sitemap-generator-online" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
