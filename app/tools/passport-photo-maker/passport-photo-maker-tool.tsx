"use client";

import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";


const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

/** USA 2×2 in at 300 DPI equivalent (common online spec). */
const PRESET_USA = { w: 600, h: 600, label: "USA — 2×2 in (600×600 px)" };
/** India / UK 35×45 mm at ~300 DPI (common digital submission size). */
const PRESET_35_45 = { w: 413, h: 531 };

const A4_PRINT_PX = { w: 2480, h: 3508 } as const;

type CropRect = { x: number; y: number; w: number; h: number };
export type PassportPhotoMakerPresetId = "usa" | "india" | "uk" | "custom";
type PresetId = PassportPhotoMakerPresetId;
type Step = 1 | 2 | 3 | 4;

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
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

function squareFromDrag(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  nw: number,
  nh: number,
): CropRect {
  const rx = Math.min(x1, x2);
  const ry = Math.min(y1, y2);
  const rw = Math.abs(x2 - x1);
  const rh = Math.abs(y2 - y1);
  let side = Math.max(2, Math.min(rw, rh, nw, nh));
  const cx = rx + rw / 2;
  const cy = ry + rh / 2;
  let nx = Math.round(cx - side / 2);
  let ny = Math.round(cy - side / 2);
  nx = clamp(nx, 0, nw - 1);
  ny = clamp(ny, 0, nh - 1);
  side = Math.min(side, nw - nx, nh - ny);
  return { x: nx, y: ny, w: side, h: side };
}

function initialCenteredSquare(nw: number, nh: number): CropRect {
  const side = Math.round(Math.min(nw, nh) * 0.78);
  const s = clamp(side, 2, Math.min(nw, nh));
  const x = Math.round((nw - s) / 2);
  const y = Math.round((nh - s) / 2);
  return { x, y, w: s, h: s };
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

function buildPassportCanvas(
  img: HTMLImageElement,
  sel: CropRect,
  outW: number,
  outH: number,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable.");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, outW, outH);
  const scale = Math.min(outW / sel.w, outH / sel.h);
  const dw = sel.w * scale;
  const dh = sel.h * scale;
  const dx = (outW - dw) / 2;
  const dy = (outH - dh) / 2;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, sel.x, sel.y, sel.w, sel.h, dx, dy, dw, dh);
  return canvas;
}

function buildA4GridCanvas(src: HTMLCanvasElement): HTMLCanvasElement {
  const { w: A4_W, h: A4_H } = A4_PRINT_PX;
  const MARGIN = 56;
  const GAP = 20;
  const cellW = src.width;
  const cellH = src.height;
  const availW = A4_W - 2 * MARGIN;
  const availH = A4_H - 2 * MARGIN;
  const cols = Math.max(
    1,
    Math.floor((availW + GAP) / (cellW + GAP)),
  );
  const rows = Math.max(
    1,
    Math.floor((availH + GAP) / (cellH + GAP)),
  );
  const totalW = cols * cellW + (cols - 1) * GAP;
  const totalH = rows * cellH + (rows - 1) * GAP;
  const offsetX = MARGIN + (availW - totalW) / 2;
  const offsetY = MARGIN + (availH - totalH) / 2;

  const canvas = document.createElement("canvas");
  canvas.width = A4_W;
  canvas.height = A4_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable.");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, A4_W, A4_H);
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const px = offsetX + c * (cellW + GAP);
      const py = offsetY + r * (cellH + GAP);
      ctx.drawImage(src, 0, 0, cellW, cellH, px, py, cellW, cellH);
    }
  }
  return canvas;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const STEPS: { n: Step; title: string }[] = [
  { n: 1, title: "Upload" },
  { n: 2, title: "Crop" },
  { n: 3, title: "Size" },
  { n: 4, title: "Download" },
];

export type PassportPhotoMakerToolProps = {
  /** Initial preset when the user reaches step 3 (they can still change it). */
  defaultPreset?: PassportPhotoMakerPresetId;
  /** Must match the page `<h1>` id for `aria-labelledby` on the tool card. */
  headingId?: string;
  /** Unique `name` for preset radios (only needed if multiple instances exist). */
  presetRadioName?: string;
};

