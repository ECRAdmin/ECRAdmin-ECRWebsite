import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export async function storeBookingLocally(data: any) {
  const storageDir = path.join(process.cwd(), "data");
  const storageFile = path.join(storageDir, "bookings.ndjson");
  
  await mkdir(storageDir, { recursive: true });
  const payload = {
    ...data,
    createdAt: new Date().toISOString(),
  };

  await appendFile(storageFile, `${JSON.stringify(payload)}\n`, "utf8");

  if (process.env.BOOKING_WEBHOOK_URL) {
    await fetch(process.env.BOOKING_WEBHOOK_URL, {
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
