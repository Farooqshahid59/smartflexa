import Link from "next/link";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { AiEmailWriterRelatedToolLinks } from "@/components/ai-email-writer-related-tool-links";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

import { AiEmailWriterTool } from "./ai-email-writer-tool";

const emailFaqJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How to write professional email", acceptedAnswer: { "@type": "Answer", text: "Describe context, choose purpose and tone, then generate. Review details, personalize names and dates, and send after a quick edit." } },
    { "@type": "Question", name: "Is this tool free", acceptedAnswer: { "@type": "Answer", text: "Yes. SmartFlexa provides this AI email writer for free in regular usage." } },
    { "@type": "Question", name: "Can I generate email replies", acceptedAnswer: { "@type": "Answer", text: "Yes. Select Reply and include the message context. The tool drafts a full response with greeting, body, and closing." } },
    { "@type": "Question", name: "How to improve email writing", acceptedAnswer: { "@type": "Answer", text: "Use clear context, include desired outcome, and choose the right tone. Keep paragraphs short and always do a final human review." } },
    { "@type": "Question", name: "Best email writing tools", acceptedAnswer: { "@type": "Answer", text: "The best tools generate usable first drafts quickly, preserve context, and make editing easy. SmartFlexa focuses on practical draft quality and speed." } },
  ],
};

export default function AiEmailWriterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.aiEmailWriter)} />
      <JsonLd data={emailFaqJsonLd} />
      <a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">Skip to main content</a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="ai-email-heading">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2 text-border" aria-hidden>/</span>
            <span>Tools</span>
            <span className="mx-2 text-border" aria-hidden>/</span>
            <span className="text-foreground">AI Email Writer</span>
          </nav>

          <h1 id="ai-email-heading" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">AI Email Writer Free (Generate Professional Emails Instantly)</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">Generate clean email replies and new outbound emails with adjustable tone. Paste context, choose intent, and copy a ready-to-edit draft in seconds.</p>

          <div className="mt-10"><AiEmailWriterTool /></div>

          <article className="mt-16 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">How to write emails that get responses</h2>
            <p>Strong emails are clear, specific, and easy to scan. Readers decide in seconds whether a message is relevant, so your subject and opening line should signal intent immediately. Start with context, state the request, then provide supporting details in short paragraphs or bullets. End with an explicit next step such as a deadline, confirmation request, or meeting option. This structure reduces back-and-forth and improves response rates in business, support, and hiring workflows.</p>
            <p>Writers often struggle because they know the goal but not the phrasing. Some drafts are too vague, others too long, and many miss tone alignment with the audience. A professional client follow-up should sound different from a teammate check-in or customer apology. The fastest workflow is to define purpose first: are you replying, making a request, sharing an update, or escalating an issue? Once purpose is clear, tone and detail become easier to control.</p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">Benefits of AI email generation</h2>
            <p>AI email generators accelerate first drafts. Instead of writing from a blank page, you provide context and get a complete draft with greeting, body, and closing. This removes friction for repetitive tasks like status updates, meeting follow-ups, and support responses. You still keep final control, but you spend less time on sentence construction and more time on decision quality.</p>
            <p>AI tools are also useful when confidence is low. Non-native writers can quickly produce grammatically stable drafts, then customize wording for brand voice. Busy operators can maintain consistency across dozens of messages in one day. Teams can standardize communication style by pairing generated drafts with templates and review checklists. As long as humans verify facts and intent, AI can improve speed without reducing quality.</p>
            <p>There are limits. AI can misread ambiguous context or invent details if instructions are weak. That is why this tool works best when input includes recipient role, key points, and desired outcome. Add concrete constraints such as timeline, budget, or policy references so generated output remains grounded. Always confirm names, dates, links, and commitments before sending.</p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">Common use cases: job, business, and support</h2>
            <p>In job search workflows, candidates can draft recruiter follow-ups, interview thank-you notes, referral requests, and application status checks quickly while maintaining polite tone. For business teams, common use cases include vendor negotiation updates, internal alignment emails, project handoff notes, and client communication where clarity and speed matter. Selecting Formal or Professional tone helps keep language aligned with external stakeholders.</p>
            <p>Customer support teams can convert ticket context into clear replies with actionable next steps, expected resolution time, and empathy statements. When a situation is sensitive, Friendly tone can soften delivery while preserving professionalism. For short confirmations and reminders, Short tone keeps messages concise and easy to process on mobile devices.</p>
            <p>The best process is draft, review, personalize, and send. AI creates the starting point; humans ensure accuracy, compliance, and relationship context. With that approach, you can reduce writing time dramatically while keeping communication standards high.</p>
          </article>

          <section className="mt-14 max-w-3xl" aria-labelledby="ai-email-faq-heading">
            <h2 id="ai-email-faq-heading" className="text-2xl font-bold tracking-tight text-foreground">Frequently asked questions</h2>
            <dl className="mt-6 space-y-8 text-base">
              <div><dt className="font-semibold text-foreground">How to write professional email</dt><dd className="mt-2 leading-relaxed text-muted-foreground">State context, objective, and action request clearly. Keep structure simple and respectful.</dd></div>
              <div><dt className="font-semibold text-foreground">Is this tool free</dt><dd className="mt-2 leading-relaxed text-muted-foreground">Yes. You can generate emails for free on SmartFlexa in normal usage.</dd></div>
              <div><dt className="font-semibold text-foreground">Can I generate email replies</dt><dd className="mt-2 leading-relaxed text-muted-foreground">Yes. Choose Reply, paste message context, and generate a response draft.</dd></div>
              <div><dt className="font-semibold text-foreground">How to improve email writing</dt><dd className="mt-2 leading-relaxed text-muted-foreground">Use concise language, one clear goal, and a direct call to action.</dd></div>
              <div><dt className="font-semibold text-foreground">Best email writing tools</dt><dd className="mt-2 leading-relaxed text-muted-foreground">Look for fast draft generation, tone control, and easy human editing before send.</dd></div>
            </dl>
          </section>

          <div className="mt-14 space-y-10">
            <AiEmailWriterRelatedToolLinks />
            <RelatedTools currentPath="/tools/ai-email-writer" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
