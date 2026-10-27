import { pgTable, serial, text, numeric, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  itemCount: integer("item_count").default(0),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar"),
  slug: text("slug").notNull().unique(),
  categorySlug: text("category_slug").notNull(),
  brand: text("brand").notNull(),
  condition: text("condition").notNull().default("neuf"), // 'neuf', 'occasion_grade_a', 'occasion_grade_b'
  storage: text("storage"),
  color: text("color"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: numeric("original_price", { precision: 10, scale: 2 }),
  discountPercent: integer("discount_percent"),
  rating: numeric("rating", { precision: 3, scale: 1 }).default("4.9"),
  reviewCount: integer("review_count").default(120),
  stock: integer("stock").default(15),
  imageUrl: text("image_url").notNull(),
  description: text("description"),
  descriptionAr: text("description_ar"),
  specs: jsonb("specs").$type<Record<string, string>>(),
  batteryHealth: text("battery_health"),
  warranty: text("warranty").default("12 mois de garantie"),
  isBestSeller: boolean("is_best_seller").default(false),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const repairs = pgTable("repairs", {
  id: serial("id").primaryKey(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  issueType: text("issue_type").notNull(),
  issueName: text("issue_name").notNull(),
  issueNameAr: text("issue_name_ar"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  durationMinutes: integer("duration_minutes").default(30),
  warrantyMonths: integer("warranty_months").default(6),
  partQuality: text("part_quality").default("Pièce d'origine"),
});

export const repairBookings = pgTable("repair_bookings", {
  id: serial("id").primaryKey(),
  bookingNumber: text("booking_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerCity: text("customer_city"),
  deviceBrand: text("device_brand").notNull(),
  deviceModel: text("device_model").notNull(),
  issueType: text("issue_type").notNull(),
  preferredDate: text("preferred_date"),
  preferredTime: text("preferred_time"),
  notes: text("notes"),
  status: text("status").default("en_attente"), // 'en_attente', 'confirme', 'en_atelier', 'termine'
  estimatedPrice: numeric("estimated_price", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerAddress: text("customer_address").notNull(),
  customerCity: text("customer_city").notNull(),
  items: jsonb("items").notNull().$type<Array<{
    id: number;
    name: string;
    condition: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }>>(),
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
  deliveryFee: numeric("delivery_fee", { precision: 10, scale: 2 }).default("0"),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text("payment_method").default("cash_on_delivery"),
  status: text("status").default("nouveau"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});
