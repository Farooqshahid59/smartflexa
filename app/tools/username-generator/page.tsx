import Link from "next/link";

import { UsernameGeneratorTool } from "@/app/tools/username-generator/username-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { UsernameRelatedToolLinks } from "@/components/username-related-tool-links";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const usernameFaqJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How to generate username?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pick a category (cool, gaming, Instagram, or professional), optionally enter a keyword, choose length and whether to include numbers or symbols, set how many names you want (10–20), then click Regenerate until you see a batch you like. Use Copy all to paste into a spreadsheet or signup form.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good username?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good username is memorable, easy to spell aloud, unique on the platform, free of confusing homoglyphs, and appropriate for the audience. It should avoid leaking personal data you would regret later and should still be available as a handle on networks you care about.",
      },
    },
    {
      "@type": "Question",
      name: "How to create unique username?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Combine uncommon word pairs, add a short random numeric suffix, avoid dictionary-only phrases, check availability on target sites, and avoid trademarked brand strings. Generators help brainstorm; you still verify availability manually.",
      },
    },
    {
      "@type": "Question",
      name: "Username ideas for Instagram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Try soft aesthetic combinations with dots or underscores, keep length readable in stories, avoid excessive numbers that look spammy, and mirror the tone of your niche—travel, fitness, or art each have different naming norms.",
      },
    },
    {
      "@type": "Question",
      name: "Gaming username ideas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Look for short punchy handles that read well in kill feeds, avoid offensive slurs that violate ToS, consider clan tags separately, and test pronunciation for voice chat. Numbers can help when the base phrase is taken.",
      },
    },
  ],
};

export default function UsernameGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.usernameGenerator)} />
      <JsonLd data={usernameFaqJsonLd} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="username-heading">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Username Generator</span>
          </nav>

          <h1
            id="username-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Username generator free
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Create batches of unique handles for social and gaming—pick a vibe, tune length, add
            numbers or separators, then copy the list. More landing pages:{" "}
            <Link
              href="/instagram-username-generator"
              className="font-medium text-foreground underline"
            >
              Instagram username generator
            </Link>
            ,{" "}
            <Link href="/gaming-username-generator" className="font-medium text-foreground underline">
              gaming username generator
            </Link>
            ,{" "}
            <Link href="/cool-username-generator" className="font-medium text-foreground underline">
              cool username generator
            </Link>
            , and{" "}
            <Link href="/username-ideas" className="font-medium text-foreground underline">
              username ideas
            </Link>
            .
          </p>

          <div className="mt-10">
            <UsernameGeneratorTool />
          </div>

          <article className="mt-16 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to choose a username
            </h2>
            <p>
              Start with context: a bank analyst on LinkedIn needs a different tone than a Valorant
              duo queue tag or a TikTok art account. Write down three adjectives you want viewers to
              feel—calm, precise, chaotic—and reject any candidate that fights those words. Say each
              option out loud; if teammates cannot pronounce it after one try, it will not stick in
              voice chat or podcast credits.
            </p>
            <p>
              Next, check availability across the networks you actually use, not just the signup
              screen you are staring at today. Squatting common handles is expensive; slight spelling
              twists beat long numeric tails when you still want to look intentional. Pair this
              generator with SmartFlexa’s{" "}
              <Link href="/tools/password-generator" className="font-medium text-foreground underline">
                password generator
              </Link>{" "}
              once you finalize a handle so credential hygiene does not lag behind branding.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">Types of usernames</h2>
            <p>
              <strong className="text-foreground">Literal names</strong> trade anonymity for trust
              in professional contexts. <strong className="text-foreground">Persona handles</strong>{" "}
              bundle genre cues—science fiction, cozy lifestyle, competitive FPS—into a single token.
              <strong className="text-foreground"> Abstract mashups</strong> optimize for uniqueness when
              every dictionary word pair is taken. <strong className="text-foreground">Initialisms</strong>{" "}
              compress teams or studios into three letters, while <strong className="text-foreground">
                numeric suffixes
              </strong>{" "}
              disambiguate collisions without inventing new vocabulary.
            </p>
            <p>
              SmartFlexa encodes those families into presets: Instagram mode leans soft separators,
              gaming mode leans punchy compounds, professional mode favors underscore bridges between
              credible nouns, and cool mode chases stylized lowercase blends. None of these replace
              trademark search—treat suggestions as brainstorming fuel.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Tips for unique usernames
            </h2>
            <p>
              Avoid embedding birth years, street numbers, or employer acronyms that age poorly or leak
              operational security. Prefer Unicode-safe ASCII on global platforms unless you have
              verified support for diacritics in your target apps. When you like a batch, screenshot
              the list before refreshing—this page is stateless on purpose so nothing persists on our
              servers, which also means accidental reloads erase unsaved picks.
            </p>
            <p>
              For structured randomness elsewhere—mock follower counts, seeded QA users, or lottery
              demos—open the{" "}
              <Link
                href="/tools/random-number-generator"
                className="font-medium text-foreground underline"
              >
                random number generator
              </Link>
              . For filler bio paragraphs while testing profile layouts, pair handles with the{" "}
              <Link
                href="/tools/lorem-ipsum-generator"
                className="font-medium text-foreground underline"
              >
                Lorem Ipsum generator
              </Link>
              .
            </p>
            <p>
              Finally, remember that uniqueness in this tool means uniqueness within the generated
              batch using cryptographic randomness—it does not query Twitch, Steam, or Instagram for
              live availability. Always confirm on-platform before printing merch or ordering jerseys.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">How to generate username?</dt>
                <dd className="mt-2">
                  Choose category and options, set batch size, click Regenerate, then copy the list.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">What is a good username?</dt>
                <dd className="mt-2">
                  Memorable, pronounceable, appropriate for the community, and not easily confused
                  with someone else’s brand.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">How to create unique username?</dt>
                <dd className="mt-2">
                  Mix uncommon tokens, add short numeric tails, verify availability, and avoid sensitive
                  personal data.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Username ideas for Instagram?</dt>
                <dd className="mt-2">
                  Use the Instagram preset with dots or underscores, keep it readable in captions, and
                  align with your niche aesthetic.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Gaming username ideas?</dt>
                <dd className="mt-2">
                  Try the Gaming preset for punchy compounds, enable numbers if bases are taken, and
                  follow each platform’s conduct rules.
                </dd>
              </div>
            </dl>
          </article>

          <div className="mt-14 space-y-10">
            <UsernameRelatedToolLinks />
            <RelatedTools currentPath="/tools/username-generator" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
