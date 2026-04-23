"use client";

import Link from "next/link";

import { ColorPaletteGeneratorTool } from "@/app/tools/color-palette-generator/color-palette-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function ColorCombinationGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.colorCombinationGenerator)} />
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
            <span className="text-foreground">Color combinations</span>
          </nav>
          <h1
            id="hub-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Color combination generator
          </h1>
          <article className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              A strong interface rarely hinges on a single hue—it depends on how primaries,
              neutrals, and accents <strong className="text-foreground">combine</strong>{" "}
              across navigation, charts, and feedback states. A{" "}
              <strong className="text-foreground">color combination generator</strong> helps
              you audition entire families at once instead of painting one button at a time.
              SmartFlexa proposes sets that already relate through hue spacing, then lets you
              lock the combination fragments you like while refreshing the rest.
            </p>
            <p>
              Think of each regeneration as a mini design critique: does the accent still read
              against the proposed background? Do two saturated neighbors fight for attention?
              If yes, lock the winner and spin again. Image mode adds another axis—combinations
              pulled from lifestyle photography or product renders—so marketing and product
              teams can align on a shared mood before engineering wires up tokens.
            </p>
            <p>
              Once a combination sticks, export CSS variables for implementation or JSON for
              documentation. For single-value tweaks after the set is chosen, hop to our{" "}
              <Link
                href="/tools/color-picker"
                className="font-medium text-foreground underline"
              >
                Color Picker
              </Link>
              . Everything below mirrors the flagship{" "}
              <Link
                href="/tools/color-palette-generator"
                className="font-medium text-foreground underline"
              >
                SmartFlexa palette tool
              </Link>{" "}
              so you can start in random mode and pivot to image sampling without learning a
              second interface.
            </p>
          </article>

          <div className="mt-10">
            <ColorPaletteGeneratorTool defaultMode="random" headingId="hub-combo-tool" />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/color-combination-generator" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
