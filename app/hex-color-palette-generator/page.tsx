"use client";

import Link from "next/link";

import { ColorPaletteGeneratorTool } from "@/app/tools/color-palette-generator/color-palette-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function HexColorPaletteGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.hexColorPaletteGenerator)} />
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
            <span className="text-foreground">HEX palettes</span>
          </nav>
          <h1
            id="hub-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            HEX color palette generator
          </h1>
          <article className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Developers and designers still trade{" "}
              <strong className="text-foreground">HEX</strong> codes because they paste
              cleanly into CSS, SwiftUI, Android XML, and most design handoff tools without
              extra syntax. A dedicated{" "}
              <strong className="text-foreground">HEX color palette generator</strong> should
              therefore treat those six-character strings as first-class citizens: visible on
              every swatch, one tap away from the clipboard, and mirrored in JSON exports when
              you automate token generation.
            </p>
            <p>
              SmartFlexa displays uppercase HEX alongside functional RGB strings so you can
              drop values into either convention without mental conversion. Exporting CSS
              variables wraps each color as <code className="text-foreground">--palette-n</code>, which
              slots neatly into component libraries that expect custom properties. Because
              generation runs locally, you can paste results straight into private repositories
              without routing colors through a third-party API.
            </p>
            <p>
              When you need to sample from a client-provided mockup instead of random
              harmony, use image mode in the widget below, then return here any time you want
              the HEX-forward framing for documentation. The underlying engine matches our
              main{" "}
              <Link
                href="/tools/color-palette-generator"
                className="font-medium text-foreground underline"
              >
                palette generator
              </Link>{" "}
              so your exports stay consistent across landing pages.
            </p>
          </article>

          <div className="mt-10">
            <ColorPaletteGeneratorTool defaultMode="random" headingId="hub-hex-tool" />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/hex-color-palette-generator" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
