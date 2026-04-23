import Link from "next/link";

import { TextToImageTool } from "@/app/tools/text-to-image/text-to-image-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function CreateInstagramQuoteImagePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.createInstagramQuoteImage)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="ig-quote-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Instagram quote image</span>
          </nav>
          <h1 id="ig-quote-h1" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Create an Instagram quote image
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Portrait feed posts still reward{" "}
              <strong className="text-foreground">1080×1350</strong> real estate, so micro-stories
              and customer quotes fit comfortably without feeling like stretched banners. Use the{" "}
              <strong className="text-foreground">Social post</strong> preset here to jump straight
              into that aspect ratio, then tighten line spacing if your copy is short or loosen it
              when you are sharing a short paragraph from a blog recap.
            </p>
            <p>
              Instagram compression prefers smooth gradients and medium-weight fonts; extremely
              thin strokes can shimmer after upload. If you notice moiré on photographic backgrounds,
              switch back to a solid brand color for the session, or export PNG and let Instagram
              transcode once rather than re-saving JPEGs repeatedly. Always pair the graphic with a
              caption that repeats the quote verbatim for screen readers and search.
            </p>
            <p>
              After export, you may still need platform-specific crops for Stories or Reels covers—
              run the asset through SmartFlexa&apos;s{" "}
              <Link href="/tools/resize-image" className="font-medium text-foreground underline">
                Resize Image
              </Link>{" "}
              helper. The shared{" "}
              <Link
                href="/tools/text-to-image"
                className="font-medium text-foreground underline"
              >
                Text to image generator
              </Link>{" "}
              documents the same controls under the canonical tools URL.
            </p>
          </article>
          <div className="mt-10">
            <TextToImageTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/create-instagram-quote-image" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
