import { Router } from "express";
import bcrypt from "bcryptjs";
import { signToken } from "../lib/jwt.js";
import { requireAuth } from "../middlewares/auth.js";
import { db } from "../lib/database.js";

const router = Router();

// POST /api/auth/register
router.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ error: "جميع الحقول مطلوبة" });
      return;
    }

    // Check if user already exists
    const existing = await db.getUserByEmail(email);
    if (existing) {
      res.status(400).json({ error: "البريد الإلكتروني موجود مسبقاً" });
      return;
    }

    // Determine role based on email pattern
    const role = email.toLowerCase().includes("admin") || email === "admin@nashmi.com" ? "admin" : "user";

    // Hash password and create user in shared DB
    const hashed = await bcrypt.hash(password, 10);
    const user = await db.createUser({ name, email, password: hashed, role });

    const token = signToken({ userId: user.id, email: user.email, role: user.role });
    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// POST /api/auth/login
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "البريد وكلمة المرور مطلوبان" });
      return;
    }

    // Look up user in shared DB
    const user = await db.getUserByEmail(email);
    if (!user || !user.password) {
      res.status(401).json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
      return;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(401).json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
      return;
    }

    const token = signToken({ userId: user.id, email: user.email, role: user.role });
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// GET /api/auth/me
router.get("/auth/me", requireAuth, async (req, res) => {
  try {
    const user = await db.getUserByEmail(req.user!.email);
    if (!user) {
      res.status(404).json({ error: "المستخدم غير موجود" });
      return;
    }
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

export default router;
