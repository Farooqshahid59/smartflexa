import Link from "next/link";

import { RemoveBackgroundTool } from "@/app/tools/remove-background/remove-background-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function MakeImageTransparentPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.makeImageTransparent)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="hub-transparent-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Make image transparent</span>
          </nav>
          <h1
            id="hub-transparent-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Make an image transparent (PNG alpha)
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Designers often say they need to <strong className="text-foreground">make image transparent</strong>{" "}
              when they really need an alpha matte: pixels that are fully opaque in the subject,
              fully clear in the backdrop, and sometimes semi-opaque along anti-aliased edges. PNG
              is the right container because JPEG cannot store per-pixel opacity. SmartFlexa writes
              that channel after you choose how aggressively to peel the surrounding color.
            </p>
            <p>
              Flood-from-border mode mimics the magic wand you remember from desktop editors: it
              assumes the outer ring represents the background. Pick mode is better when the
              subject does not touch the canvas edge. Bright threshold shines when the studio wall
              blows to near white while the product stays richer. After you like the preview,
              download—no account wall, no watermark layer baked in.
            </p>
            <p>
              If teammates ask how this differs from the primary route, it does not: both use the
              same component. Visit{" "}
              <Link
                href="/tools/remove-background"
                className="font-medium text-foreground underline"
              >
                Remove image background
              </Link>{" "}
              for the canonical URL, structured data, and a longer article on when lightweight
              cutouts beat cloud AI.
            </p>
          </article>
          <div className="mt-10">
            <RemoveBackgroundTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/make-image-transparent" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
