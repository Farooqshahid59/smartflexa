import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import type { ToolCategoryId } from "@/lib/home-content";

export type CategoryCardProps = {
  id: ToolCategoryId;
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
  count: number;
  toolsLabel?: string;
  /** When set, card acts as a button (homepage filter). Otherwise uses `href` link. */
  onSelect?: (id: ToolCategoryId) => void;
};

export function CategoryCard({
  id,
  name,
  description,
  icon: Icon,
  href,
  count,
  toolsLabel = "tools",
  onSelect,
}: CategoryCardProps) {
  const inner = (
    <>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="text-lg font-semibold text-card-foreground">{name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {count} {toolsLabel}
        </span>
        <ArrowRight
          className="h-4 w-4 text-foreground transition-transform group-hover:translate-x-1"
          aria-hidden
        />
      </div>
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={() => onSelect(id)}
        className="group relative w-full overflow-hidden rounded-xl border border-border bg-card p-6 text-left transition-all hover:border-foreground/20 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {inner}
      </button>
    );
  }

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-md"
    >
      {inner}
    </Link>
  );
}
