import Link from "next/link";

import { MetaTagGeneratorTool } from "@/app/tools/meta-tag-generator/meta-tag-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function OpenGraphGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.openGraphGenerator)} />
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
        aria-labelledby="og-gen-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Open Graph generator</span>
          </nav>

          <h1
            id="og-gen-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Open Graph generator
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Slack, LinkedIn, and iMessage do not read your body copy first—they read{" "}
              <strong className="text-foreground">Open Graph</strong> properties such as{" "}
              <code className="rounded bg-muted px-1">og:title</code>,{" "}
              <code className="rounded bg-muted px-1">og:description</code>, and{" "}
              <code className="rounded bg-muted px-1">og:image</code>. When those fields are vague,
              link previews collapse into generic grey boxes that suppress clicks. This{" "}
              <strong className="text-foreground">Open Graph generator</strong> route highlights that
              workflow: tune the OG block while still having canonical title and description fields
              for Google, then copy the combined head markup into your CMS or static template.
            </p>
            <p>
              Absolute <strong className="text-foreground">https</strong> image URLs and aspect
              ratios near 1.91:1 still perform best for large cards, but always validate with each
              platform’s debugger after deploy. If you are also shipping X campaigns, mirror the same
              story in the Twitter fields or jump to the{" "}
              <Link href="/twitter-card-generator" className="font-medium text-foreground underline">
                Twitter card generator
              </Link>{" "}
              page for copy tuned to that keyword.
            </p>
            <p>
              General education, robots help, and JSON-adjacent utilities live on the main{" "}
              <Link href="/tools/meta-tag-generator" className="font-medium text-foreground underline">
                SmartFlexa meta tag generator
              </Link>{" "}
              and{" "}
              <Link href="/seo-meta-tag-generator" className="font-medium text-foreground underline">
                SEO meta tag generator
              </Link>{" "}
              guides.
            </p>
          </div>

          <div className="mt-10">
            <MetaTagGeneratorTool />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/open-graph-generator" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
