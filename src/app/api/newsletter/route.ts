import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Email invalide" },
        { status: 400 }
      );
    }

    try {
      await db.insert(newsletterSubscribers).values({ email });
    } catch {
      // Ignore unique constraint error if already subscribed
    }

    return NextResponse.json({ success: true, message: "Inscription réussie !" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
