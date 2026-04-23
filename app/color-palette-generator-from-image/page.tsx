"use client";

import Link from "next/link";

import { ColorPaletteGeneratorTool } from "@/app/tools/color-palette-generator/color-palette-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function ColorPaletteGeneratorFromImagePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.colorPaletteFromImage)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="hub-heading">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:max-w-5xl lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Palette from image</span>
          </nav>
          <h1
            id="hub-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Color palette generator from image
          </h1>
          <article className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Photographers, marketers, and product designers often start with a hero image,
              packaging shot, or mood photograph—and want the interface to echo those tones
              without eye-dropping dozens of pixels by hand. A{" "}
              <strong className="text-foreground">color palette generator from image</strong>{" "}
              automates that first pass: it scans the file, groups similar RGB values, and
              surfaces the hues that human viewers already notice. The result is not a
              substitute for art direction, but it is a fast bridge between inspiration and a
              structured set of swatches you can refine.
            </p>
            <p>
              SmartFlexa downsamples your upload in the browser, so reference shots from
              clients stay on your machine. After extraction you can lock anchors such as a
              deep navy or warm skin tone, regenerate to explore alternative clustering, then
              copy HEX codes or export CSS variables for developers. Pair this workflow with
              our Color Picker when you need to nudge a single channel after the palette is
              approved.
            </p>
            <p>
              For best results, use well-lit images with clear subject separation, avoid tiny
              thumbnails, and expect neutrals to dominate studio portraits—that is accurate
              to the source. When you are ready for random exploration as well, visit the full{" "}
              <Link
                href="/tools/color-palette-generator"
                className="font-medium text-foreground underline"
              >
                color palette generator
              </Link>{" "}
              hub on SmartFlexa.
            </p>
          </article>

          <div className="mt-10">
            <ColorPaletteGeneratorTool defaultMode="image" headingId="hub-palette-tool" />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/color-palette-generator-from-image" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
