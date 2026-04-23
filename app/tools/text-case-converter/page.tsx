"use client";

import { ChangeEvent, useEffect, useId, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { CaseConverterDevInboundLinks } from "@/components/case-converter-dev-inbound-links";
import { SignatureGeneratorInboundLinks } from "@/components/signature-generator-inbound-links";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

type CaseMode = "upper" | "lower" | "title" | "sentence";

function applyCase(text: string, mode: CaseMode): string {
  if (!text) return "";

  switch (mode) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title":
      return text
        .split(/(\s+)/)
        .map((part) => {
          if (/^\s+$/.test(part) || part === "") return part;
          const first = part.charAt(0);
          const rest = part.slice(1);
          return first.toUpperCase() + rest.toLowerCase();
        })
        .join("");
    case "sentence": {
      const lower = text.toLowerCase();
      let out = "";
      let capitalize = true;
      for (let i = 0; i < lower.length; i++) {
        const ch = lower[i];
        if (capitalize && /[a-z]/.test(ch)) {
          out += ch.toUpperCase();
          capitalize = false;
        } else {
          out += ch;
          if (/[.!?]/.test(ch)) capitalize = true;
        }
      }
      return out;
    }
    default:
      return text;
  }
}

export default function TextCaseConverterPage() {
  const inputHintId = useId();
  const outputHintId = useId();
  const errorId = useId();
  const copyStatusId = useId();

  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [lastMode, setLastMode] = useState<CaseMode | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const hasInput = inputText.length > 0;
  const canCopy = outputText.trim().length > 0;

  useEffect(() => {
    if (lastMode === null) return;
    try {
      setOutputText(applyCase(inputText, lastMode));
      setError(null);
    } catch {
      setError("Could not convert text. Try removing unusual characters.");
    }
  }, [inputText, lastMode]);

  const applyMode = (mode: CaseMode) => {
    setCopyStatus(null);
    setError(null);
    if (!inputText) return;
    try {
      setLastMode(mode);
      setOutputText(applyCase(inputText, mode));
    } catch {
      setError("Could not convert text. Try removing unusual characters.");
    }
  };

  const handleCopy = async () => {
    setCopyStatus(null);
    setError(null);
    if (!outputText.trim()) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopyStatus("Copied output to clipboard.");
    } catch {
      setError("Copy failed. Your browser may block clipboard access.");
    }
  };

  const clearAll = () => {
    setInputText("");
    setOutputText("");
    setLastMode(null);
    setError(null);
    setCopyStatus(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.textCaseConverter)} />
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
        aria-labelledby="text-case-converter-heading"
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
                <span className="text-foreground">Text Case Converter</span>
              </p>
            </nav>

            <h1
              id="text-case-converter-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Text Case Converter Online Free
            </h1>

            <p
              id={inputHintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Paste or type text, choose a case style, and get converted output
              instantly. Everything runs in your browser.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="text-case-converter-heading"
          >
            <div className="space-y-3">
              <label
                htmlFor="case-input"
                className="text-sm font-medium text-foreground"
              >
                Input text
              </label>
              <textarea
                id="case-input"
                value={inputText}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setInputText(e.target.value)
                }
                placeholder="Type or paste text here..."
                spellCheck={true}
                autoComplete="off"
                aria-describedby={inputHintId}
                className="min-h-[200px] w-full resize-y rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-foreground">
                Convert to
              </legend>
              <div
                className="mt-3 flex flex-wrap gap-2"
                role="group"
                aria-label="Text case options"
              >
                <button
                  type="button"
                  onClick={() => applyMode("upper")}
                  disabled={!hasInput}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  UPPERCASE
                </button>
                <button
                  type="button"
                  onClick={() => applyMode("lower")}
                  disabled={!hasInput}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  lowercase
                </button>
                <button
                  type="button"
                  onClick={() => applyMode("title")}
                  disabled={!hasInput}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Title Case
                </button>
                <button
                  type="button"
                  onClick={() => applyMode("sentence")}
                  disabled={!hasInput}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Sentence case
                </button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                After you pick a style, edits to the input update the output
                automatically.
              </p>
            </fieldset>

            <div className="mt-6 space-y-3">
              <label
                htmlFor="case-output"
                className="text-sm font-medium text-foreground"
              >
                Output
              </label>
              <textarea
                id="case-output"
                value={outputText}
                readOnly
                aria-describedby={outputHintId}
                className="min-h-[200px] w-full resize-y rounded-lg border border-input bg-muted/20 px-4 py-3 text-base text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p id={outputHintId} className="text-xs text-muted-foreground">
                {lastMode
                  ? "Output follows your last selected case style."
                  : "Choose a case style above to see converted text here."}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={() => void handleCopy()}
                disabled={!canCopy}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copy output
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Clear
              </button>
            </div>

            {copyStatus ? (
              <p
                id={copyStatusId}
                className="mt-4 text-sm text-foreground"
                role="status"
              >
                {copyStatus}
              </p>
            ) : null}

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

          <article className="mt-14 space-y-10" aria-labelledby="case-seo-heading">
            <h2
              id="case-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is a Text Case Converter?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A text case converter changes how letters are capitalized—such as
              all caps, all lowercase, title style, or sentence style—without
              changing the meaning of your words.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Change Text Case
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Paste or type your text in the input box.</li>
              <li>
                Click UPPERCASE, lowercase, Title Case, or Sentence case.
              </li>
              <li>Review the output and copy it, or clear and start over.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Types of Case Conversion
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">Uppercase</span>{" "}
                — every letter is capitalized (e.g. HEADLINE STYLE).
              </li>
              <li>
                <span className="font-medium text-foreground">Lowercase</span>{" "}
                — every letter is small (e.g. casual notes).
              </li>
              <li>
                <span className="font-medium text-foreground">Title Case</span>{" "}
                — the first letter of each word is capitalized.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Sentence case
                </span>{" "}
                — only the first letter of each sentence is capitalized.
              </li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <div className="mt-3 rounded-lg border border-border bg-muted/20 p-4 text-sm">
              <p className="font-medium text-foreground">Before</p>
              <pre className="mt-2 whitespace-pre-wrap text-muted-foreground">
                hello WORLD. how are you?
              </pre>
              <p className="mt-4 font-medium text-foreground">Title Case</p>
              <pre className="mt-2 whitespace-pre-wrap text-muted-foreground">
                Hello World. How Are You?
              </pre>
              <p className="mt-4 font-medium text-foreground">Sentence case</p>
              <pre className="mt-2 whitespace-pre-wrap text-muted-foreground">
                Hello world. How are you?
              </pre>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  How do I convert text to uppercase?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Paste your text and click the UPPERCASE button. The output
                  updates immediately, and you can copy it with one click.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  What is title case?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Title case capitalizes the first letter of each word (split by
                  spaces), which is common for headings and names.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is this tool free?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa offers this text case converter at no cost with
                  no signup required.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Processing happens in your browser. Your text is not uploaded
                  to our servers for this tool.
                </dd>
              </div>
            </dl>

            <CaseConverterDevInboundLinks />
            <SignatureGeneratorInboundLinks />
            <RelatedTools
              currentPath="/tools/text-case-converter"
              heading="More tools"
            />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
