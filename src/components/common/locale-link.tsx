"use client";

import Link from "next/link";
import type { Locale } from "@/lib/locale";
import { toLocalizedPath } from "@/lib/locale";

export function LocaleLink({
  locale,
  href,
  children,
  className,
}: {
  locale: Locale;
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={toLocalizedPath(locale, href)} className={className}>
      {children}
    </Link>
  );
}
