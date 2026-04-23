"use client";

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  Copy,
  Download,
  ImagePlus,
  Lock,
  RefreshCw,
  Sparkles,
  Unlock,
} from "lucide-react";

import {
  type RGB,
  extractDominantFromFile,
  generateRandomPalette5,
  generateRandomSwatch,
  mergeDominantWithLocks,
  relativeLuminance,
  rgbToCssRgb,
  rgbToHex,
} from "@/lib/color-palette-utils";

const RANDOM_SLOTS = 5;
const IMAGE_SLOTS = 6;
const COPY_MS = 2000;

function downloadText(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function buildPaletteJson(colors: RGB[]) {
  return JSON.stringify(
    colors.map((rgb, i) => ({
      index: i + 1,
      hex: rgbToHex(rgb),
      rgb: { r: rgb.r, g: rgb.g, b: rgb.b },
      cssRgb: rgbToCssRgb(rgb),
    })),
    null,
    2,
  );
}

function buildCssVariables(colors: RGB[]) {
  const lines = colors.map(
    (rgb, i) => `  --palette-${i + 1}: ${rgbToHex(rgb)}; /* ${rgbToCssRgb(rgb)} */`,
  );
  return `:root {\n${lines.join("\n")}\n}\n`;
}

function drawPalettePng(colors: RGB[]): Promise<Blob> {
  const w = 900;
  const h = 280;
  const pad = 24;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return Promise.reject(new Error("Canvas not supported."));
  ctx.fillStyle = "#fafafa";
  ctx.fillRect(0, 0, w, h);
  const n = colors.length;
  const stripW = w - pad * 2;
  const cell = stripW / n;
  const swatchH = 160;
  const top = 40;
  colors.forEach((rgb, i) => {
    const x = pad + i * cell;
    ctx.fillStyle = rgbToHex(rgb);
    ctx.fillRect(x + 4, top, cell - 8, swatchH);
    const lum = relativeLuminance(rgb);
    ctx.fillStyle = lum > 0.55 ? "#111827" : "#f9fafb";
    ctx.font = "600 14px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(rgbToHex(rgb), x + cell / 2, top + swatchH + 28);
    ctx.font = "12px ui-monospace, monospace";
    ctx.fillStyle = lum > 0.55 ? "#4b5563" : "#d1d5db";
    ctx.fillText(rgbToCssRgb(rgb), x + cell / 2, top + swatchH + 50);
  });
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error("Export failed."));
        else resolve(blob);
      },
      "image/png",
      1,
    );
  });
}

export type ColorPaletteGeneratorToolProps = {
  defaultMode?: "random" | "image";
  headingId?: string;
};

