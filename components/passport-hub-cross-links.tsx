import Link from "next/link";

export type PassportHubId = "us" | "india" | "uk" | "2x2";

const HUB_LINKS: { id: PassportHubId; href: string; label: string }[] = [
  { id: "us", href: "/passport-photo-size-us", label: "US passport photo size (2×2 in)" },
  {
    id: "india",
    href: "/passport-photo-size-india",
    label: "India passport photo size (35×45 mm)",
  },
  { id: "uk", href: "/passport-photo-size-uk", label: "UK passport photo size (35×45 mm)" },
  { id: "2x2", href: "/2x2-photo-maker", label: "2×2 photo maker (square ID photos)" },
];

type PassportHubCrossLinksProps = {
  /** Current hub page — other hubs are listed here. */
  exclude: PassportHubId;
};

export function PassportHubCrossLinks({ exclude }: PassportHubCrossLinksProps) {
  const others = HUB_LINKS.filter((l) => l.id !== exclude);

  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="passport-hub-cross-heading"
    >
      <h2
        id="passport-hub-cross-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Related photo size guides
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        {others.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="font-medium text-foreground underline">
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/tools/passport-photo-maker"
            className="font-medium text-foreground underline"
          >
            All-in-one passport photo maker (tools hub)
          </Link>
        </li>
      </ul>
    </section>
  );
}
