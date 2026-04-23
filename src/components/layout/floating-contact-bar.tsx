import type { Locale } from "@/lib/locale";
import { siteConfig } from "@/lib/site-data";

export function FloatingContactBar({ locale }: { locale: Locale }) {
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 md:hidden">
      <div className="gold-ring glass-panel grid grid-cols-2 gap-2 rounded-3xl p-2">
        <a
          href={`https://wa.me/${siteConfig.company.whatsapp.replace(/[^\d]/g, "")}`}
          className="rounded-2xl bg-[var(--accent)] px-4 py-3 text-center text-sm font-semibold text-black"
        >
          {locale === "ar" ? "واتساب" : "WhatsApp"}
        </a>
        <a
          href={`tel:${siteConfig.company.phone}`}
          className="rounded-2xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-white"
        >
          {locale === "ar" ? "اتصال" : "Call"}
        </a>
      </div>
    </div>
  );
}
