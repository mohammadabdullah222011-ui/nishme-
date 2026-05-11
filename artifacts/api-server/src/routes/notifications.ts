import { Router } from "express";
import { db } from "../lib/database.js";
import { requireAdmin } from "../middlewares/auth.js";

const router = Router();

router.get("/notifications", requireAdmin, async (_req, res) => {
  try {
    const notifications = db.getNotifications();
    res.json(notifications);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

router.get("/notifications/unread-count", requireAdmin, async (_req, res) => {
  try {
    const count = db.getUnreadCount();
    res.json({ count });
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

router.post("/notifications/read", requireAdmin, async (_req, res) => {
  try {
    db.markNotificationsRead();
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

export default router;
