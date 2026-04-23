import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/common/structured-data";
import { FaqList } from "@/components/site/faq-list";
import { PageHero, RequirementBlocks } from "@/components/site/shared-sections";
import { faqSchema, buildMetadata } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/locale";
import { faqs, publicFaq } from "@/lib/site-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return buildMetadata({
    locale,
    path: "/faq",
    title: locale === "ar" ? "الأسئلة الشائعة" : "FAQ",
    description:
      locale === "ar"
        ? "إجابات واضحة حول الوثائق المطلوبة، الأسعار التي تبدأ من، والإيجار اليومي والشهري والتوصيل."
        : "Clear answers around documents, starting prices, daily and monthly rental, and delivery coordination.",
  });
}

export default async function FaqPage({
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
        kicker={typedLocale === "ar" ? "الأسئلة الشائعة" : "FAQ"}
        title={
          typedLocale === "ar"
            ? "كل ما يحتاجه العميل قبل إرسال الطلب"
            : "Everything customers need before submitting an inquiry"
        }
        body={
          typedLocale === "ar"
            ? "هذا القسم يوضح الوثائق، آلية الأسعار العامة، وكيفية عمل الإيجار والتوصيل من غير نشر أي بيانات تشغيلية خاصة."
            : "This section explains documents, public pricing logic, and how rental and delivery work without exposing private operational data."
        }
      />
      <section className="py-20 sm:py-24">
        <div className="shell">
          <FaqList locale={typedLocale} items={faqs} />
        </div>
      </section>
      <RequirementBlocks locale={typedLocale} />
    </>
  );
}
