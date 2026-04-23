import type { Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";

export function SectionHeading({
  locale,
  kicker,
  title,
  body,
  align = "start",
}: {
  locale: Locale;
  kicker?: string;
  title: string;
  body?: string;
  align?: "start" | "center";
}) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-3xl flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        locale === "ar" ? "sm:text-right" : "sm:text-left",
      )}
    >
      {kicker ? <span className="section-kicker">{kicker}</span> : null}
      <h2 className="font-display text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {body ? (
        <p className="max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
          {body}
        </p>
      ) : null}
    </div>
  );
}
