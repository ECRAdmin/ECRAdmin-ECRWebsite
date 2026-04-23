import { NextResponse } from "next/server";
import { getPublicFleet } from "@/lib/public-data";
import { isLocale } from "@/lib/locale";

function noIndexHeaders() {
  return {
    "X-Robots-Tag": "noindex, nofollow",
    "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const localeParam = searchParams.get("locale") ?? "en";
  const locale = isLocale(localeParam) ? localeParam : "en";

  return NextResponse.json(getPublicFleet(locale), {
    headers: noIndexHeaders(),
  });
}
