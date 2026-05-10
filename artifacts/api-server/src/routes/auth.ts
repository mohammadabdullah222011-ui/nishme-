import { Router } from "express";
import bcrypt from "bcryptjs";
import { signToken } from "../lib/jwt.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

// Mock admin user for development
const mockAdmin = {
  id: 1,
  name: "Admin",
  email: "admin@nashmi.com",
  password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // "password"
  role: "admin"
};

// POST /api/auth/register
router.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ error: "جميع الحقول مطلوبة" });
      return;
    }
    
    // Mock registration - always succeed for development
    const role = email.toLowerCase().includes("admin") || email === "admin@nashmi.com" ? "admin" : "user";
    const hashed = await bcrypt.hash(password, 10);
    const user = { id: Date.now(), name, email, role };
    const token = signToken({ userId: user.id, email: user.email, role: user.role });
    res.status(201).json({ token, user });
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
    
    // Mock login - accept admin credentials or any email/password
    if (email === "admin@nashmi.com" && (password === "password" || password === "admin123")) {
      const token = signToken({ userId: mockAdmin.id, email: mockAdmin.email, role: mockAdmin.role });
      res.json({ token, user: { id: mockAdmin.id, name: mockAdmin.name, email: mockAdmin.email, role: mockAdmin.role } });
      return;
    }
    
    // For any other credentials, create a mock user
    const user = { id: Date.now(), name: email.split('@')[0], email, role: "user" };
    const token = signToken({ userId: user.id, email: user.email, role: user.role });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// GET /api/auth/me
router.get("/auth/me", requireAuth, async (req, res) => {
  try {
    // Return user info from token
    res.json({ 
      id: req.user!.userId, 
      name: req.user!.email.split('@')[0], 
      email: req.user!.email, 
      role: req.user!.role 
    });
  } catch {
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

export default router;
