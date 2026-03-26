import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { BlogPost } from "@/lib/home-content";

export type BlogPostCardProps = BlogPost & {
  readMoreLabel?: string;
};

export function BlogPostCard({
  title,
  excerpt,
  href,
  date,
  category,
  readMoreLabel = "Read More",
}: BlogPostCardProps) {
  return (
    <article className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-md">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          {category}
        </span>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
      <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary">
        <Link href={href}>{title}</Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {excerpt}
      </p>
      <Link
        href={href}
        className="mt-4 flex items-center gap-1 text-sm font-medium text-foreground"
      >
        {readMoreLabel}
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden
        />
      </Link>
    </article>
  );
}
