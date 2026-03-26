"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useId, useState } from "react";
import QRCode from "qrcode";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const SIZE_PX = {
  sm: 200,
  md: 320,
  lg: 480,
} as const;

type QrSize = keyof typeof SIZE_PX;

export default function QrCodeGeneratorPage() {
  const hintId = useId();
  const previewHintId = useId();
  const errorId = useId();
  const downloadStatusId = useId();

  const [text, setText] = useState("");
  const [size, setSize] = useState<QrSize>("md");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);

  const hasInput = text.trim().length > 0;
  const canDownload = Boolean(dataUrl);

  useEffect(() => {
    setDownloadStatus(null);
    const value = text.trim();
    if (!value) {
      setDataUrl(null);
      setError(null);
      return;
    }

    let cancelled = false;
    const w = SIZE_PX[size];

    QRCode.toDataURL(value, {
      width: w,
      margin: 2,
      color: { dark: "#000000ff", light: "#ffffffff" },
      errorCorrectionLevel: "M",
    })
      .then((url) => {
        if (!cancelled) {
          setDataUrl(url);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setDataUrl(null);
          setError(
            "Could not generate a QR code. The text may be too long or invalid.",
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [text, size]);

  const handleDownload = () => {
    setDownloadStatus(null);
    if (!dataUrl) return;
    try {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "smartflexa-qrcode.png";
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setDownloadStatus("Download started.");
    } catch {
      setDownloadStatus(null);
      setError("Download failed. Try right-clicking the image and saving it.");
    }
  };

  const handleClear = () => {
    setText("");
    setDataUrl(null);
    setError(null);
    setDownloadStatus(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.qrCodeGenerator)} />
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
        aria-labelledby="qr-gen-heading"
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
                <span className="text-foreground">QR Code Generator</span>
              </p>
            </nav>

            <h1
              id="qr-gen-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              QR Code Generator Online Free
            </h1>

            <p
              id={hintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Enter any text or URL to create a scannable QR code. Preview updates
              as you type; download a PNG when you are ready.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="qr-gen-heading"
          >
            <div className="space-y-3">
              <label
                htmlFor="qr-input"
                className="text-sm font-medium text-foreground"
              >
                Text or URL
              </label>
              <textarea
                id="qr-input"
                value={text}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setText(e.target.value)
                }
                placeholder="https://www.smartflexa.com/"
                autoComplete="off"
                spellCheck={true}
                aria-describedby={hintId}
                className="min-h-[100px] w-full resize-y rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-foreground">
                QR size
              </legend>
              <div
                className="mt-3 flex flex-wrap gap-4"
                role="radiogroup"
                aria-label="QR code image size"
              >
                {(
                  [
                    ["sm", "Small"],
                    ["md", "Medium"],
                    ["lg", "Large"],
                  ] as const
                ).map(([key, label]) => (
                  <label
                    key={key}
                    className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
                  >
                    <input
                      type="radio"
                      name="qr-size"
                      value={key}
                      checked={size === key}
                      onChange={() => setSize(key)}
                      className="h-4 w-4 border-border text-primary focus:ring-ring"
                    />
                    {label} ({SIZE_PX[key]}px)
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 flex flex-col items-center">
              <div
                className="flex min-h-[200px] min-w-[200px] items-center justify-center rounded-lg border border-border bg-background p-4"
                aria-describedby={previewHintId}
              >
                {dataUrl ? (
                  <Image
                    src={dataUrl}
                    alt="Generated QR code"
                    width={SIZE_PX[size]}
                    height={SIZE_PX[size]}
                    unoptimized
                    className="max-h-[min(80vw,480px)] max-w-full"
                  />
                ) : !hasInput ? (
                  <p className="text-center text-sm text-muted-foreground">
                    Type or paste content to see the QR code.
                  </p>
                ) : error ? (
                  <p className="text-center text-sm text-muted-foreground">
                    Preview unavailable.
                  </p>
                ) : (
                  <p className="text-center text-sm text-muted-foreground">
                    Generating…
                  </p>
                )}
              </div>
              <p id={previewHintId} className="mt-3 text-center text-xs text-muted-foreground">
                Black modules on white background. Scan with your phone camera.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={handleDownload}
                disabled={!canDownload}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download PNG
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Clear
              </button>
            </div>

            {downloadStatus ? (
              <p
                id={downloadStatusId}
                className="mt-4 text-sm text-foreground"
                role="status"
              >
                {downloadStatus}
              </p>
            ) : null}

            {error ? (
              <p
                id={errorId}
                className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                role="alert"
              >
                {error}
              </p>
            ) : null}
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="qr-seo-heading">
            <h2
              id="qr-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is a QR Code?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A QR code is a two-dimensional barcode that can store text, links,
              Wi‑Fi credentials, and more. Scanning it with a phone camera opens
              the encoded content quickly.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Generate QR Code
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Enter a URL or any text you want to encode.</li>
              <li>Pick a size (small, medium, or large).</li>
              <li>Download the PNG or show it on screen for others to scan.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Use Cases
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Websites: share links on posters and flyers.</li>
              <li>Business cards: link to contact pages or portfolios.</li>
              <li>Payments: display payment request links where supported.</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Use This Tool?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              It is fast, free, and runs in your browser—no account required. You
              get an instant preview and a PNG you can reuse anywhere.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  How do I create a QR code for a URL?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Paste the full address (including https://) into the text box.
                  The preview updates automatically; then download the PNG if you
                  need a file.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Can I download the QR code?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. Click “Download PNG” to save a PNG image of the current QR
                  code.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is this tool free?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa’s QR code generator is free to use with no
                  signup.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Processing happens in your browser. Your text is not sent to our
                  servers to build the QR image.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/qr-code-generator" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
