"use client";

import { ChangeEvent, useCallback, useEffect, useId, useRef, useState } from "react";
import { Download, ImageIcon, Type } from "lucide-react";

import { drawImageCover, wrapTextToLines } from "@/lib/text-to-image-canvas";

/** First family is used for canvas `font` (measureText + draw); CSS stack in UI label only. */
const FONT_OPTIONS = [
  { id: "system", label: "System UI", canvasFamily: "system-ui" },
  { id: "georgia", label: "Georgia", canvasFamily: "Georgia" },
  { id: "mono", label: "Courier New", canvasFamily: '"Courier New"' },
  { id: "impact", label: "Impact", canvasFamily: "Impact" },
  { id: "palatino", label: "Palatino", canvasFamily: "Palatino" },
  { id: "trebuchet", label: "Trebuchet MS", canvasFamily: '"Trebuchet MS"' },
] as const;

type FontId = (typeof FONT_OPTIONS)[number]["id"];

const PLACEHOLDER = "Your text will appear here…";

export function TextToImageTool() {
  const textId = useId();
  const padId = useId();
  const lineId = useId();
  const sizeId = useId();
  const cwId = useId();
  const chId = useId();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgImgRef = useRef<HTMLImageElement | null>(null);
  const bgObjectUrlRef = useRef<string | null>(null);

  const [text, setText] = useState(
    "Design is not just what it looks like — design is how it works.",
  );
  const [fontId, setFontId] = useState<FontId>("georgia");
  const [fontSize, setFontSize] = useState(38);
  const [textColor, setTextColor] = useState("#f8fafc");
  const [bgMode, setBgMode] = useState<"color" | "image">("color");
  const [bgColor, setBgColor] = useState("#0f172a");
  const [bgFileName, setBgFileName] = useState<string | null>(null);
  const [centerAlign, setCenterAlign] = useState(true);
  const [lineSpacing, setLineSpacing] = useState(1.35);
  const [padding, setPadding] = useState(64);
  const [canvasW, setCanvasW] = useState(1080);
  const [canvasH, setCanvasH] = useState(1080);

  const canvasFontFamily =
    FONT_OPTIONS.find((f) => f.id === fontId)?.canvasFamily ?? FONT_OPTIONS[0].canvasFamily;

  const loadBgImage = useCallback((file: File) => {
    if (bgObjectUrlRef.current) {
      URL.revokeObjectURL(bgObjectUrlRef.current);
      bgObjectUrlRef.current = null;
    }
    const url = URL.createObjectURL(file);
    bgObjectUrlRef.current = url;
    const img = new Image();
    img.onload = () => {
      bgImgRef.current = img;
      setBgFileName(file.name);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      bgObjectUrlRef.current = null;
      setBgFileName(null);
      bgImgRef.current = null;
    };
    img.src = url;
  }, []);

  const handleBgUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f || !/^image\//i.test(f.type)) return;
    setBgMode("image");
    loadBgImage(f);
  };

  const clearBgImage = () => {
    if (bgObjectUrlRef.current) {
      URL.revokeObjectURL(bgObjectUrlRef.current);
      bgObjectUrlRef.current = null;
    }
    bgImgRef.current = null;
    setBgFileName(null);
  };

  const applyPresetQuote = () => {
    setCanvasW(1080);
    setCanvasH(1080);
    setPadding(72);
    setFontSize(40);
    setLineSpacing(1.45);
    setCenterAlign(true);
    setFontId("georgia");
    setTextColor("#f8fafc");
    setBgMode("color");
    setBgColor("#111827");
    clearBgImage();
  };

  const applyPresetSocial = () => {
    setCanvasW(1080);
    setCanvasH(1350);
    setPadding(80);
    setFontSize(34);
    setLineSpacing(1.28);
    setCenterAlign(true);
    setFontId("system");
    setTextColor("#eef2ff");
    setBgMode("color");
    setBgColor("#312e81");
    clearBgImage();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = Math.min(2048, Math.max(120, canvasW));
    const h = Math.min(2048, Math.max(120, canvasH));
    const pad = Math.min(Math.max(padding, 0), Math.floor(Math.min(w, h) / 2 - 8));
    const lh = Math.min(2.8, Math.max(1, lineSpacing));
    const fs = Math.min(200, Math.max(10, fontSize));

    canvas.width = w;
    canvas.height = h;

    if (bgMode === "image") {
      const img = bgImgRef.current;
      if (img?.complete && img.naturalWidth > 0) {
        drawImageCover(ctx, img, 0, 0, w, h);
        ctx.fillStyle = "rgba(0,0,0,0.35)";
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, w, h);
      }
    } else {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);
    }

    const innerW = w - pad * 2;
    const innerH = h - pad * 2;
    if (innerW < 8 || innerH < 8) return;

    const displayText = text.trim() ? text : PLACEHOLDER;
    ctx.font = `${fs}px ${canvasFontFamily}`;
    ctx.textBaseline = "top";
    ctx.fillStyle = text.trim() ? textColor : `${textColor}99`;

    const lines = wrapTextToLines(ctx, displayText, innerW);
    const lineHeight = fs * lh;
    const blockH = lines.length * lineHeight;
    let y = pad + Math.max(0, (innerH - blockH) / 2);

    for (const line of lines) {
      const tw = ctx.measureText(line).width;
      const x = centerAlign ? pad + (innerW - tw) / 2 : pad;
      ctx.fillText(line, x, y);
      y += lineHeight;
    }
  }, [
    text,
    canvasFontFamily,
    fontSize,
    textColor,
    bgMode,
    bgColor,
    centerAlign,
    lineSpacing,
    padding,
    canvasW,
    canvasH,
    bgFileName,
  ]);

  const download = (type: "png" | "jpeg") => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const mime = type === "png" ? "image/png" : "image/jpeg";
    const q = type === "jpeg" ? 0.92 : undefined;
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download =
          type === "png" ? "smartflexa-text-image.png" : "smartflexa-text-image.jpg";
        a.click();
        URL.revokeObjectURL(a.href);
      },
      mime,
      q,
    );
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,380px),1fr] lg:items-start">
      <div className="space-y-5 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Type className="h-4 w-4" aria-hidden />
          Controls
        </div>

        <div>
          <label htmlFor={textId} className="text-sm font-medium text-foreground">
            Text
          </label>
          <textarea
            id={textId}
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-2 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Write your quote or caption…"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={applyPresetQuote}
            className="rounded-md border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
          >
            Quote style
          </button>
          <button
            type="button"
            onClick={applyPresetSocial}
            className="rounded-md border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
          >
            Social post (1080×1350)
          </button>
        </div>

        <div>
          <label htmlFor="font-select" className="text-sm font-medium text-foreground">
            Font
          </label>
          <select
            id="font-select"
            value={fontId}
            onChange={(e) => setFontId(e.target.value as FontId)}
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={sizeId} className="text-sm font-medium text-foreground">
            Font size: {fontSize}px
          </label>
          <input
            id={sizeId}
            type="range"
            min={12}
            max={96}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="mt-1 w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="tc" className="text-xs font-medium text-muted-foreground">
              Text color
            </label>
            <input
              id="tc"
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="mt-1 h-10 w-full cursor-pointer rounded border border-input bg-background"
            />
          </div>
          <div>
            <span className="text-xs font-medium text-muted-foreground">Background</span>
            <div className="mt-1 flex gap-2">
              <label className="flex cursor-pointer items-center gap-1.5 text-xs">
                <input
                  type="radio"
                  name="bgm"
                  checked={bgMode === "color"}
                  onChange={() => setBgMode("color")}
                  className="border-input"
                />
                Color
              </label>
              <label className="flex cursor-pointer items-center gap-1.5 text-xs">
                <input
                  type="radio"
                  name="bgm"
                  checked={bgMode === "image"}
                  onChange={() => setBgMode("image")}
                  className="border-input"
                />
                Image
              </label>
            </div>
          </div>
        </div>

        {bgMode === "color" ? (
          <div>
            <label htmlFor="bgc" className="text-xs font-medium text-muted-foreground">
              Background color
            </label>
            <input
              id="bgc"
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="mt-1 h-10 w-full cursor-pointer rounded border border-input bg-background"
            />
          </div>
        ) : (
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <ImageIcon className="h-4 w-4" aria-hidden />
              Background image
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleBgUpload}
              className="mt-2 block w-full text-xs text-muted-foreground file:mr-2 file:rounded-md file:border-0 file:bg-muted file:px-2 file:py-1.5 file:text-xs file:font-medium"
            />
            {bgFileName ? (
              <p className="mt-1 text-xs text-muted-foreground">Loaded: {bgFileName}</p>
            ) : (
              <p className="mt-1 text-xs text-muted-foreground">
                JPG, PNG, or WebP. A light dim overlay keeps text readable.
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor={cwId} className="text-xs font-medium text-muted-foreground">
              Width (px)
            </label>
            <input
              id={cwId}
              type="number"
              min={120}
              max={2048}
              value={canvasW}
              onChange={(e) => setCanvasW(Number(e.target.value) || 1080)}
              className="mt-1 w-full rounded-md border border-input bg-background px-2 py-1.5 font-mono text-sm"
            />
          </div>
          <div>
            <label htmlFor={chId} className="text-xs font-medium text-muted-foreground">
              Height (px)
            </label>
            <input
              id={chId}
              type="number"
              min={120}
              max={2048}
              value={canvasH}
              onChange={(e) => setCanvasH(Number(e.target.value) || 1080)}
              className="mt-1 w-full rounded-md border border-input bg-background px-2 py-1.5 font-mono text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor={padId} className="text-sm font-medium text-foreground">
            Padding: {padding}px
          </label>
          <input
            id={padId}
            type="range"
            min={0}
            max={160}
            value={padding}
            onChange={(e) => setPadding(Number(e.target.value))}
            className="mt-1 w-full"
          />
        </div>

        <div>
          <label htmlFor={lineId} className="text-sm font-medium text-foreground">
            Line spacing: {lineSpacing.toFixed(2)}×
          </label>
          <input
            id={lineId}
            type="range"
            min={100}
            max={260}
            value={Math.round(lineSpacing * 100)}
            onChange={(e) => setLineSpacing(Number(e.target.value) / 100)}
            className="mt-1 w-full"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={centerAlign}
            onChange={(e) => setCenterAlign(e.target.checked)}
            className="rounded border-input"
          />
          Center align text
        </label>

        <div className="flex flex-wrap gap-2 border-t border-border pt-4">
          <button
            type="button"
            onClick={() => download("png")}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-95"
          >
            <Download className="h-4 w-4" aria-hidden />
            PNG
          </button>
          <button
            type="button"
            onClick={() => download("jpeg")}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            <Download className="h-4 w-4" aria-hidden />
            JPG
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">Preview</p>
        <div className="rounded-xl border border-border bg-muted/20 p-3 sm:p-4">
          <canvas
            ref={canvasRef}
            className="mx-auto max-h-[min(70vh,900px)] w-full max-w-full rounded-md shadow-md"
            style={{ height: "auto" }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Preview updates as you type. Download uses full canvas resolution (max 2048×2048 per side).
        </p>
      </div>
    </div>
  );
}
