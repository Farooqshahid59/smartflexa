"use client";

import Link from "next/link";

import { SignatureGeneratorTool } from "@/app/tools/signature-generator/signature-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { SignatureRelatedToolLinks } from "@/components/signature-related-tool-links";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const signatureFaqJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I create a digital signature?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use SmartFlexa’s signature generator: choose Draw to sign with your mouse or finger, or Type to enter your name and pick a script font. Adjust color and thickness, then download a PNG. For transparent inserts, leave the transparent background option on.",
      },
    },
    {
      "@type": "Question",
      name: "Is an online signature legal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on jurisdiction, document type, and whether the law accepts simple image signatures, cryptographic e-signatures, or wet ink. A PNG from a generator is often used informally or where an image is accepted; for binding contracts use the method your lawyer or platform specifies.",
      },
    },
    {
      "@type": "Question",
      name: "How do I draw a signature online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open Draw mode, use a stylus or trackpad on the canvas, set pen thickness and color, then download PNG. Touch devices are supported. Clear and redraw until you like the stroke.",
      },
    },
    {
      "@type": "Question",
      name: "Typed signature vs drawn signature—which should I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Drawn signatures mimic handwriting and feel personal; typed signatures use stylized fonts and stay legible at small sizes. Pick whichever your form or brand guidelines ask for.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this for documents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes for many PDFs, slides, and image-based forms: download the PNG and insert it where a picture is allowed. If the document requires a certified e-sign provider, use that service instead.",
      },
    },
  ],
};

