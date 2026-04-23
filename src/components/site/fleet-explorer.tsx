"use client";

import Image from "next/image";
import { useDeferredValue, useMemo, useState } from "react";
import type { Locale } from "@/lib/locale";
import { formatCurrency } from "@/lib/locale";
import type { Vehicle } from "@/lib/site-data";
import { localize } from "@/lib/locale";
import { LocaleLink } from "@/components/common/locale-link";

export function FleetExplorer({
  locale,
  vehicles,
}: {
  locale: Locale;
  vehicles: Vehicle[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const deferredQuery = useDeferredValue(query);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesCategory = category === "all" || vehicle.category === category;
      const label = `${vehicle.name.ar} ${vehicle.name.en}`.toLowerCase();
      const matchesQuery = label.includes(deferredQuery.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, deferredQuery, vehicles]);

  const categories = [
    { value: "all", label: locale === "ar" ? "الكل" : "All" },
    { value: "economy", label: locale === "ar" ? "اقتصادي" : "Economy" },
    { value: "sedan", label: locale === "ar" ? "سيدان" : "Sedan" },
    { value: "crossover", label: locale === "ar" ? "كروس أوفر" : "Crossover" },
    { value: "family", label: locale === "ar" ? "عائلية" : "Family" },
    { value: "executive", label: locale === "ar" ? "تنفيذي" : "Executive" },
  ];

  return (
    <div className="space-y-8">
      <div className="gold-ring glass-panel grid gap-4 rounded-[2rem] p-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={
            locale === "ar" ? "ابحث بالاسم أو الفئة..." : "Search by model or category..."
          }
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-[var(--text-subtle)]"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setCategory(item.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === item.value
                  ? "bg-[var(--accent)] text-black"
                  : "border border-white/10 text-[var(--text-muted)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredVehicles.map((vehicle) => (
          <article
            key={vehicle.slug}
            className="gold-ring glass-panel overflow-hidden rounded-[2rem]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={vehicle.image}
                alt={localize(locale, vehicle.name)}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
            <div className="space-y-4 p-6">
              <div className="space-y-2">
                <p className="text-sm text-[var(--accent-bright)]">
                  {localize(locale, vehicle.badge)}
                </p>
                <h3 className="font-display text-2xl font-semibold text-white">
                  {localize(locale, vehicle.name)}
                </h3>
                <p className="text-sm leading-7 text-[var(--text-muted)]">
                  {localize(locale, vehicle.excerpt)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-[var(--text-muted)]">
                <div>{vehicle.seats} {locale === "ar" ? "مقاعد" : "Seats"}</div>
                <div>{vehicle.bags} {locale === "ar" ? "حقائب" : "Bags"}</div>
                <div>{localize(locale, vehicle.transmission)}</div>
                <div>{localize(locale, vehicle.fuel)}</div>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-white/8 pt-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-subtle)]">
                    {locale === "ar" ? "يبدأ من" : "Starting from"}
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
                  {locale === "ar" ? "التفاصيل" : "Details"}
                </LocaleLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
