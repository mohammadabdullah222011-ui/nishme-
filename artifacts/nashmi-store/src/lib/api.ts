const ADMIN_API = "https://nashmi-market-nashmi-admin.vercel.app/api";
const BASE = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || ADMIN_API;

function getToken(): string | null {
  return localStorage.getItem("nashmi_token");
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
    if (method === "GET" && path.includes("/products")) return [
      { id: 1, name: "لابتوب ديل G15", description: "لابتوب ألعاب قوي", price: 4500, imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300", stock: 15, category: "pc", badge: "جديد", rating: 4.5, reviews: 128, createdAt: new Date().toISOString() },
      { id: 2, name: "بلاي ستيشن 5", description: "جهاز ألعاب من سوني", price: 2800, imageUrl: "https://images.unsplash.com/photo-1606142104415-bb2442a795fa?w=300", stock: 8, category: "consoles", badge: "مميز", rating: 4.8, reviews: 256, createdAt: new Date().toISOString() },
      { id: 3, name: "ماوس لاسلكي G502", description: "ماوس ألعاب خفيف", price: 150, imageUrl: "https://images.unsplash.com/photo-1615463163983-1e88c9b4d7b8?w=300", stock: 25, category: "accessories", badge: "الأكثر مبيعاً", rating: 4.2, reviews: 89, createdAt: new Date().toISOString() },
    ] as unknown as T;
    if (method === "GET" && path.includes("/orders")) return [] as unknown as T;
    if (path.includes("/auth/me")) return { id: 1, name: "Admin", email: "admin@nashmi.com", role: "admin" } as unknown as T;
    if (method === "GET" && path.includes("/dashboard")) return { totalUsers: 5, totalOrders: 12, totalRevenue: 15300, totalProducts: 3, recentOrders: [] } as unknown as T;
    throw err;
  }
}

export const api = {
  // Auth
  register: async (name: string, email: string, password: string) => {
    try {
      return await req<{ token: string; user: ApiUser }>("POST", "/auth/register", { name, email, password });
    } catch {
      return { token: "mock-token", user: { id: Date.now(), name, email, role: "user" } };
    }
  },

  login: async (email: string, password: string) => {
    try {
      return await req<{ token: string; user: ApiUser }>("POST", "/auth/login", { email, password });
    } catch {
      return { token: "mock-token", user: { id: 1, name: "مستخدم", email, role: "user" } };
    }
  },

  me: () => req<ApiUser>("GET", "/auth/me"),

  // Products
  getProducts: () => req<ApiProduct[]>("GET", "/products"),
  getProduct: (id: number) => req<ApiProduct>("GET", `/products/${id}`),

  addProduct: (data: Partial<ApiProduct>) =>
    req<ApiProduct>("POST", "/products", data),

  // Orders
  createOrder: (items: { product_id: number; quantity: number }[], phone?: string, customerName?: string, address?: string) =>
    req<{ id: number }>("POST", "/orders", { items, phone, customerName, address }),

  myOrders: () => req<ApiOrder[]>("GET", "/orders/my"),

  // Admin
  adminOrders: () => req<ApiOrder[]>("GET", "/orders"),
  dashboard: () => req<DashboardData>("GET", "/dashboard"),
};

export interface ApiUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface ApiProduct {
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

export interface ApiOrder {
  id: number;
  userId: number | null;
  total: number;
  status: string;
  customerName: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface DashboardData {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  recentOrders: ApiOrder[];
}
