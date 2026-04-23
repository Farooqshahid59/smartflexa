import Link from "next/link";

import { PassportPhotoMakerTool } from "@/app/tools/passport-photo-maker/passport-photo-maker-tool";
import { PassportHubCrossLinks } from "@/components/passport-hub-cross-links";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function TwoByTwoPhotoMakerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.twoByTwoPhotoMaker)} />
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
        aria-labelledby="2x2-photo-heading"
      >
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">2×2 photo maker</span>
          </nav>

          <h1
            id="2x2-photo-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            2×2 photo maker online
          </h1>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              A <strong className="text-foreground">2×2</strong> label on a PDF usually means
              &quot;give us a square print that measures two inches on each side once it is
              inked.&quot; That shape shows up far beyond federal passports: notary journals,
              youth sports IDs, internal HR badges, and summer-camp medical forms all borrow the
              same shorthand even when nobody mentions the word passport. Because the request
              is square, your camera roll is easier to reuse than when a European form asks for
              a tall 35×45 mm frame.
            </p>
            <p>
              The generator on this route is literally the same canvas engine as our other
              passport pages—upload, drag a square crop, and land on a{" "}
              <strong className="text-foreground">600×600 pixel</strong> JPEG sitting on a clean
              white field. From there you can print at true size on a colour printer, drop the
              file into a pharmacy kiosk template, or attach it wherever the instructions allow
              a digital upload. If your packet demands a different pixel count, jump to the{" "}
              <strong className="text-foreground">Custom</strong> size fields instead of the USA
              preset.
            </p>
            <p>
              We keep the tone practical on purpose: lighting tips, lint on a collar, or a
              slightly tilted head are the things that cause rejections more often than a few
              missing pixels. Iterate locally, compare against any diagram the issuer gives you,
              and remember that embassies, universities, and HR portals each publish their own
              addenda—read those before you hit submit.
            </p>
          </div>

          <section
            className="mt-10 rounded-lg border border-border bg-card/50 p-5 sm:p-6"
            aria-labelledby="2x2-requirements-heading"
          >
            <h2
              id="2x2-requirements-heading"
              className="text-lg font-semibold tracking-tight text-foreground"
            >
              When &quot;2×2&quot; shows up on a form (summary)
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>
                <strong className="text-foreground">Geometry:</strong> finished artwork is
                expected to be <strong className="text-foreground">square</strong> before anyone
                adds rounded corners in a layout program.
              </li>
              <li>
                <strong className="text-foreground">Preset export here:</strong>{" "}
                <strong className="text-foreground">600×600 px</strong> at high quality—handy
                when nobody lists pixels but the print shop knows the inch size.
              </li>
              <li>
                <strong className="text-foreground">Colour:</strong> most US-facing packets
                still expect a white or near-white backdrop rather than brand colours.
              </li>
              <li>
                <strong className="text-foreground">Attire:</strong> business-casual is fine for
                many internal badges; government photos may forbid uniforms—match the PDF you
                received.
              </li>
              <li>
                <strong className="text-foreground">Proofing:</strong> open the JPG at 100%
                zoom; if you see JPEG blocks around the ears, upload a higher-resolution source
                photo.
              </li>
            </ul>
          </section>

          <h2 id="2x2-passport-tool-heading" className="sr-only">
            2×2 photo editor
          </h2>
          <div className="mt-10">
            <PassportPhotoMakerTool
              defaultPreset="usa"
              headingId="2x2-passport-tool-heading"
              presetRadioName="passport-preset-2x2"
            />
          </div>

          <PassportHubCrossLinks exclude="2x2" />

          <div className="mt-14">
            <RelatedTools currentPath="/2x2-photo-maker" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
