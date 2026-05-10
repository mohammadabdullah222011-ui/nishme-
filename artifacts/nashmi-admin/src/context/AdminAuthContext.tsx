                         import { createContext, useContext, useState, useEffect } from "react";
import { adminApi } from "@/lib/api";

interface AdminAuthState {
  token: string | null;
  email: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthState | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("nashmi_admin_token"));
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (e: string, p: string) => {
    setLoading(true);
    try {
      const { token: t, user } = await adminApi.login(e, p);
      if (user.role !== "admin") throw new Error("هذا الحساب ليس له صلاحيات المدير");
      localStorage.setItem("nashmi_admin_token", t);
      setToken(t);
      setEmail(user.email);
      
      // تحديث لوحة التحكم بعد تسجيل الدخول بنجاح
      console.log("تم تسجيل الدخول بنجاح وتحديث لوحة التحكم");
      
      // تحديث الإحصائيات بعد تسجيل الدخول
      try {
        const stats = await adminApi.dashboard();
        // إرسال إشعار بتحديث الإحصائيات للـ Dashboard
        window.dispatchEvent(new CustomEvent('dashboardStatsUpdate', { 
          detail: { 
            totalRevenue: stats.totalRevenue, 
            totalOrders: stats.totalOrders, 
            totalUsers: stats.totalUsers, 
            totalProducts: stats.totalProducts 
          } 
        }));
      } catch (statsError) {
        console.error("خطأ في تحديث الإحصائيات بعد تسجيل الدخول:", statsError);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("nashmi_admin_token");
    setToken(null);
    setEmail(null);
  };

  return (
    <AdminAuthContext.Provider value={{ token, email, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be inside AdminAuthProvider");
  return ctx;
}
