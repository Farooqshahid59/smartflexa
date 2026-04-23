import Link from "next/link";

import { PassportPhotoMakerTool } from "@/app/tools/passport-photo-maker/passport-photo-maker-tool";
import { PassportHubCrossLinks } from "@/components/passport-hub-cross-links";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function PassportPhotoSizeUsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.passportPhotoSizeUs)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="us-passport-photo-heading">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">US passport photo size</span>
          </nav>

          <h1
            id="us-passport-photo-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            US passport photo size (2×2 inches)
          </h1>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              If you are renewing a passport or filling out a DS-11-style application, the
              photo spec most Americans hear first is simple on paper:{" "}
              <strong className="text-foreground">two inches by two inches</strong>. That
              measurement refers to the final printed picture, not your phone screen. In
              practice, many online renewals and third-party uploaders ask for a{" "}
              <strong className="text-foreground">square digital file</strong> with enough
              pixels that your face stays sharp when someone prints it at true size.
            </p>
            <p>
              This page pairs a short, practical checklist with the same SmartFlexa editor we
              use on our main tool: you upload a portrait, draw a square crop around your head
              and shoulders, and export a{" "}
              <strong className="text-foreground">600×600 pixel</strong> JPEG on a plain white
              background—a combination many home workflows use alongside a 2×2 inch print
              target. You can still switch presets if you are also preparing a different
              country&apos;s form in the same session.
            </p>
            <p>
              We are not a government site. Rules for glasses, head coverings, lighting, and
              exact digital dimensions can change with the channel you use (online renewal vs.
              in-person vs. a partner upload). Treat the numbers here as a{" "}
              <strong className="text-foreground">starting point</strong>, then compare them to
              the latest guidance from the U.S. Department of State or your enrollment office
              before you pay fees or mail a packet.
            </p>
          </div>

          <section
            className="mt-10 rounded-lg border border-border bg-card/50 p-5 sm:p-6"
            aria-labelledby="us-requirements-heading"
          >
            <h2
              id="us-requirements-heading"
              className="text-lg font-semibold tracking-tight text-foreground"
            >
              US-style checklist (summary)
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>
                <strong className="text-foreground">Print size:</strong> commonly quoted as{" "}
                <strong className="text-foreground">2×2 inches</strong> for the finished photo.
              </li>
              <li>
                <strong className="text-foreground">Digital export here:</strong>{" "}
                <strong className="text-foreground">600×600 px</strong> square JPEG with a
                white mat around your crop when the frame is taller than it is wide.
              </li>
              <li>
                <strong className="text-foreground">Background:</strong> plain white or
                off-white; no patterns, no shadows cast by the chair behind you.
              </li>
              <li>
                <strong className="text-foreground">Pose:</strong> face the camera, eyes open,
                neutral expression unless the instructions you are following say otherwise.
              </li>
              <li>
                <strong className="text-foreground">Recency:</strong> use a photo taken within
                the window your form specifies (often within the last six months).
              </li>
            </ul>
          </section>

          <h2 id="us-passport-tool-heading" className="sr-only">
            US passport photo editor
          </h2>
          <div className="mt-10">
            <PassportPhotoMakerTool
              defaultPreset="usa"
              headingId="us-passport-tool-heading"
              presetRadioName="passport-preset-us"
            />
          </div>

          <PassportHubCrossLinks exclude="us" />

          <div className="mt-14">
            <RelatedTools currentPath="/passport-photo-size-us" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
