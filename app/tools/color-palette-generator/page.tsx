"use client";

import Link from "next/link";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { PaletteRelatedToolLinks } from "@/components/palette-related-tool-links";
import { RelatedTools } from "@/components/related-tools";
import { TextToImageInboundLinks } from "@/components/text-to-image-inbound-links";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

import { ColorPaletteGeneratorTool } from "./color-palette-generator-tool";

const paletteFaqJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I generate a color palette?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open the Random palette mode, then use Regenerate until you like the set. You can lock any swatch so it stays fixed while the rest refresh. Each swatch shows HEX and RGB; tap a code to copy it. Download a PNG strip, or export JSON or CSS variables for your project.",
      },
    },
    {
      "@type": "Question",
      name: "How do I extract colors from an image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Switch to From image, upload a JPG, PNG, or WebP file, and the tool samples your picture in the browser to find five or six dominant colors. Use Regenerate to resample with a slightly different sensitivity, or lock colors you want to keep while the unlocked slots update from the same upload.",
      },
    },
    {
      "@type": "Question",
      name: "What is a HEX color?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HEX (hexadecimal) is a six-character code prefixed with # that represents red, green, and blue channels in base 16. It is widely used in CSS, design handoffs, and brand guidelines because it is compact and unambiguous compared to writing three separate decimal numbers.",
      },
    },
    {
      "@type": "Question",
      name: "How do I use a color palette in design?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Assign roles such as primary, secondary, accent, surface, and text. Use your palette for buttons, links, charts, and illustrations so the interface feels cohesive. Export CSS variables to drop into a theme file, or paste HEX values into Figma, Canva, or your code editor. Keep enough contrast between text and background for accessibility.",
      },
    },
    {
      "@type": "Question",
      name: "What are good color combinations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Classic approaches include complementary pairs (opposite hues), analogous neighbors on the wheel, and triads spaced evenly for vibrant but balanced schemes. For product UI, anchor neutrals with one strong accent, test palettes on real content and photography, and validate contrast with WCAG guidelines rather than guessing by eye alone.",
      },
    },
  ],
};

