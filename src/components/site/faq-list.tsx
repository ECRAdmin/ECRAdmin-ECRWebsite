import type { Locale } from "@/lib/locale";
import { localize } from "@/lib/locale";
import type { FaqItem } from "@/lib/site-data";

export function FaqList({
  locale,
  items,
}: {
  locale: Locale;
  items: FaqItem[];
}) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <details
          key={item.id}
          className="gold-ring glass-panel rounded-3xl p-6 transition open:border-[var(--border-strong)]"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-semibold text-white">
            <span>{localize(locale, item.question)}</span>
            <span className="text-[var(--accent-bright)]">+</span>
          </summary>
          <p className="mt-4 leading-8 text-[var(--text-muted)]">
            {localize(locale, item.answer)}
          </p>
        </details>
      ))}
    </div>
  );
}
