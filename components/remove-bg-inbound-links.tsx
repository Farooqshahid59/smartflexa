import Link from "next/link";

export function RemoveBgInboundLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="remove-bg-inbound-heading"
    >
      <h2
        id="remove-bg-inbound-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Cut out backgrounds
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Fast canvas-based removal for simple studio shots—no cloud AI, no file upload to our servers.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>
          <Link
            href="/tools/remove-background"
            className="font-medium text-foreground underline"
          >
            Remove image background
          </Link>
        </li>
        <li>
          <Link
            href="/tools/remove-background"
            className="font-medium text-foreground underline"
          >
            Background remover tool
          </Link>
        </li>
      </ul>
    </section>
  );
}
