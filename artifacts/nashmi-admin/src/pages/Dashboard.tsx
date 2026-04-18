import { useState, useEffect } from "react";
import { ShoppingCart, Users, DollarSign, Package, TrendingUp, Star, Plus } from "lucide-react";
import StatCard from "@/components/StatCard";
import RevenueChart from "@/components/RevenueChart";
import TrafficChart from "@/components/TrafficChart";
import SystemMonitor from "@/components/SystemMonitor";
import RecentOrders from "@/components/RecentOrders";
import AlertsPanel from "@/components/AlertsPanel";
import CategoryChart from "@/components/CategoryChart";
import DevicesPanel from "@/components/DevicesPanel";
import QuickActions from "@/components/QuickActions";
import AddOrderModal from "@/components/AddOrderModal";
import AddProductModal from "@/components/AddProductModal";
import AddSaleModal from "@/components/AddSaleModal";
import { adminApi } from "@/lib/api";

export default function Dashboard() {
  const [orderModal, setOrderModal] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [saleModal, setSaleModal] = useState(false);
  const [liveStats, setLiveStats] = useState<{
    totalRevenue: number; totalOrders: number; totalUsers: number; totalProducts: number;
  } | null>(null);

  useEffect(() => {
    const fetchStats = () => {
      adminApi.dashboard()
        .then((d) => setLiveStats({ totalRevenue: d.totalRevenue, totalOrders: d.totalOrders, totalUsers: d.totalUsers, totalProducts: d.totalProducts }))
        .catch(() => {});
    };
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      title: "إجمالي الإيرادات",
      value: liveStats?.totalRevenue ?? 469000,
      unit: "JOD",
      change: 18.5,
      icon: <DollarSign size={18} className="text-red-400" />,
      iconBg: "rgba(220,38,38,0.12)",
      glowRed: true,
    },
    {
      title: "إجمالي الطلبات",
      value: liveStats?.totalOrders ?? 3155,
      change: 12.3,
      icon: <ShoppingCart size={18} className="text-blue-400" />,
      iconBg: "rgba(59,130,246,0.12)",
    },
    {
      title: "المستخدمون المسجلون",
      value: liveStats?.totalUsers ?? 0,
      change: 8.7,
      icon: <Users size={18} className="text-green-400" />,
      iconBg: "rgba(16,185,129,0.12)",
    },
    {
      title: "المنتجات المتاحة",
      value: liveStats?.totalProducts ?? 0,
      change: -2.1,
      icon: <Package size={18} className="text-orange-400" />,
      iconBg: "rgba(249,115,22,0.12)",
    },
    {
      title: "معدل التحويل",
      value: "7.4",
      unit: "%",
      change: 3.2,
      icon: <TrendingUp size={18} className="text-purple-400" />,
      iconBg: "rgba(139,92,246,0.12)",
    },
    {
      title: "تقييم المتجر",
      value: "4.8",
      unit: "/ 5",
      change: 0.3,
      icon: <Star size={18} className="text-yellow-400" />,
      iconBg: "rgba(234,179,8,0.12)",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">لوحة التحكم</h1>
          <p className="text-white/40 text-sm mt-1">
            مرحباً بك في لوحة إدارة نشمي سوق — آخر تحديث: الآن
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 flex-wrap justify-end">
          <button
            onClick={() => setOrderModal(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{ background: "rgba(220,38,38,0.85)", boxShadow: "0 0 12px rgba(220,38,38,0.3)" }}
            data-testid="button-dashboard-add-order"
          >
            <Plus size={13} />
            طلب جديد
          </button>
          <button
            onClick={() => setProductModal(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border border-white/10 text-white/70 hover:text-white hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-200"
            data-testid="button-dashboard-add-product"
          >
            <Plus size={13} />
            منتج جديد
          </button>
          <button
            onClick={() => setSaleModal(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border border-white/10 text-white/70 hover:text-white hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-200"
            data-testid="button-dashboard-add-sale"
          >
            <Plus size={13} />
            تسجيل مبيعة
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Row 2: Revenue + Traffic */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <div className="xl:col-span-3">
          <RevenueChart />
        </div>
        <div className="xl:col-span-2">
          <TrafficChart />
        </div>
      </div>

      {/* Row 3: Alerts + Orders + System */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AlertsPanel />
        <RecentOrders />
        <SystemMonitor />
      </div>

      {/* Row 4: Category + Devices + Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CategoryChart />
        <DevicesPanel />
        <QuickActions />
      </div>

      {/* Modals */}
      <AddOrderModal open={orderModal} onClose={() => setOrderModal(false)} onAdd={() => {}} />
      <AddProductModal
        open={productModal}
        onClose={() => setProductModal(false)}
        onSave={async (data) => {
          const { adminApi } = await import("@/lib/api");
          await adminApi.addProduct(data);
        }}
      />
      <AddSaleModal open={saleModal} onClose={() => setSaleModal(false)} onAdd={() => {}} />
    </div>
  );
}
