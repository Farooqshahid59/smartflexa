import Link from "next/link";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { TextToImageRelatedToolLinks } from "@/components/text-to-image-related-tool-links";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

import { TextToImageTool } from "./text-to-image-tool";

const textToImageFaqJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I convert text to image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Type or paste your copy into the text area, choose a font and size, set text and background colors (or upload a background photo), adjust padding and line spacing, then use the live canvas preview. When it looks right, download PNG or JPG—all processing happens in your browser on SmartFlexa.",
      },
    },
    {
      "@type": "Question",
      name: "How do I create a quote image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the Quote style preset for a balanced square layout, then edit the quote, tweak colors, and enable center alignment. Increase padding for a calmer card or reduce it for a tighter crop. Export PNG for lossless text edges or JPG for smaller file size.",
      },
    },
    {
      "@type": "Question",
      name: "Can I download the image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Use the PNG or JPG buttons to save the canvas at full resolution (up to 2048 pixels per side). Your wording is flattened into pixels at export time.",
      },
    },
    {
      "@type": "Question",
      name: "What formats are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Downloads are PNG or JPEG. Background uploads accept common raster formats such as JPG, PNG, and WebP in modern browsers.",
      },
    },
    {
      "@type": "Question",
      name: "Is this tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SmartFlexa offers this text-to-image generator free for typical personal and work use with no paywall on the export buttons.",
      },
    },
  ],
};

export default function TextToImagePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.textToImageTool)} />
      <JsonLd data={textToImageFaqJsonLd} />
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
        aria-labelledby="tti-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
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
            <span className="text-foreground">Text to Image</span>
          </nav>

          <h1
            id="tti-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Text to Image Generator Free (Create Quote Images Online)
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Turn lines of text into a <strong className="text-foreground">shareable graphic</strong>{" "}
            with fonts, colors, padding, and optional photo backgrounds. Preview updates live on a
            canvas, then download <strong className="text-foreground">PNG</strong> or{" "}
            <strong className="text-foreground">JPG</strong>—fast, private, and{" "}
            <strong className="text-foreground">client-side</strong> on SmartFlexa.
          </p>

          <div className="mt-10">
            <TextToImageTool />
          </div>

          <article className="mt-16 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What is a text-to-image tool?
            </h2>
            <p>
              In this context, a <strong className="text-foreground">text-to-image</strong> utility
              is not a diffusion model that invents pixels from a prompt. It is closer to a digital
              typesetter: you supply the exact words, choose how they should look, and the page
              rasterizes those glyphs onto a bitmap you can post anywhere an image is accepted. That
              distinction matters for teams who need predictable branding—approved fonts, hex colors
              from a style guide, and line breaks they control—without sending proprietary copy to an
              inference API.
            </p>
            <p>
              SmartFlexa renders through the HTML canvas API, which modern browsers optimize heavily.
              That keeps interactions snappy even on mid-range laptops: adjust a slider and the
              preview redraws in the same frame budget as a lightweight game sprite. Because nothing
              is uploaded for rendering, drafts of leadership quotes, customer testimonials, or
              internal announcements stay on the device until you deliberately save a file.
            </p>
            <p>
              You can still treat the output like any other bitmap: drop it into presentation decks,
              append it to PDF newsletters, or paste it into collaborative whiteboards. The canvas
              stores true RGB values (plus opaque alpha when you use solid backgrounds), so zooming
              inside a slide remains predictable as long as you exported at a resolution that matches
              your final display density.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to create quote images
            </h2>
            <p>
              Start with the <strong className="text-foreground">Quote style</strong> preset to load
              a balanced square format, generous padding, and serif typography suited to pull quotes.
              Paste the quotation in the text area, preserving line breaks if the author wrote in
              stanzas. Increase <strong className="text-foreground">line spacing</strong> when a
              passage feels cramped, or tighten it for punchy one-liners. Toggle{" "}
              <strong className="text-foreground">center alignment</strong> so multi-line blocks sit
              visually centered inside the safe area defined by your padding.
            </p>
            <p>
              Color choice drives readability more than font novelty. High-contrast pairs—ink
              navy behind off-white type, or soft gray type on charcoal—tend to survive aggressive
              compression on chat apps. When you must place text on photography, switch the
              background mode to <strong className="text-foreground">image</strong>, upload a still,
              and rely on the automatic dim overlay so letterforms stay legible without manual
              masking. Finish by exporting PNG when you care about crisp edges, or JPG when file size
              is the bottleneck for email attachments.
            </p>
            <p>
              If a quote spans more than six lines, consider splitting it into two sequential
              graphics rather than shrinking font size to illegibility—your audience can swipe or tap
              through a thread while each card stays readable at thumbnail scale.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Use cases: social media and status graphics
            </h2>
            <p>
              Marketing teams schedule dozens of micro-graphics per month: LinkedIn carousels,
              Instagram squares, ephemeral status updates, and Slack announcements. A canvas-based
              generator accelerates the long tail of simple posts—celebrating a launch metric,
              sharing a policy reminder, or highlighting an employee resource group event—without
              opening a heavyweight design suite for each variant.
            </p>
            <p>
              Creators also reuse the same layout with swapped hex values to match campaign landing
              pages. After export, run the asset through SmartFlexa&apos;s{" "}
              <Link href="/tools/resize-image" className="font-medium text-foreground underline">
                Resize Image
              </Link>{" "}
              tool if a platform enforces odd dimensions, or{" "}
              <Link
                href="/tools/image-compressor"
                className="font-medium text-foreground underline"
              >
                Image Compressor
              </Link>{" "}
              when mobile viewers complain about load time. If you are still exploring palettes, the{" "}
              <Link
                href="/tools/color-palette-generator"
                className="font-medium text-foreground underline"
              >
                Color Palette Generator
              </Link>{" "}
              pairs naturally with this page: sample or randomize swatches, copy HEX codes, and paste
              them back into the pickers here.
            </p>
            <p>
              Remember that raster text is not selectable by followers; put the raw quote in the
              caption for accessibility and search. Keep source documents so you can revise wording
              without upscaling a previously exported JPEG, which would soften edges.
            </p>
            <p>
              Status-style updates in Slack or Microsoft Teams benefit from the same workflow: a
              tasteful card draws eyes in busy channels, yet you avoid bulky PDFs or animated GIFs
              when leadership only needs a single sentence of context before a meeting link.
            </p>
          </article>

          <section className="mt-14 max-w-3xl" aria-labelledby="tti-faq-heading">
            <h2
              id="tti-faq-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-8 text-base">
              <div>
                <dt className="font-semibold text-foreground">How do I convert text to image?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Enter your text, style it with fonts and colors, watch the canvas preview update,
                  then tap PNG or JPG to download.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">How do I create a quote image?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Apply the Quote style preset, edit your lines, adjust padding and line spacing, and
                  export when the layout matches your brand.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Can I download the image?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Yes—PNG and JPG downloads use the full canvas resolution shown in the controls.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">What formats are supported?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Output is PNG or JPEG. Background uploads support common image types supported by
                  your browser, such as JPG, PNG, and WebP.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Yes, SmartFlexa provides this generator at no charge for typical use.
                </dd>
              </div>
            </dl>
          </section>

          <div className="mt-14 space-y-10">
            <TextToImageRelatedToolLinks />
            <RelatedTools currentPath="/tools/text-to-image" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
