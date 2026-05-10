import bcrypt from "bcryptjs";
import { db, usersTable, productsTable } from "@workspace/db";

async function seed() {
  const adminHash = await bcrypt.hash("admin123", 10);

  await db.insert(usersTable).values({
    name: "مدير نشمي",
    email: "admin@nashmi.com",
    password: adminHash,
    role: "admin",
  }).onConflictDoNothing();

  const products = [
    { name: "ماوس جيمينج احترافي", description: "ماوس جيمينج عالي الأداء بدقة 25600 DPI مع إضاءة RGB قابلة للتخصيص.", price: 299, stock: 15, category: "accessories", imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80", badge: "الأكثر مبيعاً", rating: 4.8, reviews: 342 },
    { name: "كيبورد ميكانيكي RGB", description: "لوحة مفاتيح ميكانيكية بمفاتيح Cherry MX Red للاستجابة الفائقة.", price: 459, stock: 20, category: "accessories", imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80", badge: "جديد", rating: 4.9, reviews: 218 },
    { name: "سماعة جيمينج 7.1", description: "سماعة محيطية 7.1 بإلغاء الضوضاء للغمر الكامل في اللعب.", price: 349, stock: 12, category: "accessories", imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", badge: null, rating: 4.6, reviews: 189 },
    { name: "PlayStation 5 Digital Edition", description: "أحدث جيل من PlayStation بدون قرص وأداء استثنائي.", price: 2299, stock: 3, category: "consoles", imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80", badge: "مطلوب", rating: 4.9, reviews: 520 },
    { name: "Xbox Series X 1TB", description: "أقوى Xbox على الإطلاق بجودة 4K و120fps.", price: 2099, stock: 8, category: "consoles", imageUrl: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&q=80", badge: null, rating: 4.8, reviews: 410 },
    { name: "Nintendo Switch OLED", description: "نينتندو سويتش بشاشة OLED محسّنة وألوان مذهلة.", price: 1199, stock: 10, category: "consoles", imageUrl: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500&q=80", badge: null, rating: 4.7, reviews: 312 },
    { name: "ROG Strix G15 Laptop", description: "لابتوب جيمينج بمعالج Ryzen 9 وكرت GTX 3070 لأقصى أداء.", price: 4899, stock: 5, category: "pc", imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80", badge: "عروض", rating: 4.8, reviews: 156 },
    { name: "Alienware m15 R7", description: "لابتوب Alienware بمعالج Intel Core i9 وشاشة 360Hz.", price: 5499, stock: 4, category: "pc", imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80", badge: null, rating: 4.9, reviews: 98 },
    { name: "شاشة جيمينج 27 بوصة 144Hz", description: "شاشة IPS 27 بوصة 144Hz مع وقت استجابة 1ms.", price: 899, stock: 9, category: "pc", imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80", badge: "عروض", rating: 4.7, reviews: 234 },
    { name: "God of War: Ragnarok", description: "الجزء الأحدث من سلسلة God of War الأسطورية.", price: 199, stock: 50, category: "games", imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&q=80", badge: null, rating: 4.9, reviews: 890 },
    { name: "FIFA 25", description: "أحدث إصدار من أشهر لعبة كرة قدم عالمياً.", price: 179, stock: 40, category: "games", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80", badge: "جديد", rating: 4.5, reviews: 620 },
    { name: "كرسي جيمينج احترافي", description: "كرسي مريح بدعم قطني قابل للتعديل لجلسات الألعاب الطويلة.", price: 549, stock: 14, category: "accessories", imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=80", badge: null, rating: 4.5, reviews: 178 },
  ];

  for (const p of products) {
    await db.insert(productsTable).values(p).onConflictDoNothing();
  }

  console.log("✅ Seed complete: admin + products");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
