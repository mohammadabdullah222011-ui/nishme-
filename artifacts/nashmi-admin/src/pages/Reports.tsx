import { useState, useEffect, useCallback } from "react";
import { FileText, Download, Loader2, BarChart3, TrendingUp, DollarSign, ShoppingCart } from "lucide-react";
import { adminApi } from "@/lib/api";
import { useLang } from "@/i18n/context";

export default function Reports() {
  const { t } = useLang();
  const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0, totalProducts: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const data = await adminApi.dashboard();
      setStats(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const reports = [
    { label: t("تقرير المبيعات"), desc: t("إجمالي المبيعات والإيرادات"), icon: DollarSign, value: `${stats.totalRevenue.toLocaleString("en")} JD` },
    { label: t("تقرير الطلبات"), desc: t("جميع الطلبات والحالات"), icon: ShoppingCart, value: `${stats.totalOrders} ${t("طلب")}` },
    { label: t("تقرير المنتجات"), desc: t("المنتجات والمخزون"), icon: BarChart3, value: `${stats.totalProducts} ${t("منتج")}` },
    { label: t("تقرير المستخدمين"), desc: t("المستخدمون المسجلون"), icon: TrendingUp, value: `${stats.totalUsers} ${t("مستخدم")}` },
  ];

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-red-500" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.3), rgba(220,38,38,0.1))" }}>
            <FileText size={16} className="text-red-400" />
          </div>
          <h1 className="text-white text-2xl font-bold">{t("التقارير")}</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "rgba(220,38,38,0.85)" }}>
          <Download size={15} />{t("تصدير الكل")}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reports.map((r) => (
          <div key={r.label} className="stat-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(220,38,38,0.15)" }}>
                <r.icon size={18} className="text-red-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{r.label}</p>
                <p className="text-white/40 text-xs">{r.desc}</p>
              </div>
            </div>
            <p className="text-white font-bold text-lg" style={{ fontFamily: "'Orbitron', monospace" }}>{r.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}