import Link from "next/link";

import { UsernameGeneratorTool } from "@/app/tools/username-generator/username-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function UsernameIdeasPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.usernameIdeas)} />
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
        aria-labelledby="ideas-heading"
      >
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Username ideas</span>
          </nav>

          <h1
            id="ideas-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Username ideas
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Brainstorming sessions die when the whiteboard fills with duplicates. Treat this{" "}
              <strong className="text-foreground">username ideas</strong> page as a divergent-thinking
              table: spin the <strong className="text-foreground">Cool</strong> preset for abstract
              blends, flip to <strong className="text-foreground">Professional</strong> when naming mock
              SaaS personas, or jump to <strong className="text-foreground">Gaming</strong> when
              storyboarding esports overlays. The underlying SmartFlexa engine is identical to the
              flagship tool—only the copy nudges you toward quantity over perfection on pass one.
            </p>
            <p>
              Capture batches with <strong className="text-foreground">Copy all</strong>, paste into
              FigJam or Notion, then vote with your team. Availability checks still happen on-platform;
              this generator never phones home with your shortlist.
            </p>
            <p>
              Niche hubs:{" "}
              <Link
                href="/instagram-username-generator"
                className="font-medium text-foreground underline"
              >
                Instagram username generator
              </Link>
              ,{" "}
              <Link href="/gaming-username-generator" className="font-medium text-foreground underline">
                gaming username generator
              </Link>
              ,{" "}
              <Link href="/cool-username-generator" className="font-medium text-foreground underline">
                cool username generator
              </Link>
              .
            </p>
          </div>

          <div className="mt-10">
            <UsernameGeneratorTool key="ideas" defaultCategory="cool" />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/username-ideas" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
