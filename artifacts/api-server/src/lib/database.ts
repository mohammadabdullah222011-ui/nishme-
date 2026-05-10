// Types for our in-memory database
interface AdminProduct {
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

interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface AdminOrder {
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

interface AdminNotification {
  id: number;
  type: "new_order" | "status_change" | "info";
  title: string;
  desc: string;
  orderId?: number;
  read: boolean;
  createdAt: string;
}

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  orderCount: number;
  totalSpent: number;
}

// In-memory database for development
let users: AdminUser[] = [
  {
    id: 1,
    name: "Admin",
    email: "admin@nashmi.com",
    role: "admin",
    createdAt: new Date().toISOString(),
    orderCount: 0,
    totalSpent: 0
  }
];

let products: AdminProduct[] = [
  {
    id: 1,
    name: "لابتوب ديل G15",
    description: "لابتوب ألعاب قوي مع معالج إنتل كور i7 و 16GB رام",
    price: 4500,
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300",
    stock: 15,
    category: "pc",
    badge: "جديد",
    rating: 4.5,
    reviews: 128,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "بلاي ستيشن 5",
    description: "جهاز ألعاب من سوني مع وحدت تحكم",
    price: 2800,
    imageUrl: "https://images.unsplash.com/photo-1606142104415-bb2442a795fa?w=300",
    stock: 8,
    category: "consoles",
    badge: "مميز",
    rating: 4.8,
    reviews: 256,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "ماوس لاسرخي G502",
    description: "ماوس ألعاب لاسرخي خفيف الوزن",
    price: 150,
    imageUrl: "https://images.unsplash.com/photo-1615463163983-1e88c9b4d7b8?w=300",
    stock: 25,
    category: "accessories",
    badge: "الأكثر مبيعاً",
    rating: 4.2,
    reviews: 89,
    createdAt: new Date().toISOString()
  }
];

let orders: AdminOrder[] = [
  {
    id: 1,
    userId: 1,
    total: 4500,
    status: "completed",
    customerName: "Admin",
    phone: "0790000000",
    address: "عمان، الأردن",
    items: [
      { productId: 1, name: "لابتوب ديل G15", price: 4500, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300" }
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: 2,
    userId: null,
    total: 2800,
    status: "pending",
    customerName: "أحمد محمد",
    phone: "0791234567",
    address: "عمان، جبل الحسين",
    items: [
      { productId: 2, name: "بلاي ستيشن 5", price: 2800, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1606142104415-bb2442a795fa?w=300" }
    ],
    createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  }
];

let notifications: AdminNotification[] = [];

let nextId = {
  users: 2,
  products: 4,
  orders: 3,
  notifications: 1
};

// Database operations
export const db = {
  // Users
  getUsers: () => users,
  getUserById: (id: number) => users.find(u => u.id === id),
  getUserByEmail: (email: string) => users.find(u => u.email === email),
  createUser: (user: Omit<AdminUser, 'id' | 'createdAt' | 'orderCount' | 'totalSpent'>) => {
    const newUser = {
      ...user,
      id: nextId.users++,
      createdAt: new Date().toISOString(),
      orderCount: 0,
      totalSpent: 0
    };
    users.push(newUser);
    return newUser;
  },
  updateUserRole: (id: number, role: string) => {
    const user = users.find(u => u.id === id);
    if (user) {
      user.role = role;
    }
    return user;
  },

  // Products
  getProducts: () => products,
  getProductById: (id: number) => products.find(p => p.id === id),
  createProduct: (product: Omit<AdminProduct, 'id' | 'createdAt' | 'rating' | 'reviews'>) => {
    console.log("محاولة حفظ منتج جديد في قاعدة البيانات:", product);
    const newProduct = {
      ...product,
      id: nextId.products++,
      rating: 5,
      reviews: 0,
      createdAt: new Date().toISOString()
    };
    products.push(newProduct);
    console.log("المنتج تم حفظه في قاعدة البيانات:", newProduct);
    console.log("إجمالي المنتجات في قاعدة البيانات:", products.length);
    return newProduct;
  },
  updateProduct: (id: number, updates: Partial<AdminProduct>) => {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      return products[index];
    }
    return null;
  },
  deleteProduct: (id: number) => {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products.splice(index, 1);
      return true;
    }
    return false;
  },

  // Orders
  getOrders: () => orders,
  getOrderById: (id: number) => orders.find(o => o.id === id),
  getOrdersByUserId: (userId: number) => orders.filter(o => o.userId === userId),
  createOrder: (order: { userId: number | null; total: number; status?: string; customerName: string; phone?: string; address?: string; items: OrderItem[] }) => {
    const newOrder = {
      ...order,
      id: nextId.orders++,
      phone: order.phone || "",
      address: order.address || "",
      status: order.status || "pending",
      createdAt: new Date().toISOString()
    };
    orders.push(newOrder);

    // Auto-create notification for new order
    notifications.push({
      id: nextId.notifications++,
      type: "new_order",
      title: "🛒 طلب جديد",
      desc: `طلب #${String(newOrder.id).padStart(4, "0")} من ${newOrder.customerName} — ${newOrder.total.toLocaleString("en")} JD`,
      orderId: newOrder.id,
      read: false,
      createdAt: new Date().toISOString()
    });

    return newOrder;
  },
  updateOrderStatus: (id: number, status: string) => {
    const order = orders.find(o => o.id === id);
    if (order) {
      const oldStatus = order.status;
      order.status = status;

      // Auto-create notification for status change
      if (oldStatus !== status) {
        notifications.push({
          id: nextId.notifications++,
          type: "status_change",
          title: "📦 تغيير حالة الطلب",
          desc: `الطلب #${String(order.id).padStart(4, "0")} تغير من "${oldStatus}" إلى "${status}"`,
          orderId: order.id,
          read: false,
          createdAt: new Date().toISOString()
        });
      }
    }
    return order;
  },

  // Notifications
  getNotifications: () => notifications,
  getUnreadCount: () => notifications.filter(n => !n.read).length,
  markNotificationsRead: () => {
    notifications.forEach(n => { n.read = true; });
  },

  // Stats
  getUserStats: () => {
    return {
      totalUsers: users.length,
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
      totalProducts: products.length,
      recentOrders: orders.slice(-5).reverse()
    };
  }
};
