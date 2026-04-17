const BASE = "/api";

function getToken(): string | null {
  return localStorage.getItem("nashmi_admin_token");
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function req<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "خطأ في الخادم");
  return data as T;
}

export const adminApi = {
  login: (email: string, password: string) =>
    req<{ token: string; user: { id: number; name: string; email: string; role: string } }>(
      "POST", "/auth/login", { email, password }
    ),

  getProducts: () => req<AdminProduct[]>("GET", "/products"),

  addProduct: (data: Partial<AdminProduct>) =>
    req<AdminProduct>("POST", "/products", data),

  updateProduct: (id: number, data: Partial<AdminProduct>) =>
    req<AdminProduct>("PUT", `/products/${id}`, data),

  deleteProduct: (id: number) =>
    req<{ success: boolean }>("DELETE", `/products/${id}`),

  getOrders: () => req<AdminOrder[]>("GET", "/orders"),

  updateOrderStatus: (id: number, status: string) =>
    req<AdminOrder>("PUT", `/orders/${id}/status`, { status }),

  dashboard: () => req<DashboardData>("GET", "/dashboard"),
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

export interface AdminOrder {
  id: number;
  userId: number | null;
  total: number;
  status: string;
  customerName: string;
  createdAt: string;
}

export interface DashboardData {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  recentOrders: AdminOrder[];
}
