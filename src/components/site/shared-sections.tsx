import Image from "next/image";
import type { Locale } from "@/lib/locale";
import { formatCurrency, localize } from "@/lib/locale";
import { LocaleLink } from "@/components/common/locale-link";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { event } from "@/components/common/analytics";
import { HeroScene } from "@/components/site/hero-scene";
import { InquiryForm } from "@/components/site/inquiry-form";
import type {
  CityPage,
  GuidePage,
  Offer,
  ServicePage,
  Vehicle,
} from "@/lib/site-data";
import { navigation, siteConfig, testimonials } from "@/lib/site-data";

export function PageHero({
  locale,
  kicker,
  title,
  body,
}: {
  locale: Locale;
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/6 py-20 sm:py-24">
      <div className="ambient-grid absolute inset-0 opacity-60" />
      <div className="shell relative">
        <div className="mx-auto max-w-4xl text-center">
          <span className="section-kicker">{kicker}</span>
          <h1 className="mt-5 font-display text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
            {body}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {navigation.primary.slice(1, 4).map((item) => (
              <LocaleLink
                key={item.href}
                locale={locale}
                href={item.href}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-[var(--text-muted)] transition hover:border-[var(--border-strong)] hover:text-white"
              >
                {localize(locale, item.label)}
              </LocaleLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeHero({
  locale,
  featuredVehicles,
}: {
  locale: Locale;
  featuredVehicles: Vehicle[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/6 pb-18 pt-12 sm:pb-24 sm:pt-18">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_10%,rgba(243,202,85,0.16),transparent_30%)]" />
      <div className="ambient-grid absolute inset-0 opacity-80" />
      <div className="shell relative">
        <HeroScene>
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-[var(--text-muted)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-bright)]" />
                <span data-hero-copy>
                  {locale === "ar"
                    ? "أسطول اقتصادي ومتوسط بخطاب مؤسسي راقٍ"
                    : "A refined public brand for economy and mid-range rentals"}
                </span>
              </div>
              <div className="space-y-5">
                <p
                  data-hero-copy
                  className="section-kicker"
                >
                  Eagle Car Rental
                </p>
                <h1
                  data-hero-copy
                  className="font-display text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl"
                >
                  {locale === "ar"
                    ? "موقع أنيق يحوّل الزائر إلى عميل بسرعة وثقة."
                    : "A cinematic rental site built to convert with confidence."}
                </h1>
                <p
                  data-hero-copy
                  className="max-w-2xl text-lg leading-8 text-[var(--text-muted)]"
                >
                  {locale === "ar"
                    ? "Eagle Car Rental تجمع بين المظهر الفاخر، وضوح الأسعار العامة، وتحويل الطلبات عبر واتساب ونموذج منظم دون كشف أي بيانات تشغيلية خاصة."
                    : "Eagle Car Rental blends premium brand presence, clear public starting prices, and a fast WhatsApp-led inquiry flow without exposing private operational data."}
                </p>
              </div>
              <div data-hero-copy className="flex flex-wrap items-center gap-3">
                <LocaleLink
                  locale={locale}
                  href="/fleet"
                  className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[var(--accent-bright)]"
                >
                  {locale === "ar" ? "استعرض الأسطول" : "Explore the fleet"}
                </LocaleLink>
                <a
                  href={`https://wa.me/${siteConfig.company.whatsapp.replace(/[^\d]/g, "")}`}
                  onClick={() => event({ action: "click_whatsapp", category: "conversion", label: "hero_direct" })}
                  className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--border-strong)]"
                >
                  {locale === "ar" ? "واتساب الآن" : "WhatsApp now"}
                </a>
              </div>
              <div data-hero-copy className="grid gap-3 sm:grid-cols-3">
                {siteConfig.metrics.map((metric) => (
                  <div
                    key={metric.value}
                    className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4"
                  >
                    <p className="font-display text-2xl font-semibold text-white">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                      {localize(locale, metric.label)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 lg:pl-8">
              <Reveal delay={100}>
                <div
                  data-hero-card
                  data-float="slow"
                  className="gold-ring glass-panel overflow-hidden rounded-[2rem]"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={featuredVehicles[0]?.image ?? "/fleet/14897.png"}
                      alt={featuredVehicles[0] ? localize(locale, featuredVehicles[0].name) : "Eagle"}
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-0 p-6">
                      <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent-bright)]">
                        {locale === "ar" ? "الأكثر حضورًا" : "Signature fleet"}
                      </p>
                      <h2 className="mt-2 font-display text-3xl text-white">
                        {featuredVehicles[0]
                          ? localize(locale, featuredVehicles[0].name)
                          : siteConfig.company.name.en}
                      </h2>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={220}>
                <InquiryForm
                  locale={locale}
                  compact
                  defaultVehicle={featuredVehicles[0] ? localize(locale, featuredVehicles[0].name) : undefined}
                />
              </Reveal>
            </div>
          </div>
        </HeroScene>
      </div>
    </section>
  );
}

export function FleetPreview({
  locale,
  vehicles,
}: {
  locale: Locale;
  vehicles: Vehicle[];
}) {
  return (
    <section className="py-20 sm:py-24">
      <div className="shell space-y-10">
        <SectionHeading
          locale={locale}
          kicker={locale === "ar" ? "الأسطول" : "Fleet"}
          title={
            locale === "ar"
              ? "فئات مصممة للعامة، السفر، والعمل"
              : "Fleet categories for everyday, travel, and business needs"
          }
          body={
            locale === "ar"
              ? "نعرض الفئة العامة والسعر الابتدائي فقط، ثم نوجّه العميل إلى استفسار منظم يحفظ التفاصيل الخاصة داخليًا."
              : "We show only public-ready categories and starting prices, then route serious intent into a structured inquiry flow."
          }
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {vehicles.map((vehicle, index) => (
            <Reveal key={vehicle.slug} delay={index * 80}>
              <article className="gold-ring glass-panel overflow-hidden rounded-[2rem]">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={vehicle.image}
                    alt={localize(locale, vehicle.name)}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                </div>
                <div className="space-y-4 p-6">
                  <div>
                    <p className="text-sm text-[var(--accent-bright)]">
                      {localize(locale, vehicle.badge)}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-white">
                      {localize(locale, vehicle.name)}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                      {localize(locale, vehicle.excerpt)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.highlights.slice(0, 3).map((item) => (
                      <span
                        key={item.en}
                        className="rounded-full border border-white/8 px-3 py-1 text-xs text-[var(--text-muted)]"
                      >
                        {localize(locale, item)}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-white/8 pt-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-subtle)]">
                        {locale === "ar" ? "من" : "From"}
                      </p>
                      <p className="text-xl font-semibold text-white">
                        {formatCurrency(locale, vehicle.dailyFrom)}
                      </p>
                    </div>
                    <LocaleLink
                      locale={locale}
                      href={`/fleet/${vehicle.slug}`}
                      className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
                    >
                      {locale === "ar" ? "عرض المركبة" : "View vehicle"}
                    </LocaleLink>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceGrid({
  locale,
  items,
}: {
  locale: Locale;
  items: ServicePage[];
}) {
  return (
    <section className="border-y border-white/6 bg-white/[0.02] py-20 sm:py-24">
      <div className="shell space-y-10">
        <SectionHeading
          locale={locale}
          kicker={locale === "ar" ? "الخدمات" : "Services"}
          title={
            locale === "ar"
              ? "مسارات واضحة حسب نية العميل"
              : "Clear paths built around customer intent"
          }
          body={
            locale === "ar"
              ? "بدل موقع مزدحم بعناصر كثيرة، نبني مسارات قرار واضحة: اقتصادي، شهري، مطار، وشركات."
              : "Instead of an overloaded rental portal, we build precise customer journeys for economy, monthly, airport, and corporate demand."
          }
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((service, index) => (
            <Reveal key={service.slug} delay={index * 90}>
              <article className="gold-ring glass-panel rounded-[2rem] p-6">
                <p className="section-kicker">{localize(locale, service.name)}</p>
                <h3 className="mt-4 font-display text-3xl text-white">
                  {localize(locale, service.headline)}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                  {localize(locale, service.summary)}
                </p>
                <ul className="mt-6 space-y-3 text-sm text-[var(--text-muted)]">
                  {service.bullets.map((bullet) => (
                    <li key={bullet.en} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                      <span>{localize(locale, bullet)}</span>
                    </li>
                  ))}
                </ul>
                <LocaleLink
                  locale={locale}
                  href={`/services/${service.slug}`}
                  className="mt-8 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-[var(--border-strong)]"
                >
                  {locale === "ar" ? "تفاصيل الخدمة" : "Service details"}
                </LocaleLink>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CityGrid({
  locale,
  items,
}: {
  locale: Locale;
  items: CityPage[];
}) {
  return (
    <section className="py-20 sm:py-24">
      <div className="shell space-y-10">
        <SectionHeading
          locale={locale}
          kicker={locale === "ar" ? "المدن" : "Cities"}
          title={
            locale === "ar"
              ? "صفحات محلية لالتقاط الطلب الحقيقي"
              : "Local landing pages for real regional demand"
          }
          body={
            locale === "ar"
              ? "كل صفحة مدينة تربط نية البحث المحلي بالخدمة المناسبة والـCTA الصحيح دون تعقيد."
              : "Each city page connects local search intent to the right rental service and conversion path without clutter."
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((city, index) => (
            <Reveal key={city.slug} delay={index * 90}>
              <article className="gold-ring glass-panel rounded-[2rem] p-6">
                <p className="section-kicker">{localize(locale, city.name)}</p>
                <h3 className="mt-4 font-display text-3xl text-white">
                  {localize(locale, city.headline)}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                  {localize(locale, city.summary)}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {city.neighborhoods.map((area) => (
                    <span
                      key={area.en}
                      className="rounded-full border border-white/8 px-3 py-1 text-xs text-[var(--text-muted)]"
                    >
                      {localize(locale, area)}
                    </span>
                  ))}
                </div>
                <LocaleLink
                  locale={locale}
                  href={`/cities/${city.slug}`}
                  className="mt-8 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
                >
                  {locale === "ar" ? "عرض المدينة" : "View city"}
                </LocaleLink>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OfferGrid({
  locale,
  items,
}: {
  locale: Locale;
  items: Offer[];
}) {
  return (
    <section className="border-y border-white/6 bg-white/[0.02] py-20 sm:py-24">
      <div className="shell space-y-10">
        <SectionHeading
          locale={locale}
          kicker={locale === "ar" ? "العروض" : "Offers"}
          title={
            locale === "ar"
              ? "عروض عامة ذكية دون كشف التسعير الخاص"
              : "Smart public offers without exposing private commercial pricing"
          }
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((offer, index) => (
            <Reveal key={offer.slug} delay={index * 90}>
              <article className="gold-ring glass-panel rounded-[2rem] p-6">
                <p className="section-kicker">{localize(locale, offer.name)}</p>
                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                  {localize(locale, offer.summary)}
                </p>
                <p className="mt-6 font-display text-4xl text-white">
                  {formatCurrency(locale, offer.priceFrom)}
                </p>
                <p className="text-sm text-[var(--text-subtle)]">
                  {locale === "ar" ? "أسعار تبدأ من يوميًا" : "Starting public daily rate"}
                </p>
                <LocaleLink
                  locale={locale}
                  href="/offers"
                  className="mt-8 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white"
                >
                  {locale === "ar" ? "عرض التفاصيل" : "See offer details"}
                </LocaleLink>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GuideGrid({
  locale,
  items,
}: {
  locale: Locale;
  items: GuidePage[];
}) {
  return (
    <section className="py-20 sm:py-24">
      <div className="shell space-y-10">
        <SectionHeading
          locale={locale}
          kicker={locale === "ar" ? "الأدلة" : "Guides"}
          title={
            locale === "ar"
              ? "محتوى يشرح، يطمئن، ويحسن الظهور"
              : "Content that explains, reassures, and strengthens discoverability"
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((guide, index) => (
            <Reveal key={guide.slug} delay={index * 90}>
              <article className="gold-ring glass-panel rounded-[2rem] p-6">
                <h3 className="font-display text-3xl text-white">
                  {localize(locale, guide.title)}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                  {localize(locale, guide.excerpt)}
                </p>
                <LocaleLink
                  locale={locale}
                  href={`/guides/${guide.slug}`}
                  className="mt-8 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
                >
                  {locale === "ar" ? "اقرأ الدليل" : "Read guide"}
                </LocaleLink>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RequirementBlocks({ locale }: { locale: Locale }) {
  return (
    <section className="border-y border-white/6 bg-white/[0.02] py-20 sm:py-24">
      <div className="shell grid gap-6 lg:grid-cols-2">
        {[siteConfig.requirements.resident, siteConfig.requirements.tourist].map(
          (group, index) => (
            <Reveal key={group.title.en} delay={index * 100}>
              <article className="gold-ring glass-panel rounded-[2rem] p-7">
                <span className="section-kicker">{localize(locale, group.title)}</span>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-[var(--text-muted)]">
                  {group.items.map((item) => (
                    <li key={item.en} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                      <span>{localize(locale, item)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ),
        )}
      </div>
    </section>
  );
}

export function TrustStrip({ locale }: { locale: Locale }) {
  return (
    <section className="py-12">
      <div className="shell grid gap-4 lg:grid-cols-4">
        {siteConfig.socialProof.map((item, index) => (
          <Reveal key={item.label.en} delay={index * 90}>
            <div className="gold-ring glass-panel rounded-[1.6rem] p-5">
              <p className="text-sm text-[var(--text-subtle)]">
                {localize(locale, item.label)}
              </p>
              <p className="mt-3 font-display text-2xl text-white">
                {localize(locale, item.value)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function TestimonialRail({ locale }: { locale: Locale }) {
  return (
    <section className="py-20 sm:py-24">
      <div className="shell space-y-10">
        <SectionHeading
          locale={locale}
          kicker={locale === "ar" ? "الثقة" : "Trust"}
          title={
            locale === "ar"
              ? "واجهة تبني الثقة قبل المكالمة"
              : "A digital surface that builds trust before the call"
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.id} delay={index * 80}>
              <blockquote className="gold-ring glass-panel rounded-[2rem] p-6">
                <p className="text-lg leading-8 text-white">
                  “{localize(locale, item.quote)}”
                </p>
                <footer className="mt-5 text-sm text-[var(--text-muted)]">
                  {localize(locale, item.author)} · {localize(locale, item.role)}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
