"use client";

import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

function formatKB(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function canvasToWebpBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(
            new Error(
              "WebP export is not supported in this browser. Try Chrome, Edge, or Firefox.",
            ),
          );
          return;
        }
        resolve(blob);
      },
      "image/webp",
      quality,
    );
  });
}

async function convertFileToWebP(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Could not prepare canvas for conversion.");
  }
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  return canvasToWebpBlob(canvas, 0.92);
}

export default function ImageToWebpPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputHintId = useId();
  const errorId = useId();

  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [webpBlob, setWebpBlob] = useState<Blob | null>(null);
  const [webpUrl, setWebpUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (webpUrl) URL.revokeObjectURL(webpUrl);
    };
  }, [originalUrl, webpUrl]);

  const resetWebp = () => {
    if (webpUrl) URL.revokeObjectURL(webpUrl);
    setWebpBlob(null);
    setWebpUrl(null);
  };

  const handleFile = (next: File | null) => {
    setError(null);
    resetWebp();
    if (originalUrl) {
      URL.revokeObjectURL(originalUrl);
      setOriginalUrl(null);
    }
    if (!next) {
      setFile(null);
      return;
    }
    if (!ACCEPTED_TYPES.includes(next.type)) {
      setFile(null);
      setError("Please upload a JPG or PNG image.");
      return;
    }
    setFile(next);
    setOriginalUrl(URL.createObjectURL(next));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0] ?? null);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0] ?? null);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleConvert = async () => {
    setError(null);
    if (!file) {
      setError("Upload an image first.");
      return;
    }
    setIsConverting(true);
    resetWebp();
    try {
      const blob = await convertFileToWebP(file);
      const url = URL.createObjectURL(blob);
      setWebpBlob(blob);
      setWebpUrl(url);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Conversion failed. Try another image or browser.",
      );
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!webpBlob || !file || !webpUrl) return;
    const base = file.name.replace(/\.[^.]+$/, "") || "image";
    const a = document.createElement("a");
    a.href = webpUrl;
    a.download = `${base}.webp`;
    a.click();
  };

  const handleClear = () => {
    setFile(null);
    setError(null);
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    setOriginalUrl(null);
    resetWebp();
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.imageToWebp)} />
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
        aria-labelledby="image-to-webp-heading"
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
                <span className="text-foreground">Image to WebP</span>
              </p>
            </nav>
            <h1
              id="image-to-webp-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Convert Image to WebP Online Free
            </h1>
            <p
              id={inputHintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Turn JPG or PNG files into smaller WebP images with an instant preview.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="image-to-webp-heading"
          >
            <input
              ref={inputRef}
              type="file"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              className="hidden"
              onChange={onInputChange}
            />

            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onClick={() => inputRef.current?.click()}
              className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border bg-muted/20 hover:bg-muted/30"
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  inputRef.current?.click();
                }
              }}
              aria-label="Upload JPG or PNG by clicking or dragging and dropping"
            >
              <p className="text-sm font-medium text-foreground">
                Drag & drop an image here, or click to upload
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                JPG and PNG only
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={handleConvert}
                disabled={!file || isConverting}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isConverting ? "Converting..." : "Convert to WebP"}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!webpBlob || isConverting}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download WebP
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={isConverting}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear
              </button>
            </div>

            {error ? (
              <p
                id={errorId}
                className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            {file ? (
              <div className="mt-8 space-y-3 rounded-lg border border-border bg-muted/20 p-4 text-sm">
                <div className="flex flex-wrap justify-between gap-2 text-muted-foreground">
                  <span>Original size</span>
                  <span className="font-medium text-foreground">
                    {formatKB(file.size)}
                  </span>
                </div>
                <div className="flex flex-wrap justify-between gap-2 text-muted-foreground">
                  <span>WebP size</span>
                  <span className="font-medium text-foreground">
                    {webpBlob ? formatKB(webpBlob.size) : "—"}
                  </span>
                </div>
              </div>
            ) : null}

            {file ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-muted/20 p-4">
                  <h2 className="text-sm font-semibold text-foreground">Original</h2>
                  {originalUrl ? (
                    <img
                      src={originalUrl}
                      alt="Original image preview"
                      className="mt-3 h-48 w-full rounded-md border border-border object-contain bg-background"
                    />
                  ) : null}
                </div>
                <div className="rounded-lg border border-border bg-muted/20 p-4">
                  <h2 className="text-sm font-semibold text-foreground">WebP</h2>
                  {webpUrl ? (
                    <img
                      src={webpUrl}
                      alt="Converted WebP preview"
                      className="mt-3 h-48 w-full rounded-md border border-border object-contain bg-background"
                    />
                  ) : (
                    <div className="mt-3 flex h-48 items-center justify-center rounded-md border border-dashed border-border bg-background text-xs text-muted-foreground">
                      {isConverting
                        ? "Converting..."
                        : "Converted preview will appear here"}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="webp-seo-heading">
            <h2
              id="webp-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is WebP?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              WebP is a modern image format from Google that typically produces smaller
              files than JPG and PNG at similar visual quality. It supports both lossy
              and lossless compression.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Convert Images to WebP?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Smaller images mean faster page loads, better Core Web Vitals, and lower
              bandwidth usage—especially on mobile networks.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Convert Image to WebP
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Upload a JPG or PNG using drag and drop or the file picker.</li>
              <li>Click Convert to WebP and wait for processing.</li>
              <li>Compare previews and file sizes, then download your WebP file.</li>
              <li>Use Clear to start over with a new image.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Before: 420 KB PNG
              <br />
              After: 128 KB WebP (typical result; actual sizes vary by image)
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  What is WebP format?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  WebP is an image format designed for the web, balancing compression and
                  quality so pages load faster.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Does WebP reduce quality?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Lossy WebP can reduce quality slightly, similar to JPG. This tool aims
                  for a strong balance of size and clarity.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa Image to WebP is free to use in your browser.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my image secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Conversion runs locally in your browser. Your file is not uploaded to a
                  server for this tool.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/image-to-webp" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
