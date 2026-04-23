"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

import { PassportPhotoMakerTool } from "./passport-photo-maker-tool";

const passportFaqJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a passport size photo in pixels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the country and the form. Many US-style uploads use a square file such as 600×600 pixels for a 2×2 inch look. UK and India digital submissions often use sizes like 413×531 pixels when a 35×45 mm print is converted at about 300 DPI. Always match the pixel size listed on your official application.",
      },
    },
    {
      "@type": "Question",
      name: "How do I make a 2×2 passport photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload a clear portrait, crop your head and shoulders with the square crop tool, choose the USA preset (600×600 px for a common 2×2 style), then download the JPG. Print at true size if your printer allows, or send the file to a photo kiosk. Confirm head height and background rules on your government site.",
      },
    },
    {
      "@type": "Question",
      name: "What is passport photo size in inches?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A widely used US specification is 2 inches wide by 2 inches tall (2×2). Other countries often specify millimetres instead—for example 35×45 mm is common for UK and India printed passport photos. Your application’s checklist is the source of truth.",
      },
    },
  ],
};

export default function PassportPhotoMakerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.passportPhotoMaker)} />
      <JsonLd data={passportFaqJsonLd} />
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
        aria-labelledby="passport-photo-heading"
      >
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-8 text-center sm:text-left">
            <nav aria-label="Breadcrumb">
              <p className="text-sm font-medium text-muted-foreground">
                <a href="/" className="hover:text-foreground">
                  Home
                </a>
                <span className="mx-2 text-border" aria-hidden>
                  /
                </span>
                <span>Tools</span>
                <span className="mx-2 text-border" aria-hidden>
                  /
                </span>
                <span className="text-foreground">Passport Photo Maker</span>
              </p>
            </nav>
            <h1
              id="passport-photo-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Passport Size Photo Maker Online Free (2×2, Visa Photos)
            </h1>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Make passport- and visa-style pictures at home: upload, square crop, pick US
              2×2, India or UK 35×45 mm presets (or custom pixels), then download a JPG on a
              white background or an A4 print sheet. Free, fast, and processed only in your
              browser.
            </p>
          </div>

          <h2 id="passport-tool-section-heading" className="sr-only">
            Passport photo editor
          </h2>
          <PassportPhotoMakerTool
            defaultPreset="usa"
            headingId="passport-tool-section-heading"
          />

          <article className="mt-14 space-y-10" aria-labelledby="passport-seo-heading">
            <h2
              id="passport-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Passport and visa photos: quick guide
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Below is a plain-language overview of passport photo sizes, how to make a file
              online, and how common rules differ between the US, UK, and India. Use it
              alongside the tool above, then always confirm the latest requirements on your
              official application before you submit.
            </p>

            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              What is passport photo size?
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              When people talk about passport photo size, they usually mean two related
              ideas: the size on paper (often in inches or millimetres) and the size of the
              digital file (in pixels) for online uploads. Both describe how wide and tall
              your picture should be so printers and government systems get a consistent
              result.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A passport-style image is not only about width and height. Most guides also ask
              for a plain background, your face centred in the frame, and enough resolution
              that your features stay sharp when printed. Rules are not identical everywhere:
              one country may prefer a square digital file while another asks for a taller
              rectangle. That is why the safest habit is to read the checklist on the
              official site first, then match those numbers in a photo maker instead of
              guessing from a random template you found online.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              You will often see references to a{" "}
              <strong className="text-foreground">2×2 inch</strong> layout for many United
              States passport and visa examples, and to{" "}
              <strong className="text-foreground">35×45 millimetres</strong> for many United
              Kingdom and India printed photos. Those sound different because the units
              differ, but they both describe a small, standard head-and-shoulders portrait.
            </p>

            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              How to make a passport photo online
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              You do not always need a photo booth. If you already have a clear picture from
              your phone or camera—face forward, even lighting, no heavy filters—you can
              often turn it into a passport- or visa-style file in a few minutes at home.
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>
                <strong className="text-foreground">Prepare the shot.</strong> Stand a short
                distance from the wall, avoid harsh shadows, and leave a little space above
                your head. Check whether your authority allows glasses, hats, or jewellery.
              </li>
              <li>
                <strong className="text-foreground">Upload and crop.</strong> Use the tool
                above: upload a JPG, PNG, or WebP file, then drag on the image to set a{" "}
                <strong className="text-foreground">square crop</strong> around your head and
                shoulders. You can drag again any time to refine it.
              </li>
              <li>
                <strong className="text-foreground">Pick the output size.</strong> Choose the
                USA preset for a common 2×2 style (600×600 px), the India or UK preset for a
                typical 35×45 mm digital size (413×531 px), or enter{" "}
                <strong className="text-foreground">custom width and height</strong> if your
                form lists exact pixels.
              </li>
              <li>
                <strong className="text-foreground">Download and check.</strong> Save the
                JPG with the white background, zoom in to confirm edges look smooth, and use
                the optional A4 sheet if you want several copies on one page for home
                printing. Processing runs in your browser, so your image is not sent to our
                servers for editing.
              </li>
            </ol>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Many <strong className="text-foreground">visa photos</strong> follow the same
              general sizes as passport photos for a given country, but embassies sometimes
              publish their own diagrams or pixel lists. If your visa checklist names a
              specific resolution, use the custom fields so the export matches it exactly.
            </p>

            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              Country size differences: US, UK, and India
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              <strong className="text-foreground">United States</strong> — US guidance often
              highlights a <strong className="text-foreground">2×2 inch</strong> printed
              photograph. Online systems may ask for a square digital upload;{" "}
              <strong className="text-foreground">600×600 pixels</strong> is a practical choice
              when you need a sharp square file that lines up with that print size at home.
              Head height, expression, and background rules still come from the official
              instructions, so read those alongside the dimensions.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              <strong className="text-foreground">United Kingdom</strong> — UK passport photos
              are frequently described as <strong className="text-foreground">35×45 mm</strong>{" "}
              when printed. Digital portals may specify their own pixel sizes. Our UK preset
              uses <strong className="text-foreground">413×531 pixels</strong>, a common
              conversion when a form assumes print at about 300 DPI. Treat it as a helpful
              default, then align with the exact portal you use.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              <strong className="text-foreground">India</strong> — India also commonly uses{" "}
              <strong className="text-foreground">35×45 mm</strong> for printed passport-style
              photos. Online services may add extra rules for file size in kilobytes,
              background colour, or how much of the frame your face should fill. Compare any
              preset to the numbers on your current application and switch to custom pixels
              when the form is specific.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Simple way to remember: the <strong className="text-foreground">US</strong> side
              often centres on a <strong className="text-foreground">square 2-inch</strong>{" "}
              idea, while the <strong className="text-foreground">UK and India</strong> often
              share the same <strong className="text-foreground">millimetre print label</strong>
              , even though digital upload rules can still vary. When instructions conflict
              with a generic template, trust the official checklist first. This tool helps you
              crop, resize, and add a white background quickly; it does not replace reading
              those rules or guarantee acceptance.
            </p>

            <p className="text-base leading-relaxed text-muted-foreground">
              More entry points:{" "}
              <a href="/passport-photo-size-us" className="font-medium text-foreground underline">
                US passport photo size
              </a>
              ,{" "}
              <a
                href="/passport-photo-size-india"
                className="font-medium text-foreground underline"
              >
                India passport photo size
              </a>
              ,{" "}
              <a href="/passport-photo-size-uk" className="font-medium text-foreground underline">
                UK passport photo size
              </a>
              , and{" "}
              <a href="/2x2-photo-maker" className="font-medium text-foreground underline">
                2×2 photo maker
              </a>
              .
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  What is a passport size photo in pixels?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  There is no single worldwide pixel size. Many US-style uploads use a{" "}
                  <strong className="text-foreground">square</strong> file such as{" "}
                  <strong className="text-foreground">600×600 pixels</strong> when a 2×2 inch
                  look is the goal. UK and India digital flows often use sizes like{" "}
                  <strong className="text-foreground">413×531 pixels</strong> when a 35×45 mm
                  print is converted at about 300 DPI. Your form’s own pixel width and height
                  always win—use our custom fields if they list a different size.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">How do I make a 2×2 photo?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Upload your portrait, use the square crop to frame your head and shoulders,
                  select the <strong className="text-foreground">USA</strong> preset (600×600
                  px), then download the JPG. For printing, use a service or printer setting
                  that outputs at <strong className="text-foreground">true size</strong> (100%
                  scale) so the result stays two inches by two inches on paper. Re-read your
                  authority’s head-size diagram so the crop you choose still fits their
                  template.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  What is passport photo size in inches?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  A common US specification is{" "}
                  <strong className="text-foreground">2 inches wide by 2 inches tall</strong>{" "}
                  (written as 2×2). Other countries usually quote{" "}
                  <strong className="text-foreground">millimetres</strong> instead—for example{" "}
                  <strong className="text-foreground">35×45 mm</strong> is widely used for UK
                  and India printed passport photos. Convert carefully when a form mixes units,
                  and rely on the measurements printed on the official instructions.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my photo uploaded to your server?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  No. The passport photo maker uses the HTML canvas in your browser. Your file
                  is not sent to us for processing.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Why is the crop square?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  A square selection keeps the workflow simple. Your crop is then scaled to{" "}
                  <strong className="text-foreground">fit inside</strong> the passport
                  rectangle you pick, centred on a white background, with margins added if the
                  aspect ratios do not match.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">What is the A4 print sheet?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  It is a high-resolution JPEG (2480×3508 pixels) with multiple copies of your
                  photo arranged for cutting out. Print at{" "}
                  <strong className="text-foreground">100% scale</strong> without “fit to
                  page” shrinking so sizes stay predictable.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/passport-photo-maker" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
