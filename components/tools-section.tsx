import { ToolCard } from "@/components/tool-card";
import { defaultTools, type ToolItem } from "@/lib/home-content";

export type ToolsSectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  tools?: ToolItem[];
};

export function ToolsSection({
  id = "tools",
  title = "Popular Tools",
  subtitle = "Discover our most-used tools to boost your productivity",
  tools = defaultTools,
}: ToolsSectionProps) {
  return (
    <section id={id} className="bg-muted/30 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard key={tool.name} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
