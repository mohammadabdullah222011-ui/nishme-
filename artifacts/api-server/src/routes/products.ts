import { Router } from "express";
import { db, productsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAdmin, requireAuth } from "../middlewares/auth.js";

const router = Router();

// GET /api/products
router.get("/products", async (req, res) => {
  try {
    const products = await db.select().from(productsTable).orderBy(desc(productsTable.createdAt));
    res.json(products);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// GET /api/products/:id
router.get("/products/:id", async (req, res) => {
  try {
    const [product] = await db.select().from(productsTable).where(eq(productsTable.id, Number(req.params.id))).limit(1);
    if (!product) { res.status(404).json({ error: "المنتج غير موجود" }); return; }
    res.json(product);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// POST /api/products (admin only)
router.post("/products", requireAdmin, async (req, res) => {
  try {
    const { name, description, price, imageUrl, stock, category, badge } = req.body;
    if (!name || price === undefined) {
      res.status(400).json({ error: "الاسم والسعر مطلوبان" });
      return;
    }
    const [product] = await db.insert(productsTable).values({
      name,
      description: description || "",
      price: Number(price),
      imageUrl: imageUrl || "",
      stock: Number(stock) || 0,
      category: category || "pc",
      badge: badge || "جديد",
      rating: 5,
      reviews: 0,
    }).returning();
    res.status(201).json(product);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// PUT /api/products/:id (admin)
router.put("/products/:id", requireAdmin, async (req, res) => {
  try {
    const { name, description, price, imageUrl, stock, category, badge } = req.body;
    const [updated] = await db.update(productsTable)
      .set({ name, description, price: Number(price), imageUrl, stock: Number(stock), category, badge })
      .where(eq(productsTable.id, Number(req.params.id)))
      .returning();
    if (!updated) { res.status(404).json({ error: "المنتج غير موجود" }); return; }
    res.json(updated);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// DELETE /api/products/:id (admin)
router.delete("/products/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(productsTable).where(eq(productsTable.id, Number(req.params.id)));
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

export default router;
