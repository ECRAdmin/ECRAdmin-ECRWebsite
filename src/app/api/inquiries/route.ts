import { NextResponse } from "next/server";
import { inquirySchema, storeInquiry } from "@/lib/lead-store";
import { buildInquiryMessage } from "@/lib/site-data";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = inquirySchema.safeParse({
      ...body,
      consent: body.consent === true || body.consent === "true",
    });

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error.issues[0]?.message ?? "Invalid inquiry payload.",
        },
        { status: 400 },
      );
    }

    const stored = await storeInquiry(result.data);

    return NextResponse.json({
      ok: true,
      inquiry: stored,
      whatsappUrl: buildInquiryMessage(result.data.locale, result.data.preferredCar),
    });
  } catch {
    return NextResponse.json(
      {
        error: "Unable to process inquiry right now.",
      },
      { status: 500 },
    );
  }
}
