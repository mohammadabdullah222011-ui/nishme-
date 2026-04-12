export const revenueData = [
  { month: "يناير", revenue: 42000, orders: 320, users: 1200 },
  { month: "فبراير", revenue: 58000, orders: 410, users: 1450 },
  { month: "مارس", revenue: 51000, orders: 375, users: 1380 },
  { month: "أبريل", revenue: 74000, orders: 520, users: 1720 },
  { month: "مايو", revenue: 68000, orders: 490, users: 1650 },
  { month: "يونيو", revenue: 91000, orders: 640, users: 2100 },
  { month: "يوليو", revenue: 85000, orders: 600, users: 1980 },
];

export const trafficData = [
  { day: "الأحد", visits: 3200, sales: 180 },
  { day: "الإثنين", visits: 4100, sales: 240 },
  { day: "الثلاثاء", visits: 3800, sales: 210 },
  { day: "الأربعاء", visits: 5200, sales: 310 },
  { day: "الخميس", visits: 4800, sales: 280 },
  { day: "الجمعة", visits: 6200, sales: 390 },
  { day: "السبت", visits: 5700, sales: 340 },
];

export const categoryDistribution = [
  { name: "كمبيوتر", value: 35, color: "#dc2626" },
  { name: "كونسول", value: 28, color: "#ef4444" },
  { name: "إكسسوارات", value: 22, color: "#f97316" },
  { name: "ألعاب", value: 15, color: "#fbbf24" },
];

export const recentOrders = [
  { id: "ORD-8841", customer: "محمد العتيبي", product: "PlayStation 5", amount: 2299, status: "مكتمل", time: "منذ 5 دقائق" },
  { id: "ORD-8840", customer: "سارة الزهراني", product: "كيبورد ميكانيكي RGB", amount: 459, status: "قيد الشحن", time: "منذ 18 دقيقة" },
  { id: "ORD-8839", customer: "فيصل الحربي", product: "ماوس جيمينج احترافي", amount: 299, status: "معلق", time: "منذ 32 دقيقة" },
  { id: "ORD-8838", customer: "نورة القحطاني", product: "God of War: Ragnarok", amount: 199, status: "مكتمل", time: "منذ ساعة" },
  { id: "ORD-8837", customer: "عبدالله المطيري", product: "Xbox Series X", amount: 2099, status: "ملغي", time: "منذ ساعتين" },
];

export const notifications = [
  { id: 1, type: "alert", title: "تنبيه أمني", desc: "محاولة دخول غير مصرح به من IP: 192.168.1.1", time: "منذ 2 دقيقة", read: false },
  { id: 2, type: "warning", title: "مخزون منخفض", desc: "PS5 — تبقت 3 وحدات فقط في المخزون", time: "منذ 15 دقيقة", read: false },
  { id: 3, type: "info", title: "طلب جديد", desc: "طلب #ORD-8841 تم استلامه بمبلغ 2299 JOD", time: "منذ 5 دقائق", read: false },
  { id: 4, type: "success", title: "نسخة احتياطية", desc: "تم إنجاز النسخة الاحتياطية اليومية بنجاح", time: "منذ ساعة", read: true },
  { id: 5, type: "warning", title: "أداء النظام", desc: "معدل استخدام CPU وصل 85% — يُوصى بالمراجعة", time: "منذ 30 دقيقة", read: true },
];

export const systemMetrics = {
  cpu: 67,
  ram: 74,
  disk: 45,
  apiLatency: 142,
  uptime: 99.97,
  requestsPerMin: 284,
};

export const alertCards = [
  {
    id: 1,
    type: "security",
    title: "تنبيهات أمنية",
    count: 3,
    severity: "high",
    desc: "محاولات دخول مشبوهة",
    icon: "ShieldAlert",
  },
  {
    id: 2,
    type: "user",
    title: "مشاكل المستخدمين",
    count: 12,
    severity: "medium",
    desc: "طلبات دعم معلقة",
    icon: "Users",
  },
  {
    id: 3,
    type: "system",
    title: "تحذيرات النظام",
    count: 5,
    severity: "low",
    desc: "خدمات تحتاج مراجعة",
    icon: "AlertTriangle",
  },
];

export const devices = [
  { type: "الجوال", percentage: 58, color: "#dc2626" },
  { type: "سطح المكتب", percentage: 32, color: "#ef4444" },
  { type: "التابلت", percentage: 10, color: "#f97316" },
];
