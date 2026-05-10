import { db, usersTable, productsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const ADMIN_EMAIL = "admin@nashmi.com";
const ADMIN_PASSWORD = "admin123";

const SEED_PRODUCTS = [
  { name: "شاشة جيمينج 27 بوصة 144Hz", description: "شاشة ألعاب بدقة 1080p مع معدل تحديث 144Hz وزمن استجابة 1ms", price: 899, imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80", stock: 15, category: "pc", badge: "عروض", rating: 4.5, reviews: 234 },
  { name: "كيبورد ميكانيكي RGB احترافي", description: "لوحة مفاتيح ميكانيكية مع إضاءة RGB قابلة للتخصيص", price: 299, imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&q=80", stock: 30, category: "accessories", badge: null, rating: 4.3, reviews: 189 },
  { name: "PlayStation 5", description: "أحدث جهاز ألعاب من سوني مع تقنية DualSense", price: 1899, imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80", stock: 8, category: "consoles", badge: "جديد", rating: 4.9, reviews: 1203 },
  { name: "Xbox Series X", description: "جهاز الألعاب الأقوى من مايكروسوفت", price: 1799, imageUrl: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&q=80", stock: 6, category: "consoles", badge: null, rating: 4.8, reviews: 987 },
  { name: "ماوس جيمينج لاسلكي", description: "ماوس ألعاب لاسلكي بدقة 25600 DPI", price: 249, imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80", stock: 25, category: "accessories", badge: "جديد", rating: 4.6, reviews: 445 },
  { name: "God of War: Ragnarok", description: "استمر رحلة كريتوس واتريوس في عالم الأساطير النوردية", price: 199, imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80", stock: 50, category: "games", badge: null, rating: 4.9, reviews: 890 },
  { name: "FIFA 25", description: "أحدث إصدار من لعبة كرة القدم الأشهر عالمياً", price: 179, imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&q=80", stock: 100, category: "games", badge: "جديد", rating: 4.2, reviews: 620 },
  { name: "كرسي جيمينج احترافي", description: "كرسي مريح مع دعم قطني وأذرع قابلة للتعديل", price: 549, imageUrl: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&q=80", stock: 12, category: "accessories", badge: null, rating: 4.4, reviews: 178 },
  { name: "سماعة جيمينج 7.1 Surround", description: "سماعات رأس بتقنية 7.1 صوت محيطي ومايكروفون مدمج", price: 349, imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", stock: 20, category: "accessories", badge: null, rating: 4.5, reviews: 312 },
  { name: "Nintendo Switch OLED", description: "جهاز نينتندو سويتش بشاشة OLED محسّنة", price: 1299, imageUrl: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500&q=80", stock: 10, category: "consoles", badge: "عروض", rating: 4.7, reviews: 756 },
  { name: "كارت شاشة RTX 4070", description: "بطاقة رسومات NVIDIA GeForce RTX 4070 للألعاب بدقة 4K", price: 2499, imageUrl: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&q=80", stock: 5, category: "pc", badge: "محدود", rating: 4.8, reviews: 543 },
  { name: "Spider-Man 2 PS5", description: "تحفة من Insomniac Games - مغامرة بيتر باركر ومايلز موراليس", price: 189, imageUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&q=80", stock: 35, category: "games", badge: "جديد", rating: 4.9, reviews: 1050 },
];

export async function autoSeed() {
  try {
    // Ensure admin user exists
    const existing = await db.select().from(usersTable).where(eq(usersTable.email, ADMIN_EMAIL)).limit(1);
    if (existing.length === 0) {
      const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
      await db.insert(usersTable).values({
        name: "مدير نشمي",
        email: ADMIN_EMAIL,
        password: hashed,
        role: "admin",
      });
      console.log("[autoSeed] ✅ Admin user created:", ADMIN_EMAIL);
    } else {
      console.log("[autoSeed] ✅ Admin user already exists");
    }

    // Seed products if table is empty
    const productCount = await db.select().from(productsTable).limit(1);
    if (productCount.length === 0) {
      await db.insert(productsTable).values(SEED_PRODUCTS);
      console.log("[autoSeed] ✅ Seeded", SEED_PRODUCTS.length, "products");
    } else {
      console.log("[autoSeed] ✅ Products already exist");
    }
  } catch (err) {
    console.error("[autoSeed] ❌ Seed error:", err);
  }
}
