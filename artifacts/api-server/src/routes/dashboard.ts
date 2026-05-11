import { Router } from "express";
import { db } from "../lib/database.js";

const router = Router();

// GET /api/dashboard
router.get("/dashboard", async (_req, res) => {
  try {
    const stats = db.getUserStats();

    res.json(stats);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

export default router;
