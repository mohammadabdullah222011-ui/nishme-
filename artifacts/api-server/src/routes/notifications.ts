import { Router } from "express";
import { db } from "../lib/database.js";

const router = Router();

// GET /api/notifications
router.get("/notifications", async (_req, res) => {
  try {
    const notifications = await db.getNotifications();
    res.json(notifications);
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// GET /api/notifications/unread-count
router.get("/notifications/unread-count", async (_req, res) => {
  try {
    const count = await db.getUnreadCount();
    res.json({ count });
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// POST /api/notifications/read
router.post("/notifications/read", async (_req, res) => {
  try {
    await db.markNotificationsRead();
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

export default router;