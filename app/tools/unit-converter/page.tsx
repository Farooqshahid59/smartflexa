"use client";

import { ChangeEvent, useCallback, useEffect, useId, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

type Category = "length" | "weight" | "temperature" | "speed";

type LengthUnit = "cm" | "m" | "km" | "in" | "ft";
type WeightUnit = "kg" | "g" | "lb";
type TempUnit = "C" | "F" | "K";
type SpeedUnit = "kmh" | "mph";

const LENGTH_TO_M: Record<LengthUnit, number> = {
  m: 1,
  cm: 0.01,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
};

const WEIGHT_TO_KG: Record<WeightUnit, number> = {
  kg: 1,
  g: 0.001,
  lb: 0.45359237,
};

const KMH_TO_MS = 1 / 3.6;
const MPH_TO_MS = 1609.344 / 3600;

function lengthMeters(value: number, u: LengthUnit): number {
  return value * LENGTH_TO_M[u];
}

function lengthFromMeters(m: number, u: LengthUnit): number {
  return m / LENGTH_TO_M[u];
}

function weightKg(value: number, u: WeightUnit): number {
  return value * WEIGHT_TO_KG[u];
}

function weightFromKg(kg: number, u: WeightUnit): number {
  return kg / WEIGHT_TO_KG[u];
}

function tempToCelsius(value: number, from: TempUnit): number {
  switch (from) {
    case "C":
      return value;
    case "F":
      return ((value - 32) * 5) / 9;
    case "K":
      return value - 273.15;
    default:
      return value;
  }
}

function celsiusToTemp(c: number, to: TempUnit): number {
  switch (to) {
    case "C":
      return c;
    case "F":
      return (c * 9) / 5 + 32;
    case "K":
      return c + 273.15;
    default:
      return c;
  }
}

function isValidThermoState(value: number, from: TempUnit): boolean {
  const c = tempToCelsius(value, from);
  return Number.isFinite(c) && c >= -273.15 - 1e-9;
}

function convertTemp(value: number, from: TempUnit, to: TempUnit): number | null {
  if (!isValidThermoState(value, from)) return null;
  const c = tempToCelsius(value, from);
  return celsiusToTemp(c, to);
}

function speedToMs(value: number, u: SpeedUnit): number {
  return u === "kmh" ? value * KMH_TO_MS : value * MPH_TO_MS;
}

function speedFromMs(ms: number, u: SpeedUnit): number {
  return u === "kmh" ? ms / KMH_TO_MS : ms / MPH_TO_MS;
}

function parseValue(s: string): number | null {
  const t = s.trim();
  if (t === "") return null;
  const n = Number(t);
  if (!Number.isFinite(n)) return null;
  return n;
}

function formatOut(n: number, cat: Category): string {
  if (!Number.isFinite(n)) return "—";
  const maxFrac = cat === "temperature" ? 6 : 8;
  return n.toLocaleString(undefined, {
    maximumFractionDigits: maxFrac,
    minimumFractionDigits: 0,
  });
}

const CATEGORY_LABELS: Record<Category, string> = {
  length: "Length",
  weight: "Weight",
  temperature: "Temperature",
  speed: "Speed",
};

const LENGTH_OPTIONS: { id: LengthUnit; label: string }[] = [
  { id: "cm", label: "Centimeters (cm)" },
  { id: "m", label: "Meters (m)" },
  { id: "km", label: "Kilometers (km)" },
  { id: "in", label: "Inches (in)" },
  { id: "ft", label: "Feet (ft)" },
];

const WEIGHT_OPTIONS: { id: WeightUnit; label: string }[] = [
  { id: "kg", label: "Kilograms (kg)" },
  { id: "g", label: "Grams (g)" },
  { id: "lb", label: "Pounds (lb)" },
];

const TEMP_OPTIONS: { id: TempUnit; label: string }[] = [
  { id: "C", label: "Celsius (°C)" },
  { id: "F", label: "Fahrenheit (°F)" },
  { id: "K", label: "Kelvin (K)" },
];

const SPEED_OPTIONS: { id: SpeedUnit; label: string }[] = [
  { id: "kmh", label: "Kilometers per hour (km/h)" },
  { id: "mph", label: "Miles per hour (mph)" },
];

function defaultsForCategory(cat: Category): {
  value: string;
  from: string;
  to: string;
} {
  switch (cat) {
    case "length":
      return { value: "1", from: "m", to: "cm" };
    case "weight":
      return { value: "1", from: "kg", to: "lb" };
    case "temperature":
      return { value: "0", from: "C", to: "F" };
    case "speed":
      return { value: "100", from: "kmh", to: "mph" };
    default:
      return { value: "1", from: "m", to: "cm" };
  }
}

export default function UnitConverterPage() {
  const hintId = useId();
  const errorId = useId();
  const resultId = useId();
  const categorySelectId = useId();

  const [category, setCategory] = useState<Category>("length");
  const [valueStr, setValueStr] = useState("1");
  const [fromUnit, setFromUnit] = useState<string>("m");
  const [toUnit, setToUnit] = useState<string>("cm");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runConvert = useCallback(() => {
    setError(null);
    const v = parseValue(valueStr);
    if (v === null) {
      setResult(null);
      if (valueStr.trim() === "") {
        setError(null);
      } else {
        setError("Enter a valid number.");
      }
      return;
    }

    let out: number | null = null;

    if (category === "length") {
      const f = fromUnit as LengthUnit;
      const t = toUnit as LengthUnit;
      const m = lengthMeters(v, f);
      out = lengthFromMeters(m, t);
    } else if (category === "weight") {
      const f = fromUnit as WeightUnit;
      const t = toUnit as WeightUnit;
      const kg = weightKg(v, f);
      out = weightFromKg(kg, t);
    } else if (category === "temperature") {
      const f = fromUnit as TempUnit;
      const t = toUnit as TempUnit;
      if (f === "K" && v < 0) {
        setError("Kelvin cannot be negative.");
        setResult(null);
        return;
      }
      out = convertTemp(v, f, t);
      if (out === null) {
        setError("That temperature is below absolute zero (−273.15 °C).");
        setResult(null);
        return;
      }
    } else {
      const f = fromUnit as SpeedUnit;
      const t = toUnit as SpeedUnit;
      const ms = speedToMs(v, f);
      out = speedFromMs(ms, t);
    }

    if (!Number.isFinite(out)) {
      setError("Result is not a finite number. Try other inputs.");
      setResult(null);
      return;
    }

    setResult(formatOut(out, category));
  }, [category, valueStr, fromUnit, toUnit]);

  useEffect(() => {
    runConvert();
  }, [runConvert]);

  const onCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const cat = e.target.value as Category;
    setCategory(cat);
    const d = defaultsForCategory(cat);
    setValueStr(d.value);
    setFromUnit(d.from);
    setToUnit(d.to);
    setError(null);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleReset = () => {
    const d = defaultsForCategory(category);
    setValueStr(d.value);
    setFromUnit(d.from);
    setToUnit(d.to);
    setError(null);
  };

  const selectClass =
    "mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.unitConverter)} />
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
        aria-labelledby="unit-conv-heading"
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
                <span className="text-foreground">Unit Converter</span>
              </p>
            </nav>

            <h1
              id="unit-conv-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Unit Converter Online Free
            </h1>

            <p
              id={hintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Convert length, weight, temperature, and speed in your browser.
              Results update as you type; use Swap to flip units or Reset for
              defaults.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="tool-panel-heading"
          >
            <h2 id="tool-panel-heading" className="sr-only">
              Unit converter
            </h2>

            <div>
              <label
                htmlFor={categorySelectId}
                className="text-sm font-medium text-foreground"
              >
                Category
              </label>
              <select
                id={categorySelectId}
                value={category}
                onChange={onCategoryChange}
                className={selectClass}
              >
                {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => (
                  <option key={c} value={c}>
                    {CATEGORY_LABELS[c]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="conv-value" className="text-sm font-medium text-foreground">
                  Value
                </label>
                <input
                  id="conv-value"
                  type="text"
                  inputMode="decimal"
                  value={valueStr}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValueStr(e.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="sm:col-span-2 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="from-unit" className="text-sm font-medium text-foreground">
                    From
                  </label>
                  <select
                    id="from-unit"
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className={selectClass}
                  >
                    {category === "length" &&
                      LENGTH_OPTIONS.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label}
                        </option>
                      ))}
                    {category === "weight" &&
                      WEIGHT_OPTIONS.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label}
                        </option>
                      ))}
                    {category === "temperature" &&
                      TEMP_OPTIONS.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label}
                        </option>
                      ))}
                    {category === "speed" &&
                      SPEED_OPTIONS.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="to-unit" className="text-sm font-medium text-foreground">
                    To
                  </label>
                  <select
                    id="to-unit"
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className={selectClass}
                  >
                    {category === "length" &&
                      LENGTH_OPTIONS.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label}
                        </option>
                      ))}
                    {category === "weight" &&
                      WEIGHT_OPTIONS.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label}
                        </option>
                      ))}
                    {category === "temperature" &&
                      TEMP_OPTIONS.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label}
                        </option>
                      ))}
                    {category === "speed" &&
                      SPEED_OPTIONS.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => runConvert()}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Convert
              </button>
              <button
                type="button"
                onClick={swapUnits}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Swap units
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
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

            <div
              id={resultId}
              className="mt-8 rounded-xl border-2 border-primary/30 bg-primary/5 p-5 sm:p-6"
              aria-live="polite"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Result
              </p>
              <p className="mt-2 font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {result ?? "—"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {valueStr.trim() === "" || parseValue(valueStr) === null
                  ? "Enter a number to convert."
                  : error
                    ? "Fix the error above to see a result."
                    : `Converted from selected “from” unit to “to” unit (${CATEGORY_LABELS[category]}).`}
              </p>
            </div>
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="unit-seo-heading">
            <h2
              id="unit-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is a Unit Converter?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A unit converter rewrites one measurement into another—meters to
              feet, kilograms to pounds, Celsius to Fahrenheit, and so on—using
              fixed conversion factors. This page keeps the math consistent so
              you can check homework, travel, cooking, or engineering values
              quickly.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Convert Units
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Choose a category: length, weight, temperature, or speed.</li>
              <li>Type the amount you have in the Value field.</li>
              <li>Pick the unit you are converting from and the unit you want.</li>
              <li>Read the result—it updates live. Use Swap to reverse direction.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Popular Conversions
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>
                <strong className="font-medium text-foreground">cm to inches:</strong>{" "}
                length, centimeters → inches (1 in = 2.54 cm).
              </li>
              <li>
                <strong className="font-medium text-foreground">kg to lbs:</strong>{" "}
                weight, kilograms → pounds (1 lb ≈ 0.453592 kg).
              </li>
              <li>
                <strong className="font-medium text-foreground">
                  Celsius to Fahrenheit:
                </strong>{" "}
                temperature via °F = °C × 9/5 + 32.
              </li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Use This Tool?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              It is fast, works offline once loaded, and does not require signup.
              Length and weight use SI definitions; temperature respects absolute
              zero; speed uses exact km/h and mph definitions.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">How to convert units?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Select category and units, enter your value, and read the
                  result. Internally we convert to a common base (e.g. meters,
                  kilograms) then to your target unit—except temperature, which
                  uses Celsius as the bridge between °C, °F, and K.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Which units are supported?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Length: cm, m, km, in, ft. Weight: kg, g, lb. Temperature: °C,
                  °F, K. Speed: km/h and mph.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa’s unit converter is free with no signup.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Conversions run in your browser; your inputs are not sent to our
                  servers.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/unit-converter" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
