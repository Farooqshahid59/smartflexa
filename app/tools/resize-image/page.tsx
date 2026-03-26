"use client";

import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const PRESETS = [
  { label: "Passport (300x300)", width: 300, height: 300 },
  { label: "Instagram post (1080x1080)", width: 1080, height: 1080 },
  { label: "Thumbnail (150x150)", width: 150, height: 150 },
] as const;

function formatKB(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Could not create resized image."));
          return;
        }
        resolve(blob);
      },
      type,
      quality,
    );
  });
}

async function resizeImage(
  file: File,
  width: number,
  height: number,
): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Canvas is not available in this browser.");
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const quality = file.type === "image/png" ? undefined : 0.92;
  return canvasToBlob(canvas, file.type, quality);
}

export default function ResizeImagePage() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const inputHintId = useId();
  const errorId = useId();

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [width, setWidth] = useState("300");
  const [height, setHeight] = useState("300");
  const [originalSize, setOriginalSize] = useState<{ w: number; h: number } | null>(
    null,
  );
  const [previewOriginal, setPreviewOriginal] = useState<string | null>(null);
  const [previewResized, setPreviewResized] = useState<string | null>(null);
  const [resizedBlob, setResizedBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewOriginal) URL.revokeObjectURL(previewOriginal);
      if (previewResized) URL.revokeObjectURL(previewResized);
    };
  }, [previewOriginal, previewResized]);

  const canResize = useMemo(() => {
    const w = Number(width);
    const h = Number(height);
    return Boolean(file) && Number.isFinite(w) && Number.isFinite(h) && w > 0 && h > 0;
  }, [file, width, height]);

  const resetResized = () => {
    if (previewResized) URL.revokeObjectURL(previewResized);
    setPreviewResized(null);
    setResizedBlob(null);
  };

  const setNewFile = async (next: File | null) => {
    setError(null);
    resetResized();
    if (previewOriginal) {
      URL.revokeObjectURL(previewOriginal);
      setPreviewOriginal(null);
    }
    setOriginalSize(null);

    if (!next) {
      setFile(null);
      return;
    }

    if (!ACCEPTED_TYPES.includes(next.type)) {
      setFile(null);
      setError("Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    setFile(next);
    const localUrl = URL.createObjectURL(next);
    setPreviewOriginal(localUrl);

    try {
      const bitmap = await createImageBitmap(next);
      setOriginalSize({ w: bitmap.width, h: bitmap.height });
      setWidth(String(bitmap.width));
      setHeight(String(bitmap.height));
      bitmap.close();
    } catch {
      setError("Could not read image dimensions.");
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewFile(e.target.files?.[0] ?? null);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setNewFile(e.dataTransfer.files?.[0] ?? null);
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

  const onWidthChange = (value: string) => {
    setWidth(value);
    if (!lockAspectRatio || !originalSize) return;
    const nextW = Number(value);
    if (!Number.isFinite(nextW) || nextW <= 0) return;
    const ratio = originalSize.h / originalSize.w;
    setHeight(String(Math.max(1, Math.round(nextW * ratio))));
  };

  const onHeightChange = (value: string) => {
    setHeight(value);
    if (!lockAspectRatio || !originalSize) return;
    const nextH = Number(value);
    if (!Number.isFinite(nextH) || nextH <= 0) return;
    const ratio = originalSize.w / originalSize.h;
    setWidth(String(Math.max(1, Math.round(nextH * ratio))));
  };

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    setWidth(String(preset.width));
    setHeight(String(preset.height));
    setLockAspectRatio(false);
  };

  const handleResize = async () => {
    setError(null);
    if (!file) {
      setError("Upload an image first.");
      return;
    }
    const w = Number(width);
    const h = Number(height);
    if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) {
      setError("Enter valid width and height values in pixels.");
      return;
    }

    setIsResizing(true);
    resetResized();
    try {
      const blob = await resizeImage(file, Math.round(w), Math.round(h));
      const url = URL.createObjectURL(blob);
      setResizedBlob(blob);
      setPreviewResized(url);
    } catch {
      setError("Image resize failed. Try a different image.");
    } finally {
      setIsResizing(false);
    }
  };

  const handleDownload = () => {
    if (!resizedBlob || !previewResized || !file) return;
    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const name = file.name.replace(/\.[^.]+$/, "") || "resized-image";
    const a = document.createElement("a");
    a.href = previewResized;
    a.download = `${name}-${width}x${height}.${ext}`;
    a.click();
  };

  const handleReset = () => {
    setError(null);
    setFile(null);
    setWidth("300");
    setHeight("300");
    setOriginalSize(null);
    setLockAspectRatio(true);
    if (previewOriginal) URL.revokeObjectURL(previewOriginal);
    setPreviewOriginal(null);
    resetResized();
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.resizeImage)} />
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
        aria-labelledby="resize-image-heading"
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
                <span className="text-foreground">Resize Image</span>
              </p>
            </nav>
            <h1
              id="resize-image-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Resize Image Online Free (Custom & Preset Sizes)
            </h1>
            <p
              id={inputHintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Resize JPG, PNG, or WEBP images to exact dimensions in your browser.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="resize-image-heading"
          >
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              onChange={onInputChange}
            />
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onClick={() => fileRef.current?.click()}
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
                  fileRef.current?.click();
                }
              }}
              aria-label="Upload image by clicking or dragging and dropping"
            >
              <p className="text-sm font-medium text-foreground">
                Drag & drop an image here, or click to upload
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Supports JPG, PNG, WEBP
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="resize-width"
                  className="text-sm font-medium text-foreground"
                >
                  Width (px)
                </label>
                <input
                  id="resize-width"
                  type="number"
                  min={1}
                  step={1}
                  value={width}
                  onChange={(e) => onWidthChange(e.target.value)}
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="resize-height"
                  className="text-sm font-medium text-foreground"
                >
                  Height (px)
                </label>
                <input
                  id="resize-height"
                  type="number"
                  min={1}
                  step={1}
                  value={height}
                  onChange={(e) => onHeightChange(e.target.value)}
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={lockAspectRatio}
                onClick={() => setLockAspectRatio((v) => !v)}
                className={`inline-flex h-7 w-12 items-center rounded-full transition ${
                  lockAspectRatio ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`h-5 w-5 rounded-full bg-white transition ${
                    lockAspectRatio ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-sm text-foreground">Maintain aspect ratio</span>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-foreground">Preset sizes</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground hover:bg-muted"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={!canResize || isResizing}
                onClick={handleResize}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isResizing ? "Resizing..." : "Resize Image"}
              </button>
              <button
                type="button"
                disabled={!resizedBlob || isResizing}
                onClick={handleDownload}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={isResizing}
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

            {(file || resizedBlob) && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-muted/20 p-4">
                  <h2 className="text-sm font-semibold text-foreground">Original</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {file && originalSize
                      ? `${originalSize.w} x ${originalSize.h} • ${formatKB(file.size)}`
                      : "—"}
                  </p>
                  {previewOriginal ? (
                    <img
                      src={previewOriginal}
                      alt="Original uploaded preview"
                      className="mt-3 h-48 w-full rounded-md border border-border object-contain bg-background"
                    />
                  ) : null}
                </div>
                <div className="rounded-lg border border-border bg-muted/20 p-4">
                  <h2 className="text-sm font-semibold text-foreground">Resized</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {resizedBlob
                      ? `${Math.round(Number(width))} x ${Math.round(Number(height))} • ${formatKB(
                          resizedBlob.size,
                        )}`
                      : "—"}
                  </p>
                  {previewResized ? (
                    <img
                      src={previewResized}
                      alt="Resized image preview"
                      className="mt-3 h-48 w-full rounded-md border border-border object-contain bg-background"
                    />
                  ) : (
                    <div className="mt-3 flex h-48 items-center justify-center rounded-md border border-dashed border-border bg-background text-xs text-muted-foreground">
                      Resized preview will appear here
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="resize-seo-heading">
            <h2
              id="resize-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is Image Resizing?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Image resizing changes the pixel dimensions of an image. It helps fit
              images to specific formats like social posts, profile photos, or website
              thumbnails.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Resize Image Online
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Upload a JPG, PNG, or WEBP image.</li>
              <li>Choose a preset or enter custom width and height.</li>
              <li>Toggle aspect ratio lock if you want proportional scaling.</li>
              <li>Click Resize Image, preview, then download.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Popular Image Sizes
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Passport size: 300 x 300 px</li>
              <li>Instagram post: 1080 x 1080 px</li>
              <li>Thumbnail: 150 x 150 px</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Use This Tool?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              SmartFlexa Image Resizer is fast, free, and requires no signup. Processing
              happens right in your browser with instant preview.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  How to resize image without losing quality?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Keep aspect ratio enabled and avoid extreme downscaling or upscaling.
                  Choose dimensions close to the original for best quality.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  What is best size for passport photo?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Common online passport format is 300 x 300 px, but official requirements
                  vary by country. Always verify local guidelines.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa Image Resizer is free to use.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my image secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. Resizing runs locally in your browser. Your image is not uploaded
                  to a backend for this tool.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/resize-image" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
