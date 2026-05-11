import { Router } from "express";
import { db } from "../lib/database.js";
import { requireAdmin } from "../middlewares/auth.js";

const router = Router();

// POST /api/orders (public - store checkout)
router.post("/orders", async (req, res) => {
  try {
    const { items, phone, customerName, address } = req.body as { items: { product_id: number; quantity: number }[]; phone?: string; customerName?: string; address?: string };
    if (!items?.length) {
      res.status(400).json({ error: "الطلب فارغ" });
      return;
    }

    let total = 0;
    const enrichedItems: { product_id: number; quantity: number; price: number }[] = [];
    for (const item of items) {
      const product = db.getProductById(item.product_id);
      if (!product) continue;
      enrichedItems.push({ product_id: item.product_id, quantity: item.quantity, price: product.price });
      total += product.price * item.quantity;
    }

    const orderItems = enrichedItems.map(item => {
      const product = db.getProductById(item.product_id);
      return {
        productId: item.product_id,
        name: product?.name || `منتج #${item.product_id}`,
        price: item.price,
        quantity: item.quantity,
        imageUrl: product?.imageUrl || "",
      };
    });

    const order = db.createOrder({
      userId: null,
      total,
      customerName: customerName?.trim() || "عميل",
      phone: phone?.trim() || "",
      address: address?.trim() || "",
      items: orderItems,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// GET /api/orders/my (public - demo, returns all)
router.get("/orders/my", async (_req, res) => {
  try {
    const orders = db.getOrders();
    res.json(orders);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// POST /api/orders/manual (admin)
router.post("/orders/manual", requireAdmin, async (req, res) => {
  try {
    const { customerName, total, status, items, phone, address } = req.body as { customerName: string; total: number; status: string; items?: { productId: number; name: string; price: number; quantity: number; imageUrl: string }[]; phone?: string; address?: string };
    if (!customerName || total === undefined) {
      res.status(400).json({ error: "اسم العميل والمبلغ مطلوبان" });
      return;
    }
    const order = db.createOrder({
      userId: null,
      total: Number(total),
      status: status || "pending",
      customerName,
      phone: phone || "",
      address: address || "",
      items: items || [],
    });
    res.status(201).json(order);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// GET /api/orders (admin)
router.get("/orders", requireAdmin, async (_req, res) => {
  try {
    const orders = db.getOrders();
    res.json(orders);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// GET /api/orders/:id (admin)
router.get("/orders/:id", requireAdmin, async (req, res) => {
  try {
    const order = db.getOrderById(Number(req.params.id));
    if (!order) { res.status(404).json({ error: "الطلب غير موجود" }); return; }
    res.json(order);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// PUT /api/orders/:id/status (admin)
router.put("/orders/:id/status", requireAdmin, async (req, res) => {
  try {
    const updated = db.updateOrderStatus(Number(req.params.id), req.body.status);
    if (!updated) { res.status(404).json({ error: "الطلب غير موجود" }); return; }
    
    if (req.body.status === "completed") {
      console.log(`📊 تسجيل مبيعات جديدة للطلب #${updated.id}: ${updated.total} JD`);
    }
    
    res.json(updated);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

export default router;
