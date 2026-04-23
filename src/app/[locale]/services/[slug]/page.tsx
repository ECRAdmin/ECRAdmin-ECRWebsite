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
import { getServiceBySlug, services } from "@/lib/site-data";

export function generateStaticParams() {
  return ["ar", "en"].flatMap((locale) =>
    services.map((service) => ({
      locale,
      slug: service.slug,
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
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    locale,
    path: `/services/${service.slug}`,
    title: localize(locale, service.name),
    description: localize(locale, service.summary),
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const typedLocale = locale as Locale;
  const title = localize(typedLocale, service.name);
  const description = localize(typedLocale, service.summary);

  return (
    <>
      <StructuredData
        data={breadcrumbSchema(typedLocale, [
          {
            name: typedLocale === "ar" ? "الخدمات" : "Services",
            path: "/fleet",
          },
          {
            name: title,
            path: `/services/${service.slug}`,
          },
        ])}
      />
      <StructuredData
        data={serviceSchema({
          name: title,
          description,
          locale: typedLocale,
          path: `/services/${service.slug}`,
        })}
      />
      <PageHero
        locale={typedLocale}
        kicker={title}
        title={localize(typedLocale, service.headline)}
        body={description}
      />
      <section className="py-20 sm:py-24">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            {service.body.map((paragraph) => (
              <p
                key={paragraph.en}
                className="text-lg leading-8 text-[var(--text-muted)]"
              >
                {localize(typedLocale, paragraph)}
              </p>
            ))}
            <div className="gold-ring glass-panel rounded-[2rem] p-6">
              <ul className="space-y-4 text-sm leading-7 text-[var(--text-muted)]">
                {service.bullets.map((bullet) => (
                  <li key={bullet.en} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                    <span>{localize(typedLocale, bullet)}</span>
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
