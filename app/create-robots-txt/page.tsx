import Link from "next/link";

import { RobotsTxtGeneratorTool } from "@/app/tools/robots-txt-generator/robots-txt-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function CreateRobotsTxtPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.createRobotsTxt)} />
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
        aria-labelledby="create-robots-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Create robots.txt</span>
          </nav>

          <h1
            id="create-robots-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Create robots.txt
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Teams search for <strong className="text-foreground">create robots.txt</strong> when
              DNS is already live but the platform engineer has not checked in the file yet. This
              page frames the SmartFlexa editor around that verb: you still get the same live preview,
              presets, and download button as the main tool, but the copy assumes you are authoring
              from scratch rather than tweaking an inherited WordPress export.
            </p>
            <p>
              Start from <strong className="text-foreground">Allow all</strong> if you simply need a
              valid file plus sitemap discovery lines, then layer <strong className="text-foreground">Disallow</strong>{" "}
              rows as QA surfaces duplicate parameter URLs. When you are ready for broader SEO
              context, open the{" "}
              <Link href="/tools/robots-txt-generator" className="font-medium text-foreground underline">
                robots.txt generator hub
              </Link>{" "}
              or the{" "}
              <Link href="/robots-txt-for-seo" className="font-medium text-foreground underline">
                robots.txt for SEO
              </Link>{" "}
              companion article.
            </p>
            <p>
              Other entry points:{" "}
              <Link
                href="/robots-txt-generator-online"
                className="font-medium text-foreground underline"
              >
                robots.txt generator online
              </Link>
              ,{" "}
              <Link href="/how-to-create-robots-txt" className="font-medium text-foreground underline">
                how to create robots.txt
              </Link>
              .
            </p>
          </div>

          <div className="mt-10">
            <RobotsTxtGeneratorTool />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/create-robots-txt" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
