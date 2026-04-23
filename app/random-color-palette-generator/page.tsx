"use client";

import Link from "next/link";

import { ColorPaletteGeneratorTool } from "@/app/tools/color-palette-generator/color-palette-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function RandomColorPaletteGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.randomColorPaletteGenerator)} />
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
            <span className="text-foreground">Random palette</span>
          </nav>
          <h1
            id="hub-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Random color palette generator
          </h1>
          <article className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Creative blocks happen when the blank canvas feels infinite. A{" "}
              <strong className="text-foreground">random color palette generator</strong>{" "}
              narrows the search space by proposing five coordinated hues you can accept,
              tweak, or reject in seconds. SmartFlexa biases draws toward harmonious spacing on
              the color wheel so you get schemes that feel intentional rather than garish,
              while still leaving room for surprise.
            </p>
            <p>
              Lock any swatch that resonates—maybe a saturated accent you want to build
              around—and regenerate the remainder until the supporting neutrals and secondary
              hues line up with your product story. Every refresh stays on-device, which
              makes rapid iteration comfortable even when you are offline. Export JSON for
              token pipelines, CSS variables for Tailwind or vanilla stylesheets, or a PNG
              strip for stakeholder decks.
            </p>
            <p>
              When you need palettes grounded in photography instead, switch to image mode in
              the tool below or open our dedicated{" "}
              <Link
                href="/color-palette-generator-from-image"
                className="font-medium text-foreground underline"
              >
                palette-from-image
              </Link>{" "}
              landing page. Both experiences share the same SmartFlexa engine for consistent
              results.
            </p>
          </article>

          <div className="mt-10">
            <ColorPaletteGeneratorTool defaultMode="random" headingId="hub-random-tool" />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/random-color-palette-generator" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
