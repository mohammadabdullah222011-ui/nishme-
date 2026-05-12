import { Router } from "express";
import bcrypt from "bcryptjs";
import { db } from "../lib/database.js";

const router = Router();

// GET /api/users (admin only)
router.get("/users", async (_req, res) => {
  try {
    const users = db.getUsers();
    // Strip passwords from response
    const safe = users.map(({ password, ...u }) => u);
    res.json(safe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// PUT /api/users/:id/role (admin only)
router.put("/users/:id/role", async (req, res) => {
  try {
    const { role, password } = req.body as { role: string; password?: string };
    if (!["admin", "user"].includes(role)) {
      res.status(400).json({ error: "الدور غير صالح" });
      return;
    }
    
    const existing = db.getUserById(Number(req.params.id));
    if (!existing) { res.status(404).json({ error: "المستخدم غير موجود" }); return; }

    // When promoting to admin, require a password
    if (role === "admin" && !existing.password) {
      if (!password) {
        res.status(400).json({ error: "يجب تعيين كلمة مرور للمستخدم ليصبح مديراً" });
        return;
      }
      const hashed = await bcrypt.hash(password, 10);
      db.updateUserPassword(existing.id, hashed);
    }

    const updated = db.updateUserRole(existing.id, role);
    if (!updated) { res.status(404).json({ error: "المستخدم غير موجود" }); return; }
    const { password: _, ...safe } = updated;
    res.json(safe);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

export default router;
