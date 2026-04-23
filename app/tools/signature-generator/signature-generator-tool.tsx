"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

export type SignatureGeneratorInitialMode = "draw" | "type";

const FONT_OPTIONS = [
  { id: "dancing", label: "Dancing Script", stack: '"Dancing Script", cursive' },
  { id: "pacifico", label: "Pacifico", stack: "Pacifico, cursive" },
  { id: "great", label: "Great Vibes", stack: '"Great Vibes", cursive' },
  { id: "allura", label: "Allura", stack: "Allura, cursive" },
  { id: "alex", label: "Alex Brush", stack: '"Alex Brush", cursive' },
  { id: "caveat", label: "Caveat", stack: "Caveat, cursive" },
  { id: "satisfy", label: "Satisfy", stack: "Satisfy, cursive" },
] as const;

export type SignatureGeneratorToolProps = {
  initialMode?: SignatureGeneratorInitialMode;
};

function getDpr() {
  return Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
}

export function SignatureGeneratorTool({
  initialMode = "draw",
}: SignatureGeneratorToolProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const modeGroupId = useId();
  const thicknessId = useId();
  const colorId = useId();
  const textId = useId();
  const transparentId = useId();

  const [mode, setMode] = useState<"draw" | "type">(initialMode);
  const [lineWidth, setLineWidth] = useState(3);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [transparentBg, setTransparentBg] = useState(true);
  const [typedText, setTypedText] = useState("Your Name");
  const [selectedFontId, setSelectedFontId] = useState<(typeof FONT_OPTIONS)[number]["id"]>(
    FONT_OPTIONS[0]!.id,
  );

  const drawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const getLogicalSize = (canvas: HTMLCanvasElement) => {
    const dpr = getDpr();
    return { w: canvas.width / dpr, h: canvas.height / dpr, dpr };
  };

  const pointerToLogical = (
    canvas: HTMLCanvasElement,
    e: React.PointerEvent<HTMLCanvasElement>,
  ) => {
    const rect = canvas.getBoundingClientRect();
    const { w, h } = getLogicalSize(canvas);
    const x = ((e.clientX - rect.left) / rect.width) * w;
    const y = ((e.clientY - rect.top) / rect.height) * h;
    return { x, y };
  };

  const applyBackground = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      if (transparentBg) {
        ctx.clearRect(0, 0, w, h);
      } else {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
      }
    },
    [transparentBg],
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = containerRef.current;
    if (!canvas || !wrap) return;
    const dpr = getDpr();
    const w = Math.floor(wrap.clientWidth);
    const h = Math.floor(Math.min(280, Math.max(200, wrap.clientWidth * 0.36)));
    if (w < 8 || h < 8) return;

    let snapshot: string | null = null;
    if (canvas.width > 0 && canvas.height > 0) {
      try {
        snapshot = canvas.toDataURL("image/png");
      } catch {
        snapshot = null;
      }
    }

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    applyBackground(ctx, w, h);

    if (snapshot && snapshot.length > 200) {
      const img = new Image();
      img.onload = () => {
        const c2 = canvas.getContext("2d");
        if (!c2) return;
        c2.setTransform(dpr, 0, 0, dpr, 0, 0);
        c2.drawImage(img, 0, 0, w, h);
      };
      img.src = snapshot;
    }
  }, [applyBackground]);

  useEffect(() => {
    resizeCanvas();
    const ro = new ResizeObserver(() => resizeCanvas());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", resizeCanvas);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [resizeCanvas]);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (mode !== "draw") return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const p = pointerToLogical(canvas, e);
    lastPointRef.current = p;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (mode !== "draw" || !drawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { dpr } = getLogicalSize(canvas);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const p = pointerToLogical(canvas, e);
    const last = lastPointRef.current;
    if (!last) {
      lastPointRef.current = p;
      return;
    }
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastPointRef.current = p;
  };

  const endStroke = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (mode !== "draw") return;
    drawingRef.current = false;
    lastPointRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h, dpr } = getLogicalSize(canvas);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    applyBackground(ctx, w, h);
  };

  const selectedFont = FONT_OPTIONS.find((f) => f.id === selectedFontId) ?? FONT_OPTIONS[0]!;

  const buildExportCanvas = useCallback(async (): Promise<HTMLCanvasElement | null> => {
    const exportW = 900;
    const exportH = 280;
    const out = document.createElement("canvas");
    const ctx = out.getContext("2d");
    if (!ctx) return null;

    if (mode === "draw") {
      const src = canvasRef.current;
      if (!src || src.width < 2) return null;
      out.width = src.width;
      out.height = src.height;
      if (transparentBg) {
        ctx.clearRect(0, 0, out.width, out.height);
      } else {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, out.width, out.height);
      }
      ctx.drawImage(src, 0, 0);
      return out;
    }

    out.width = exportW;
    out.height = exportH;
    if (transparentBg) {
      ctx.clearRect(0, 0, exportW, exportH);
    } else {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, exportW, exportH);
    }

    await document.fonts.ready.catch(() => undefined);
    const text = typedText.trim() || " ";
    const fontPx = Math.min(110, Math.max(42, exportW / (text.length * 0.55)));
    ctx.font = `${fontPx}px ${selectedFont.stack}`;
    ctx.fillStyle = strokeColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, exportW / 2, exportH / 2);
    return out;
  }, [mode, selectedFont, strokeColor, transparentBg, typedText]);

  const downloadPng = async () => {
    const canvas = await buildExportCanvas();
    if (!canvas) return;
    await new Promise<void>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("export"));
            return;
          }
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `signature-${mode === "draw" ? "drawn" : "typed"}.png`;
          a.click();
          URL.revokeObjectURL(url);
          resolve();
        },
        "image/png",
      );
    }).catch(() => undefined);
  };

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8">
      <div
        className="flex flex-wrap gap-2 rounded-lg border border-border bg-muted/30 p-1"
        role="tablist"
        aria-labelledby={modeGroupId}
      >
        <span id={modeGroupId} className="sr-only">
          Signature mode
        </span>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "draw"}
          className={`flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition sm:flex-none ${
            mode === "draw"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setMode("draw")}
        >
          Draw signature
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "type"}
          className={`flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition sm:flex-none ${
            mode === "type"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setMode("type")}
        >
          Type signature
        </button>
      </div>

      {mode === "draw" ? (
        <div className="mt-6 space-y-4">
          <div
            ref={containerRef}
            className="relative w-full overflow-hidden rounded-lg border border-border bg-muted/20"
          >
            <canvas
              ref={canvasRef}
              className="block w-full touch-none cursor-crosshair"
              style={{ touchAction: "none" }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endStroke}
              onPointerCancel={endStroke}
              onPointerLeave={(e) => {
                if (drawingRef.current) endStroke(e);
              }}
            />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
            <div className="min-w-[140px] flex-1">
              <label
                htmlFor={thicknessId}
                className="text-xs font-medium text-foreground"
              >
                Pen thickness ({lineWidth}px)
              </label>
              <input
                id={thicknessId}
                type="range"
                min={1}
                max={16}
                value={lineWidth}
                onChange={(e) => setLineWidth(Number(e.target.value))}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label htmlFor={colorId} className="text-xs font-medium text-foreground">
                Ink color
              </label>
              <input
                id={colorId}
                type="color"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
                className="mt-1 h-10 w-full min-w-[3rem] cursor-pointer rounded border border-input bg-background sm:w-24"
              />
            </div>
            <button
              type="button"
              onClick={clearCanvas}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-muted"
            >
              Clear canvas
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor={textId} className="text-xs font-medium text-foreground">
              Your name or text
            </label>
            <input
              id={textId}
              type="text"
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
              maxLength={48}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground"
              placeholder="Type your signature"
              autoComplete="off"
            />
          </div>
          <div>
            <p className="text-xs font-medium text-foreground">Pick a style (7 fonts)</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {FONT_OPTIONS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedFontId(f.id)}
                  className={`rounded-lg border px-3 py-3 text-left text-lg transition ${
                    selectedFontId === f.id
                      ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                      : "border-border bg-background hover:bg-muted/50"
                  }`}
                  style={{ fontFamily: f.stack }}
                >
                  <span className="block truncate text-foreground">
                    {typedText || "Preview"}
                  </span>
                  <span className="mt-1 block text-xs font-sans text-muted-foreground">
                    {f.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
          <input
            id={transparentId}
            type="checkbox"
            checked={transparentBg}
            onChange={(e) => setTransparentBg(e.target.checked)}
            className="h-4 w-4 rounded border-input"
          />
          <span>Transparent background (PNG)</span>
        </label>
        <button
          type="button"
          onClick={() => void downloadPng()}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Download PNG
        </button>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Tip: turn off transparent background if a white mat works better for your PDF viewer.
      </p>
    </div>
  );
}
