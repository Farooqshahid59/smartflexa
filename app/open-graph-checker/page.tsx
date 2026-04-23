import Link from "next/link";

import { OpenGraphPreviewTool } from "@/app/tools/open-graph-preview/open-graph-preview-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function OpenGraphCheckerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.openGraphChecker)} />
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
            <span className="text-foreground">Open Graph checker</span>
          </nav>
          <h1
            id="hub-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Open Graph checker
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              An <strong className="text-foreground">Open Graph checker</strong> answers a simple
              question: do the tags you think you published actually produce the story users see
              when the link is shared? Automated linters can confirm presence, but humans still
              need to judge truncation, contrast on thumbnails, and whether the description repeats
              the title verbatim.
            </p>
            <p>
              SmartFlexa combines parsing (when fetch succeeds) with manual overrides so QA teams
              can paste HTML snippets from staging without exposing that environment to the public
              internet. Compare results against our dedicated{" "}
              <Link
                href="/facebook-link-preview"
                className="font-medium text-foreground underline"
              >
                Facebook link preview
              </Link>{" "}
              and{" "}
              <Link
                href="/twitter-card-preview"
                className="font-medium text-foreground underline"
              >
                Twitter card preview
              </Link>{" "}
              hubs if you want keyword-focused intros, or stay on this route for a general audit
              checklist mindset.
            </p>
            <p>
              Treat every failed image load as a release blocker: social algorithms downgrade
              links that time out fetching media.
            </p>
          </article>
          <div className="mt-10">
            <OpenGraphPreviewTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/open-graph-checker" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
