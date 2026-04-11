import { ShoppingCart, Users, DollarSign, Package, TrendingUp, Star } from "lucide-react";
import StatCard from "@/components/StatCard";
import RevenueChart from "@/components/RevenueChart";
import TrafficChart from "@/components/TrafficChart";
import SystemMonitor from "@/components/SystemMonitor";
import RecentOrders from "@/components/RecentOrders";
import AlertsPanel from "@/components/AlertsPanel";
import CategoryChart from "@/components/CategoryChart";
import DevicesPanel from "@/components/DevicesPanel";
import QuickActions from "@/components/QuickActions";

const stats = [
  {
    title: "إجمالي الإيرادات",
    value: 469000,
    unit: "ريال",
    change: 18.5,
    icon: <DollarSign size={18} className="text-red-400" />,
    iconBg: "rgba(220,38,38,0.12)",
    glowRed: true,
  },
  {
    title: "إجمالي الطلبات",
    value: 3155,
    change: 12.3,
    icon: <ShoppingCart size={18} className="text-blue-400" />,
    iconBg: "rgba(59,130,246,0.12)",
  },
  {
    title: "المستخدمون النشطون",
    value: 15480,
    change: 8.7,
    icon: <Users size={18} className="text-green-400" />,
    iconBg: "rgba(16,185,129,0.12)",
  },
  {
    title: "المنتجات المتاحة",
    value: 284,
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

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white text-2xl font-bold">لوحة التحكم</h1>
        <p className="text-white/40 text-sm mt-1">
          مرحباً بك في لوحة إدارة نشمي سوق — آخر تحديث: الآن
        </p>
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
    </div>
  );
}
