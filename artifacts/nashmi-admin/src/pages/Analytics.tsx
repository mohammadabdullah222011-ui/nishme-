import { useState, useEffect } from "react";
import RevenueChart from "@/components/RevenueChart";
import TrafficChart from "@/components/TrafficChart";
import StatCard from "@/components/StatCard";
import { ShoppingCart, DollarSign, Package, TrendingUp } from "lucide-react";
import { adminApi } from "@/lib/api";
import { useLang } from "@/i18n/context";

export default function Analytics() {
  const { t } = useLang();
  const [liveStats, setLiveStats] = useState<{
    totalRevenue: number; totalOrders: number; totalProducts: number;
  } | null>(null);

  useEffect(() => {
    adminApi.dashboard()
      .then((d) => setLiveStats({ totalRevenue: d.totalRevenue, totalOrders: d.totalOrders, totalProducts: d.totalProducts }))
      .catch(() => {});
  }, []);

  const stats = [
    { title: t("إجمالي الإيرادات"), value: liveStats?.totalRevenue ?? 0, unit: "JOD", change: 14.2, icon: <DollarSign size={16} className="text-red-400" />, iconBg: "rgba(220,38,38,0.12)", glowRed: true },
    { title: t("إجمالي الطلبات"), value: liveStats?.totalOrders ?? 0, change: 12.3, icon: <ShoppingCart size={16} className="text-blue-400" />, iconBg: "rgba(59,130,246,0.12)" },
    { title: t("المنتجات المتاحة"), value: liveStats?.totalProducts ?? 0, change: 5.1, icon: <Package size={16} className="text-orange-400" />, iconBg: "rgba(249,115,22,0.12)" },
    { title: t("معدل التحويل"), value: "7.4", unit: "%", change: 3.2, icon: <TrendingUp size={16} className="text-purple-400" />, iconBg: "rgba(139,92,246,0.12)" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-white text-2xl font-bold">{t("التحليلات")}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => <StatCard key={s.title} {...s} />)}
      </div>
      <div className="grid grid-cols-1 gap-4">
        <RevenueChart />
      </div>
      <TrafficChart />
    </div>
  );
}
