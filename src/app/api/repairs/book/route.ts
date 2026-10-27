import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { repairBookings } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const list = await db
      .select()
      .from(repairBookings)
      .orderBy(desc(repairBookings.createdAt));
    return NextResponse.json({ success: true, data: list });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const bookingNumber = "REP-" + Math.floor(100000 + Math.random() * 900000);

    const [booking] = await db
      .insert(repairBookings)
      .values({
        bookingNumber,
        customerName: body.customerName,
        customerPhone: body.customerPhone,
        customerCity: body.customerCity || "Alger",
        deviceBrand: body.deviceBrand,
        deviceModel: body.deviceModel,
        issueType: body.issueType,
        preferredDate: body.preferredDate || new Date().toISOString().split("T")[0],
        preferredTime: body.preferredTime || "14:00",
        notes: body.notes || "",
        status: "en_attente",
        estimatedPrice: body.estimatedPrice ? body.estimatedPrice.toString() : null,
      })
      .returning();

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
