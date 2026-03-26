import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Privacy Policy | SmartFlexa",
  },
  description:
    "Read the privacy policy of SmartFlexa. Learn how we handle your data and ensure your privacy.",
  alternates: {
    canonical: `${siteUrl.replace(/\/$/, "")}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy | SmartFlexa",
    description:
      "Read the privacy policy of SmartFlexa. Learn how we handle your data and ensure your privacy.",
    type: "website",
    siteName: "SmartFlexa",
    url: "/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
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
                Privacy Policy
              </h1>
              <p className="text-sm text-muted-foreground">
                Last updated: March 26, 2026
              </p>
            </header>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                1. Introduction
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                SmartFlexa provides free online tools for developers, creators, and
                everyday users. This Privacy Policy explains what information may be
                collected when you use our website and how we use it.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                2. Information We Collect
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
                <li>
                  We do not require an account and do not ask you to submit personal data
                  to use our tools.
                </li>
                <li>
                  We may use basic analytics (for example, Google Analytics) to understand
                  how visitors use the site—such as pages viewed and general traffic
                  patterns.
                </li>
                <li>
                  Like most websites, our servers or hosting providers may automatically
                  collect log data such as IP address, browser type, device type, referring
                  URLs, and timestamps. This helps us operate and secure the service.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                3. How We Use Information
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
                <li>To improve our tools and user experience.</li>
                <li>To analyze usage trends and site performance.</li>
                <li>To maintain security, prevent abuse, and troubleshoot issues.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                4. Cookies
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                We may use cookies and similar technologies to remember preferences,
                measure traffic, and support analytics. Analytics cookies may collect
                aggregated or pseudonymous data about how you interact with SmartFlexa.
                You can control cookies through your browser settings.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                5. Third-Party Services
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
                <li>
                  <strong className="text-foreground">Google Analytics:</strong> may be
                  used to understand site usage. Their handling of data is governed by
                  Google&apos;s policies.
                </li>
                <li>
                  <strong className="text-foreground">Advertising:</strong> we may use
                  Google AdSense or similar services in the future to show ads. Those
                  providers may use cookies and process data according to their own
                  policies.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                6. Data Security
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Many SmartFlexa tools process files entirely in your browser (client-side).
                In those cases, your files are not uploaded to our servers for processing.
                We encourage you to review each tool&apos;s description on the site for
                details. We take reasonable measures to protect information we do
                collect, but no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                7. User Consent
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                By accessing or using SmartFlexa, you agree to this Privacy Policy. If you
                do not agree, please do not use the site.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                8. Changes to This Policy
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                We may update this Privacy Policy from time to time. Changes will be posted
                on this page with an updated revision date. Continued use of the site
                after changes constitutes acceptance of the revised policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                9. Contact
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                If you have questions about this Privacy Policy, contact us at{" "}
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
