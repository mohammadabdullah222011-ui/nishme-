import { type Request, type Response, type NextFunction } from "express";
import { verifyToken } from "../lib/jwt.js";

declare global {
  namespace Express {
    interface Request {
      user?: { userId: number; email: string; role: string };
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "غير مصرح لك" });
    return;
  }
  try {
    req.user = verifyToken(header.slice(7));
    next();
  } catch {
    res.status(401).json({ error: "رمز المصادقة غير صالح" });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  requireAuth(req, res, () => {
    if (req.user?.role !== "admin") {
      res.status(403).json({ error: "صلاحيات المدير مطلوبة" });
      return;
    }
    next();
  });
}
