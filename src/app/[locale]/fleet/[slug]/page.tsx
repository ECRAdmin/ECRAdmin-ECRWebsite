import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/common/structured-data";
import { InquiryForm } from "@/components/site/inquiry-form";
import { BookingForm } from "@/components/site/booking-form";
import { type Locale, formatCurrency, isLocale, localize } from "@/lib/locale";
import {
  breadcrumbSchema,
  buildMetadata,
  productSchema,
} from "@/lib/seo";
import { getVehicleBySlug, vehicles } from "@/lib/site-data";

export function generateStaticParams() {
  return ["ar", "en"].flatMap((locale) =>
    vehicles.map((vehicle) => ({
      locale,
      slug: vehicle.slug,
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

  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return {};

  return buildMetadata({
    locale,
    path: `/fleet/${vehicle.slug}`,
    title: localize(locale, vehicle.name),
    description: localize(locale, vehicle.seoDescription),
    image: vehicle.image,
  });
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const typedLocale = locale as Locale;
  const vehicleName = localize(typedLocale, vehicle.name);
  const description = localize(typedLocale, vehicle.seoDescription);

  return (
    <>
      <StructuredData
        data={breadcrumbSchema(typedLocale, [
          {
            name: typedLocale === "ar" ? "الأسطول" : "Fleet",
            path: "/fleet",
          },
          {
            name: vehicleName,
            path: `/fleet/${vehicle.slug}`,
          },
        ])}
      />
      <StructuredData
        data={productSchema({
          name: vehicleName,
          description,
          image: vehicle.image,
          dailyFrom: vehicle.dailyFrom,
          locale: typedLocale,
          path: `/fleet/${vehicle.slug}`,
        })}
      />
      <section className="border-b border-white/6 py-16 sm:py-20">
        <div className="shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="gold-ring glass-panel overflow-hidden rounded-[2rem]">
            <div className="relative aspect-[16/10]">
              <Image
                src={vehicle.image}
                alt={vehicleName}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            </div>
          </div>
          <div className="space-y-6">
            <span className="section-kicker">{localize(typedLocale, vehicle.badge)}</span>
            <h1 className="font-display text-5xl font-semibold text-white sm:text-6xl">
              {vehicleName}
            </h1>
            <p className="text-lg leading-8 text-[var(--text-muted)]">{description}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="gold-ring glass-panel rounded-[1.5rem] p-5">
                <p className="text-sm text-[var(--text-subtle)]">
                  {typedLocale === "ar" ? "السعر اليومي يبدأ من" : "Daily from"}
                </p>
                <p className="mt-3 font-display text-3xl text-white">
                  {formatCurrency(typedLocale, vehicle.dailyFrom)}
                </p>
              </div>
              <div className="gold-ring glass-panel rounded-[1.5rem] p-5">
                <p className="text-sm text-[var(--text-subtle)]">
                  {typedLocale === "ar" ? "السعر الشهري يبدأ من" : "Monthly from"}
                </p>
                <p className="mt-3 font-display text-3xl text-white">
                  {formatCurrency(typedLocale, vehicle.monthlyFrom)}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-[var(--text-muted)]">
              <div>{vehicle.seats} {typedLocale === "ar" ? "مقاعد" : "Seats"}</div>
              <div>{vehicle.bags} {typedLocale === "ar" ? "حقائب" : "Bags"}</div>
              <div>{localize(typedLocale, vehicle.transmission)}</div>
              <div>{localize(typedLocale, vehicle.fuel)}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {vehicle.useCases.map((item) => (
                <span
                  key={item.en}
                  className="rounded-full border border-white/8 px-3 py-1 text-xs text-[var(--text-muted)]"
                >
                  {localize(typedLocale, item)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20 bg-white/5">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <span className="section-kicker">
              {typedLocale === "ar" ? "حجز فوري" : "Instant booking"}
            </span>
            <h2 className="font-display text-4xl font-semibold text-white">
              {typedLocale === "ar"
                ? "احجز عبر الموقع الآن"
                : "Book online now"}
            </h2>
            <p className="text-lg leading-8 text-[var(--text-muted)]">
              {typedLocale === "ar"
                ? "وفر الوقت واحجز مركبتك مباشرة. سنقوم بمعالجة طلبك وتأكيد الدفع والتوصيل فورًا."
                : "Save time and book your vehicle directly. We will process your request and confirm payment and delivery immediately."}
            </p>
          </div>
          <BookingForm 
            locale={typedLocale} 
            vehicleId={vehicle.id} 
            vehicleName={vehicleName}
            dailyPrice={vehicle.dailyFrom}
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <span className="section-kicker">
              {typedLocale === "ar" ? "استفسار واتساب" : "WhatsApp inquiry"}
            </span>
            <h2 className="font-display text-4xl font-semibold text-white">
              {typedLocale === "ar"
                ? "أو تواصل معنا عبر واتساب"
                : "Or reach out via WhatsApp"}
            </h2>
            <p className="text-lg leading-8 text-[var(--text-muted)]">
              {typedLocale === "ar"
                ? "إذا كنت تفضل التحدث مع فريقنا مباشرة أو لديك متطلبات خاصة."
                : "If you prefer to speak with our team directly or have special requirements."}
            </p>
          </div>
          <InquiryForm locale={typedLocale} defaultVehicle={vehicleName} />
        </div>
      </section>
    </>
  );
}
