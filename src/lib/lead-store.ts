import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

export const inquirySchema = z.object({
  locale: z.enum(["ar", "en"]),
  name: z.string().min(2).max(120),
  mobile: z.string().min(6).max(30),
  whatsapp: z.string().min(6).max(30),
  residencyType: z.enum(["resident", "tourist"]),
  pickupCity: z.string().min(2).max(80),
  rentalTerm: z.enum(["daily", "weekly", "monthly", "custom"]),
  preferredCar: z.string().min(2).max(120),
  budgetBand: z.string().min(2).max(120),
  preferredDate: z.string().min(2).max(40),
  notes: z.string().max(1200).optional().default(""),
  consent: z.literal(true),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

const storageDir = path.join(process.cwd(), "data");
const storageFile = path.join(storageDir, "submissions.ndjson");

export async function storeInquiry(data: InquiryInput) {
  await mkdir(storageDir, { recursive: true });
  const payload = {
    ...data,
    createdAt: new Date().toISOString(),
  };

  await appendFile(storageFile, `${JSON.stringify(payload)}\n`, "utf8");

  if (process.env.LEAD_WEBHOOK_URL) {
    await fetch(process.env.LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }).catch(() => null);
  }

  return payload;
}
