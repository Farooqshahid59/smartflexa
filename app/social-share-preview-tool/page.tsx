import Link from "next/link";

import { OpenGraphPreviewTool } from "@/app/tools/open-graph-preview/open-graph-preview-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function SocialSharePreviewToolPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.socialSharePreviewTool)} />
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
            <span className="text-foreground">Social share preview</span>
          </nav>
          <h1
            id="hub-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Social share preview tool
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              A <strong className="text-foreground">social share preview tool</strong> belongs in
              the same toolkit as analytics and CMS workflows: it answers how a URL will look
              across networks before budget is spent boosting it. Product marketing can validate
              translations, legal can confirm disclaimers fit the description field, and engineers
              can verify that server-rendered head tags—not only client-side React state—contain
              the final strings.
            </p>
            <p>
              SmartFlexa stacks a Facebook-inspired card with an X-style summary card so teams
              stop debating “which platform crops tighter?” from memory. Copy meta tags when the
              copy deck is approved, then archive the snippet next to your campaign brief. For a
              shorter path focused only on Open Graph validation vocabulary, see the{" "}
              <Link
                href="/open-graph-checker"
                className="font-medium text-foreground underline"
              >
                Open Graph checker
              </Link>{" "}
              landing page; for the canonical all-in-one experience use{" "}
              <Link
                href="/tools/open-graph-preview"
                className="font-medium text-foreground underline"
              >
                /tools/open-graph-preview
              </Link>
              .
            </p>
            <p>
              Because previews cache on each network, schedule validation after DNS and SSL are
              stable, then re-run whenever pricing or hero imagery changes materially.
            </p>
          </article>
          <div className="mt-10">
            <OpenGraphPreviewTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/social-share-preview-tool" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
