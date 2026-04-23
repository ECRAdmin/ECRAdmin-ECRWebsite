import { NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity/client";
import { storeBookingLocally } from "@/lib/booking-store";
import { z } from "zod";

const bookingSchema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(6),
  vehicleId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  totalAmount: z.number().optional(),
});

export async function POST(request: Request) {
  try {
    if (!writeClient) {
      return NextResponse.json(
        { error: "Sanity write client not configured." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const result = bookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message ?? "Invalid booking data." },
        { status: 400 },
      );
    }

    const { vehicleId, ...bookingData } = result.data;

    // 1. Check vehicle availability
    const vehicle = await writeClient.fetch(
      `*[_type == "vehicle" && _id == $id][0]`,
      { id: vehicleId }
    );

    if (!vehicle || !vehicle.isAvailable || vehicle.stock <= 0) {
      return NextResponse.json(
        { error: "Vehicle is not available for booking." },
        { status: 400 },
      );
    }

    // 2. Create booking
    const booking = await writeClient.create({
      _type: "booking",
      customerName: bookingData.customerName,
      customerEmail: bookingData.customerEmail,
      customerPhone: bookingData.customerPhone,
      vehicle: {
        _type: "reference",
        _ref: vehicleId,
      },
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      status: "pending",
      paymentStatus: "unpaid",
      totalAmount: bookingData.totalAmount,
    });

    // 3. Store locally and trigger webhook (CRM sync)
    await storeBookingLocally({
      ...bookingData,
      bookingId: booking._id,
      vehicleId,
    });
    
    return NextResponse.json({
      ok: true,
      bookingId: booking._id,
      message: "Booking initiated successfully.",
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Unable to process booking at this time." },
      { status: 500 },
    );
  }
}
