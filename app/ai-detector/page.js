"use client";

import { useMemo, useState } from "react";

import { AiGrammarInboundLinks } from "@/components/ai-grammar-inbound-links";
import { AiSummarizerInboundLinks } from "@/components/ai-summarizer-inbound-links";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const MIN_WORDS = 100;

function countWords(text) {
  return (text.trim().match(/\b[\w'-]+\b/g) || []).length;
}

export default function AiDetectorPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const words = useMemo(() => countWords(text), [text]);

  async function handleAnalyze() {
    setError("");
    setResult(null);

    if (words < MIN_WORDS) {
      setError(`Please enter at least ${MIN_WORDS} words.`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Could not analyze text.");
        return;
      }

      setResult(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              AI Text Detector
            </h1>
            <p className="mt-2 text-base text-muted-foreground sm:text-lg">
              Paste your content and detect whether writing appears AI-generated or human-like.
            </p>
            <p className="mt-3 rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
              This tool provides an estimate and may not be 100% accurate.
            </p>
          </div>

          <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8">
            <label
              htmlFor="detector-text"
              className="text-sm font-medium text-foreground"
            >
              Input Text
            </label>
            <textarea
              id="detector-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste at least 100 words here..."
              rows={12}
              className="mt-2 w-full resize-y rounded-lg border border-input bg-background p-4 text-sm leading-relaxed text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />

            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Minimum {MIN_WORDS} words required</span>
              <span>{words} words</span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={loading}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                    Analyzing...
                  </span>
                ) : (
                  "Analyze Text"
                )}
              </button>
            </div>

            {error ? (
              <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            ) : null}

            {result ? (
              <div className="mt-8 space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border border-border bg-muted/20 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      AI Score
                    </p>
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      {result.aiScore}%
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/20 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Human Score
                    </p>
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      {result.humanScore}%
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/20 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Confidence
                    </p>
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      {result.confidence}
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Sentence Analysis
                  </h2>
                  <div className="mt-3 space-y-2">
                    {Array.isArray(result.sentences) && result.sentences.length > 0 ? (
                      result.sentences.map((item, idx) => (
                        <p
                          key={`${idx}-${item.text?.slice(0, 24)}`}
                          className={`rounded-md border px-3 py-2 text-sm leading-relaxed ${
                            item.suspicious
                              ? "border-amber-400/40 bg-amber-500/10 text-foreground"
                              : "border-border bg-background text-muted-foreground"
                          }`}
                        >
                          {item.text}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No sentence-level analysis available.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </section>

          <article className="mt-14 space-y-8" aria-labelledby="ai-detector-seo">
            <h2
              id="ai-detector-seo"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What Is AI Text Detection?
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              AI text detection is the process of estimating whether a paragraph
              was likely written by a human or generated by an AI model such as
              ChatGPT. It does not work like a lie detector, and it is not a
              perfect truth machine. Instead, it looks for statistical language
              patterns that are more common in machine-generated writing. AI
              systems usually produce fluent and grammatically correct content,
              but they can also be overly uniform in sentence rhythm, structure,
              and word predictability. Human writing often contains more natural
              variation, uneven sentence lengths, and less predictable phrasing.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              This AI text detector is designed as a fast, practical signal for
              reviewers, teachers, editors, and content teams. You paste text,
              run analysis, and get a quick output: AI score, human score,
              confidence level, and suspicious sentence highlights. The purpose
              is to support better decision-making, not to replace human review.
              If you are checking student essays, freelance submissions, or
              marketing drafts, use the output as one data point together with
              context, writing history, and quality checks.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How This AI Detector Works
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              The detector combines two lightweight signals. First, it uses a
              language-model-based predictability estimate (a perplexity-like
              score). In simple terms, if the next words are very easy for a
              model to predict, the text may appear more machine-like. Second,
              it measures burstiness by splitting your content into sentences and
              analyzing variation in sentence length. Lower variation can suggest
              repetitive style, while higher variation often looks more human.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              After combining these signals, the tool returns an AI percentage
              and human percentage that sum to 100. Confidence is also shown as
              Low, Medium, or High, depending on how strongly the patterns point
              in one direction. Finally, the sentence list marks suspicious lines
              so you can quickly inspect where the text may feel too formulaic.
              This keeps analysis simple and actionable without making the page
              heavy or slow.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Limitations You Should Know
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              No detector can guarantee 100% accuracy. A skilled human can write
              in a very regular style and be flagged as AI-like. On the other
              hand, AI text can be edited by humans and look more natural. Short
              samples are also unreliable, which is why this page requires a
              minimum word count. Domain-specific writing (legal, technical, or
              scientific content) may appear highly structured and trigger higher
              AI scores even when written by people.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Best practice: treat results as probabilistic guidance, not final
              judgment. If consequences are important, combine this with manual
              review, version history, citation checks, and authorship context.
              The goal is better risk screening and faster triage, not automatic
              accusation. Use the sentence highlights to focus your review time,
              then make a balanced decision with human oversight.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              FAQ
            </h2>
            <dl className="space-y-5">
              <div>
                <dt className="font-semibold text-foreground">
                  Is this AI text detector accurate?
                </dt>
                <dd className="mt-1 text-base leading-relaxed text-muted-foreground">
                  It is directionally useful, but no detector is perfect. Use it
                  as a screening signal, then confirm with human review.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Can it detect ChatGPT content?
                </dt>
                <dd className="mt-1 text-base leading-relaxed text-muted-foreground">
                  It is designed to estimate whether text looks AI-generated,
                  including ChatGPT-like patterns, but results are probabilistic.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Why do you require at least 100 words?
                </dt>
                <dd className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Very short text does not provide enough statistical signal for
                  reliable scoring, so the output becomes noisy.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  What does confidence mean?
                </dt>
                <dd className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Confidence indicates how strongly the measured patterns support
                  the AI vs human estimate. It is not a guarantee.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is this AI detector free?
                </dt>
                <dd className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa AI Text Detector is free to use.
                </dd>
              </div>
            </dl>
          </article>

          <AiSummarizerInboundLinks />
          <AiGrammarInboundLinks />
        </div>
      </main>
      <Footer />
    </div>
  );
}
