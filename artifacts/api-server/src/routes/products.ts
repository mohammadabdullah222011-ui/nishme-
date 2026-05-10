import { Router } from "express";
import { db } from "../lib/database.js";
import { requireAdmin, requireAuth } from "../middlewares/auth.js";

const router = Router();

// GET /api/products
router.get("/products", async (req, res) => {
  try {
    const products = db.getProducts();
    res.json(products);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// GET /api/products/:id
router.get("/products/:id", async (req, res) => {
  try {
    const product = db.getProductById(Number(req.params.id));
    if (!product) { res.status(404).json({ error: "المنتج غير موجود" }); return; }
    res.json(product);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// POST /api/products (admin only)
router.post("/products", async (req, res) => {
  try {
    console.log("طلب إضافة منتج جديد:", req.body);
    const { name, description, price, imageUrl, stock, category, badge } = req.body;
    
    if (!name || price === undefined) {
      console.log("خطأ: الاسم والسعر مطلوبان");
      res.status(400).json({ error: "الاسم والسعر مطلوبان" });
      return;
    }
    
    const productData = {
      name,
      description: description || "",
      price: Number(price),
      imageUrl: imageUrl || "",
      stock: Number(stock) || 0,
      category: category || "pc",
      badge: badge || "جديد",
    };
    
    console.log("البيانات التي سيتم حفظها:", productData);
    const product = db.createProduct(productData);
    console.log("المنتج تم حفظه في قاعدة البيانات:", product);
    
    console.log("إرسال استجابة بالمنتج المضاف:", product);
    res.status(201).json(product);
  } catch (error) {
    console.error("خطأ في حفظ المنتج:", error);
    console.log("فشل إرسال الاستجابة للعميل");
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// PUT /api/products/:id 
router.put("/products/:id", async (req, res) => {
  try {
    const { name, description, price, imageUrl, stock, category, badge } = req.body;
    const updated = db.updateProduct(Number(req.params.id), {
      name,
      description,
      price: Number(price),
      imageUrl,
      stock: Number(stock),
      category,
      badge,
    });
    if (!updated) { res.status(404).json({ error: "المنتج غير موجود" }); return; }
    res.json(updated);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// DELETE /api/products/:id 
router.delete("/products/:id", async (req, res) => {
  try {
    const success = db.deleteProduct(Number(req.params.id));
    if (!success) { res.status(404).json({ error: "المنتج غير موجود" }); return; }
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

export default router;
