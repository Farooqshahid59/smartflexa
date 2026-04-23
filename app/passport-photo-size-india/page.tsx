import Link from "next/link";

import { PassportPhotoMakerTool } from "@/app/tools/passport-photo-maker/passport-photo-maker-tool";
import { PassportHubCrossLinks } from "@/components/passport-hub-cross-links";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function PassportPhotoSizeIndiaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.passportPhotoSizeIndia)} />
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
        aria-labelledby="in-passport-photo-heading"
      >
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">India passport photo size</span>
          </nav>

          <h1
            id="in-passport-photo-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            India passport photo size (35×45 mm)
          </h1>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Indian passport and PSK-style workflows usually describe the printed photograph
              in millimetres: <strong className="text-foreground">35 mm wide and 45 mm tall</strong>.
              That tall rectangle leaves room for the full face plus a modest margin above the
              hair—different from the square US layout you may have seen on Hollywood forms.
              When you move from a studio print to an online upload, the portal often asks for
              a JPEG with its own pixel width, height, and sometimes a maximum file size in
              kilobytes.
            </p>
            <p>
              On this page we focus on the measurement side, not the appointment queue. The
              editor below starts from a{" "}
              <strong className="text-foreground">413×531 pixel</strong> export, a common
              digital companion when people approximate a 35×45 mm sheet at roughly 300 dots
              per inch. You still control the crop: drag a square region around your head,
              switch to custom pixels if your form spells out something different, and preview
              before you download.
            </p>
            <p>
              Because Passport Seva and partner sites update their validators from time to
              time, please cross-check background colour, ear visibility, and any{" "}
              <strong className="text-foreground">file-size caps</strong> on the exact service
              you are using. SmartFlexa never sees your bytes on a server for this tool—the
              canvas runs locally—so you can iterate quickly while reading the official
              checklist side by side.
            </p>
          </div>

          <section
            className="mt-10 rounded-lg border border-border bg-card/50 p-5 sm:p-6"
            aria-labelledby="in-requirements-heading"
          >
            <h2
              id="in-requirements-heading"
              className="text-lg font-semibold tracking-tight text-foreground"
            >
              India-oriented checklist (summary)
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>
                <strong className="text-foreground">Printed dimensions:</strong> widely cited{" "}
                <strong className="text-foreground">35×45 mm</strong> for passport-style prints.
              </li>
              <li>
                <strong className="text-foreground">Preset export here:</strong>{" "}
                <strong className="text-foreground">413×531 px</strong> JPEG; use{" "}
                <strong className="text-foreground">Custom</strong> if your portal lists other
                pixels.
              </li>
              <li>
                <strong className="text-foreground">Background:</strong> light, even tone with
                no texture; avoid coloured walls that read as tint on a monitor.
              </li>
              <li>
                <strong className="text-foreground">Framing:</strong> keep the face centred;
                leave breathing room so automated validators are less likely to reject for
                &quot;head too large&quot; errors.
              </li>
              <li>
                <strong className="text-foreground">Documentation:</strong> screenshot the
                portal&apos;s live requirements before you submit—mobile apps sometimes differ
                from desktop wording.
              </li>
            </ul>
          </section>

          <h2 id="in-passport-tool-heading" className="sr-only">
            India passport photo editor
          </h2>
          <div className="mt-10">
            <PassportPhotoMakerTool
              defaultPreset="india"
              headingId="in-passport-tool-heading"
              presetRadioName="passport-preset-in"
            />
          </div>

          <PassportHubCrossLinks exclude="india" />

          <div className="mt-14">
            <RelatedTools currentPath="/passport-photo-size-india" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
