import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export type ToolCardProps = {
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
  ctaLabel?: string;
};

export function ToolCard({
  name,
  description,
  icon: Icon,
  href,
  ctaLabel = "Use Tool",
}: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-foreground/20 hover:shadow-md"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
        <Icon className="h-6 w-6 text-foreground" aria-hidden />
      </div>
      <h3 className="text-lg font-semibold text-card-foreground">{name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-foreground">
        {ctaLabel}
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden
        />
      </div>
    </Link>
  );
}
