import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BlogPostCard } from "@/components/blog-post-card";
import { Button } from "@/components/ui/button";
import { defaultBlogPosts, type BlogPost } from "@/lib/home-content";

export type BlogSectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  posts?: BlogPost[];
  viewAllHref?: string;
  viewAllLabel?: string;
};

export function BlogSection({
  id = "blog",
  title = "Latest from the Blog",
  subtitle = "Tips, tutorials, and insights",
  posts = defaultBlogPosts,
  viewAllHref = "/blog",
  viewAllLabel = "View All Posts",
}: BlogSectionProps) {
  return (
    <section id={id} className="bg-muted/30 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>
          </div>
          <Button variant="outline" asChild>
            <Link href={viewAllHref}>
              {viewAllLabel}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.title} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}
