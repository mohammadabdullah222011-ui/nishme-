import { Router } from "express";
import { db, ordersTable, orderItemsTable, productsTable, usersTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAuth, requireAdmin } from "../middlewares/auth.js";

const router = Router();

// POST /api/orders (authenticated users)
router.post("/orders", requireAuth, async (req, res) => {
  try {
    const { items } = req.body as { items: { product_id: number; quantity: number }[] };
    if (!items?.length) {
      res.status(400).json({ error: "الطلب فارغ" });
      return;
    }

    // Get user name
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.user!.userId)).limit(1);

    // Calculate total
    let total = 0;
    const enrichedItems: { product_id: number; quantity: number; price: number }[] = [];
    for (const item of items) {
      const [product] = await db.select().from(productsTable).where(eq(productsTable.id, item.product_id)).limit(1);
      if (!product) continue;
      enrichedItems.push({ product_id: item.product_id, quantity: item.quantity, price: product.price });
      total += product.price * item.quantity;
    }

    // Create order
    const [order] = await db.insert(ordersTable).values({
      userId: req.user!.userId,
      total,
      status: "pending",
      customerName: user?.name || req.user!.email,
    }).returning();

    // Insert order items
    for (const item of enrichedItems) {
      await db.insert(orderItemsTable).values({
        orderId: order.id,
        productId: item.product_id,
        quantity: item.quantity,
        price: item.price,
      });
    }

    res.status(201).json({ ...order, itemsCount: enrichedItems.length });
  } catch (err) {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// GET /api/orders/my (current user's orders)
router.get("/orders/my", requireAuth, async (req, res) => {
  try {
    const orders = await db.select().from(ordersTable)
      .where(eq(ordersTable.userId, req.user!.userId))
      .orderBy(desc(ordersTable.createdAt));
    res.json(orders);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// POST /api/orders/manual (admin creates manual order)
router.post("/orders/manual", requireAdmin, async (req, res) => {
  try {
    const { customerName, total, status } = req.body as { customerName: string; total: number; status: string };
    if (!customerName || total === undefined) {
      res.status(400).json({ error: "اسم العميل والمبلغ مطلوبان" });
      return;
    }
    const [order] = await db.insert(ordersTable).values({
      userId: null,
      total: Number(total),
      status: status || "pending",
      customerName,
    }).returning();
    res.status(201).json(order);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// GET /api/orders (admin)
router.get("/orders", requireAdmin, async (req, res) => {
  try {
    const orders = await db.select().from(ordersTable).orderBy(desc(ordersTable.createdAt)).limit(50);
    res.json(orders);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// PUT /api/orders/:id/status (admin)
router.put("/orders/:id/status", requireAdmin, async (req, res) => {
  try {
    const [updated] = await db.update(ordersTable)
      .set({ status: req.body.status })
      .where(eq(ordersTable.id, Number(req.params.id)))
      .returning();
    res.json(updated);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

export default router;
