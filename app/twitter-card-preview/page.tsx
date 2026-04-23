import Link from "next/link";

import { OpenGraphPreviewTool } from "@/app/tools/open-graph-preview/open-graph-preview-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function TwitterCardPreviewPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.twitterCardPreview)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="hub-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Twitter card preview</span>
          </nav>
          <h1
            id="hub-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Twitter card preview (X)
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              X still honors <strong className="text-foreground">Twitter Card</strong> meta tags
              such as <code className="rounded bg-muted px-1">twitter:title</code>,{" "}
              <code className="rounded bg-muted px-1">twitter:description</code>, and{" "}
              <code className="rounded bg-muted px-1">twitter:image</code>. A{" "}
              <strong className="text-foreground">Twitter card preview</strong> helps you judge
              how those fields combine with the large image variant before a tweet goes live—
              especially important when headlines must fit beside political or stock tickers in
              dense timelines.
            </p>
            <p>
              SmartFlexa renders a neutral “summary large image” style block beneath the
              Facebook-style mockup so you can compare crops side by side. Open Graph values
              often backfill Twitter when Twitter-specific tags are absent, so editing both in
              one workspace reduces drift. For full tag generation, pair this page with the{" "}
              <Link href="/twitter-card-generator" className="font-medium text-foreground underline">
                Twitter card generator
              </Link>{" "}
              and the main{" "}
              <Link
                href="/tools/open-graph-preview"
                className="font-medium text-foreground underline"
              >
                Open Graph preview tool
              </Link>
              .
            </p>
            <p>
              Remember that X may cache aggressively; after deploys, use their card validator
              to refresh what crawlers store for your domain.
            </p>
          </article>
          <div className="mt-10">
            <OpenGraphPreviewTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/twitter-card-preview" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
