import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfferGrid, PageHero } from "@/components/site/shared-sections";
import { FaqList } from "@/components/site/faq-list";
import { isLocale, type Locale } from "@/lib/locale";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { faqs, offers } from "@/lib/site-data";
import { StructuredData } from "@/components/common/structured-data";
import { publicFaq } from "@/lib/site-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return buildMetadata({
    locale,
    path: "/offers",
    title: locale === "ar" ? "العروض" : "Offers",
    description:
      locale === "ar"
        ? "عروض عامة تبدأ من وتغطي الفئات الاقتصادية والكروس أوفر والعائلية دون كشف التسعير الخاص."
        : "Public offer groupings across economy, crossover, and family categories without exposing private commercial pricing.",
  });
}

export default async function OffersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;

  return (
    <>
      <StructuredData
        data={faqSchema(
          publicFaq(typedLocale).map((item) => ({
            question: item.question,
            answer: item.answer,
          })),
        )}
      />
      <PageHero
        locale={typedLocale}
        kicker={typedLocale === "ar" ? "العروض" : "Offers"}
        title={
          typedLocale === "ar"
            ? "فئات وعروض عامة للواجهة التسويقية"
            : "Public offer groupings for a cleaner marketing surface"
        }
        body={
          typedLocale === "ar"
            ? "العروض هنا مصاغة لتقود العميل إلى قرار أولي فقط، بينما يبقى التسعير النهائي والسياسات الخاصة داخل القنوات المباشرة."
            : "Offers here are designed to help customers make the first decision, while final pricing and private policies remain inside direct channels."
        }
      />
      <OfferGrid locale={typedLocale} items={offers} />
      <section className="py-20 sm:py-24">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <span className="section-kicker">{typedLocale === "ar" ? "ملاحظة مهمة" : "Important note"}</span>
            <h2 className="font-display text-4xl font-semibold text-white">
              {typedLocale === "ar"
                ? "السعر النهائي يتحدد بعد مراجعة الطلب."
                : "Final pricing is confirmed after inquiry review."}
            </h2>
          </div>
          <FaqList locale={typedLocale} items={faqs.slice(0, 3)} />
        </div>
      </section>
    </>
  );
}
