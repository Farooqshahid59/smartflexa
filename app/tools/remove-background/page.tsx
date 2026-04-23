import Link from "next/link";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RemoveBgRelatedToolLinks } from "@/components/remove-bg-related-tool-links";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

import { RemoveBackgroundTool } from "./remove-background-tool";

const removeBgFaqJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I remove background from an image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload a JPG or PNG, choose a method (border flood-fill for uniform edges, bright threshold for white backdrops, or pick color after clicking the photo), adjust tolerance or cutoff, then Apply and Download PNG. Everything runs locally in your browser on SmartFlexa.",
      },
    },
    {
      "@type": "Question",
      name: "Is this tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The SmartFlexa background remover is free to use with no signup required for basic cutouts.",
      },
    },
    {
      "@type": "Question",
      name: "Does it support PNG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can upload PNG or JPEG, and the exported file is PNG so transparency is preserved when you do not enable the solid color replacement option.",
      },
    },
    {
      "@type": "Question",
      name: "How do I make a background transparent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use border matching or pick color for flat backgrounds, or bright threshold for light studio walls. Leave the solid color checkbox off, apply processing, then download the PNG with an alpha channel.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best background remover tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Professional designers combine AI services for hair-level detail with lightweight local tools for bulk product shots on solid colors. SmartFlexa targets the second case: predictable, private, and fast for JPG/PNG when you already control lighting.",
      },
    },
  ],
};

export default function RemoveBackgroundPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.removeBackgroundTool)} />
      <JsonLd data={removeBgFaqJsonLd} />
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
        aria-labelledby="remove-bg-heading"
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
            <span className="text-foreground">Remove Background</span>
          </nav>

          <h1
            id="remove-bg-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Remove Background from Image Free (Online Background Remover)
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Upload a <strong className="text-foreground">JPG</strong> or{" "}
            <strong className="text-foreground">PNG</strong>, then use edge-connected color
            matching, a brightness threshold, or a sampled color—<strong className="text-foreground">no AI models</strong>,{" "}
            no server upload. Preview side by side, optionally fill removed pixels with white or a
            custom hex color, and download a PNG.
          </p>

          <div className="mt-10">
            <RemoveBackgroundTool />
          </div>

          <article className="mt-16 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What is background removal?
            </h2>
            <p>
              <strong className="text-foreground">Background removal</strong> separates the subject
              you care about—person, product, icon—from everything else in the frame. In e-commerce
              that often means a neutral catalog shot on pure white for marketplaces; in presentations
              it means dropping a logo onto slides without a gray rectangle from the original export.
              The operation can be manual (designer tracing paths), statistical (treating similar
              pixels as disposable), or learned from millions of portraits. SmartFlexa deliberately
              stays in the statistical family so the tool stays small, auditable, and suitable for
              regulated devices that cannot call external inference APIs.
            </p>
            <p>
              Transparency is the usual output: PNG stores an alpha channel per pixel so soft
              edges can anti-alias against any future backdrop. When you instead need a flat JPEG
              for a legacy CMS, enable the solid color replacement and treat the result as a
              finished asset rather than a layered source file.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">How it works</h2>
            <p>
              The default <strong className="text-foreground">border color</strong> mode averages RGB
              values along the image perimeter, then flood-fills outward from any edge pixel whose
              color is within your tolerance of that average. Connected uniform backdrops disappear
              while interior regions that do not touch the border stay intact—ideal for objects on
              seamless paper. Large photos are analyzed on a downscaled copy for speed, then the
              mask is mapped back to full resolution with nearest-neighbor sampling so interactive
              tweaks stay responsive.
            </p>
            <p>
              <strong className="text-foreground">Bright backdrop</strong> mode ignores border color
              and instead removes pixels whose luminance exceeds a slider threshold—handy when the
              wall behind a product is slightly off-white but still much brighter than the subject.
              <strong className="text-foreground"> Pick color</strong> mode lets you click the
              original preview to sample an exact RGB value, then removes everything within the
              tolerance sphere in color space—useful for chroma-like greens when you control the
              paint chip. None of these modes understand hair wisps the way a neural matting model
              would; they shine when the background is simple and the subject contrasts clearly.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">When to use it</h2>
            <p>
              Reach for this page when you already shot packshots on a sweep, scanned signatures on
              yellow legal pads you want to neutralize, or exported UI icons on a flat hex field. For
              wedding portraits on busy parks, expect to finish in a dedicated editor. After you are
              happy with a PNG, run the file through SmartFlexa’s{" "}
              <Link
                href="/tools/image-compressor"
                className="font-medium text-foreground underline"
              >
                Image Compressor
              </Link>{" "}
              if email quotas bite, or{" "}
              <Link href="/tools/resize-image" className="font-medium text-foreground underline">
                Resize Image
              </Link>{" "}
              when a platform demands exact pixel bounds. Converting to{" "}
              <Link href="/tools/image-to-webp" className="font-medium text-foreground underline">
                WebP
              </Link>{" "}
              is best attempted only after you decide whether you still need an alpha channel in the
              target format.
            </p>
            <p>
              Because pixels never leave your machine, you can process NDAs and pre-release product
              shots on flights or in client offices—just remember to wipe downloads from shared
              laptops when the meeting ends.
            </p>
          </article>

          <section className="mt-14 max-w-3xl" aria-labelledby="remove-bg-faq-heading">
            <h2
              id="remove-bg-faq-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-8 text-base">
              <div>
                <dt className="font-semibold text-foreground">
                  How do I remove background from an image?
                </dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Upload JPG or PNG, pick a method, tune sliders, tap Apply, then Download PNG.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Yes—SmartFlexa offers this remover at no cost for typical personal and work use.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Does it support PNG?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Yes for both input and lossless PNG output with transparency.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">How do I make a background transparent?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Disable solid color replacement, choose the algorithm that matches your shot, and
                  export the PNG preview.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">What are the best background remover tools?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Use AI matting when hair and glass demand it; use lightweight local tools like this
                  one for uniform backdrops and privacy-sensitive batches.
                </dd>
              </div>
            </dl>
          </section>

          <div className="mt-14 space-y-10">
            <RemoveBgRelatedToolLinks />
            <RelatedTools currentPath="/tools/remove-background" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
