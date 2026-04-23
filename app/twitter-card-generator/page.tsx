import Link from "next/link";

import { MetaTagGeneratorTool } from "@/app/tools/meta-tag-generator/meta-tag-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function TwitterCardGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.twitterCardGenerator)} />
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
        aria-labelledby="tw-card-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Twitter card generator</span>
          </nav>

          <h1
            id="tw-card-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Twitter card generator
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Posts on X (formerly Twitter) pull structured metadata just like other networks, but
              teams still search specifically for a{" "}
              <strong className="text-foreground">Twitter card generator</strong> when they need{" "}
              <code className="rounded bg-muted px-1">twitter:title</code>,{" "}
              <code className="rounded bg-muted px-1">twitter:description</code>, and{" "}
              <code className="rounded bg-muted px-1">twitter:image</code> without digging through
              Facebook’s debugger docs. SmartFlexa outputs those name-based tags alongside your
              baseline SEO fields so you can keep launch checklists in one tab.
            </p>
            <p>
              The editor automatically switches <strong className="text-foreground">twitter:card</strong>{" "}
              between <code className="rounded bg-muted px-1">summary</code> and{" "}
              <code className="rounded bg-muted px-1">summary_large_image</code> when an image URL is
              present—handy for blog heroes and product shots. Pair this page with the{" "}
              <Link href="/open-graph-generator" className="font-medium text-foreground underline">
                Open Graph generator
              </Link>{" "}
              when marketing wants identical copy on both networks, then verify with Card Validator
              after your CDN cache purges.
            </p>
            <p>
              Return to the canonical{" "}
              <Link href="/tools/meta-tag-generator" className="font-medium text-foreground underline">
                meta tag generator
              </Link>{" "}
              for FAQs, or browse the{" "}
              <Link href="/html-meta-tags-generator" className="font-medium text-foreground underline">
                HTML meta tags generator
              </Link>{" "}
              if you are exporting static HTML from a design handoff.
            </p>
          </div>

          <div className="mt-10">
            <MetaTagGeneratorTool />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/twitter-card-generator" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
