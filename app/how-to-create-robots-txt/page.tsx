import Link from "next/link";

import { RobotsTxtGeneratorTool } from "@/app/tools/robots-txt-generator/robots-txt-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function HowToCreateRobotsTxtPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.howToCreateRobotsTxt)} />
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
        aria-labelledby="how-robots-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">How to create robots.txt</span>
          </nav>

          <h1
            id="how-robots-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            How to create robots.txt
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Guides titled <strong className="text-foreground">how to create robots.txt</strong>{" "}
              usually enumerate syntax, but teams still get stuck translating policy into prefixes.
              Use the form below as a worksheet: pick a User-agent, list Allow exceptions first if you
              need them, then stack Disallow prefixes from broad to narrow, append Sitemap URLs that
              already return 200, and download the file only after a second reviewer reads the diff.
            </p>
            <p>
              Validation belongs off-tool: fetch the deployed file over HTTPS, confirm charset is
              plain UTF-8 text, and run your search engine’s robots tester against representative
              URLs—including mobile subdomains if they exist. If the tester reports conflicts, adjust
              longest-match logic by shortening or reordering directives rather than duplicating
              contradictory lines.
            </p>
            <p>
              Return to the main{" "}
              <Link href="/tools/robots-txt-generator" className="font-medium text-foreground underline">
                SmartFlexa robots.txt generator
              </Link>{" "}
              for long-form FAQs, or browse{" "}
              <Link href="/create-robots-txt" className="font-medium text-foreground underline">
                create robots.txt
              </Link>{" "}
              and{" "}
              <Link href="/robots-txt-for-seo" className="font-medium text-foreground underline">
                robots.txt for SEO
              </Link>{" "}
              for alternate angles on the same editor.
            </p>
          </div>

          <div className="mt-10">
            <RobotsTxtGeneratorTool />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/how-to-create-robots-txt" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
