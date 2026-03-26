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

const PNG_TYPE = "image/png";

function formatKB(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function canvasToJpegBlob(
  canvas: HTMLCanvasElement,
  quality: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Could not export JPG. Try another browser."));
          return;
        }
        resolve(blob);
      },
      "image/jpeg",
      quality,
    );
  });
}

async function convertPngToJpg(file: File, backgroundColor: string): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Canvas is not available in this browser.");
  }
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  return canvasToJpegBlob(canvas, 0.92);
}

export default function PngToJpgPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputHintId = useId();
  const errorId = useId();
  const bgLabelId = useId();

  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [jpgBlob, setJpgBlob] = useState<Blob | null>(null);
  const [jpgUrl, setJpgUrl] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [isConverting, setIsConverting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (jpgUrl) URL.revokeObjectURL(jpgUrl);
    };
  }, [originalUrl, jpgUrl]);

  const resetJpg = () => {
    if (jpgUrl) URL.revokeObjectURL(jpgUrl);
    setJpgBlob(null);
    setJpgUrl(null);
  };

  const handleFile = (next: File | null) => {
    setError(null);
    resetJpg();
    if (originalUrl) {
      URL.revokeObjectURL(originalUrl);
      setOriginalUrl(null);
    }
    if (!next) {
      setFile(null);
      return;
    }
    if (next.type !== PNG_TYPE) {
      setFile(null);
      setError("Please upload a PNG image only.");
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

  const onBackgroundChange = (value: string) => {
    setBackgroundColor(value);
    resetJpg();
  };

  const handleConvert = async () => {
    setError(null);
    if (!file) {
      setError("Upload a PNG image first.");
      return;
    }
    setIsConverting(true);
    resetJpg();
    try {
      const blob = await convertPngToJpg(file, backgroundColor);
      const url = URL.createObjectURL(blob);
      setJpgBlob(blob);
      setJpgUrl(url);
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
    if (!jpgBlob || !file || !jpgUrl) return;
    const base = file.name.replace(/\.[^.]+$/, "") || "image";
    const a = document.createElement("a");
    a.href = jpgUrl;
    a.download = `${base}.jpg`;
    a.click();
  };

  const handleClear = () => {
    setFile(null);
    setError(null);
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    setOriginalUrl(null);
    resetJpg();
    setBackgroundColor("#ffffff");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.pngToJpg)} />
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
        aria-labelledby="png-to-jpg-heading"
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
                <span className="text-foreground">PNG to JPG</span>
              </p>
            </nav>
            <h1
              id="png-to-jpg-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Convert PNG to JPG Online Free
            </h1>
            <p
              id={inputHintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Turn PNG files into JPG with a customizable background for transparent
              areas—all in your browser.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="png-to-jpg-heading"
          >
            <input
              ref={inputRef}
              type="file"
              accept=".png,image/png"
              className="hidden"
              onChange={onInputChange}
            />

            {file ? (
              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-muted/20 p-4">
                  <h2 className="text-sm font-semibold text-foreground">Original (PNG)</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatKB(file.size)}
                  </p>
                  {originalUrl ? (
                    <img
                      src={originalUrl}
                      alt="Original PNG preview"
                      className="mt-3 h-48 w-full rounded-md border border-border object-contain bg-[repeating-conic-gradient(#e5e7eb_0%_25%,#fff_0%_50%)] bg-[length:16px_16px]"
                    />
                  ) : null}
                </div>
                <div className="rounded-lg border border-border bg-muted/20 p-4">
                  <h2 className="text-sm font-semibold text-foreground">Converted (JPG)</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {jpgBlob ? formatKB(jpgBlob.size) : "—"}
                  </p>
                  {jpgUrl ? (
                    <img
                      src={jpgUrl}
                      alt="Converted JPG preview"
                      className="mt-3 h-48 w-full rounded-md border border-border object-contain bg-background"
                    />
                  ) : (
                    <div className="mt-3 flex h-48 items-center justify-center rounded-md border border-dashed border-border bg-background text-center text-xs text-muted-foreground">
                      {isConverting
                        ? "Converting..."
                        : "JPG preview will appear after conversion"}
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
              aria-label="Upload PNG by clicking or dragging and dropping"
            >
              <p className="text-sm font-medium text-foreground">
                Drag & drop a PNG here, or click to upload
              </p>
              <p className="mt-1 text-xs text-muted-foreground">PNG only</p>
            </div>

            <div className="mt-6">
              <p id={bgLabelId} className="text-sm font-medium text-foreground">
                Background for transparent areas
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                JPG does not support transparency; transparent pixels use this color.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => onBackgroundChange(e.target.value)}
                  className="h-11 w-14 cursor-pointer rounded border border-input bg-background p-1"
                  aria-labelledby={bgLabelId}
                />
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "White", value: "#ffffff" },
                    { label: "Black", value: "#000000" },
                    { label: "Gray", value: "#808080" },
                  ].map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => onBackgroundChange(preset.value)}
                      className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground hover:bg-muted"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={handleConvert}
                disabled={!file || isConverting}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isConverting ? "Converting..." : "Convert to JPG"}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!jpgBlob || isConverting}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download JPG
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

            {file && jpgBlob ? (
              <div className="mt-6 rounded-lg border border-border bg-muted/20 p-4 text-sm">
                <p className="font-medium text-foreground">Size comparison</p>
                <div className="mt-2 flex flex-wrap justify-between gap-2 text-muted-foreground">
                  <span>PNG (original)</span>
                  <span className="font-medium text-foreground">{formatKB(file.size)}</span>
                </div>
                <div className="mt-1 flex flex-wrap justify-between gap-2 text-muted-foreground">
                  <span>JPG (converted)</span>
                  <span className="font-medium text-foreground">
                    {formatKB(jpgBlob.size)}
                  </span>
                </div>
              </div>
            ) : null}
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="png-jpg-seo-heading">
            <h2
              id="png-jpg-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is PNG to JPG Conversion?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              PNG is a lossless format that supports transparency and often produces larger
              files. JPG is a widely supported, compressed format best for photos and
              graphics without transparency. Converting PNG to JPG replaces transparent
              areas with a solid background color and can reduce file size.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Convert PNG to JPG?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              JPG files are usually smaller, load faster on websites, and work everywhere
              from email to social platforms. They are ideal when you do not need
              transparency.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Convert PNG to JPG
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Upload a PNG using drag and drop or the file picker.</li>
              <li>Choose a background color for any transparent regions.</li>
              <li>Click Convert to JPG and review the preview.</li>
              <li>Download your JPG or use Reset to start over.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">Example</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A 400 KB PNG with large transparent areas might become a 120 KB JPG after
              conversion (results vary by image content and quality settings).
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  Does PNG to JPG reduce quality?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  JPG uses lossy compression, so some detail may be lost compared to a
                  lossless PNG. For many photos and web images the difference is small.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Why doesn&apos;t JPG support transparency?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  The JPG format has no alpha channel. Transparent pixels in your PNG are
                  blended with the background color you choose before export.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa PNG to JPG is free to use in your browser.
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

            <RelatedTools currentPath="/tools/png-to-jpg" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
