"use client";

import { ChangeEvent, useId, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const bmiFaqItems = [
  {
    q: "What is a healthy BMI range for adults?",
    a: "For many adults, BMI between 18.5 and 24.9 is often considered in the normal range.",
  },
  {
    q: "How do I calculate BMI from kg and cm?",
    a: "Convert height from cm to meters, then use BMI = weight in kg / (height in meters × height in meters).",
  },
  {
    q: "Is BMI accurate for everyone?",
    a: "BMI is a useful screening metric, but it does not measure body fat directly and may not fit athletes, children, or pregnancy contexts.",
  },
  {
    q: "Is this BMI calculator free?",
    a: "Yes. SmartFlexa BMI calculator is free and runs in your browser.",
  },
] as const;

const bmiFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: bmiFaqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
} as const;

type HeightUnit = "cm" | "m";

type BmiCategory = "Underweight" | "Normal" | "Overweight" | "Obese";

function parsePositive(s: string): number | null {
  const t = s.trim();
  if (t === "") return null;
  const n = Number(t);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

function heightToMeters(value: number, unit: HeightUnit): number {
  return unit === "cm" ? value / 100 : value;
}

function bmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

function categoryStyles(cat: BmiCategory): string {
  switch (cat) {
    case "Underweight":
      return "border-sky-500/40 bg-sky-500/10 text-sky-950 dark:text-sky-100";
    case "Normal":
      return "border-emerald-500/40 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100";
    case "Overweight":
      return "border-amber-500/50 bg-amber-500/10 text-amber-950 dark:text-amber-100";
    case "Obese":
      return "border-destructive/50 bg-destructive/15 text-foreground";
  }
}

export default function BmiCalculatorPage() {
  const hintId = useId();
  const errorId = useId();
  const resultRegionId = useId();
  const unitHintId = useId();

  const [weightStr, setWeightStr] = useState("70");
  const [heightStr, setHeightStr] = useState("175");
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");

  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<BmiCategory | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    setBmi(null);
    setCategory(null);

    const w = parsePositive(weightStr);
    const hRaw = parsePositive(heightStr);

    if (w === null || hRaw === null) {
      setError("Enter positive numbers for weight and height.");
      return;
    }
    if (w > 500) {
      setError("Weight must be 500 kg or less.");
      return;
    }

    const hM = heightToMeters(hRaw, heightUnit);
    if (heightUnit === "cm") {
      if (hRaw < 40 || hRaw > 272) {
        setError("Height in centimeters should be between 40 and 272.");
        return;
      }
    } else {
      if (hRaw < 0.4 || hRaw > 2.72) {
        setError("Height in meters should be between 0.4 and 2.72.");
        return;
      }
    }

    const b = w / (hM * hM);
    if (!Number.isFinite(b) || b <= 0) {
      setError("Could not compute BMI for these values.");
      return;
    }

    setBmi(Math.round(b * 10) / 10);
    setCategory(bmiCategory(b));
  };

  const handleReset = () => {
    setWeightStr("70");
    setHeightStr("175");
    setHeightUnit("cm");
    setBmi(null);
    setCategory(null);
    setError(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.bmiCalculator)} />
      <JsonLd data={bmiFaqJsonLd} />
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
        aria-labelledby="bmi-calc-heading"
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
                <span className="text-foreground">BMI Calculator</span>
              </p>
            </nav>

            <h1
              id="bmi-calc-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              BMI Calculator Online Free
            </h1>

            <p
              id={hintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Enter your weight in kilograms and height in centimeters or meters.
              BMI is a screening measure only—not a diagnosis. Ask a clinician
              for personal health advice.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="tool-panel-heading"
          >
            <h2 id="tool-panel-heading" className="sr-only">
              BMI calculator inputs
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="weight-kg"
                  className="text-sm font-medium text-foreground"
                >
                  Weight (kg)
                </label>
                <input
                  id="weight-kg"
                  type="text"
                  inputMode="decimal"
                  value={weightStr}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setWeightStr(e.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="height"
                  className="text-sm font-medium text-foreground"
                >
                  Height
                </label>
                <input
                  id="height"
                  type="text"
                  inputMode="decimal"
                  value={heightStr}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setHeightStr(e.target.value)
                  }
                  aria-describedby={unitHintId}
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <fieldset className="mt-3">
                  <legend className="sr-only">Height unit</legend>
                  <div
                    id={unitHintId}
                    className="flex flex-wrap gap-3 text-sm text-foreground"
                  >
                    <label className="inline-flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="height-unit"
                        checked={heightUnit === "cm"}
                        onChange={() => setHeightUnit("cm")}
                        className="h-4 w-4 border-border text-primary"
                      />
                      Centimeters (cm)
                    </label>
                    <label className="inline-flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="height-unit"
                        checked={heightUnit === "m"}
                        onChange={() => setHeightUnit("m")}
                        className="h-4 w-4 border-border text-primary"
                      />
                      Meters (m)
                    </label>
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={calculate}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Calculate
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

            {bmi !== null && category ? (
              <div
                id={resultRegionId}
                className={`mt-8 rounded-xl border-2 p-5 sm:p-6 ${categoryStyles(category)}`}
                aria-live="polite"
              >
                <p className="text-xs font-medium uppercase tracking-wide opacity-80">
                  Your BMI
                </p>
                <p className="mt-2 font-mono text-4xl font-bold tracking-tight sm:text-5xl">
                  {bmi}
                </p>
                <p className="mt-4 text-lg font-semibold sm:text-xl">
                  {category}
                </p>
                <div className="mt-4 rounded-lg border border-border/60 bg-background/60 p-3 dark:bg-background/20">
                  <p className="text-xs font-medium text-muted-foreground">
                    Formula
                  </p>
                  <p className="mt-1 font-mono text-sm text-foreground">
                    BMI = weight (kg) ÷ height (m)²
                  </p>
                </div>
              </div>
            ) : null}
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="bmi-seo-heading">
            <h2
              id="bmi-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is BMI?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Body Mass Index (BMI) is a number calculated from your weight and
              height. It is widely used as a quick screening tool for weight
              categories that may be linked to health risk, but it does not
              measure body fat directly and does not account for muscle, bone,
              or individual circumstances.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Calculate BMI
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Weigh yourself in kilograms (kg).</li>
              <li>Measure your height in meters (m), or centimeters (cm) ÷ 100.</li>
              <li>Divide weight by height squared: BMI = kg ÷ m².</li>
              <li>Compare the result to standard categories below.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              BMI Categories
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>
                <strong className="font-medium text-foreground">Underweight:</strong>{" "}
                BMI below 18.5
              </li>
              <li>
                <strong className="font-medium text-foreground">Normal:</strong> BMI
                18.5 up to 25
              </li>
              <li>
                <strong className="font-medium text-foreground">Overweight:</strong>{" "}
                BMI 25 up to 30
              </li>
              <li>
                <strong className="font-medium text-foreground">Obese:</strong> BMI 30
                or higher
              </li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              Ranges follow common WHO-style cutoffs for adults. Children,
              athletes, and pregnancy need different assessments.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <div className="mt-3 rounded-lg border border-border bg-muted/20 p-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Weight{" "}
                <span className="font-mono text-foreground">70 kg</span>, height{" "}
                <span className="font-mono text-foreground">175 cm</span> (1.75 m):
                BMI = 70 ÷ 1.75² ≈{" "}
                <span className="font-mono text-foreground">22.9</span>, in the{" "}
                <span className="font-medium text-foreground">Normal</span> range.
              </p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              More BMI Examples
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>
                85 kg, 170 cm: BMI ≈ 29.4 (Overweight range)
              </li>
              <li>
                52 kg, 165 cm: BMI ≈ 19.1 (Normal range)
              </li>
              <li>
                95 kg, 180 cm: BMI ≈ 29.3 (Overweight range)
              </li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              BMI Formula (kg and cm)
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              If your height is in centimeters, convert it first:
              <code className="mx-1 rounded bg-muted px-1 font-mono text-sm">
                m = cm / 100
              </code>
              then compute:
              <code className="mx-1 rounded bg-muted px-1 font-mono text-sm">
                BMI = kg / m²
              </code>
              .
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  What is a healthy BMI range for adults?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  For many adults, BMI between 18.5 and 24.9 is commonly treated
                  as the normal range. Use this as screening guidance, not a diagnosis.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  How do I calculate BMI from kg and cm?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Convert cm to meters and then apply BMI = kg / m². Example:
                  175 cm = 1.75 m, so BMI = 70 / (1.75 × 1.75) ≈ 22.9.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is BMI accurate for everyone?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  No. BMI is useful at population level but can misclassify very muscular people
                  and is not a full health assessment for children, pregnancy, or special conditions.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa’s BMI calculator is free with no signup.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Your weight and height stay in your browser; we do not send them
                  to our servers for this calculation.
                </dd>
              </div>
            </dl>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Explore Related Utility Tools
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              You can also try
              <a href="/tools/json-formatter" className="mx-1 underline underline-offset-4 hover:text-foreground">JSON Formatter</a>,
              <a href="/tools/percentage-calculator" className="mx-1 underline underline-offset-4 hover:text-foreground">Percentage Calculator</a>, and
              <a href="/tools/unit-converter" className="mx-1 underline underline-offset-4 hover:text-foreground">Unit Converter</a>
              for related workflows.
            </p>

            <RelatedTools currentPath="/tools/bmi-calculator" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
