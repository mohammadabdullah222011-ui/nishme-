import bcrypt from "bcryptjs";
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seed() {
  const adminHash = await bcrypt.hash("admin123", 10);

  // Insert admin user
  await pool.query(`
    INSERT INTO users (name, email, password, role)
    VALUES ('مدير نشمي', 'admin@nashmi.com', $1, 'admin')
    ON CONFLICT (email) DO NOTHING
  `, [adminHash]);

  // Insert products
  const products = [
    { name: "ماوس جيمينج احترافي", desc: "ماوس جيمينج عالي الأداء بدقة 25600 DPI مع إضاءة RGB قابلة للتخصيص.", price: 299, stock: 15, cat: "accessories", img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80", badge: "الأكثر مبيعاً", rating: 4.8, reviews: 342 },
    { name: "كيبورد ميكانيكي RGB", desc: "لوحة مفاتيح ميكانيكية بمفاتيح Cherry MX Red للاستجابة الفائقة السرعة.", price: 459, stock: 20, cat: "accessories", img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80", badge: "جديد", rating: 4.9, reviews: 218 },
    { name: "سماعة جيمينج 7.1", desc: "سماعة محيطية 7.1 بإلغاء الضوضاء للغمر الكامل في عالم الألعاب.", price: 349, stock: 12, cat: "accessories", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", badge: null, rating: 4.6, reviews: 189 },
    { name: "PlayStation 5 Digital Edition", desc: "أحدث جيل من PlayStation بدون قرص وأداء استثنائي.", price: 2299, stock: 3, cat: "consoles", img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80", badge: "مطلوب", rating: 4.9, reviews: 520 },
    { name: "Xbox Series X 1TB", desc: "أقوى Xbox على الإطلاق بجودة 4K و120fps.", price: 2099, stock: 8, cat: "consoles", img: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&q=80", badge: null, rating: 4.8, reviews: 410 },
    { name: "Nintendo Switch OLED", desc: "نينتندو سويتش بشاشة OLED محسّنة وألوان مذهلة.", price: 1199, stock: 10, cat: "consoles", img: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500&q=80", badge: null, rating: 4.7, reviews: 312 },
    { name: "ROG Strix G15 Laptop", desc: "لابتوب جيمينج بمعالج Ryzen 9 وكرت GTX 3070 لأقصى أداء.", price: 4899, stock: 5, cat: "pc", img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80", badge: "عروض", rating: 4.8, reviews: 156 },
    { name: "Alienware m15 R7", desc: "لابتوب Alienware بمعالج Intel Core i9 وشاشة 360Hz.", price: 5499, stock: 4, cat: "pc", img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80", badge: null, rating: 4.9, reviews: 98 },
    { name: "God of War: Ragnarok", desc: "الجزء الأحدث من سلسلة God of War الأسطورية.", price: 199, stock: 50, cat: "games", img: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&q=80", badge: null, rating: 4.9, reviews: 890 },
    { name: "FIFA 25", desc: "أحدث إصدار من أشهر لعبة كرة قدم عالمياً.", price: 179, stock: 40, cat: "games", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80", badge: "جديد", rating: 4.5, reviews: 620 },
    { name: "شاشة جيمينج 27 بوصة 144Hz", desc: "شاشة IPS 27 بوصة 144Hz مع وقت استجابة 1ms.", price: 899, stock: 9, cat: "pc", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80", badge: "عروض", rating: 4.7, reviews: 234 },
    { name: "كرسي جيمينج احترافي", desc: "كرسي مريح بدعم قطني قابل للتعديل لجلسات الألعاب الطويلة.", price: 549, stock: 14, cat: "accessories", img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=80", badge: null, rating: 4.5, reviews: 178 },
  ];

  for (const p of products) {
    await pool.query(`
      INSERT INTO products (name, description, price, stock, category, image_url, badge, rating, reviews)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT DO NOTHING
    `, [p.name, p.desc, p.price, p.stock, p.cat, p.img, p.badge, p.rating, p.reviews]);
  }

  console.log("✅ Seeded: admin user + products");
  await pool.end();
}

seed().catch(console.error);
