import Link from "next/link";

export function UsernameInboundLinks() {
  return (
    <section
      className="mt-10 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="username-inbound-heading"
    >
      <h2
        id="username-inbound-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Handles & gamertags
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Batch-generate screen names with category presets—runs locally in your browser.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>
          <Link
            href="/tools/username-generator"
            className="font-medium text-foreground underline"
          >
            Generate usernames
          </Link>
        </li>
        <li>
          <Link
            href="/tools/username-generator"
            className="font-medium text-foreground underline"
          >
            Username generator online
          </Link>
        </li>
      </ul>
    </section>
  );
}
