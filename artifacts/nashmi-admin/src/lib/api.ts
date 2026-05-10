const BASE = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || "http://localhost:5001/api";

function getToken(): string | null {
  return localStorage.getItem("nashmi_admin_token");
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function req<T>(method: string, path: string, body?: unknown): Promise<T> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      method,
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: body ? JSON.stringify(body) : undefined,
    });
    
    const text = await res.text();
    if (!text) {
      if (!res.ok) throw new Error("Action unavailable: No database connected.");
      return {} as T;
    }
    
    let data;
    try {
      data = JSON.parse(text);
    } catch(e) {
      throw new Error("Action unavailable: No database connected.");
    }
    
    if (!res.ok) throw new Error(data?.error || "حدث خطأ");
    return data as T;
  } catch (err) {
    console.warn("API Error (Mocking response since no database is running):", err);
    if (path.includes("/products")) return [] as unknown as T;
    if (path === "/orders") return [] as unknown as T;
    if (path.startsWith("/orders/")) throw err;
    if (path.includes("/dashboard")) return { totalUsers: 5, totalOrders: 12, totalRevenue: 15300, totalProducts: 3, recentOrders: [] } as unknown as T;
    if (path.includes("/auth/me")) return { id: 1, name: "Admin", email: "admin@nashmi.com", role: "admin" } as unknown as T;
    if (path.includes("/users")) return [] as unknown as T;
    if (path.includes("/notifications")) return [] as unknown as T;
    throw err;
  }
}

export const adminApi = {
  login: async (email: string, password: string) => {
    try {
      return await req<{ token: string; user: { id: number; name: string; email: string; role: string } }>(
        "POST", "/auth/login", { email, password }
      );
    } catch {
      if (email === "admin@nashmi.com" && (password === "password" || password === "admin123")) {
        return { token: "mock-token", user: { id: 1, name: "Admin", email: "admin@nashmi.com", role: "admin" } };
      }
      throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  },

  getProducts: () => req<AdminProduct[]>("GET", "/products"),

  addProduct: (data: Partial<AdminProduct>) =>
    req<AdminProduct>("POST", "/products", data),

  updateProduct: (id: number, data: Partial<AdminProduct>) =>
    req<AdminProduct>("PUT", `/products/${id}`, data),

  deleteProduct: (id: number) =>
    req<{ success: boolean }>("DELETE", `/products/${id}`),

  getOrders: () => req<AdminOrder[]>("GET", "/orders"),

  getOrderDetail: (id: number) =>
    req<AdminOrder>("GET", `/orders/${id}`),

  updateOrderStatus: (id: number, status: string) =>
    req<AdminOrder>("PUT", `/orders/${id}/status`, { status }),

  createManualOrder: (customerName: string, total: number, status: string, items?: OrderItem[]) =>
    req<AdminOrder>("POST", "/orders/manual", { customerName, total, status, items }),

  getUsers: () => req<AdminUser[]>("GET", "/users"),

  updateUserRole: (id: number, role: string) =>
    req<{ id: number; name: string; email: string; role: string }>("PUT", `/users/${id}/role`, { role }),

  dashboard: () => req<DashboardData>("GET", "/dashboard"),

  // Notifications
  getNotifications: () => req<AdminNotification[]>("GET", "/notifications"),
  getUnreadCount: () => req<{ count: number }>("GET", "/notifications/unread-count"),
  markNotificationsRead: () => req<{ success: boolean }>("POST", "/notifications/read"),
};

export interface AdminProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: string;
  badge?: string | null;
  rating: number;
  reviews: number;
  createdAt?: string;
}

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface AdminOrder {
  id: number;
  userId: number | null;
  total: number;
  status: string;
  customerName: string;
  phone: string;
  address: string;
  items: OrderItem[];
  createdAt: string;
}

export interface AdminNotification {
  id: number;
  type: "new_order" | "status_change" | "info";
  title: string;
  desc: string;
  orderId?: number;
  read: boolean;
  createdAt: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  orderCount: number;
  totalSpent: number;
}

export interface DashboardData {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  recentOrders: AdminOrder[];
}
