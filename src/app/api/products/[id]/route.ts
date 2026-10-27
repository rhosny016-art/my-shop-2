import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id, 10);

    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, productId));

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id, 10);
    const body = await req.json();

    const [updated] = await db
      .update(products)
      .set({
        name: body.name,
        nameAr: body.nameAr,
        brand: body.brand,
        condition: body.condition,
        categorySlug: body.categorySlug,
        storage: body.storage,
        color: body.color,
        price: body.price?.toString(),
        originalPrice: body.originalPrice ? body.originalPrice.toString() : null,
        discountPercent: body.discountPercent ? parseInt(body.discountPercent, 10) : null,
        stock: body.stock ? parseInt(body.stock, 10) : undefined,
        imageUrl: body.imageUrl,
        description: body.description,
        descriptionAr: body.descriptionAr,
        warranty: body.warranty,
        isBestSeller: body.isBestSeller,
        isFeatured: body.isFeatured,
      })
      .where(eq(products.id, productId))
      .returning();

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id, 10);

    await db.delete(products).where(eq(products.id, productId));

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
