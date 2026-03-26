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

const JPEG_TYPE = "image/jpeg";

function formatKB(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function isJpegFile(file: File): boolean {
  if (file.type === JPEG_TYPE) return true;
  const name = file.name.toLowerCase();
  return name.endsWith(".jpg") || name.endsWith(".jpeg");
}

function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Could not export PNG. Try another browser."));
          return;
        }
        resolve(blob);
      },
      "image/png",
    );
  });
}

async function convertJpgToPng(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Canvas is not available in this browser.");
  }
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  return canvasToPngBlob(canvas);
}

export default function JpgToPngPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputHintId = useId();
  const errorId = useId();

  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [pngBlob, setPngBlob] = useState<Blob | null>(null);
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (pngUrl) URL.revokeObjectURL(pngUrl);
    };
  }, [originalUrl, pngUrl]);

  const resetPng = () => {
    if (pngUrl) URL.revokeObjectURL(pngUrl);
    setPngBlob(null);
    setPngUrl(null);
  };

  const handleFile = (next: File | null) => {
    setError(null);
    resetPng();
    if (originalUrl) {
      URL.revokeObjectURL(originalUrl);
      setOriginalUrl(null);
    }
    if (!next) {
      setFile(null);
      return;
    }
    if (!isJpegFile(next)) {
      setFile(null);
      setError("Please upload a JPG or JPEG image only.");
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
      setError("Upload a JPG or JPEG image first.");
      return;
    }
    setIsConverting(true);
    resetPng();
    try {
      const blob = await convertJpgToPng(file);
      const url = URL.createObjectURL(blob);
      setPngBlob(blob);
      setPngUrl(url);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Conversion failed. Try another image.",
      );
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!pngBlob || !file || !pngUrl) return;
    const base = file.name.replace(/\.[^.]+$/, "") || "image";
    const a = document.createElement("a");
    a.href = pngUrl;
    a.download = `${base}.png`;
    a.click();
  };

  const handleClear = () => {
    setFile(null);
    setError(null);
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    setOriginalUrl(null);
    resetPng();
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.jpgToPng)} />
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
        aria-labelledby="jpg-to-png-heading"
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
                <span className="text-foreground">JPG to PNG</span>
              </p>
            </nav>
            <h1
              id="jpg-to-png-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Convert JPG to PNG Online Free
            </h1>
            <p
              id={inputHintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Turn JPEG files into PNG images with instant preview and download—all in
              your browser.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="jpg-to-png-heading"
          >
            <input
              ref={inputRef}
              type="file"
              accept=".jpg,.jpeg,image/jpeg"
              className="hidden"
              onChange={onInputChange}
            />

            {file ? (
              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-muted/20 p-4">
                  <h2 className="text-sm font-semibold text-foreground">Original (JPG)</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatKB(file.size)}
                  </p>
                  {originalUrl ? (
                    <img
                      src={originalUrl}
                      alt="Original JPEG preview"
                      className="mt-3 h-48 w-full rounded-md border border-border object-contain bg-background"
                    />
                  ) : null}
                </div>
                <div className="rounded-lg border border-border bg-muted/20 p-4">
                  <h2 className="text-sm font-semibold text-foreground">Converted (PNG)</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {pngBlob ? formatKB(pngBlob.size) : "—"}
                  </p>
                  {pngUrl ? (
                    <img
                      src={pngUrl}
                      alt="Converted PNG preview"
                      className="mt-3 h-48 w-full rounded-md border border-border object-contain bg-[repeating-conic-gradient(#e5e7eb_0%_25%,#fff_0%_50%)] bg-[length:16px_16px]"
                    />
                  ) : (
                    <div className="mt-3 flex h-48 items-center justify-center rounded-md border border-dashed border-border bg-background text-center text-xs text-muted-foreground">
                      {isConverting
                        ? "Converting..."
                        : "PNG preview will appear after conversion"}
                    </div>
                  )}
                </div>
              </div>
            ) : null}

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
              aria-label="Upload JPG or JPEG by clicking or dragging and dropping"
            >
              <p className="text-sm font-medium text-foreground">
                Drag & drop a JPG or JPEG here, or click to upload
              </p>
              <p className="mt-1 text-xs text-muted-foreground">JPG and JPEG only</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={handleConvert}
                disabled={!file || isConverting}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isConverting ? "Converting..." : "Convert to PNG"}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!pngBlob || isConverting}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download PNG
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={isConverting}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reset
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

            {file && pngBlob ? (
              <div className="mt-6 rounded-lg border border-border bg-muted/20 p-4 text-sm">
                <p className="font-medium text-foreground">Size comparison</p>
                <div className="mt-2 flex flex-wrap justify-between gap-2 text-muted-foreground">
                  <span>JPG (original)</span>
                  <span className="font-medium text-foreground">{formatKB(file.size)}</span>
                </div>
                <div className="mt-1 flex flex-wrap justify-between gap-2 text-muted-foreground">
                  <span>PNG (converted)</span>
                  <span className="font-medium text-foreground">
                    {formatKB(pngBlob.size)}
                  </span>
                </div>
              </div>
            ) : null}
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="jpg-png-seo-heading">
            <h2
              id="jpg-png-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is JPG to PNG Conversion?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              JPG (JPEG) is a lossy format widely used for photos; it does not support
              transparency. PNG is a lossless format that supports transparency and is
              common for graphics, screenshots, and assets that need sharp edges.
              Converting JPG to PNG re-encodes the image as PNG—useful when you need PNG
              compatibility or plan to add transparency in another editor.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Convert JPG to PNG?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              PNG supports an alpha channel for transparency and avoids additional JPG
              compression artifacts when you edit the image again. It is a good choice for
              logos, icons, and images that will be composited over other backgrounds.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Convert JPG to PNG
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Upload a JPG or JPEG using drag and drop or the file picker.</li>
              <li>Click Convert to PNG and wait for processing.</li>
              <li>Compare previews and file sizes, then download your PNG.</li>
              <li>Use Reset to start over with a new image.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">Example</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A 180 KB JPG might become a 420 KB PNG (PNG is often larger for photos; sizes
              depend on content). For graphics with flat colors, PNG can be smaller or
              similar.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  Does JPG to PNG improve quality?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Converting JPG to PNG does not recover detail lost to JPEG compression.
                  PNG avoids further lossy compression, which helps if you edit and save
                  the image multiple times.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Why use PNG format?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  PNG is lossless, supports transparency, and is widely supported in design
                  tools and browsers—ideal for graphics and layered workflows.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa JPG to PNG is free to use in your browser.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is my image secure?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Conversion runs locally in your browser. Your file is not uploaded to a
                  server for this tool.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/jpg-to-png" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
