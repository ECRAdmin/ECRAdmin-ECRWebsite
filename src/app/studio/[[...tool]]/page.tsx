import type { Metadata } from "next";
import { hasSanityConfig } from "@/lib/sanity/env";

export const metadata: Metadata = {
  title: "Studio",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function StudioPage() {
  if (!hasSanityConfig) {
    return (
      <main className="shell py-20">
        <div className="gold-ring glass-panel mx-auto max-w-3xl rounded-[2rem] p-8">
          <p className="section-kicker">Sanity CMS</p>
          <h1 className="mt-4 font-display text-4xl text-white">
            Studio is scaffolded and ready for configuration.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--text-muted)]">
            Add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`
            to enable the embedded Studio route. The content models are already
            present under `src/sanity/schemaTypes`.
          </p>
        </div>
      </main>
    );
  }

  const [{ NextStudio }, { default: config }] = await Promise.all([
    import("next-sanity/studio"),
    import("../../../../sanity.config"),
  ]);

  return <NextStudio config={config} />;
}
