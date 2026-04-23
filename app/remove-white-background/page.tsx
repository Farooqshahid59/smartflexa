import Link from "next/link";

import { RemoveBackgroundTool } from "@/app/tools/remove-background/remove-background-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function RemoveWhiteBackgroundPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.removeWhiteBackground)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="hub-white-bg-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Remove white background</span>
          </nav>
          <h1
            id="hub-white-bg-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Remove white background from logos and packshots
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Marketing teams constantly export PNGs from slide decks only to discover a faint
              paper tone behind the icon. Learning to <strong className="text-foreground">remove white background</strong>{" "}
              quickly saves hours before a launch. Here the &quot;Bright&quot; algorithm treats
              high-luminance pixels as background, which matches studio tables and seamless paper
              rolls when the product itself is darker and more saturated.
            </p>
            <p>
              If the white does not reach the border—say a centered badge on gray—switch to pick
              color or border flood so you are not fighting false positives on pale clothing.
              Always inspect the checkerboard preview: specular highlights on bottles can read as
              white; lowering the cutoff or nudging tolerance usually restores them without
              reintroducing the sweep.
            </p>
            <p>
              This landing page targets that specific query while reusing the shared SmartFlexa
              widget. For broader workflows (mixed colors, transparency theory), see{" "}
              <Link
                href="/tools/remove-background"
                className="font-medium text-foreground underline"
              >
                Remove image background
              </Link>{" "}
              and the companion explainer there; you can also jump to{" "}
              <Link
                href="/make-image-transparent"
                className="font-medium text-foreground underline"
              >
                Make image transparent
              </Link>{" "}
              when your audience searches with that phrasing instead.
            </p>
          </article>
          <div className="mt-10">
            <RemoveBackgroundTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/remove-white-background" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
