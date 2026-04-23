"use client";

import {
  ChangeEvent,
  DragEvent,
  useCallback,
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

type CropRect = { x: number; y: number; w: number; h: number };

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function normalizeSelection(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  nw: number,
  nh: number,
): CropRect {
  let x = Math.min(x1, x2);
  let y = Math.min(y1, y2);
  let w = Math.abs(x2 - x1);
  let h = Math.abs(y2 - y1);
  x = clamp(x, 0, nw - 1);
  y = clamp(y, 0, nh - 1);
  w = clamp(w, 2, nw - x);
  h = clamp(h, 2, nh - y);
  return { x: Math.round(x), y: Math.round(y), w: Math.round(w), h: Math.round(h) };
}

function clientToNatural(
  clientX: number,
  clientY: number,
  img: HTMLImageElement,
): { nx: number; ny: number } {
  const rect = img.getBoundingClientRect();
  const nw = img.naturalWidth;
  const nh = img.naturalHeight;
  const nx = ((clientX - rect.left) / rect.width) * nw;
  const ny = ((clientY - rect.top) / rect.height) * nh;
  return {
    nx: clamp(nx, 0, nw),
    ny: clamp(ny, 0, nh),
  };
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
          reject(new Error("Could not export image."));
          return;
        }
        resolve(blob);
      },
      type,
      quality,
    );
  });
}

async function renderCrop(
  img: HTMLImageElement,
  sel: CropRect,
  circle: boolean,
  outMime: string,
): Promise<Blob> {
  if (circle) {
    const side = Math.min(sel.w, sel.h);
    const sx = sel.x + (sel.w - side) / 2;
    const sy = sel.y + (sel.h - side) / 2;
    const canvas = document.createElement("canvas");
    canvas.width = side;
    canvas.height = side;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable.");
    ctx.clearRect(0, 0, side, side);
    ctx.beginPath();
    ctx.arc(side / 2, side / 2, side / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, sx, sy, side, side, 0, 0, side, side);
    return canvasToBlob(canvas, "image/png");
  }

  const canvas = document.createElement("canvas");
  canvas.width = sel.w;
  canvas.height = sel.h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable.");
  ctx.drawImage(img, sel.x, sel.y, sel.w, sel.h, 0, 0, sel.w, sel.h);
  const quality = outMime === "image/png" ? undefined : 0.92;
  return canvasToBlob(canvas, outMime, quality);
}

