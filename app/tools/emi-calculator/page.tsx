"use client";

import { ChangeEvent, useId, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { InvoiceInboundLinks } from "@/components/invoice-inbound-links";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

type TenureUnit = "months" | "years";

function parsePositiveNumber(s: string): number | null {
  const t = s.trim();
  if (t === "") return null;
  const n = Number(t);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

function parseNonNegativeRate(s: string): number | null {
  const t = s.trim();
  if (t === "") return null;
  const n = Number(t);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

function formatMoney(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function computeEmi(
  principal: number,
  annualPercent: number,
  months: number,
): { emi: number; totalPayment: number; totalInterest: number } | { error: string } {
  if (principal <= 0) return { error: "Loan amount must be greater than zero." };
  if (annualPercent < 0) return { error: "Interest rate cannot be negative." };
  if (!Number.isInteger(months) || months < 1) {
    return { error: "Tenure must be a whole number of months (at least 1)." };
  }
  if (months > 600) {
    return { error: "Tenure cannot exceed 600 months (50 years)." };
  }

  const R = annualPercent / 12 / 100;

  let emi: number;
  if (R === 0) {
    emi = principal / months;
  } else {
    const pow = Math.pow(1 + R, months);
    if (!Number.isFinite(pow) || pow <= 1) {
      return { error: "Numbers are too extreme to compute safely. Try smaller values." };
    }
    emi = (principal * R * pow) / (pow - 1);
  }

  if (!Number.isFinite(emi) || emi <= 0) {
    return { error: "Could not compute EMI for these inputs." };
  }

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;
  return { emi, totalPayment, totalInterest };
}

export default function EmiCalculatorPage() {
  const hintId = useId();
  const errorId = useId();
  const resultRegionId = useId();
  const unitHintId = useId();

  const [principalStr, setPrincipalStr] = useState("500000");
  const [rateStr, setRateStr] = useState("9.5");
  const [tenureStr, setTenureStr] = useState("5");
  const [tenureUnit, setTenureUnit] = useState<TenureUnit>("years");

  const [emi, setEmi] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [monthsUsed, setMonthsUsed] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    setEmi(null);
    setTotalInterest(null);
    setTotalPayment(null);
    setMonthsUsed(null);

    const P = parsePositiveNumber(principalStr);
    const annual = parseNonNegativeRate(rateStr);
    const tenure = parsePositiveNumber(tenureStr);

    if (P === null || annual === null || tenure === null) {
      setError(
        "Enter a positive loan amount and tenure, and a non-negative interest rate (% per year).",
      );
      return;
    }

    let N: number;
    if (tenureUnit === "years") {
      N = Math.round(tenure * 12);
      if (N < 1) {
        setError("Tenure in years must be enough to equal at least one month.");
        return;
      }
    } else {
      N = Math.round(tenure);
    }

    const out = computeEmi(P, annual, N);
    if ("error" in out) {
      setError(out.error);
      return;
    }

    setEmi(out.emi);
    setTotalInterest(out.totalInterest);
    setTotalPayment(out.totalPayment);
    setMonthsUsed(N);
  };

  const handleReset = () => {
    setPrincipalStr("500000");
    setRateStr("9.5");
    setTenureStr("5");
    setTenureUnit("years");
    setEmi(null);
    setTotalInterest(null);
    setTotalPayment(null);
    setMonthsUsed(null);
    setError(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.emiCalculator)} />
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
        aria-labelledby="emi-calc-heading"
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
                <span className="text-foreground">EMI Calculator</span>
              </p>
            </nav>

            <h1
              id="emi-calc-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              EMI Calculator Online Free
            </h1>

            <p
              id={hintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Estimate monthly EMI, total interest, and total repayment using the
              standard reducing-balance formula. For illustration only—not
              financial advice.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="tool-panel-heading"
          >
            <h2 id="tool-panel-heading" className="sr-only">
              EMI calculator inputs
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="principal"
                  className="text-sm font-medium text-foreground"
                >
                  Loan amount (principal)
                </label>
                <input
                  id="principal"
                  type="text"
                  inputMode="decimal"
                  value={principalStr}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPrincipalStr(e.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="rate"
                  className="text-sm font-medium text-foreground"
                >
                  Interest rate (% per year)
                </label>
                <input
                  id="rate"
                  type="text"
                  inputMode="decimal"
                  value={rateStr}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRateStr(e.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Nominal annual rate. Use 0 for interest-free.
                </p>
              </div>
              <div>
                <label
                  htmlFor="tenure"
                  className="text-sm font-medium text-foreground"
                >
                  Loan tenure
                </label>
                <input
                  id="tenure"
                  type="text"
                  inputMode="decimal"
                  value={tenureStr}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTenureStr(e.target.value)
                  }
                  aria-describedby={unitHintId}
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <fieldset className="mt-3">
                  <legend className="sr-only">Tenure unit</legend>
                  <div
                    id={unitHintId}
                    className="flex flex-wrap gap-3 text-sm text-foreground"
                  >
                    <label className="inline-flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="tenure-unit"
                        checked={tenureUnit === "years"}
                        onChange={() => setTenureUnit("years")}
                        className="h-4 w-4 border-border text-primary"
                      />
                      Years
                    </label>
                    <label className="inline-flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="tenure-unit"
                        checked={tenureUnit === "months"}
                        onChange={() => setTenureUnit("months")}
                        className="h-4 w-4 border-border text-primary"
                      />
                      Months
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

            {emi !== null && totalPayment !== null && totalInterest !== null && monthsUsed !== null ? (
              <div
                id={resultRegionId}
                className="mt-8 rounded-xl border-2 border-primary/30 bg-primary/5 p-5 sm:p-6"
                aria-live="polite"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Results
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Based on {monthsUsed.toLocaleString()} monthly installments
                </p>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-sm text-muted-foreground">Monthly EMI</dt>
                    <dd className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {formatMoney(emi)}
                    </dd>
                  </div>
                  <div className="grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm text-muted-foreground">
                        Total interest payable
                      </dt>
                      <dd className="mt-1 font-mono text-lg font-semibold text-foreground">
                        {formatMoney(totalInterest)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">
                        Total payment (principal + interest)
                      </dt>
                      <dd className="mt-1 font-mono text-lg font-semibold text-foreground">
                        {formatMoney(totalPayment)}
                      </dd>
                    </div>
                  </div>
                </dl>
                <div className="mt-6 rounded-lg border border-border bg-card/80 p-3">
                  <p className="text-xs font-medium text-muted-foreground">
                    Formula (monthly rest)
                  </p>
                  <p className="mt-1 font-mono text-sm text-foreground">
                    EMI = [P × R × (1+R)<sup>N</sup>] / [(1+R)<sup>N</sup> − 1]
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    P = principal, R = annual rate ÷ 12 ÷ 100, N = months. If R =
                    0, EMI = P ÷ N.
                  </p>
                </div>
              </div>
            ) : null}
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="emi-seo-heading">
            <h2
              id="emi-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is EMI?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              EMI (Equated Monthly Installment) is the fixed amount you pay each
              month on a loan. Part of it covers interest on the outstanding
              balance and part reduces the principal—this calculator uses the
              common reducing-balance method.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Calculate EMI
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              First convert the yearly interest rate to a monthly rate by dividing
              by 12 (and by 100 if the rate is in percent). Let N be the number of
              months. Then EMI is{" "}
              <span className="font-mono text-sm text-foreground">
                P × R × (1+R)^N / ((1+R)^N − 1)
              </span>
              . If the rate is zero, EMI is simply the principal divided by the
              number of months.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Use an EMI Calculator?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Seeing EMI, total interest, and total outgo helps you compare loan
              offers, choose tenure, and budget before you borrow. SmartFlexa runs
              the math locally in your browser for quick what-if checks.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <div className="mt-3 rounded-lg border border-border bg-muted/20 p-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Loan amount{" "}
                <span className="font-mono text-foreground">500,000</span>, annual
                interest{" "}
                <span className="font-mono text-foreground">9.5%</span>, tenure{" "}
                <span className="font-mono text-foreground">5 years</span> (60
                months). The defaults on this page yield a monthly EMI of about{" "}
                <span className="font-mono text-foreground">10,500.93</span>, total
                interest near{" "}
                <span className="font-mono text-foreground">130,056</span>, and total
                repayment around{" "}
                <span className="font-mono text-foreground">630,056</span>—tap
                Calculate to see values formatted for your locale.
              </p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">How is EMI calculated?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  This page uses the standard reducing-balance EMI formula with equal
                  monthly payments. Your lender may round differently or add fees.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  What affects EMI amount?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Principal, annual interest rate, and tenure in months. Higher
                  rates or amounts raise EMI; longer tenure lowers EMI but usually
                  increases total interest.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa’s EMI calculator is free with no signup.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Inputs stay on your device; we do not send your loan details to
                  our servers for this calculation.
                </dd>
              </div>
            </dl>

            <InvoiceInboundLinks />
            <RelatedTools currentPath="/tools/emi-calculator" heading="More tools" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
