"use client";

import { ChangeEvent, useCallback, useId, useRef, useState } from "react";
import { Download, Eraser, RefreshCw } from "lucide-react";

import {
  type RemoveBgAlgorithm,
  type RemoveBgParams,
  type RGB,
  parseHexColor,
  removeBackgroundFromImageData,
  rgbToHex,
} from "@/lib/remove-background";

const ACCEPT = "image/jpeg,image/png,.jpg,.jpeg,.png";

function loadImageElement(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not load image."));
    };
    img.src = url;
  });
}

export function RemoveBackgroundTool() {
  const fileId = useId();
  const tolId = useId();
  const brightId = useId();
  const replaceHexId = useId();

  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [algorithm, setAlgorithm] = useState<RemoveBgAlgorithm>("border");
  const [tolerance, setTolerance] = useState(42);
  const [brightCutoff, setBrightCutoff] = useState(230);
  const [pickColor, setPickColor] = useState<RGB | null>(null);
  const [useSolidBg, setUseSolidBg] = useState(false);
  const [replaceHex, setReplaceHex] = useState("#FFFFFF");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pickHint, setPickHint] = useState<string | null>(null);

  const sourceRef = useRef<ImageData | null>(null);
  const naturalRef = useRef<{ w: number; h: number } | null>(null);

  const revokeIf = (url: string | null) => {
    if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
  };

  const runProcess = useCallback(async () => {
    if (!sourceRef.current || !naturalRef.current) {
      setError("Upload an image first.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const replace = useSolidBg ? parseHexColor(replaceHex) : null;
      if (useSolidBg && !replace) {
        setError("Invalid replacement color hex.");
        setBusy(false);
        return;
      }
      const params: RemoveBgParams = {
        algorithm,
        tolerance,
        brightCutoff,
        pickColor: algorithm === "pick" ? pickColor : null,
        replaceBackground: replace,
      };
      const out = removeBackgroundFromImageData(sourceRef.current, params);
      const canvas = document.createElement("canvas");
      canvas.width = out.width;
      canvas.height = out.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas error.");
      ctx.putImageData(out, 0, 0);
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("PNG export failed."))),
          "image/png",
        );
      });
      setResultUrl((old) => {
        if (old?.startsWith("blob:")) URL.revokeObjectURL(old);
        return URL.createObjectURL(blob);
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Processing failed.");
    } finally {
      setBusy(false);
    }
  }, [algorithm, brightCutoff, pickColor, replaceHex, tolerance, useSolidBg]);

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (!f.type.match(/^image\/(jpeg|png)$/i)) {
      setError("Please use JPG or PNG.");
      return;
    }
    setError(null);
    setPickColor(null);
    setPickHint(null);
    revokeIf(originalUrl);
    revokeIf(resultUrl);
    setResultUrl(null);
    setFile(f);
    const url = URL.createObjectURL(f);
    setOriginalUrl(url);
    try {
      const img = await loadImageElement(f);
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      naturalRef.current = { w, h };
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) throw new Error("Canvas not supported.");
      ctx.drawImage(img, 0, 0);
      sourceRef.current = ctx.getImageData(0, 0, w, h);
      await runProcess();
    } catch {
      setError("Could not read that image.");
      revokeIf(url);
      setOriginalUrl(null);
      sourceRef.current = null;
    }
  };

  const onSampleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (algorithm !== "pick" || !sourceRef.current) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const nx = Math.floor(((e.clientX - rect.left) / rect.width) * el.naturalWidth);
    const ny = Math.floor(((e.clientY - rect.top) / rect.height) * el.naturalHeight);
    const w = sourceRef.current.width;
    const h = sourceRef.current.height;
    const x = Math.max(0, Math.min(w - 1, nx));
    const y = Math.max(0, Math.min(h - 1, ny));
    const i = (y * w + x) * 4;
    const d = sourceRef.current.data;
    setPickColor({ r: d[i]!, g: d[i + 1]!, b: d[i + 2]! });
    setPickHint(`Sampled ${rgbToHex({ r: d[i]!, g: d[i + 1]!, b: d[i + 2]! })} — tap Apply.`);
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${file ? file.name.replace(/\.(jpe?g|png)$/i, "") : "smartflexa"}-no-bg.png`;
    a.click();
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,320px),1fr]">
        <div className="space-y-5 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div>
            <label htmlFor={fileId} className="text-sm font-semibold text-foreground">
              Image (JPG or PNG)
            </label>
            <input
              id={fileId}
              type="file"
              accept={ACCEPT}
              className="mt-2 block w-full text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-2 file:text-sm file:font-medium"
              onChange={(e) => void handleFile(e)}
            />
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold text-foreground">Method</legend>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="algo"
                checked={algorithm === "border"}
                onChange={() => setAlgorithm("border")}
                className="border-input"
              />
              Border color (flood from edges)
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="algo"
                checked={algorithm === "bright"}
                onChange={() => setAlgorithm("bright")}
                className="border-input"
              />
              Bright backdrop (threshold)
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="algo"
                checked={algorithm === "pick"}
                onChange={() => setAlgorithm("pick")}
                className="border-input"
              />
              Pick color (click preview)
            </label>
          </fieldset>

          {(algorithm === "border" || algorithm === "pick") && (
            <div>
              <label htmlFor={tolId} className="text-sm font-medium text-foreground">
                Color tolerance: {tolerance}
              </label>
              <input
                id={tolId}
                type="range"
                min={8}
                max={100}
                value={tolerance}
                onChange={(e) => setTolerance(Number(e.target.value))}
                className="mt-1 w-full"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Higher removes more similar tones (may affect the subject).
              </p>
            </div>
          )}

          {algorithm === "bright" && (
            <div>
              <label htmlFor={brightId} className="text-sm font-medium text-foreground">
                Brightness cutoff: {brightCutoff}
              </label>
              <input
                id={brightId}
                type="range"
                min={160}
                max={252}
                value={brightCutoff}
                onChange={(e) => setBrightCutoff(Number(e.target.value))}
                className="mt-1 w-full"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Pixels with luminance above this become background (good for white studio walls).
              </p>
            </div>
          )}

          {algorithm === "pick" && (
            <p className="text-xs text-muted-foreground">
              Click the original preview to sample the background color, then adjust tolerance and
              Apply.
            </p>
          )}

          <div className="space-y-2 border-t border-border pt-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={useSolidBg}
                onChange={(e) => setUseSolidBg(e.target.checked)}
                className="rounded border-input"
              />
              Replace removed area with solid color (not transparent)
            </label>
            {useSolidBg && (
              <div className="flex flex-wrap items-center gap-2">
                <label htmlFor={replaceHexId} className="text-xs text-muted-foreground">
                  Color
                </label>
                <input
                  id={replaceHexId}
                  type="text"
                  value={replaceHex}
                  onChange={(e) => setReplaceHex(e.target.value)}
                  className="w-28 rounded border border-input bg-background px-2 py-1 font-mono text-sm"
                  placeholder="#FFFFFF"
                />
                <button
                  type="button"
                  onClick={() => setReplaceHex("#FFFFFF")}
                  className="rounded border border-border px-2 py-1 text-xs hover:bg-muted"
                >
                  White
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void runProcess()}
              disabled={busy || !sourceRef.current}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {busy ? (
                <RefreshCw className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Eraser className="h-4 w-4" aria-hidden />
              )}
              Apply
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={!resultUrl}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download PNG
            </button>
          </div>

          {pickHint && <p className="text-xs text-emerald-600 dark:text-emerald-400">{pickHint}</p>}
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Original</h3>
            <div className="overflow-hidden rounded-xl border border-border bg-muted/20 p-2">
              {originalUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={originalUrl}
                  alt="Original upload"
                  className={`mx-auto max-h-[min(420px,55vh)] w-auto max-w-full object-contain ${
                    algorithm === "pick" ? "cursor-crosshair" : ""
                  }`}
                  onClick={onSampleClick}
                />
              ) : (
                <div className="flex min-h-[200px] items-center justify-center text-sm text-muted-foreground">
                  No image yet
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Result</h3>
            <div
              className="overflow-hidden rounded-xl border border-border p-2"
              style={{
                backgroundImage:
                  "linear-gradient(45deg,#e5e7eb 25%,transparent 25%),linear-gradient(-45deg,#e5e7eb 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e5e7eb 75%),linear-gradient(-45deg,transparent 75%,#e5e7eb 75%)",
                backgroundSize: "16px 16px",
                backgroundPosition: "0 0,0 8px,8px -8px,-8px 0",
              }}
            >
              {resultUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={resultUrl}
                  alt="Background removed"
                  className="mx-auto max-h-[min(420px,55vh)] w-auto max-w-full object-contain"
                />
              ) : (
                <div className="flex min-h-[200px] items-center justify-center text-sm text-muted-foreground">
                  {busy ? "Processing…" : "Result appears here"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
