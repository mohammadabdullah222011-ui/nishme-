import { Router } from "express";
import { db, usersTable, ordersTable } from "@workspace/db";
import { eq, count, sum, desc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth.js";

const router = Router();

// GET /api/users (admin only)
router.get("/users", requireAdmin, async (req, res) => {
  try {
    const users = await db.select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      role: usersTable.role,
      createdAt: usersTable.createdAt,
    }).from(usersTable).orderBy(desc(usersTable.createdAt));

    // For each user get order count + total spent
    const enriched = await Promise.all(users.map(async (u) => {
      const [orderStats] = await db.select({
        orderCount: count(ordersTable.id),
        totalSpent: sum(ordersTable.total),
      }).from(ordersTable).where(eq(ordersTable.userId, u.id));

      return {
        ...u,
        orderCount: Number(orderStats.orderCount ?? 0),
        totalSpent: Number(orderStats.totalSpent ?? 0),
      };
    }));

    res.json(enriched);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// PUT /api/users/:id/role (admin only)
router.put("/users/:id/role", requireAdmin, async (req, res) => {
  try {
    const { role } = req.body as { role: string };
    if (!["admin", "user"].includes(role)) {
      res.status(400).json({ error: "الدور غير صالح" });
      return;
    }
    // Don't allow downgrading yourself
    if (req.user?.userId === Number(req.params.id) && role !== "admin") {
      res.status(400).json({ error: "لا يمكنك تغيير دورك بنفسك" });
      return;
    }
    const [updated] = await db
      .update(usersTable)
      .set({ role })
      .where(eq(usersTable.id, Number(req.params.id)))
      .returning({ id: usersTable.id, name: usersTable.name, email: usersTable.email, role: usersTable.role });
    if (!updated) { res.status(404).json({ error: "المستخدم غير موجود" }); return; }
    res.json(updated);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

export default router;