export default function ColorPaletteGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.colorPaletteGenerator)} />
      <JsonLd data={paletteFaqJsonLd} />
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
        aria-labelledby="color-palette-heading"
      >
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:max-w-5xl lg:px-8">
          <div className="mb-8 text-center sm:text-left">
            <nav aria-label="Breadcrumb">
              <p className="text-sm font-medium text-muted-foreground">
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
                <span className="mx-2 text-border" aria-hidden>
                  /
                </span>
                <span>Tools</span>
                <span className="mx-2 text-border" aria-hidden>
                  /
                </span>
                <span className="text-foreground">Color Palette Generator</span>
              </p>
            </nav>
            <h1
              id="color-palette-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Color Palette Generator Free (From Image &amp; Random Colors)
            </h1>
            <p className="mt-2 max-w-3xl text-base text-muted-foreground sm:text-lg">
              Create coordinated swatches in seconds, or upload a photo to pull dominant
              tones. Copy HEX and RGB, lock favorites, and export JSON, CSS variables, or a
              palette image—all processed locally in your browser.
            </p>
          </div>

          <ColorPaletteGeneratorTool
            defaultMode="random"
            headingId="palette-main-tool-heading"
          />

          <article
            className="mt-14 space-y-8 text-base leading-relaxed text-muted-foreground"
            aria-labelledby="palette-guide-heading"
          >
            <h2
              id="palette-guide-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Why palettes matter and how to use them
            </h2>

            <p>
              A <strong className="text-foreground">color palette</strong> is a small,
              intentional set of hues you reuse across a layout, product, or brand. Instead
              of choosing one-off fills whenever a new screen appears, you decide upfront
              which colors play which roles—primary actions, secondary surfaces, success and
              error states, and typography on light or dark backgrounds. That discipline is
              what makes an experience feel designed rather than assembled.
            </p>

            <p>
              Palettes also speed collaboration. When everyone references the same HEX or CSS
              variables, handoffs stay consistent between design tools and code. Random
              exploration helps you discover unexpected harmonies, while image extraction
              grounds a scheme in photography, packaging, or a logo you already trust. Both
              approaches complement each other: random generation sparks ideas; sampling from
              a reference image anchors those ideas in real-world context.
            </p>

            <p>
              <strong className="text-foreground">Choosing colors</strong> is easier when you
              separate hue from contrast. Start with one or two brand hues, then add
              neutrals that carry most of the UI. Reserve saturated accents for calls to
              action so they still feel special. If you are building for the web, remember
              that displays differ: test on multiple devices and avoid ultra-saturated blocks
              of color behind long passages of text. Locking swatches in this generator lets
              you keep a strong anchor color while you iterate the rest of the set.
            </p>

            <p>
              Accessibility should influence palette choices, not just typography. Pair
              foreground and background pairs that meet contrast guidelines for body copy and
              for interactive controls. When you export CSS variables from SmartFlexa, map
              them to semantic tokens such as <code className="text-foreground">--color-bg</code>{" "}
              and <code className="text-foreground">--color-fg</code> so dark mode or future
              rebrands require fewer file edits. Small naming conventions today prevent large
              refactors tomorrow.
            </p>

            <p>
              <strong className="text-foreground">Using palettes in design</strong> extends
              beyond flat rectangles. Apply them to gradients, charts, icons with tinted
              strokes, and illustration overlays. In marketing layouts, repeat palette
              colors in headlines, dividers, and photography color grading so the page reads
              as one story. For data visualization, assign distinct hues from the same
              family so categories remain legible when printed in grayscale or viewed by
              people with color-vision differences—supplement color with pattern or labels
              where precision matters.
            </p>

            <p>
              Finally, treat a palette as a living document. As you add features or enter
              new markets, revisit accent colors and neutrals, but avoid uncontrolled growth:
              if every new screen introduces a fresh accent, visual noise climbs quickly.
              Export JSON from this tool to archive versions in your repository, or attach a
              palette PNG to design critiques so stakeholders discuss the same reference.
              Because processing stays on your device, you can iterate freely without
              uploading sensitive brand assets.
            </p>

            <p>
              Whether you are prototyping a landing page, refreshing a mobile app shell, or
              preparing mood boards for a client, a dependable palette workflow saves time.
              Use random mode when you need inspiration fast, image mode when you need
              fidelity to existing visuals, and the copy and export actions when you are
              ready to ship values into Figma tokens or production stylesheets.
            </p>

            <p>
              SmartFlexa keeps the heavy lifting in your browser so you can experiment on
              flights, in client offices, or anywhere with spotty connectivity. Download the
              palette image for slide decks, keep JSON exports next to your design tokens in
              Git, and combine this flow with our{" "}
              <Link
                href="/tools/color-picker"
                className="font-medium text-foreground underline"
              >
                Color Picker
              </Link>{" "}
              when you need to fine-tune a single swatch after the palette is approved. That
              combination—broad exploration plus precise adjustment—is how teams ship color
              systems without losing momentum.
            </p>
          </article>

          <section className="mt-14" aria-labelledby="palette-faq-heading">
            <h2
              id="palette-faq-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-8">
              <div>
                <dt className="font-semibold text-foreground">
                  How do I generate a color palette?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Choose Random palette, tap Regenerate until the harmony feels right, and
                  lock any swatches you want to preserve. Tap HEX or RGB on a swatch to copy
                  that code to your clipboard.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  How do I extract colors from an image?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Switch to From image and upload a raster file. The tool downsamples it
                  locally, clusters similar pixels, and surfaces five or six dominant colors.
                  Regenerate adjusts sampling so you can explore alternatives from the same
                  file.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">What is a HEX color?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  HEX is a six-digit hexadecimal notation (with a leading #) that encodes the
                  red, green, and blue channels of a color. It is compact and ideal for CSS,
                  design specs, and sharing between teams.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  How do I use a color palette in design?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Map colors to roles such as primary, neutral, success, and danger. Reuse
                  them across typography, charts, and components. Export CSS variables for code
                  or paste HEX values into your design tool of choice.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  What are good color combinations?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Complementary, analogous, and triadic schemes are reliable starting points.
                  For interfaces, favor restrained accents, plenty of neutral space, and
                  contrast-checked text pairs so the result stays legible in sunlight and
                  accessibility audits alike.
                </dd>
              </div>
            </dl>
          </section>

          <div className="mt-14 space-y-10">
            <PaletteRelatedToolLinks />
            <TextToImageInboundLinks />
            <RelatedTools currentPath="/tools/color-palette-generator" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
