/**
 * Placeholder layout while `HomeSearchTools` (useSearchParams) streams in.
 * Reserves vertical space so content below (e.g. #about) does not jump (CLS).
 */
export function HomeSearchToolsSkeleton() {
  return (
    <div
      className="pointer-events-none animate-pulse select-none"
      aria-busy="true"
      aria-label="Loading tools and search"
    >
      <section className="bg-background py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <div className="mx-auto h-12 w-full max-w-2xl rounded-lg bg-muted sm:h-14" />
            <div className="mx-auto h-20 max-w-2xl rounded-lg bg-muted/80" />
            <div className="mx-auto h-12 max-w-xl rounded-lg bg-muted" />
          </div>
        </div>
      </section>
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 h-9 max-w-xs rounded-lg bg-muted sm:mx-0" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[200px] rounded-xl border border-border bg-card"
              />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 h-9 max-w-xs rounded-lg bg-muted sm:mx-0" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-[220px] rounded-xl border border-border bg-card"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
