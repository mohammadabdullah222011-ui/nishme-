import { Router } from "express";
import { db } from "../lib/database.js";
import { requireAdmin } from "../middlewares/auth.js";

const router = Router();

router.get("/products", async (_req, res) => {
  try {
    const products = db.getProducts();
    res.json(products);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = db.getProductById(Number(req.params.id));
    if (!product) { res.status(404).json({ error: "المنتج غير موجود" }); return; }
    res.json(product);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

router.post("/products", requireAdmin, async (req, res) => {
  try {
    const { name, description, price, imageUrl, stock, category, badge } = req.body;
    if (!name || price === undefined) {
      res.status(400).json({ error: "الاسم والسعر مطلوبان" });
      return;
    }
    const product = db.createProduct({
      name,
      description: description || "",
      price: Number(price),
      imageUrl: imageUrl || "",
      stock: Number(stock) || 0,
      category: category || "pc",
      badge: badge || "جديد",
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("خطأ في حفظ المنتج:", error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

router.put("/products/:id", requireAdmin, async (req, res) => {
  try {
    const { name, description, price, imageUrl, stock, category, badge } = req.body;
    const updated = db.updateProduct(Number(req.params.id), {
      name, description, price: Number(price), imageUrl, stock: Number(stock), category, badge,
    });
    if (!updated) { res.status(404).json({ error: "المنتج غير موجود" }); return; }
    res.json(updated);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

router.delete("/products/:id", requireAdmin, async (req, res) => {
  try {
    const success = db.deleteProduct(Number(req.params.id));
    if (!success) { res.status(404).json({ error: "المنتج غير موجود" }); return; }
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

export default router;
