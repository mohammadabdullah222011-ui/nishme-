import express from 'express';
import cors from 'cors';

const app = express();

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',')
  : ['https://nashmi-market-nashmi-admin.vercel.app', 'https://nashmi-market-nashmi-store.vercel.app'];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// In-memory DB
let users: any[] = [{ id: 1, name: "Admin", email: "admin@nashmi.com", role: "admin", createdAt: new Date().toISOString() }];
let products: any[] = [
  { id: 1, name: "لابتوب ديل G15", description: "لابتوب ألعاب قوي", price: 4500, imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300", stock: 15, category: "pc", badge: "جديد", rating: 4.5, reviews: 128, createdAt: new Date().toISOString() },
  { id: 2, name: "بلاي ستيشن 5", description: "جهاز ألعاب من سوني", price: 2800, imageUrl: "https://images.unsplash.com/photo-1606142104415-bb2442a795fa?w=300", stock: 8, category: "consoles", badge: "مميز", rating: 4.8, reviews: 256, createdAt: new Date().toISOString() },
  { id: 3, name: "ماوس لاسلكي G502", description: "ماوس ألعاب خفيف", price: 150, imageUrl: "https://images.unsplash.com/photo-1615463163983-1e88c9b4d7b8?w=300", stock: 25, category: "accessories", badge: "الأكثر مبيعاً", rating: 4.2, reviews: 89, createdAt: new Date().toISOString() },
];
let orders: any[] = [];
let nextId = { users: 2, products: 4, orders: 1 };

// Auth
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@nashmi.com" && (password === "password" || password === "admin123")) {
    res.json({ token: "mock-token", user: { id: 1, name: "Admin", email, role: "admin" } });
  } else {
    res.json({ token: "mock-token", user: { id: Date.now(), name: email.split('@')[0], email, role: "user" } });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { name, email } = req.body;
  const user = { id: Date.now(), name, email, role: "user" };
  res.json({ token: "mock-token", user });
});

app.get('/api/auth/me', (_req, res) => {
  res.json({ id: 1, name: "Admin", email: "admin@nashmi.com", role: "admin" });
});

// Products
app.get('/api/products', (_req, res) => res.json(products));
app.get('/api/products/:id', (req, res) => {
  const p = products.find(x => x.id === Number(req.params.id));
  res.json(p || null);
});
app.post('/api/products', (req, res) => {
  const { name, description, price, imageUrl, stock, category, badge } = req.body;
  const product = { id: nextId.products++, name: name || "منتج", description: description || "", price: Number(price) || 0, imageUrl: imageUrl || "", stock: Number(stock) || 0, category: category || "", badge: badge || null, rating: 5, reviews: 0, createdAt: new Date().toISOString() };
  products.push(product);
  res.json(product);
});
app.put('/api/products/:id', (req, res) => {
  const idx = products.findIndex(x => x.id === Number(req.params.id));
  if (idx !== -1) { products[idx] = { ...products[idx], ...req.body }; res.json(products[idx]); }
  else res.status(404).json({ error: "المنتج غير موجود" });
});
app.delete('/api/products/:id', (req, res) => {
  const idx = products.findIndex(x => x.id === Number(req.params.id));
  if (idx !== -1) { products.splice(idx, 1); res.json({ success: true }); }
  else res.status(404).json({ error: "المنتج غير موجود" });
});

// Orders
app.post('/api/orders', (req, res) => {
  const { items, phone, customerName, address } = req.body;
  const total = items.reduce((s: number, i: any) => s + (i.price || 0) * i.quantity, 0);
  const order = { id: nextId.orders++, userId: null, total, status: "pending", customerName: customerName || "عميل", phone: phone || "", address: address || "", items, createdAt: new Date().toISOString() };
  orders.push(order);
  res.json({ id: order.id });
});

app.get('/api/orders', (_req, res) => res.json(orders));
app.get('/api/orders/my', (req, res) => res.json(orders.filter((o: any) => o.userId === 1)));
app.get('/api/orders/:id', (req, res) => {
  const o = orders.find((x: any) => x.id === Number(req.params.id));
  res.json(o || null);
});
app.put('/api/orders/:id/status', (req, res) => {
  const o = orders.find((x: any) => x.id === Number(req.params.id));
  if (o) o.status = req.body.status;
  res.json(o);
});
app.post('/api/orders/manual', (req, res) => {
  const { customerName, total, status, items } = req.body;
  const order = { id: nextId.orders++, userId: null, total: Number(total), status: status || "pending", customerName: customerName || "", phone: "", address: "", items: items || [], createdAt: new Date().toISOString() };
  orders.push(order);
  res.json(order);
});

// Dashboard
app.get('/api/dashboard', (_req, res) => {
  res.json({ totalUsers: users.length, totalOrders: orders.length, totalRevenue: orders.reduce((s: number, o: any) => s + o.total, 0), totalProducts: products.length, recentOrders: orders.slice(-5).reverse() });
});

// Users
app.get('/api/users', (_req, res) => res.json(users));
app.put('/api/users/:id/role', (req, res) => {
  const u = users.find(x => x.id === Number(req.params.id));
  if (u) u.role = req.body.role;
  res.json(u);
});

// Notifications
app.get('/api/notifications', (_req, res) => res.json([]));
app.get('/api/notifications/unread-count', (_req, res) => res.json({ count: 0 }));
app.post('/api/notifications/read', (_req, res) => res.json({ success: true }));

// Health
app.get('/api/healthz', (_req, res) => res.json({ status: "ok" }));

export default app;
