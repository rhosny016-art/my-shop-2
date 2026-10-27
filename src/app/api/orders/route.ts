import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const list = await db.select().from(orders).orderBy(desc(orders.createdAt));
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
    const orderNumber = "CMD-" + Math.floor(100000 + Math.random() * 900000);

    const [order] = await db
      .insert(orders)
      .values({
        orderNumber,
        customerName: body.customerName,
        customerPhone: body.customerPhone,
        customerAddress: body.customerAddress || "",
        customerCity: body.customerCity || "Alger",
        items: body.items,
        subtotal: body.subtotal.toString(),
        deliveryFee: body.deliveryFee ? body.deliveryFee.toString() : "0",
        totalAmount: body.totalAmount.toString(),
        paymentMethod: body.paymentMethod || "cash_on_delivery",
        notes: body.notes || "",
        status: "nouveau",
      })
      .returning();

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
