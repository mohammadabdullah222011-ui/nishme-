import { Router } from "express";
import { db } from "../lib/database.js";
import { requireAdmin } from "../middlewares/auth.js";

const router = Router();

// GET /api/dashboard
router.get("/dashboard", requireAdmin, async (req, res) => {
  try {
    const stats = db.getUserStats();

    res.json(stats);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

export default router;