export function PassportPhotoMakerTool({
  defaultPreset = "usa",
  headingId = "passport-photo-heading",
  presetRadioName = "passport-preset",
}: PassportPhotoMakerToolProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const errorId = useId();
  const customWId = useId();
  const customHId = useId();

  const [step, setStep] = useState<Step>(1);
  const [file, setFile] = useState<File | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [imageReady, setImageReady] = useState(false);
  const [selection, setSelection] = useState<CropRect | null>(null);
  const [draftSelection, setDraftSelection] = useState<CropRect | null>(null);
  const [drag, setDrag] = useState<{
    pointerId: number;
    startX: number;
    startY: number;
  } | null>(null);
  const [isDropActive, setIsDropActive] = useState(false);
  const [presetId, setPresetId] = useState<PresetId>(defaultPreset);
  const [customW, setCustomW] = useState("400");
  const [customH, setCustomH] = useState("500");
  const [error, setError] = useState<string | null>(null);
  const [finalPreviewUrl, setFinalPreviewUrl] = useState<string | null>(null);
  const [gridPreviewUrl, setGridPreviewUrl] = useState<string | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const displaySel = draftSelection ?? selection;
  const nw = imgRef.current?.naturalWidth ?? 1;
  const nh = imgRef.current?.naturalHeight ?? 1;

  const outputDims = useMemo(() => {
    if (presetId === "usa") return { w: PRESET_USA.w, h: PRESET_USA.h };
    if (presetId === "india" || presetId === "uk")
      return { w: PRESET_35_45.w, h: PRESET_35_45.h };
    const w = Math.round(Number.parseInt(customW, 10));
    const h = Math.round(Number.parseInt(customH, 10));
    const cw = Number.isFinite(w) ? clamp(w, 64, 4000) : 400;
    const ch = Number.isFinite(h) ? clamp(h, 64, 4000) : 500;
    return { w: cw, h: ch };
  }, [presetId, customW, customH]);

  const revokeFinal = useCallback(() => {
    setFinalPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setGridPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      revokeFinal();
    };
  }, [objectUrl, revokeFinal]);

  const resetAll = () => {
    setError(null);
    revokeFinal();
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    setObjectUrl(null);
    setFile(null);
    setImageReady(false);
    setSelection(null);
    setDraftSelection(null);
    setDrag(null);
    setStep(1);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handlePick = (next: File | null) => {
    setError(null);
    revokeFinal();
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    setObjectUrl(null);
    setFile(null);
    setImageReady(false);
    setSelection(null);
    setDraftSelection(null);
    setDrag(null);
    setStep(1);

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
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    setImageReady(true);
    setSelection(initialCenteredSquare(w, h));
    setDraftSelection(null);
  };

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
    const img = imgRef.current;
    setDraftSelection(
      squareFromDrag(drag.startX, drag.startY, nx, ny, img.naturalWidth, img.naturalHeight),
    );
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag) return;
    if (e.pointerId !== drag.pointerId) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    const img = imgRef.current;
    if (img) {
      const { nx, ny } = clientToNatural(e.clientX, e.clientY, img);
      setSelection(
        squareFromDrag(drag.startX, drag.startY, nx, ny, img.naturalWidth, img.naturalHeight),
      );
    }
    setDrag(null);
    setDraftSelection(null);
  };

  useEffect(() => {
    if (step !== 4) {
      revokeFinal();
      return;
    }
    const img = imgRef.current;
    const sel = selection;
    if (!img || !imageReady || !sel || !objectUrl) return;

    let cancelled = false;
    setIsBuilding(true);
    setError(null);

    const run = async () => {
      try {
        const { w: ow, h: oh } = outputDims;
        const passCanvas = buildPassportCanvas(img, sel, ow, oh);
        const passBlob = await canvasToBlob(passCanvas, "image/jpeg", 0.92);
        if (cancelled) return;
        setFinalPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(passBlob);
        });
        const gridCanvas = buildA4GridCanvas(passCanvas);
        const gridBlob = await canvasToBlob(gridCanvas, "image/jpeg", 0.88);
        if (cancelled) return;
        setGridPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(gridBlob);
        });
      } catch {
        if (!cancelled) setError("Could not build the passport photo. Try again.");
      } finally {
        if (!cancelled) setIsBuilding(false);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [
    step,
    imageReady,
    selection?.x,
    selection?.y,
    selection?.w,
    selection?.h,
    outputDims.w,
    outputDims.h,
    objectUrl,
    revokeFinal,
  ]);

  const validateCustomSize = (): boolean => {
    if (presetId !== "custom") return true;
    const w = Number.parseInt(customW, 10);
    const h = Number.parseInt(customH, 10);
    if (!Number.isFinite(w) || !Number.isFinite(h)) {
      setError("Enter valid width and height in pixels.");
      return false;
    }
    if (w < 64 || h < 64 || w > 4000 || h > 4000) {
      setError("Custom size must be between 64 and 4000 pixels per side.");
      return false;
    }
    return true;
  };

  const goNext = () => {
    setError(null);
    if (step === 1) {
      if (!file || !objectUrl) {
        setError("Upload an image first.");
        return;
      }
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!selection || !imageReady) {
        setError("Wait for the image to load, then adjust the crop.");
        return;
      }
      setStep(3);
      return;
    }
    if (step === 3) {
      if (!validateCustomSize()) return;
      setStep(4);
    }
  };

  const goBack = () => {
    setError(null);
    if (step <= 1) return;
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
  };

  const downloadPassportJpg = async () => {
    const img = imgRef.current;
    const sel = selection;
    if (!img || !sel || !imageReady) return;
    setIsDownloading(true);
    setError(null);
    try {
      const { w, h } = outputDims;
      const canvas = buildPassportCanvas(img, sel, w, h);
      const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
      const base = file?.name.replace(/\.[^.]+$/, "") || "passport-photo";
      downloadBlob(blob, `${base}-passport-${w}x${h}.jpg`);
    } catch {
      setError("Download failed. Try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadA4Jpg = async () => {
    const img = imgRef.current;
    const sel = selection;
    if (!img || !sel || !imageReady) return;
    setIsDownloading(true);
    setError(null);
    try {
      const { w, h } = outputDims;
      const passCanvas = buildPassportCanvas(img, sel, w, h);
      const gridCanvas = buildA4GridCanvas(passCanvas);
      const blob = await canvasToBlob(gridCanvas, "image/jpeg", 0.88);
      const base = file?.name.replace(/\.[^.]+$/, "") || "passport-photo";
      downloadBlob(blob, `${base}-passport-a4-sheet.jpg`);
    } catch {
      setError("A4 sheet export failed. Try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const imgVisibleClass =
    step === 2
      ? "block max-h-[min(55vh,420px)] w-auto max-w-full select-none rounded-lg"
      : "pointer-events-none fixed left-0 top-0 h-px w-px opacity-0";

  return (
    <div className="space-y-8">
          <ol
            className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:justify-start"
            aria-label="Steps"
          >
            {STEPS.map(({ n, title }, i) => (
              <li key={n} className="flex items-center gap-2">
                <span
                  className={`flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-sm font-semibold ${
                    step === n
                      ? "bg-primary text-primary-foreground"
                      : step > n
                        ? "bg-muted text-foreground"
                        : "border border-border bg-background text-muted-foreground"
                  }`}
                  aria-current={step === n ? "step" : undefined}
                >
                  {n}
                </span>
                <span
                  className={`text-sm font-medium max-sm:hidden ${
                    step === n ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {title}
                </span>
                {i < STEPS.length - 1 ? (
                  <span className="mx-1 text-muted-foreground max-sm:hidden" aria-hidden>
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby={headingId}
          >
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              onChange={onInputChange}
            />

            {step === 1 ? (
              <div>
                <h2 className="text-lg font-semibold text-foreground">1. Upload</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Drag and drop or choose a JPG, PNG, or WEBP file.
                </p>
                <div
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onClick={() => fileRef.current?.click()}
                  className={`mt-4 cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition ${
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
                  <p className="mt-1 text-xs text-muted-foreground">JPG, PNG, or WEBP</p>
                </div>
                {file ? (
                  <p className="mt-3 text-sm text-foreground">
                    Selected: <span className="font-medium">{file.name}</span>
                  </p>
                ) : null}
              </div>
            ) : null}

            {objectUrl ? (
              <div className={step === 2 ? "mt-0" : "sr-only"} aria-hidden={step !== 2}>
                {step === 2 ? (
                  <h2 className="text-lg font-semibold text-foreground">2. Square crop</h2>
                ) : null}
                {step === 2 ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Click and drag on the image. The crop is always square; face-centered
                    crops work best for passport-style output.
                  </p>
                ) : null}
                <div
                  className={
                    step === 2
                      ? "relative mt-4 inline-block max-w-full rounded-lg border border-border bg-muted/30"
                      : "sr-only"
                  }
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imgRef}
                    src={objectUrl}
                    alt={step === 2 ? "Image to crop for passport" : ""}
                    draggable={false}
                    onLoad={onImageLoad}
                    className={imgVisibleClass}
                  />
                  {step === 2 && imageReady && displaySel ? (
                    <div
                      className="absolute inset-0 touch-none"
                      onPointerDown={onPointerDown}
                      onPointerMove={onPointerMove}
                      onPointerUp={onPointerUp}
                      onPointerCancel={onPointerUp}
                    >
                      <div
                        className="pointer-events-none absolute rounded-sm border-2 border-primary shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]"
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
                {step === 2 && displaySel && imageReady ? (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Crop: {displaySel.w} × {displaySel.h} px (square)
                  </p>
                ) : null}
              </div>
            ) : null}

            {step === 3 ? (
              <div>
                <h2 className="text-lg font-semibold text-foreground">3. Output size</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Choose a preset or enter custom width and height in pixels. The crop is
                  scaled to fit inside the frame on a white background (centered).
                </p>
                <fieldset className="mt-4 space-y-3">
                  <legend className="sr-only">Passport size preset</legend>
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input
                      type="radio"
                      name={presetRadioName}
                      className="mt-1"
                      checked={presetId === "usa"}
                      onChange={() => setPresetId("usa")}
                    />
                    <span>
                      <span className="font-medium text-foreground">{PRESET_USA.label}</span>
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input
                      type="radio"
                      name={presetRadioName}
                      className="mt-1"
                      checked={presetId === "india"}
                      onChange={() => setPresetId("india")}
                    />
                    <span>
                      <span className="font-medium text-foreground">
                        India — 35×45 mm ({PRESET_35_45.w}×{PRESET_35_45.h} px)
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        Typical digital size at ~300 DPI; confirm with your authority.
                      </span>
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input
                      type="radio"
                      name={presetRadioName}
                      className="mt-1"
                      checked={presetId === "uk"}
                      onChange={() => setPresetId("uk")}
                    />
                    <span>
                      <span className="font-medium text-foreground">
                        UK — 35×45 mm ({PRESET_35_45.w}×{PRESET_35_45.h} px)
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        Same dimensions as India preset; rules vary by service—verify locally.
                      </span>
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input
                      type="radio"
                      name={presetRadioName}
                      className="mt-1"
                      checked={presetId === "custom"}
                      onChange={() => setPresetId("custom")}
                    />
                    <span className="font-medium text-foreground">Custom size (px)</span>
                  </label>
                </fieldset>
                {presetId === "custom" ? (
                  <div className="mt-4 flex flex-wrap items-end gap-4">
                    <div>
                      <label
                        htmlFor={customWId}
                        className="text-xs font-medium text-foreground"
                      >
                        Width
                      </label>
                      <input
                        id={customWId}
                        type="number"
                        min={64}
                        max={4000}
                        value={customW}
                        onChange={(e) => setCustomW(e.target.value)}
                        className="mt-1 block w-28 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={customHId}
                        className="text-xs font-medium text-foreground"
                      >
                        Height
                      </label>
                      <input
                        id={customHId}
                        type="number"
                        min={64}
                        max={4000}
                        value={customH}
                        onChange={(e) => setCustomH(e.target.value)}
                        className="mt-1 block w-28 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                ) : null}
                <p className="mt-4 text-sm text-muted-foreground">
                  Output:{" "}
                  <strong className="text-foreground">
                    {outputDims.w} × {outputDims.h} px
                  </strong>
                </p>
              </div>
            ) : null}

            {step === 4 ? (
              <div>
                <h2 className="text-lg font-semibold text-foreground">4. Download</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Preview your passport photo and download a single JPG or a printable A4
                  grid (300 DPI canvas).
                </p>
                {isBuilding ? (
                  <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
                    Building preview…
                  </p>
                ) : null}
                <div className="mt-6 grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">Passport photo</p>
                    <div className="mt-2 flex min-h-[160px] items-center justify-center rounded-lg border border-border bg-muted/20 p-4">
                      {finalPreviewUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={finalPreviewUrl}
                          alt={`Passport photo preview ${outputDims.w} by ${outputDims.h} pixels`}
                          className="max-h-56 max-w-full rounded-md object-contain shadow-sm"
                        />
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Preview will appear here.
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">A4 print sheet (optional)</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {A4_PRINT_PX.w}×{A4_PRINT_PX.h} px — open in an editor and print at 100%
                      scale for best results.
                    </p>
                    <div className="mt-2 flex min-h-[160px] items-center justify-center rounded-lg border border-border bg-muted/20 p-4">
                      {gridPreviewUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={gridPreviewUrl}
                          alt="Preview of passport photos tiled on an A4 sheet"
                          className="max-h-56 max-w-full rounded-md object-contain shadow-sm"
                        />
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          {isBuilding ? "Generating…" : "Grid preview unavailable."}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <button
                    type="button"
                    onClick={() => void downloadPassportJpg()}
                    disabled={!imageReady || !selection || isDownloading}
                    className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isDownloading ? "Working…" : "Download passport JPG"}
                  </button>
                  <button
                    type="button"
                    onClick={() => void downloadA4Jpg()}
                    disabled={!imageReady || !selection || isDownloading}
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Download A4 sheet JPG
                  </button>
                </div>
              </div>
            ) : null}

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Back
              </button>
              <div className="flex flex-col gap-3 sm:flex-row">
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Next
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={resetAll}
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium text-foreground hover:bg-muted"
                >
                  Start over
                </button>
              </div>
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

    </div>
  );
}