export default function SignatureGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.signatureGenerator)} />
      <JsonLd data={signatureFaqJsonLd} />
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
        aria-labelledby="signature-generator-heading"
      >
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
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
            <span className="text-foreground">Signature Generator</span>
          </nav>

          <h1
            id="signature-generator-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Signature Generator Online Free (Draw or Type Your Signature)
          </h1>
          <p className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Create your digital signature online for free. Draw with your mouse or finger, or
            type your name in script fonts—then download a PNG with optional transparent
            background. Runs entirely in your browser.
          </p>

          <p className="mt-6 text-sm text-muted-foreground">
            Also try:{" "}
            <Link href="/draw-signature-online" className="font-medium text-foreground underline">
              draw signature online
            </Link>
            ,{" "}
            <Link href="/type-signature-online" className="font-medium text-foreground underline">
              type signature online
            </Link>
            , or{" "}
            <Link
              href="/digital-signature-generator"
              className="font-medium text-foreground underline"
            >
              digital signature generator
            </Link>
            .
          </p>

          <div className="mt-8">
            <SignatureGeneratorTool />
          </div>

          <article className="mt-14 space-y-10" aria-labelledby="signature-seo-heading">
            <h2
              id="signature-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              About digital signatures and this tool
            </h2>

            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              What is a digital signature?
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              In everyday language, people use &quot;digital signature&quot; to mean two
              different things. The first is a <strong className="text-foreground">picture of a
              signature</strong>—usually a PNG with transparent pixels around the ink—dropped
              into a PDF, an email footer, or a web form. The second meaning is a{" "}
              <strong className="text-foreground">cryptographic signature</strong> created by
              certificate software that proves a file was not altered after signing. SmartFlexa
              helps with the first kind: a fast, visual signature you can draw or type and save
              as an image. If your bank or employer asks for a qualified electronic signature,
              follow their portal instead.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A good image signature stays sharp when resized, has enough contrast against
              white paper, and does not include random background clutter from your kitchen
              counter. That is why we give you a clean canvas, a color picker defaulting to
              black, and a transparent export toggle—so designers can stack your ink on top of
              stationery without a white rectangle showing through.
            </p>

            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              How to create a signature online
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Start with <strong className="text-foreground">Draw</strong> if you want your real
              handwriting: open the tool on a laptop with a trackpad or on a phone with a
              stylus, slow down slightly for smoother curves, and use the thickness slider so
              thin strokes stay visible after printing. Use <strong className="text-foreground">
              Clear canvas
              </strong> whenever you want a fresh attempt; nothing leaves your device until you
              click download.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Prefer a polished wordmark? Switch to <strong className="text-foreground">Type
              </strong>, enter your name or initials, and tap through the seven preview tiles.
              Each tile loads a different script-style Google Font so you can compare moods—from
              casual brush scripts to more formal flowing styles. The export uses the selected
              font and your ink color, centered on a wide PNG that is easy to drop into Word,
              Google Docs, or PowerPoint.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              After exporting, zoom to 100% in an image viewer. If edges look fuzzy, increase
              your source stroke weight or shorten typed text so the letters can render larger.
              For PDF editors that flatten transparency oddly, turn off the transparent
              background checkbox to bake in a white mat, then re-download.
            </p>

            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              Common use cases
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Teams use signature images on <strong className="text-foreground">internal
              approvals</strong>, cover letters, freelance invoices, and school permission slips
              where a handwritten look is enough. HR might collect typed-style signatures for
              badge layouts, while legal departments still route binding contracts through
              dedicated e-sign vendors. Marketing slides sometimes need a founder signature
              next to a quote—typed mode keeps that consistent across decks.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Because the generator is <strong className="text-foreground">client-side only
              </strong>, you can iterate during a video call, tweak color to match brand
              guidelines, and avoid uploading sensitive drafts to a third-party server. Pair the
              PNG with our{" "}
              <Link href="/tools/password-generator" className="font-medium text-foreground underline">
                Password Generator
              </Link>{" "}
              when onboarding accounts, or tidy casing with the{" "}
              <Link
                href="/tools/text-case-converter"
                className="font-medium text-foreground underline"
              >
                Text Case Converter
              </Link>{" "}
              before placing a legal name under your sign-off.
            </p>

            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              Performance and privacy
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              The canvas redraws at your device&apos;s pixel ratio (capped for sanity) so lines
              stay crisp on Retina displays without you micromanaging width math. Typed exports
              wait for <code className="rounded bg-muted px-1 py-0.5 text-sm">document.fonts</code>{" "}
              when possible so script faces rasterize cleanly instead of falling back to Times
              New Roman mid-download. If a font is still loading, give the preview tiles a
              second glance before clicking download—the browser will catch up quickly on a
              warm connection.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Privacy-wise, your signature never leaves the tab until you choose Save. That
              makes the tool friendly for NDAs and prototype reviews where even a &quot;trusted&quot;
              upload endpoint feels like one hop too many. Clear the canvas before handing the
              laptop to a colleague, and remember that anyone with file access can copy a PNG
              signature—pair visual sign-offs with access controls the same way you would for a
              scanned PDF.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">How do I create a digital signature?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Pick Draw or Type, customize appearance, then click{" "}
                  <strong className="text-foreground">Download PNG</strong>. The file saves
                  locally; nothing is uploaded to SmartFlexa for processing.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is an online signature legal?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  It depends on context. Image signatures work for many informal or internal
                  documents; regulated industries may require specific e-sign platforms or wet
                  ink. When in doubt, ask the party receiving the file.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">How do I draw a signature online?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Use Draw mode, press and drag on the canvas with mouse, trackpad, or touch, and
                  adjust pen thickness and color. Clear and retry until you are happy, then
                  export.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Typed vs drawn signature—which should I use?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Drawn signatures feel personal and mimic ink. Typed signatures stay legible at
                  small sizes and stay on-brand when you pick one font and reuse it. Match what
                  your template requests.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Can I use this for documents?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes when the document accepts an image: insert the PNG into PDF or Office
                  files. If the workflow demands a certified digital certificate, use the
                  provider your organization mandates.
                </dd>
              </div>
            </dl>

            <SignatureRelatedToolLinks />

            <RelatedTools
              currentPath="/tools/signature-generator"
              heading="More tools"
            />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
