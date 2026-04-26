import Link from "next/link";

export function AiEmailWriterInboundLinks() {
  return (
    <section className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6" aria-labelledby="ai-email-inbound-heading">
      <h2 id="ai-email-inbound-heading" className="text-lg font-semibold tracking-tight text-foreground">Write better emails fast</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Generate first drafts for replies and new emails, then refine with your own context.</p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li><Link href="/tools/ai-email-writer" className="font-medium text-foreground underline">Generate email using AI</Link></li>
        <li><Link href="/tools/ai-email-writer" className="font-medium text-foreground underline">AI email writer</Link></li>
      </ul>
    </section>
  );
}