export default function CropImagePage() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const inputHintId = useId();
  const errorId = useId();
  const cropModeId = useId();

  const [file, setFile] = useState<File | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [imageReady, setImageReady] = useState(false);
  const [selection, setSelection] = useState<CropRect | null>(null);
  const [draftSelection, setDraftSelection] = useState<CropRect | null>(null);
  const [circleMode, setCircleMode] = useState(false);
  const [drag, setDrag] = useState<{
    pointerId: number;
    startX: number;
    startY: number;
  } | null>(null);
  const [isDropActive, setIsDropActive] = useState(false);
  const [isPreviewBusy, setIsPreviewBusy] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const activeSelection = draftSelection ?? selection;

  const revokePreview = useCallback(() => {
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      revokePreview();
    };
  }, [objectUrl, revokePreview]);

  const resetFile = () => {
    setError(null);
    revokePreview();
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    setObjectUrl(null);
    setFile(null);
    setImageReady(false);
    setSelection(null);
    setDraftSelection(null);
    setDrag(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handlePick = (next: File | null) => {
    setError(null);
    revokePreview();
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    setObjectUrl(null);
    setFile(null);
    setImageReady(false);
    setSelection(null);
    setDraftSelection(null);
    setDrag(null);

    if (!next) return;
    if (!ACCEPTED_TYPES.includes(next.type)) {
      setError("Please upload a JPG, PNG, or WEBP image.");
      return;
    }
    setFile(next);
    setObjectUrl(URL.createObjectURL(next));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handlePick(e.target.files?.[0] ?? null);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropActive(false);
    handlePick(e.dataTransfer.files?.[0] ?? null);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropActive(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropActive(false);
  };

  const onImageLoad = () => {
    const img = imgRef.current;
    if (!img) return;
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    setImageReady(true);
    setSelection({ x: 0, y: 0, w: nw, h: nh });
    setDraftSelection(null);
  };

  const updatePreview = useCallback(
    async (sel: CropRect | null) => {
      const img = imgRef.current;
      if (!img || !imageReady || !sel || !file) {
        revokePreview();
        return;
      }
      setIsPreviewBusy(true);
      try {
        const blob = await renderCrop(img, sel, circleMode, file.type);
        const url = URL.createObjectURL(blob);
        setPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
      } catch {
        setError("Could not build preview.");
        revokePreview();
      } finally {
        setIsPreviewBusy(false);
      }
    },
    [circleMode, file, imageReady, revokePreview],
  );

  useEffect(() => {
    const sel = draftSelection ?? selection;
    if (!sel || !imageReady || !file) return;
    const t = window.setTimeout(() => {
      void updatePreview(sel);
    }, 80);
    return () => window.clearTimeout(t);
  }, [draftSelection, selection, circleMode, imageReady, file, updatePreview]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!imageReady || !imgRef.current) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    const { nx, ny } = clientToNatural(e.clientX, e.clientY, imgRef.current);
    setDrag({ pointerId: e.pointerId, startX: nx, startY: ny });
    setDraftSelection(null);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag || !imgRef.current) return;
    const { nx, ny } = clientToNatural(e.clientX, e.clientY, imgRef.current);
    const nw = imgRef.current.naturalWidth;
    const nh = imgRef.current.naturalHeight;
    const rect = normalizeSelection(drag.startX, drag.startY, nx, ny, nw, nh);
    setDraftSelection(rect);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag) return;
    if (e.pointerId !== drag.pointerId) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    const img = imgRef.current;
    if (img) {
      const { nx, ny } = clientToNatural(e.clientX, e.clientY, img);
      const nw = img.naturalWidth;
      const nh = img.naturalHeight;
      setSelection(normalizeSelection(drag.startX, drag.startY, nx, ny, nw, nh));
    }
    setDrag(null);
    setDraftSelection(null);
  };

  const handleDownload = async () => {
    const img = imgRef.current;
    const sel = selection ?? draftSelection;
    if (!img || !sel || !file) return;
    setIsDownloading(true);
    setError(null);
    try {
      const blob = await renderCrop(img, sel, circleMode, file.type);
      const ext =
        circleMode
          ? "png"
          : file.type === "image/png"
            ? "png"
            : file.type === "image/webp"
              ? "webp"
              : "jpg";
      const base = file.name.replace(/\.[^.]+$/, "") || "cropped";
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${base}-cropped.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Download failed. Try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const displaySel = activeSelection;
  const nw = imgRef.current?.naturalWidth ?? 1;
  const nh = imgRef.current?.naturalHeight ?? 1;
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.cropImage)} />
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
        aria-labelledby="crop-image-heading"
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
                <span className="text-foreground">Crop Image</span>
              </p>
            </nav>
            <h1
              id="crop-image-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Crop Image Online Free (Rectangle & Circle)
            </h1>
            <p
              id={inputHintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Drag on your image to choose an area, switch circle or rectangle output, then
              preview and download.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="crop-image-heading"
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
              className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition sm:p-8 ${
                isDropActive
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
                JPG, PNG, or WEBP
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  role="switch"
                  aria-checked={circleMode}
                  aria-labelledby={cropModeId}
                  onClick={() => setCircleMode((c) => !c)}
                  className={`inline-flex h-7 w-12 shrink-0 items-center rounded-full transition ${
                    circleMode ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full bg-white transition ${
                      circleMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span id={cropModeId} className="text-sm text-foreground">
                  Circle crop (output)
                </span>
              </div>
              <p className="text-xs text-muted-foreground sm:text-right">
                Drag on the image to draw a crop region. Circle mode uses the largest
                square inside your selection.
              </p>
            </div>

            {objectUrl ? (
              <div className="mt-6">
                <p className="mb-2 text-sm font-medium text-foreground">
                  Select crop area
                </p>
                <div className="relative inline-block max-w-full rounded-lg border border-border bg-muted/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imgRef}
                    src={objectUrl}
                    alt="Image to crop"
                    draggable={false}
                    onLoad={onImageLoad}
                    className="block max-h-[min(55vh,420px)] w-auto max-w-full select-none rounded-lg"
                  />
                  {imageReady && displaySel ? (
                    <div
                      className="absolute inset-0 touch-none"
                      onPointerDown={onPointerDown}
                      onPointerMove={onPointerMove}
                      onPointerUp={onPointerUp}
                      onPointerCancel={onPointerUp}
                    >
                      <div
                        className={`pointer-events-none absolute border-2 border-primary shadow-[0_0_0_9999px_rgba(0,0,0,0.35)] ${
                          circleMode ? "rounded-full" : "rounded-sm"
                        }`}
                        style={{
                          left: `${(displaySel.x / nw) * 100}%`,
                          top: `${(displaySel.y / nh) * 100}%`,
                          width: `${(displaySel.w / nw) * 100}%`,
                          height: `${(displaySel.h / nh) * 100}%`,
                        }}
                      />
                    </div>
                  ) : null}
                </div>
                {isPreviewBusy ? (
                  <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
                    Updating preview…
                  </p>
                ) : null}
              </div>
            ) : null}

            {displaySel && imageReady ? (
              <p className="mt-3 text-xs text-muted-foreground">
                Selection: {displaySel.w} × {displaySel.h} px (natural)
              </p>
            ) : null}

            <div className="mt-6">
              <p className="text-sm font-medium text-foreground">Cropped preview</p>
              <div className="mt-2 flex min-h-[140px] items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 p-4">
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewUrl}
                    alt="Cropped result preview"
                    className="max-h-48 max-w-full rounded-md object-contain"
                  />
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {file && imageReady
                      ? "Preview appears after you adjust the selection."
                      : "Upload an image to see preview."}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleDownload}
                disabled={
                  !file ||
                  !imageReady ||
                  !(selection ?? draftSelection) ||
                  isDownloading
                }
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDownloading ? "Working…" : "Download cropped"}
              </button>
              <button
                type="button"
                onClick={resetFile}
                disabled={!file || isDownloading}
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
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="crop-seo-heading">
            <h2
              id="crop-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is Image Cropping?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Cropping removes outer parts of an image so you can focus on a subject,
              match a required aspect ratio, or prepare assets for social profiles and
              documents.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Crop Image Online
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Upload a JPG, PNG, or WEBP file.</li>
              <li>Click and drag on the image to set the crop rectangle.</li>
              <li>Toggle circle mode if you need a round export (e.g. avatar).</li>
              <li>Check the preview, then download your cropped image.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Crop Image for Social Media
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Instagram: square 1080×1080 posts are common—crop first, then resize.</li>
              <li>Profile pictures: use circle mode for a round avatar-style export.</li>
              <li>Passport photos: crop tightly to the face, then use Resize for exact px.</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Use This Tool?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              SmartFlexa runs in your browser: fast, free, and no account required. You get
              a clear preview before downloading.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  How to crop image in a circle?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Turn on “Circle crop,” drag your region, and download. The tool exports
                  the largest square inside your selection as a circular PNG.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Can I crop without losing quality?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Cropping keeps pixels inside the region at full resolution; you are not
                  recompressing the whole photo until export (same as saving a region).
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. The SmartFlexa Image Crop Tool is free to use.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is my image secure?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Processing happens locally in your browser; your image is not uploaded to
                  our servers for this tool.
                </dd>
              </div>
            </dl>

            <PassportWorkflowRelatedLinks currentPath="/tools/crop-image" />
            <RelatedTools currentPath="/tools/crop-image" heading="More tools" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
