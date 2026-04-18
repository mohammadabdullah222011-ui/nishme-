import { useState, useEffect, useCallback } from "react";
import { Search, Filter, Download, RefreshCw, Loader2, ChevronDown } from "lucide-react";
import { adminApi, type AdminOrder } from "@/lib/api";

const statusToAr: Record<string, string> = {
  pending: "معلق",
  shipped: "قيد الشحن",
  completed: "مكتمل",
  cancelled: "ملغي",
};

const statusToEn: Record<string, string> = {
  "معلق": "pending",
  "قيد الشحن": "shipped",
  "مكتمل": "completed",
  "ملغي": "cancelled",
};

const statusStyles: Record<string, string> = {
  "مكتمل": "text-green-400 bg-green-400/10 border-green-400/20",
  "قيد الشحن": "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "معلق": "text-orange-400 bg-orange-400/10 border-orange-400/20",
  "ملغي": "text-red-400 bg-red-400/10 border-red-400/20",
};

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    const now = new Date();
    const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
    if (diff < 60) return "الآن";
    if (diff < 3600) return `منذ ${Math.floor(diff / 60)} دقيقة`;
    if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} ساعة`;
    if (diff < 172800) return "أمس";
    return d.toLocaleDateString("ar-JO");
  } catch {
    return iso;
  }
}

export default function Orders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchOrders = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const data = await adminApi.getOrders();
      setOrders(data);
      setError("");
    } catch (e: any) {
      if (!silent) setError(e.message);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(() => fetchOrders(true), 8000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleStatusChange = async (id: number, arStatus: string) => {
    const enStatus = statusToEn[arStatus] || arStatus;
    setUpdatingId(id);
    try {
      const updated = await adminApi.updateOrderStatus(id, enStatus);
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: updated.status } : o)));
    } catch {
      // ignore
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = orders.filter((o) =>
    o.customerName.includes(search) ||
    String(o.id).includes(search)
  );

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const completedCount = orders.filter((o) => o.status === "completed").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-white text-2xl font-bold">الطلبات</h1>
          <span className="text-white/30 text-sm">({orders.length})</span>
          <button onClick={() => fetchOrders()} title="تحديث"
            className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all">
          <Download size={15} />تصدير
        </button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "إجمالي الطلبات", value: orders.length, color: "text-white" },
          { label: "معلق", value: pendingCount, color: "text-orange-400" },
          { label: "مكتمل", value: completedCount, color: "text-green-400" },
        ].map((s) => (
          <div key={s.label} className="stat-card py-3 text-center">
            <p className={`text-xl font-bold ${s.color}`} style={{ fontFamily: "'Orbitron', monospace" }}>{s.value}</p>
            <p className="text-white/40 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {error && (
        <div className="p-3 rounded-xl border border-red-500/25 text-red-400 text-sm"
          style={{ background: "rgba(220,38,38,0.08)" }}>⚠️ {error}</div>
      )}

      {/* Table */}
      <div className="stat-card">
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={14} className="absolute top-1/2 -translate-y-1/2 left-3 text-white/30" />
            <input type="search" placeholder="البحث في الطلبات..."
              className="w-full bg-white/5 border border-white/8 rounded-xl py-2 pl-8 pr-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/40 transition-colors"
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/8 text-white/50 hover:text-white text-sm transition-all">
            <Filter size={14} />فلتر
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 gap-3">
            <Loader2 size={24} className="animate-spin text-red-500" />
            <span className="text-white/40 text-sm">جارٍ تحميل الطلبات...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["رقم الطلب", "العميل", "المبلغ", "الحالة", "تغيير الحالة", "التاريخ"].map((h) => (
                    <th key={h} className="text-right text-white/35 font-medium text-xs pb-3 px-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => {
                  const arStatus = statusToAr[order.status] || order.status;
                  return (
                    <tr key={order.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-2">
                        <span className="text-red-400 font-mono text-xs font-semibold">
                          #{String(order.id).padStart(4, "0")}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.3), rgba(220,38,38,0.1))" }}>
                            {order.customerName?.[0] || "?"}
                          </div>
                          <span className="text-white/80 text-xs font-medium">{order.customerName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-white font-bold text-xs" style={{ fontFamily: "'Orbitron', monospace" }}>
                          {order.total.toLocaleString("en")} JOD
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${statusStyles[arStatus] || "text-white/50"}`}>
                          {arStatus}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="relative">
                          {updatingId === order.id ? (
                            <Loader2 size={14} className="animate-spin text-red-400" />
                          ) : (
                            <div className="relative inline-block">
                              <select
                                value={arStatus}
                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                className="appearance-none bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white/70 focus:outline-none focus:border-red-500/40 cursor-pointer pr-5"
                                style={{ background: "rgba(255,255,255,0.05)" }}>
                                {["معلق", "قيد الشحن", "مكتمل", "ملغي"].map((s) => (
                                  <option key={s} value={s} style={{ background: "#111" }}>{s}</option>
                                ))}
                              </select>
                              <ChevronDown size={10} className="absolute top-1/2 -translate-y-1/2 left-1.5 text-white/30 pointer-events-none" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-2 text-white/35 text-xs">{formatDate(order.createdAt)}</td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-white/30 text-sm">
                      {search ? "لا توجد نتائج" : "لا توجد طلبات حتى الآن — ستظهر هنا عند تسجيل أول طلب"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {orders.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/[0.05] flex items-center justify-between">
            <span className="text-white/30 text-xs">إجمالي الإيرادات من الطلبات</span>
            <span className="text-white font-bold text-sm" style={{ fontFamily: "'Orbitron', monospace" }}>
              {totalRevenue.toLocaleString("en")} JOD
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
