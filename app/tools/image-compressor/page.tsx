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
import { PassportWorkflowRelatedLinks } from "@/components/passport-workflow-related-links";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

type CompressionResult = {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  type: string;
};

function formatKB(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image."));
    img.src = src;
  });
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
          reject(new Error("Compression failed. Please try another image."));
          return;
        }
        resolve(blob);
      },
      type,
      quality,
    );
  });
}

async function compressImageToTarget(
  file: File,
  targetKB: number,
): Promise<CompressionResult> {
  const src = await fileToDataUrl(file);
  const image = await loadImage(src);
  const targetBytes = Math.max(1, Math.round(targetKB * 1024));
  const outputType = file.type === "image/png" ? "image/webp" : file.type;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas is not available in this browser.");
  }

  let width = image.naturalWidth;
  let height = image.naturalHeight;
  let bestBlob: Blob | null = null;
  let bestDiff = Number.POSITIVE_INFINITY;

  for (let scaleRound = 0; scaleRound < 6; scaleRound += 1) {
    canvas.width = Math.max(1, Math.round(width));
    canvas.height = Math.max(1, Math.round(height));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    let quality = 0.92;
    while (quality >= 0.1) {
      const blob = await canvasToBlob(
        canvas,
        outputType,
        outputType === "image/png" ? undefined : quality,
      );
      const diff = Math.abs(blob.size - targetBytes);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestBlob = blob;
      }
      if (blob.size <= targetBytes * 1.03) {
        const url = URL.createObjectURL(blob);
        return { blob, url, width: canvas.width, height: canvas.height, type: outputType };
      }
      quality -= 0.06;
    }

    if (canvas.width <= 300 || canvas.height <= 300) {
      break;
    }
    width *= 0.9;
    height *= 0.9;
  }

  if (!bestBlob) {
    throw new Error("Could not compress this image.");
  }

  const url = URL.createObjectURL(bestBlob);
  return {
    blob: bestBlob,
    url,
    width: Math.round(width),
    height: Math.round(height),
    type: outputType,
  };
}

