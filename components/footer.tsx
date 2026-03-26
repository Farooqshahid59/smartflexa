import Link from "next/link";

import {
  defaultFooterColumns,
  siteBrand,
  type FooterColumn,
} from "@/lib/home-content";

export type FooterProps = {
  brandName?: string;
  brandInitials?: string;
  tagline?: string;
  columns?: FooterColumn[];
};

export function Footer({
  brandName = siteBrand.name,
  brandInitials = siteBrand.initials,
  tagline = "Smart tools that simplify your work. Free, fast, and secure.",
  columns = defaultFooterColumns,
}: FooterProps) {
  const year = new Date().getFullYear();
  const legalLinks =
    columns.find((c) => c.title === "Legal")?.links ?? [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms" },
    ];

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">
                  {brandInitials}
                </span>
              </div>
              <span className="text-xl font-semibold tracking-tight text-foreground">
                {brandName}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {tagline}
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <p className="text-center text-sm text-muted-foreground">
              © {year} {brandName}. All rights reserved.
            </p>
            <span className="hidden text-muted-foreground sm:inline" aria-hidden>
              ·
            </span>
            <nav
              aria-label="Legal"
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm"
            >
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