export function ColorPaletteGeneratorTool({
  defaultMode = "random",
  headingId,
}: ColorPaletteGeneratorToolProps) {
  const fileInputId = useId();
  const modeGroupId = useId();
  const [mode, setMode] = useState<"random" | "image">(defaultMode);
  const [colors, setColors] = useState<RGB[]>(() =>
    defaultMode === "random" ? generateRandomPalette5() : [],
  );
  const [locked, setLocked] = useState<boolean[]>(() =>
    defaultMode === "random"
      ? Array(RANDOM_SLOTS).fill(false)
      : Array(IMAGE_SLOTS).fill(false),
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageFileRef = useRef<File | null>(null);
  const [extractVariant, setExtractVariant] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copyLabel, setCopyLabel] = useState<string | null>(null);
  const copyTimer = useRef<number | null>(null);

  const slotCount = mode === "random" ? RANDOM_SLOTS : IMAGE_SLOTS;

  useEffect(() => {
    return () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const flashCopy = useCallback((label: string) => {
    setCopyLabel(label);
    if (copyTimer.current) window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => {
      setCopyLabel(null);
      copyTimer.current = null;
    }, COPY_MS);
  }, []);

  const syncLocks = useCallback((len: number) => {
    setLocked((prev) => {
      const next = prev.slice(0, len);
      while (next.length < len) next.push(false);
      return next;
    });
  }, []);

  const handleModeRandom = () => {
    setMode("random");
    setError(null);
    imageFileRef.current = null;
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    const next = generateRandomPalette5();
    setColors(next);
    syncLocks(RANDOM_SLOTS);
  };

  const handleModeImage = () => {
    setMode("image");
    setError(null);
    setColors([]);
    syncLocks(IMAGE_SLOTS);
  };

  const regenerateRandom = () => {
    setError(null);
    setColors((prev) => {
      const next = [...prev];
      while (next.length < RANDOM_SLOTS) next.push(generateRandomSwatch(next));
      for (let i = 0; i < RANDOM_SLOTS; i++) {
        if (locked[i]) continue;
        const avoidLocked = prev.filter((_, j) => locked[j] && j !== i);
        next[i] = generateRandomSwatch(avoidLocked, 26);
      }
      return next.slice(0, RANDOM_SLOTS);
    });
  };

  const runImageExtract = useCallback(
    async (file: File, variant: number, prevColors: RGB[], prevLocked: boolean[]) => {
      setBusy(true);
      setError(null);
      try {
        const dominant = await extractDominantFromFile(file, IMAGE_SLOTS, variant);
        if (prevColors.length === IMAGE_SLOTS && prevLocked.some(Boolean)) {
          setColors(mergeDominantWithLocks(prevColors, prevLocked, dominant));
        } else {
          setColors(dominant);
        }
      } catch {
        setError("Could not read that image. Try JPG, PNG, or WebP.");
      } finally {
        setBusy(false);
      }
    },
    [],
  );

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    imageFileRef.current = file;
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setExtractVariant(0);
    void runImageExtract(file, 0, [], Array(IMAGE_SLOTS).fill(false));
  };

  const regenerateImage = () => {
    const file = imageFileRef.current;
    if (!file) {
      setError("Upload an image first.");
      return;
    }
    const v = extractVariant + 1;
    setExtractVariant(v);
    void runImageExtract(file, v, colors, locked);
  };

  const toggleLock = (index: number) => {
    setLocked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const copyHex = async (index: number) => {
    const hex = rgbToHex(colors[index]!);
    try {
      await navigator.clipboard.writeText(hex);
      flashCopy(`Copied ${hex}`);
    } catch {
      setError("Clipboard access blocked. Copy manually.");
    }
  };

  const copyRgb = async (index: number) => {
    const t = rgbToCssRgb(colors[index]!);
    try {
      await navigator.clipboard.writeText(t);
      flashCopy(`Copied ${t}`);
    } catch {
      setError("Clipboard access blocked. Copy manually.");
    }
  };

  const handleDownloadPng = async () => {
    if (!colors.length) return;
    try {
      const blob = await drawPalettePng(colors);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "smartflexa-color-palette.png";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Could not build the palette image.");
    }
  };

  const heading = headingId ?? "color-palette-tool-heading";

  return (
    <section
      className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6"
      aria-labelledby={heading}
    >
      <h2 id={heading} className="sr-only">
        Color palette controls
      </h2>

      <div
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        role="group"
        aria-labelledby={modeGroupId}
      >
        <span id={modeGroupId} className="sr-only">
          Palette mode
        </span>
        <div className="inline-flex rounded-lg border border-border bg-muted/30 p-1">
          <button
            type="button"
            onClick={handleModeRandom}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
              mode === "random"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            Random palette
          </button>
          <button
            type="button"
            onClick={handleModeImage}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
              mode === "image"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ImagePlus className="h-4 w-4" aria-hidden />
            From image
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={mode === "random" ? regenerateRandom : regenerateImage}
            disabled={busy || (mode === "image" && !imageFileRef.current)}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted disabled:opacity-50"
          >
            <RefreshCw
              className={`h-4 w-4 ${busy ? "animate-spin" : ""}`}
              aria-hidden
            />
            Regenerate
          </button>
          <button
            type="button"
            onClick={() => downloadText("palette.json", buildPaletteJson(colors), "application/json")}
            disabled={!colors.length}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"
          >
            JSON
          </button>
          <button
            type="button"
            onClick={() =>
              downloadText("palette.css", buildCssVariables(colors), "text/css")
            }
            disabled={!colors.length}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"
          >
            CSS vars
          </button>
          <button
            type="button"
            onClick={handleDownloadPng}
            disabled={!colors.length}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            <Download className="h-4 w-4" aria-hidden />
            Palette image
          </button>
        </div>
      </div>

      {mode === "image" && (
        <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/20 p-4">
          <label htmlFor={fileInputId} className="cursor-pointer text-sm font-medium text-foreground">
            <span className="text-primary underline-offset-4 hover:underline">
              Upload an image
            </span>
            <span className="text-muted-foreground">
              {" "}
              — we extract five to six dominant colors locally (JPG, PNG, WebP).
            </span>
          </label>
          <input
            id={fileInputId}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="sr-only"
            onChange={handleFile}
          />
          {imagePreview && (
            // Blob preview: next/image remote patterns do not apply.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imagePreview}
              alt="Uploaded preview for color extraction"
              className="mt-4 max-h-40 w-auto max-w-full rounded-md border border-border object-contain"
            />
          )}
        </div>
      )}

      {copyLabel && (
        <p className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400" role="status">
          {copyLabel}
        </p>
      )}
      {error && (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      {mode === "image" && !colors.length && !busy && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Upload a photo or graphic to see a palette here.
        </p>
      )}

      {colors.length > 0 && (
        <ul
          className={`mt-6 grid gap-4 ${
            slotCount === 5
              ? "sm:grid-cols-2 lg:grid-cols-5"
              : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
          }`}
        >
          {colors.map((rgb, i) => {
            const hex = rgbToHex(rgb);
            const rgbStr = rgbToCssRgb(rgb);
            const lum = relativeLuminance(rgb);
            const fg = lum > 0.52 ? "text-slate-900" : "text-white";
            const sub = lum > 0.52 ? "text-slate-700" : "text-white/85";
            return (
              <li key={`${i}-${hex}`} className="flex flex-col gap-2">
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border shadow-sm"
                  style={{ backgroundColor: hex }}
                >
                  <div className={`absolute inset-x-0 bottom-0 space-y-1 p-3 ${fg}`}>
                    <button
                      type="button"
                      onClick={() => void copyHex(i)}
                      className={`block w-full text-left font-mono text-sm font-semibold tracking-wide ${sub} hover:opacity-90`}
                    >
                      {hex}
                    </button>
                    <button
                      type="button"
                      onClick={() => void copyRgb(i)}
                      className={`block w-full text-left font-mono text-xs ${sub} hover:opacity-90`}
                    >
                      {rgbStr}
                    </button>
                  </div>
                  <div className="absolute right-2 top-2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => toggleLock(i)}
                      className="rounded-md bg-black/25 p-1.5 text-white backdrop-blur hover:bg-black/40"
                      aria-pressed={locked[i]}
                      aria-label={locked[i] ? "Unlock color" : "Lock color"}
                    >
                      {locked[i] ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        <Unlock className="h-4 w-4 opacity-80" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => void copyHex(i)}
                      className="rounded-md bg-black/25 p-1.5 text-white backdrop-blur hover:bg-black/40"
                      aria-label={`Copy ${hex}`}
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  Tap HEX or RGB to copy
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
