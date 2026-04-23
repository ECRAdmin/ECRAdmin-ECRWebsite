import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/common/structured-data";
import { FaqList } from "@/components/site/faq-list";
import {
  CityGrid,
  FleetPreview,
  GuideGrid,
  HomeHero,
  OfferGrid,
  RequirementBlocks,
  ServiceGrid,
  TestimonialRail,
  TrustStrip,
} from "@/components/site/shared-sections";
import { isLocale, type Locale } from "@/lib/locale";
import {
  cityPages,
  faqs,
  guides,
  offers,
  services,
  vehicles,
} from "@/lib/site-data";
import {
  buildMetadata,
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return buildMetadata({
    locale,
    path: "",
    title:
      locale === "ar"
        ? "النسر لتأجير السيارات"
        : "Eagle Car Rental",
    description:
      locale === "ar"
        ? "موقع ثنائي اللغة لتأجير السيارات في الإمارات مع أسطول اقتصادي ومتوسط، أسعار تبدأ من، وطلب سريع عبر واتساب."
        : "A bilingual car rental website for the UAE with economy and mid-range fleet options, public starting prices, and fast WhatsApp conversion.",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;

  return (
    <>
      <StructuredData data={organizationSchema()} />
      <StructuredData data={websiteSchema()} />
      <StructuredData data={localBusinessSchema()} />
      <HomeHero locale={typedLocale} featuredVehicles={vehicles.slice(0, 3)} />
      <TrustStrip locale={typedLocale} />
      <FleetPreview locale={typedLocale} vehicles={vehicles.slice(0, 6)} />
      <ServiceGrid locale={typedLocale} items={services} />
      <CityGrid locale={typedLocale} items={cityPages} />
      <OfferGrid locale={typedLocale} items={offers} />
      <RequirementBlocks locale={typedLocale} />
      <GuideGrid locale={typedLocale} items={guides} />
      <TestimonialRail locale={typedLocale} />
      <section className="py-20 sm:py-24">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <span className="section-kicker">
              {typedLocale === "ar" ? "الأسئلة الشائعة" : "FAQ"}
            </span>
            <h2 className="font-display text-4xl font-semibold text-white sm:text-5xl">
              {typedLocale === "ar"
                ? "إجابات واضحة قبل التواصل"
                : "Clear answers before the inquiry"}
            </h2>
            <p className="text-lg leading-8 text-[var(--text-muted)]">
              {typedLocale === "ar"
                ? "الهدف أن يجد العميل كل ما يحتاجه لاتخاذ القرار الأولي دون إغراقه أو كشف تفاصيل خاصة."
                : "The goal is to let customers find what they need to make the first decision without clutter or exposing private details."}
            </p>
          </div>
          <FaqList locale={typedLocale} items={faqs.slice(0, 4)} />
        </div>
      </section>
    </>
  );
}
