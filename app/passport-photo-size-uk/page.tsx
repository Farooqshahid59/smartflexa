import Link from "next/link";

import { PassportPhotoMakerTool } from "@/app/tools/passport-photo-maker/passport-photo-maker-tool";
import { PassportHubCrossLinks } from "@/components/passport-hub-cross-links";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function PassportPhotoSizeUkPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.passportPhotoSizeUk)} />
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
        aria-labelledby="uk-passport-photo-heading"
      >
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">UK passport photo size</span>
          </nav>

          <h1
            id="uk-passport-photo-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            UK passport photo size (35×45 mm)
          </h1>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              His Majesty&apos;s Passport Office publishes clear rules for what counts as an
              acceptable image, but applicants still get tripped up translating{" "}
              <strong className="text-foreground">millimetre measurements</strong> into the
              JPEG their laptop creates. The print measurement you will see most often for an
              adult passport book is <strong className="text-foreground">35×45 mm</strong>—a
              little shorter and narrower than a credit card, with your chin and crown
              positioned within a defined band on the template.
            </p>
            <p>
              Digital submissions sometimes arrive through GOV.UK&apos;s photo tool, a high-street
              booth that prints a code, or a bring-your-own upload. Each channel can phrase the
              pixel requirements differently even when the underlying print size stays the
              same. The SmartFlexa workflow below begins from a{" "}
              <strong className="text-foreground">413×531 pixel</strong> frame, which many
              designers use when they approximate 35×45 mm at about 300 dpi. Swap to{" "}
              <strong className="text-foreground">Custom</strong> if the checker on the page you
              are using demands another resolution.
            </p>
            <p>
              Babies, toddlers, and people who need religious head coverings follow extra
              paragraphs in the official guidance—this landing page cannot replace those
              notes. What we can do is help you rehearse lighting, crop, and background at
              home before you spend money on a rejected upload. Everything renders in your
              browser, so you can tweak glasses glare or stray hairs without sending the file
              through an unknown cloud pipeline.
            </p>
          </div>

          <section
            className="mt-10 rounded-lg border border-border bg-card/50 p-5 sm:p-6"
            aria-labelledby="uk-requirements-heading"
          >
            <h2
              id="uk-requirements-heading"
              className="text-lg font-semibold tracking-tight text-foreground"
            >
              UK-oriented checklist (summary)
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>
                <strong className="text-foreground">Printed size:</strong> frequently listed as{" "}
                <strong className="text-foreground">35×45 mm</strong> for standard adult photos.
              </li>
              <li>
                <strong className="text-foreground">Preset export here:</strong>{" "}
                <strong className="text-foreground">413×531 px</strong> JPEG with a white mat if
                your square crop is letterboxed into the taller frame.
              </li>
              <li>
                <strong className="text-foreground">Lighting:</strong> even illumination on
                both cheeks; avoid strong shadows that make automated checks think you are
                wearing tinted lenses.
              </li>
              <li>
                <strong className="text-foreground">Expression:</strong> plain smile or neutral
                face depending on the rule set you are following—double-check the wording for
                your specific product (first adult passport vs. renewal, etc.).
              </li>
              <li>
                <strong className="text-foreground">Quality check:</strong> zoom to 100% after
                export; blocky edges usually mean the source photo was too small—retake if
                needed.
              </li>
            </ul>
          </section>

          <h2 id="uk-passport-tool-heading" className="sr-only">
            UK passport photo editor
          </h2>
          <div className="mt-10">
            <PassportPhotoMakerTool
              defaultPreset="uk"
              headingId="uk-passport-tool-heading"
              presetRadioName="passport-preset-uk"
            />
          </div>

          <PassportHubCrossLinks exclude="uk" />

          <div className="mt-14">
            <RelatedTools currentPath="/passport-photo-size-uk" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
