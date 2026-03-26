import { defaultFeatures, type FeatureItem } from "@/lib/home-content";

export type FeaturesSectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  features?: FeatureItem[];
};

export function FeaturesSection({
  id = "about",
  title = "Why Choose SmartFlexa?",
  subtitle = "Built for speed, privacy, and ease of use",
  features = defaultFeatures,
}: FeaturesSectionProps) {
  return (
    <section id={id} className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.name} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                  <Icon className="h-7 w-7 text-foreground" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
