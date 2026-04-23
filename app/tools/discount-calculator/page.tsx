"use client";

import { ChangeEvent, useId, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { InvoiceInboundLinks } from "@/components/invoice-inbound-links";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const discountFaqItems = [
  {
    q: "How do I check discount on a price?",
    a: "Enter the original price and the discount percent. The tool returns both the amount saved and the final price after discount.",
  },
  {
    q: "How to calculate discount percentage from prices?",
    a: "Use (original price - sale price) / original price × 100. This gives the percent discount.",
  },
  {
    q: "How to reverse-calculate the original price after discount?",
    a: "If sale price and discount percent are known, original price = sale price / (1 - discount percent/100).",
  },
  {
    q: "Is this discount calculator free?",
    a: "Yes. SmartFlexa discount calculator is free and works directly in your browser.",
  },
] as const;

const discountFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: discountFaqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
} as const;

function parseNumber(s: string): number | null {
  const t = s.trim();
  if (t === "") return null;
  const n = Number(t);
  if (!Number.isFinite(n)) return null;
  return n;
}

function formatMoney(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function DiscountCalculatorPage() {
  const hintId = useId();
  const errorId = useId();
  const resultRegionId = useId();

  const [priceStr, setPriceStr] = useState("100");
  const [percentStr, setPercentStr] = useState("20");

  const [discountAmount, setDiscountAmount] = useState<number | null>(null);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    setDiscountAmount(null);
    setFinalPrice(null);

    const price = parseNumber(priceStr);
    const pct = parseNumber(percentStr);

    if (price === null || pct === null) {
      setError("Enter valid numbers for price and discount percentage.");
      return;
    }
    if (price <= 0) {
      setError("Original price must be greater than zero.");
      return;
    }
    if (pct < 0 || pct > 100) {
      setError("Discount percentage must be between 0 and 100.");
      return;
    }

    const discount = (pct / 100) * price;
    const final = price - discount;

    if (!Number.isFinite(discount) || !Number.isFinite(final)) {
      setError("Could not compute values for these inputs.");
      return;
    }

    setDiscountAmount(discount);
    setFinalPrice(final);
  };

  const handleReset = () => {
    setPriceStr("100");
    setPercentStr("20");
    setDiscountAmount(null);
    setFinalPrice(null);
    setError(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.discountCalculator)} />
      <JsonLd data={discountFaqJsonLd} />
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
        aria-labelledby="discount-calc-heading"
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
                <span className="text-foreground">Discount Calculator</span>
              </p>
            </nav>

            <h1
              id="discount-calc-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Discount Calculator Online Free
            </h1>

            <p
              id={hintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Enter the original price and discount percentage to see how much
              you save and what you pay. For quick shopping and budget checks—not
              tax or fee advice.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="tool-panel-heading"
          >
            <h2 id="tool-panel-heading" className="sr-only">
              Discount calculator
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="orig-price"
                  className="text-sm font-medium text-foreground"
                >
                  Original price
                </label>
                <input
                  id="orig-price"
                  type="text"
                  inputMode="decimal"
                  value={priceStr}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPriceStr(e.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="discount-pct"
                  className="text-sm font-medium text-foreground"
                >
                  Discount (%)
                </label>
                <input
                  id="discount-pct"
                  type="text"
                  inputMode="decimal"
                  value={percentStr}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPercentStr(e.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Enter 0–100 (e.g. 25 for 25% off).
                </p>
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

            {discountAmount !== null && finalPrice !== null ? (
              <div
                id={resultRegionId}
                className="mt-8 space-y-6"
                aria-live="polite"
              >
                <div className="rounded-xl border border-border bg-muted/20 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Discount amount
                  </p>
                  <p className="mt-2 font-mono text-2xl font-semibold text-foreground sm:text-3xl">
                    {formatMoney(discountAmount)}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    (percentage ÷ 100) × original price
                  </p>
                </div>
                <div className="rounded-xl border-2 border-primary/40 bg-primary/10 p-5 sm:p-6">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Final price after discount
                  </p>
                  <p className="mt-2 font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {formatMoney(finalPrice)}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Original price − discount amount
                  </p>
                </div>
              </div>
            ) : null}
          </section>

          <article
            className="mt-14 space-y-10"
            aria-labelledby="discount-seo-heading"
          >
            <h2
              id="discount-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is a Discount Calculator?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A discount calculator tells you how much money a percentage off
              removes from a price and what you pay afterward. It is useful for
              sales tags, coupons, and quick comparisons before checkout.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Calculate Discount
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Note the original (list) price.</li>
              <li>
                Multiply the price by the discount percentage divided by 100—that
                is the amount saved.
              </li>
              <li>Subtract the savings from the original price to get the final price.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Use This Tool?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Shopping and budgeting are easier when you can verify “20% off” in
              seconds. SmartFlexa runs the math in your browser with no signup.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <div className="mt-3 rounded-lg border border-border bg-muted/20 p-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Original price{" "}
                <span className="font-mono text-foreground">80</span>, discount{" "}
                <span className="font-mono text-foreground">15%</span>: savings = 0.15
                × 80 = <span className="font-mono text-foreground">12</span>, final
                price = 80 − 12 ={" "}
                <span className="font-mono text-foreground">68</span>.
              </p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Popular Discount Check Examples
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>
                25% off 2,000 = save 500, pay 1,500
              </li>
              <li>
                40% off 999 = save 399.60, pay 599.40
              </li>
              <li>
                12.5% off 4,800 = save 600, pay 4,200
              </li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Reverse Discount Formula
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              If you only know the sale price and percent off, calculate original
              price as{" "}
              <code className="rounded bg-muted px-1 font-mono text-sm">
                sale / (1 - discount/100)
              </code>
              . This is useful when a store shows only discounted prices.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  How do I check discount on a price?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Enter the original price and discount percentage. The tool shows
                  both savings and final price instantly.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  How to calculate discount percentage from prices?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Use{" "}
                  <code className="rounded bg-muted px-1 font-mono text-sm">
                    (original - sale) / original × 100
                  </code>
                  . This gives the discount percentage.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  How to reverse-calculate original price after discount?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Original price ={" "}
                  <code className="rounded bg-muted px-1 font-mono text-sm">
                    sale / (1 - discount/100)
                  </code>
                  . Example: 80 after 20% off means original price was 100.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa’s discount calculator is free with no signup.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Your numbers stay in your browser; they are not sent to our
                  servers for this calculation.
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

            <InvoiceInboundLinks />
            <RelatedTools currentPath="/tools/discount-calculator" heading="More tools" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
