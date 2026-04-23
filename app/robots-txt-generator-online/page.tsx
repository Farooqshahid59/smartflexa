import Link from "next/link";

import { RobotsTxtGeneratorTool } from "@/app/tools/robots-txt-generator/robots-txt-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function RobotsTxtGeneratorOnlinePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.robotsTxtGeneratorOnline)} />
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
        aria-labelledby="robots-online-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Robots.txt generator online</span>
          </nav>

          <h1
            id="robots-online-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Robots.txt generator online
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Security reviews often ask whether an <strong className="text-foreground">online</strong>{" "}
              SEO tool exfiltrates repository paths. SmartFlexa keeps this{" "}
              <strong className="text-foreground">robots.txt generator online</strong> entirely in your
              tab: the preview string is computed locally, the download button materializes a Blob,
              and nothing is POSTed to SmartFlexa before you choose to host the file yourself. That
              matters when Disallow lines reference unreleased product slugs or internal admin trees.
            </p>
            <p>
              Use it on a locked-down laptop in a war room, on a tablet during a migration cutover, or
              beside your diff viewer when reconciling staging vs production hosts—each environment
              may need a different User-agent story even if the UI is identical.
            </p>
            <p>
              Canonical documentation lives at{" "}
              <Link href="/tools/robots-txt-generator" className="font-medium text-foreground underline">
                /tools/robots-txt-generator
              </Link>
              . Alternate intents:{" "}
              <Link href="/create-robots-txt" className="font-medium text-foreground underline">
                create robots.txt
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
            <RelatedTools currentPath="/robots-txt-generator-online" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
