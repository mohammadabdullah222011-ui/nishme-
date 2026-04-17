const BASE = "/api";

function getToken(): string | null {
  return localStorage.getItem("nashmi_token");
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
  if (!res.ok) throw new Error(data.error || "حدث خطأ");
  return data as T;
}

export const api = {
  // Auth
  register: (name: string, email: string, password: string) =>
    req<{ token: string; user: ApiUser }>("POST", "/auth/register", { name, email, password }),

  login: (email: string, password: string) =>
    req<{ token: string; user: ApiUser }>("POST", "/auth/login", { email, password }),

  me: () => req<ApiUser>("GET", "/auth/me"),

  // Products
  getProducts: () => req<ApiProduct[]>("GET", "/products"),
  getProduct: (id: number) => req<ApiProduct>("GET", `/products/${id}`),

  addProduct: (data: Partial<ApiProduct>) =>
    req<ApiProduct>("POST", "/products", data),

  // Orders
  createOrder: (items: { product_id: number; quantity: number }[]) =>
    req<{ id: number }>("POST", "/orders", { items }),

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
  createdAt: string;
}

export interface DashboardData {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  recentOrders: ApiOrder[];
}
