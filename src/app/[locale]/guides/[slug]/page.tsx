import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/shared-sections";
import { StructuredData } from "@/components/common/structured-data";
import { isLocale, type Locale, localize } from "@/lib/locale";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { getGuideBySlug, guides } from "@/lib/site-data";

export function generateStaticParams() {
  return ["ar", "en"].flatMap((locale) =>
    guides.map((guide) => ({
      locale,
      slug: guide.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return buildMetadata({
    locale,
    path: `/guides/${guide.slug}`,
    title: localize(locale, guide.title),
    description: localize(locale, guide.excerpt),
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const typedLocale = locale as Locale;
  const title = localize(typedLocale, guide.title);

  return (
    <>
      <StructuredData
        data={breadcrumbSchema(typedLocale, [
          {
            name: typedLocale === "ar" ? "الأدلة" : "Guides",
            path: "",
          },
          {
            name: title,
            path: `/guides/${guide.slug}`,
          },
        ])}
      />
      <PageHero
        locale={typedLocale}
        kicker={typedLocale === "ar" ? "دليل" : "Guide"}
        title={title}
        body={localize(typedLocale, guide.excerpt)}
      />
      <section className="py-20 sm:py-24">
        <div className="shell max-w-4xl space-y-6">
          {guide.body.map((paragraph) => (
            <div key={paragraph.en} className="gold-ring glass-panel rounded-[2rem] p-7">
              <p className="text-lg leading-8 text-[var(--text-muted)]">
                {localize(typedLocale, paragraph)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
