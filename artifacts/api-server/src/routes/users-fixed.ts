import { Router } from "express";
import { db } from "../lib/database.js";

const router = Router();

// GET /api/users (admin only)
router.get("/users", async (_req, res) => {
  try {
    const users = db.getUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// PUT /api/users/:id/role (admin only)
router.put("/users/:id/role", async (req, res) => {
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
