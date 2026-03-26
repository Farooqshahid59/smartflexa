import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Terms of Service | SmartFlexa",
  },
  description:
    "Read the terms and conditions for using SmartFlexa tools and services.",
  alternates: {
    canonical: `${siteUrl.replace(/\/$/, "")}/terms`,
  },
  openGraph: {
    title: "Terms of Service | SmartFlexa",
    description:
      "Read the terms and conditions for using SmartFlexa tools and services.",
    type: "website",
    siteName: "SmartFlexa",
    url: "/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <article className="space-y-10 text-foreground">
            <header className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Terms of Service
              </h1>
              <p className="text-sm text-muted-foreground">
                Last updated: March 26, 2026
              </p>
            </header>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                1. Acceptance of Terms
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                By accessing or using SmartFlexa (&quot;the Site,&quot; &quot;we,&quot;
                &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms
                of Service. If you do not agree, do not use the Site.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                2. Use of Services
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                SmartFlexa offers free online tools for personal and professional use. You
                agree to use the services only for lawful purposes. You must not misuse the
                Site, attempt to disrupt or overload our systems, scrape or automate access
                in a way that harms the service, or use the tools to violate any law or
                third-party rights.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                3. No Guarantees
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                All tools and content are provided &quot;as is&quot; and &quot;as
                available&quot; without warranties of any kind, express or implied. We do
                not guarantee that the tools will be error-free, uninterrupted, or suitable
                for your specific needs. We do not warrant the accuracy or completeness of
                any output from the tools.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                4. Limitation of Liability
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                To the fullest extent permitted by law, SmartFlexa and its operators shall
                not be liable for any indirect, incidental, special, consequential, or
                punitive damages, or any loss of data, profits, goodwill, or other
                intangible losses, arising from your use of the Site or tools. Your sole
                remedy for dissatisfaction with the service is to stop using the Site.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                5. User Responsibility
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                You are solely responsible for the files you upload, the data you process,
                and how you use the tools and their output. You should keep backups of
                important files. You represent that you have the right to process any
                content you submit.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                6. Intellectual Property
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                The SmartFlexa name, branding, website design, text, and original content on
                the Site are owned by SmartFlexa or its licensors and are protected by
                applicable intellectual property laws. You may not copy, modify, or
                redistribute our content without permission, except as allowed by law or
                for personal, non-commercial use that does not harm our rights.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                7. Third-Party Services
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                The Site may integrate or link to third-party services such as analytics
                (for example, Google Analytics) or advertising (for example, Google
                AdSense). Those services have their own terms and privacy practices. We are
                not responsible for third-party content or policies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                8. Changes to Terms
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                We may update these Terms of Service at any time. The &quot;Last
                updated&quot; date at the top of this page will change when we do.
                Continued use of the Site after changes constitutes acceptance of the revised
                terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                9. Contact Information
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                For questions about these Terms, contact us at{" "}
                <a
                  href="mailto:support@smartflexa.com"
                  className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
                >
                  support@smartflexa.com
                </a>
                .
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
