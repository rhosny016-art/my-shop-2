import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, ilike, or, and, desc, asc, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const condition = searchParams.get("condition");
    const brand = searchParams.get("brand");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    const featured = searchParams.get("featured");
    const bestSeller = searchParams.get("best_seller");
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const conditions = [];

    if (category) {
      conditions.push(eq(products.categorySlug, category));
    }
    if (condition) {
      conditions.push(eq(products.condition, condition));
    }
    if (brand) {
      conditions.push(eq(products.brand, brand));
    }
    if (featured === "true") {
      conditions.push(eq(products.isFeatured, true));
    }
    if (bestSeller === "true") {
      conditions.push(eq(products.isBestSeller, true));
    }
    if (search) {
      conditions.push(
        or(
          ilike(products.name, `%${search}%`),
          ilike(products.brand, `%${search}%`),
          ilike(products.description, `%${search}%`)
        )
      );
    }

    let query = db.select().from(products);

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as typeof query;
    }

    if (sort === "price_asc") {
      query = query.orderBy(asc(products.price)) as typeof query;
    } else if (sort === "price_desc") {
      query = query.orderBy(desc(products.price)) as typeof query;
    } else if (sort === "rating") {
      query = query.orderBy(desc(products.rating)) as typeof query;
    } else {
      query = query.orderBy(desc(products.id)) as typeof query;
    }

    const result = await query.limit(limit);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Products error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now();

    const [newProduct] = await db
      .insert(products)
      .values({
        name: body.name,
        nameAr: body.nameAr || body.name,
        slug,
        categorySlug: body.categorySlug || "smartphones-neufs",
        brand: body.brand || "TechNova",
        condition: body.condition || "neuf",
        storage: body.storage || "128 Go",
        color: body.color || "Standard",
        price: body.price.toString(),
        originalPrice: body.originalPrice ? body.originalPrice.toString() : null,
        discountPercent: body.discountPercent ? parseInt(body.discountPercent, 10) : null,
        rating: "5.0",
        reviewCount: 1,
        stock: parseInt(body.stock || "10", 10),
        imageUrl: body.imageUrl || "/images/category-smartphones.png",
        description: body.description || "",
        descriptionAr: body.descriptionAr || "",
        specs: body.specs || {},
        batteryHealth: body.batteryHealth || "100%",
        warranty: body.warranty || "12 mois",
        isBestSeller: Boolean(body.isBestSeller),
        isFeatured: Boolean(body.isFeatured),
      })
      .returning();

    return NextResponse.json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
