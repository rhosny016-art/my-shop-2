import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { repairs } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const brand = searchParams.get("brand");
    const model = searchParams.get("model");
    const issueType = searchParams.get("issueType");

    const conditions = [];
    if (brand) conditions.push(eq(repairs.brand, brand));
    if (model) conditions.push(eq(repairs.model, model));
    if (issueType) conditions.push(eq(repairs.issueType, issueType));

    let query = db.select().from(repairs);
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as typeof query;
    }

    const list = await query;
    return NextResponse.json({ success: true, data: list });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
