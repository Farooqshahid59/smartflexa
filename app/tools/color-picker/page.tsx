"use client";

import { ChangeEvent, useEffect, useId, useRef, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

type RGB = { r: number; g: number; b: number };

const DEFAULT_RGB: RGB = { r: 59, g: 130, b: 246 };

const COPY_FEEDBACK_MS = 2500;

function clampByte(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)));
}

function rgbToHex(r: number, g: number, b: number): string {
  const h = (n: number) => clampByte(n).toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`.toUpperCase();
}

function parseHex(input: string): RGB | null {
  let s = input.trim();
  if (s.startsWith("#")) s = s.slice(1);
  if (s.length === 3) {
    s = s
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(s)) return null;
  return {
    r: parseInt(s.slice(0, 2), 16),
    g: parseInt(s.slice(2, 4), 16),
    b: parseInt(s.slice(4, 6), 16),
  };
}

function parseRgbString(input: string): RGB | null {
  const t = input.trim();
  const fn = /^rgba?\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})/i.exec(
    t,
  );
  const parts = fn
    ? [Number(fn[1]), Number(fn[2]), Number(fn[3])]
    : t
        .split(/[\s,]+/)
        .filter((p) => p.length > 0)
        .map((p) => Number(p));
  if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) return null;
  if (parts.some((n) => n < 0 || n > 255 || !Number.isInteger(n))) return null;
  return { r: parts[0]!, g: parts[1]!, b: parts[2]! };
}

export default function ColorPickerPage() {
  const hintId = useId();
  const errorId = useId();
  const hexHintId = useId();
  const rgbHintId = useId();
  const copyStatusId = useId();
  const valuesRegionId = useId();

  const [rgb, setRgb] = useState<RGB>(DEFAULT_RGB);
  const [hexField, setHexField] = useState(() =>
    rgbToHex(DEFAULT_RGB.r, DEFAULT_RGB.g, DEFAULT_RGB.b),
  );
  const [rgbField, setRgbField] = useState(
    () => `${DEFAULT_RGB.r}, ${DEFAULT_RGB.g}, ${DEFAULT_RGB.b}`,
  );
  const [hexError, setHexError] = useState<string | null>(null);
  const [rgbError, setRgbError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const copyClearRef = useRef<number | null>(null);

  const hexDisplay = rgbToHex(rgb.r, rgb.g, rgb.b);
  const pickerValue = rgbToHex(rgb.r, rgb.g, rgb.b).toLowerCase();
  const rgbCsv = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
  const rgbCss = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  useEffect(() => {
    return () => {
      if (copyClearRef.current) window.clearTimeout(copyClearRef.current);
    };
  }, []);

  useEffect(() => {
    setHexField(hexDisplay);
    setRgbField(rgbCsv);
  }, [rgb, hexDisplay, rgbCsv]);

  const flashCopied = () => {
    setCopyStatus("Copied!");
    if (copyClearRef.current) window.clearTimeout(copyClearRef.current);
    copyClearRef.current = window.setTimeout(() => {
      setCopyStatus(null);
      copyClearRef.current = null;
    }, COPY_FEEDBACK_MS);
  };

  const applyRgb = (next: RGB) => {
    setRgb({
      r: clampByte(next.r),
      g: clampByte(next.g),
      b: clampByte(next.b),
    });
    setHexError(null);
    setRgbError(null);
  };

  const handlePickerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCopyStatus(null);
    const p = parseHex(e.target.value);
    if (p) applyRgb(p);
  };

  const handleHexChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setHexField(v);
    setCopyStatus(null);
    const p = parseHex(v);
    if (p) {
      applyRgb(p);
      setHexError(null);
    } else if (v.trim() === "" || v === "#") {
      setHexError(null);
    } else {
      setHexError("Use #RGB or #RRGGBB (hex digits only).");
    }
  };

  const handleRgbChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setRgbField(v);
    setCopyStatus(null);
    const p = parseRgbString(v);
    if (p) {
      applyRgb(p);
      setRgbError(null);
    } else if (v.trim() === "") {
      setRgbError(null);
    } else {
      setRgbError(
        "Use three integers 0–255, e.g. 255, 128, 0 or rgb(255, 128, 0).",
      );
    }
  };

  const copyHex = async () => {
    try {
      await navigator.clipboard.writeText(hexDisplay);
      flashCopied();
    } catch {
      setCopyStatus(null);
    }
  };

  const copyRgb = async () => {
    try {
      await navigator.clipboard.writeText(rgbCss);
      flashCopied();
    } catch {
      setCopyStatus(null);
    }
  };

  const handleReset = () => {
    setCopyStatus(null);
    if (copyClearRef.current) {
      window.clearTimeout(copyClearRef.current);
      copyClearRef.current = null;
    }
    applyRgb(DEFAULT_RGB);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.colorPicker)} />
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
        aria-labelledby="color-picker-heading"
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
                <span className="text-foreground">Color Picker</span>
              </p>
            </nav>

            <h1
              id="color-picker-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Color Picker and HEX to RGB Converter Online
            </h1>

            <p
              id={hintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Choose a color with the picker or type HEX / RGB values. Everything
              stays in sync—copy CSS-ready strings for your projects.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="tool-panel-heading"
          >
            <h2 id="tool-panel-heading" className="sr-only">
              Color picker and converter
            </h2>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex flex-col items-center gap-3 sm:items-start">
                <label
                  htmlFor="native-color"
                  className="text-sm font-medium text-foreground"
                >
                  Color input
                </label>
                <input
                  id="native-color"
                  type="color"
                  value={pickerValue}
                  onChange={handlePickerChange}
                  className="h-14 w-full max-w-[8rem] cursor-pointer rounded-lg border border-border bg-background p-1"
                />
              </div>
              <div
                className="min-h-[120px] flex-1 rounded-xl border border-border shadow-inner"
                style={{ backgroundColor: rgbCss }}
                role="img"
                aria-label={`Color preview for ${hexDisplay}`}
              />
            </div>

            <div
              id={valuesRegionId}
              className="mt-8 rounded-lg border border-border bg-muted/20 p-4"
              aria-label="Current color values"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Selected color
              </p>
              <dl className="mt-3 grid gap-3 font-mono text-sm sm:grid-cols-2 sm:gap-4 sm:text-base">
                <div>
                  <dt className="text-muted-foreground">HEX</dt>
                  <dd className="mt-1 font-semibold text-foreground">{hexDisplay}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">RGB</dt>
                  <dd className="mt-1 font-semibold text-foreground">{rgbCsv}</dd>
                </div>
              </dl>
              <p className="mt-3 font-mono text-xs text-muted-foreground sm:text-sm">
                CSS: <span className="text-foreground">{rgbCss}</span>
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="hex-input"
                  className="text-sm font-medium text-foreground"
                >
                  Edit HEX
                </label>
                <input
                  id="hex-input"
                  type="text"
                  value={hexField}
                  onChange={handleHexChange}
                  spellCheck={false}
                  autoComplete="off"
                  aria-invalid={Boolean(hexError)}
                  aria-describedby={hexHintId}
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <p id={hexHintId} className="mt-1 text-xs text-muted-foreground">
                  Formats: #RGB or #RRGGBB
                </p>
              </div>
              <div>
                <label
                  htmlFor="rgb-input"
                  className="text-sm font-medium text-foreground"
                >
                  Edit RGB
                </label>
                <input
                  id="rgb-input"
                  type="text"
                  value={rgbField}
                  onChange={handleRgbChange}
                  spellCheck={false}
                  autoComplete="off"
                  aria-invalid={Boolean(rgbError)}
                  aria-describedby={rgbHintId}
                  placeholder="255, 128, 0"
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <p id={rgbHintId} className="mt-1 text-xs text-muted-foreground">
                  Three integers 0–255, comma or space separated, or rgb(…)
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => void copyHex()}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Copy HEX
              </button>
              <button
                type="button"
                onClick={() => void copyRgb()}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Copy RGB
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Reset
              </button>
            </div>

            {copyStatus ? (
              <p
                id={copyStatusId}
                className="mt-4 text-sm font-medium text-foreground"
                role="status"
              >
                {copyStatus}
              </p>
            ) : null}

            {(hexError || rgbError) && (
              <p
                id={errorId}
                className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                role="alert"
              >
                {hexError ?? rgbError}
              </p>
            )}
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="color-seo-heading">
            <h2
              id="color-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is a Color Picker?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A color picker is a control that lets you choose a color visually and
              see its digital values. This tool shows the same color as HEX (for
              design apps and stylesheets) and RGB (for screens and CSS{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">
                rgb()
              </code>
              ), so you can move between formats without guesswork.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Convert HEX to RGB
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>
                Open the native color input or type a HEX code such as{" "}
                <span className="font-mono text-foreground">#3B82F6</span>.
              </li>
              <li>
                When the HEX is valid, the preview, RGB field, and “Selected color”
                section update immediately.
              </li>
              <li>
                To go the other way, enter RGB like{" "}
                <span className="font-mono text-foreground">59, 130, 246</span> or{" "}
                <span className="font-mono text-foreground">rgb(59, 130, 246)</span>
                —the HEX value updates to match.
              </li>
              <li>
                Use <strong className="font-medium text-foreground">Copy HEX</strong>{" "}
                or{" "}
                <strong className="font-medium text-foreground">Copy RGB</strong> to
                paste into your editor or design tool.
              </li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Use This Tool?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Developers use HEX and RGB in CSS, config, and UI code; designers copy
              values into Figma, Sketch, or brand guidelines. This converter keeps
              one source of truth, validates your input, and runs entirely in the
              browser—no uploads or accounts.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example: HEX vs RGB
            </h2>
            <div className="mt-3 rounded-lg border border-border bg-muted/20 p-4 font-mono text-sm">
              <p className="text-foreground">HEX: #FF6600</p>
              <p className="mt-2 text-muted-foreground">RGB: 255, 102, 0</p>
              <p className="mt-2 text-muted-foreground">CSS: rgb(255, 102, 0)</p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">What is HEX color?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  HEX is a hexadecimal notation for RGB, usually written with a #
                  prefix. Six digits (or three-digit shorthand) encode red, green, and
                  blue intensity.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">What is RGB color?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  RGB describes a color with three numbers from 0–255 for red, green,
                  and blue. It matches how displays emit light and maps directly to
                  CSS <code className="rounded bg-muted px-1 font-mono text-sm">rgb()</code>.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa offers this color picker and converter at no cost,
                  with no signup required.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. Conversion and copying happen on your device; your colors are
                  not sent to our servers.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/color-picker" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