export default function ImageCompressorPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputHintId = useId();
  const errorId = useId();

  const [file, setFile] = useState<File | null>(null);
  const [targetKB, setTargetKB] = useState("100");
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null);
  const [compressed, setCompressed] = useState<CompressionResult | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (originalPreviewUrl) URL.revokeObjectURL(originalPreviewUrl);
      if (compressed?.url) URL.revokeObjectURL(compressed.url);
    };
  }, [originalPreviewUrl, compressed]);

  const inputDescribedBy = [inputHintId, error ? errorId : null]
    .filter(Boolean)
    .join(" ");

  const resetOutput = () => {
    if (compressed?.url) URL.revokeObjectURL(compressed.url);
    setCompressed(null);
  };

  const handleFileSelected = (nextFile: File | null) => {
    setError(null);
    resetOutput();
    if (originalPreviewUrl) {
      URL.revokeObjectURL(originalPreviewUrl);
      setOriginalPreviewUrl(null);
    }

    if (!nextFile) {
      setFile(null);
      return;
    }

    if (!ACCEPTED_TYPES.includes(nextFile.type)) {
      setFile(null);
      setError("Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    setFile(nextFile);
    setOriginalPreviewUrl(URL.createObjectURL(nextFile));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    handleFileSelected(selected);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0] ?? null;
    handleFileSelected(dropped);
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

  const handleCompress = async () => {
    setError(null);
    if (!file) {
      setError("Upload an image first.");
      return;
    }

    const parsedTarget = Number(targetKB);
    if (!Number.isFinite(parsedTarget) || parsedTarget <= 0) {
      setError("Enter a valid target size in KB (for example: 50, 100, 200).");
      return;
    }

    if (file.size / 1024 <= parsedTarget) {
      setError(
        "The original file is already smaller than the target size. Try a smaller target.",
      );
      resetOutput();
      return;
    }

    setIsCompressing(true);
    resetOutput();
    try {
      const result = await compressImageToTarget(file, parsedTarget);
      setCompressed(result);
    } catch {
      setError("Compression failed. Try another image or a larger target size.");
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!compressed || !file) return;
    const ext =
      compressed.type === "image/webp"
        ? "webp"
        : compressed.type === "image/png"
          ? "png"
          : "jpg";
    const fileName = file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = compressed.url;
    a.download = `${fileName}-compressed.${ext}`;
    a.click();
  };

  const handleClear = () => {
    setFile(null);
    setError(null);
    setTargetKB("100");
    if (originalPreviewUrl) URL.revokeObjectURL(originalPreviewUrl);
    setOriginalPreviewUrl(null);
    resetOutput();
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.imageCompressor)} />
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
        aria-labelledby="image-compressor-heading"
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
                <span className="text-foreground">Image Compressor</span>
              </p>
            </nav>
            <h1
              id="image-compressor-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Compress Image Online to Specific Size (KB)
            </h1>
            <p
              id={inputHintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Reduce JPG, PNG, and WEBP image size directly in your browser.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="image-compressor-heading"
          >
            <input
              ref={inputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
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
              aria-label="Upload image by clicking or dragging and dropping"
            >
              <p className="text-sm font-medium text-foreground">
                Drag & drop an image here, or click to upload
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Supports JPG, PNG, WEBP
              </p>
            </div>

            <div className="mt-6">
              <label
                htmlFor="target-size"
                className="text-sm font-medium text-foreground"
              >
                Target Size (KB)
              </label>
              <input
                id="target-size"
                type="number"
                min={1}
                step={1}
                value={targetKB}
                onChange={(e) => setTargetKB(e.target.value)}
                aria-describedby={inputDescribedBy}
                className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="100"
              />
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={handleCompress}
                disabled={!file || isCompressing}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCompressing ? "Compressing..." : "Compress Image"}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!compressed || isCompressing}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={isCompressing}
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

            {(file || compressed) && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-muted/20 p-4">
                  <h2 className="text-sm font-semibold text-foreground">Original</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {file ? formatKB(file.size) : "—"}
                  </p>
                  {originalPreviewUrl ? (
                    <img
                      src={originalPreviewUrl}
                      alt="Original upload preview"
                      className="mt-3 h-44 w-full rounded-md border border-border object-contain bg-background"
                    />
                  ) : null}
                </div>
                <div className="rounded-lg border border-border bg-muted/20 p-4">
                  <h2 className="text-sm font-semibold text-foreground">Compressed</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {compressed ? formatKB(compressed.blob.size) : "—"}
                  </p>
                  {compressed ? (
                    <img
                      src={compressed.url}
                      alt="Compressed image preview"
                      className="mt-3 h-44 w-full rounded-md border border-border object-contain bg-background"
                    />
                  ) : (
                    <div className="mt-3 flex h-44 items-center justify-center rounded-md border border-dashed border-border bg-background text-xs text-muted-foreground">
                      Compressed preview will appear here
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="image-seo-heading">
            <h2
              id="image-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is Image Compression?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Image compression reduces file size while keeping the visual quality as
              high as possible. Smaller images load faster, use less bandwidth, and
              improve website performance.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Compress Image to 50KB / 100KB
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Upload a JPG, PNG, or WEBP image.</li>
              <li>Enter your target size (for example: 50, 100, or 200 KB).</li>
              <li>Click Compress Image and wait for processing.</li>
              <li>Preview the result, compare sizes, then download.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Use This Tool?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              SmartFlexa Image Compressor is fast, free, and requires no signup.
              Everything runs in your browser so you can optimize images in seconds.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Before: 520 KB image
              <br />
              After: 98 KB compressed image
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              FAQ
            </h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  How to compress image to exact size?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Set a target size in KB and compress. The tool iteratively adjusts
                  quality and dimensions to get as close as possible.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Does quality reduce?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Usually yes, slightly. The tool balances quality and size to keep
                  images visually clear while reducing file weight.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa Image Compressor is free to use.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my image secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Compression runs locally in your browser. Your image is not sent to
                  a backend for this tool.
                </dd>
              </div>
            </dl>

            <PassportWorkflowRelatedLinks currentPath="/tools/image-compressor" />
            <RelatedTools
              currentPath="/tools/image-compressor"
              heading="More tools"
            />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
