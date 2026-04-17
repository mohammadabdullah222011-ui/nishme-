import { Router } from "express";
import { db, usersTable, ordersTable, productsTable } from "@workspace/db";
import { count, sum, desc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth.js";

const router = Router();

// GET /api/dashboard
router.get("/dashboard", requireAdmin, async (req, res) => {
  try {
    const [usersCount] = await db.select({ count: count() }).from(usersTable);
    const [ordersCount] = await db.select({ count: count() }).from(ordersTable);
    const [revenue] = await db.select({ total: sum(ordersTable.total) }).from(ordersTable);
    const [productsCount] = await db.select({ count: count() }).from(productsTable);

    const recentOrders = await db.select().from(ordersTable)
      .orderBy(desc(ordersTable.createdAt))
      .limit(5);

    res.json({
      totalUsers: Number(usersCount.count),
      totalOrders: Number(ordersCount.count),
      totalRevenue: Number(revenue.total ?? 0),
      totalProducts: Number(productsCount.count),
      recentOrders,
    });
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

export default router;
