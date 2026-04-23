import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/site/inquiry-form";
import { PageHero } from "@/components/site/shared-sections";
import { StructuredData } from "@/components/common/structured-data";
import { isLocale, type Locale, localize } from "@/lib/locale";
import {
  breadcrumbSchema,
  buildMetadata,
  serviceSchema,
} from "@/lib/seo";
import { cityPages, getCityBySlug } from "@/lib/site-data";

export function generateStaticParams() {
  return ["ar", "en"].flatMap((locale) =>
    cityPages.map((city) => ({
      locale,
      slug: city.slug,
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
  const city = getCityBySlug(slug);
  if (!city) return {};

  return buildMetadata({
    locale,
    path: `/cities/${city.slug}`,
    title: localize(locale, city.name),
    description: localize(locale, city.seoDescription),
  });
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const typedLocale = locale as Locale;
  const cityName = localize(typedLocale, city.name);
  const description = localize(typedLocale, city.seoDescription);

  return (
    <>
      <StructuredData
        data={breadcrumbSchema(typedLocale, [
          {
            name: typedLocale === "ar" ? "المدن" : "Cities",
            path: "",
          },
          {
            name: cityName,
            path: `/cities/${city.slug}`,
          },
        ])}
      />
      <StructuredData
        data={serviceSchema({
          name: cityName,
          description,
          locale: typedLocale,
          path: `/cities/${city.slug}`,
        })}
      />
      <PageHero
        locale={typedLocale}
        kicker={cityName}
        title={localize(typedLocale, city.headline)}
        body={localize(typedLocale, city.summary)}
      />
      <section className="py-20 sm:py-24">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="gold-ring glass-panel rounded-[2rem] p-6">
              <h2 className="font-display text-3xl text-white">
                {typedLocale === "ar" ? "المناطق المستهدفة" : "Target zones"}
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {city.neighborhoods.map((area) => (
                  <span
                    key={area.en}
                    className="rounded-full border border-white/8 px-3 py-1 text-sm text-[var(--text-muted)]"
                  >
                    {localize(typedLocale, area)}
                  </span>
                ))}
              </div>
            </div>
            <div className="gold-ring glass-panel rounded-[2rem] p-6">
              <h2 className="font-display text-3xl text-white">
                {typedLocale === "ar" ? "لماذا هذه الصفحة مهمة؟" : "Why this page matters"}
              </h2>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-[var(--text-muted)]">
                {city.benefits.map((item) => (
                  <li key={item.en} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                    <span>{localize(typedLocale, item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <InquiryForm locale={typedLocale} />
        </div>
      </section>
    </>
  );
}
