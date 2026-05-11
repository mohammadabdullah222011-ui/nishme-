import { Router } from "express";
import { db } from "../lib/database.js";
import { requireAdmin } from "../middlewares/auth.js";

const router = Router();

router.get("/users", requireAdmin, async (_req, res) => {
  try {
    const users = db.getUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

router.put("/users/:id/role", requireAdmin, async (req, res) => {
  try {
    const { role } = req.body as { role: string };
    if (!["admin", "user"].includes(role)) {
      res.status(400).json({ error: "الدور غير صالح" });
      return;
    }
    const updated = db.updateUserRole(Number(req.params.id), role);
    if (!updated) { res.status(404).json({ error: "المستخدم غير موجود" }); return; }
    res.json(updated);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

export default router;
