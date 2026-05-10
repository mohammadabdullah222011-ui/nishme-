import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { Loader2, ShoppingCart } from "lucide-react";

const statusToAr: Record<string, string> = {
  pending: "معلق",
  shipped: "قيد الشحن",
  completed: "مكتمل",
  cancelled: "ملغي",
};

const statusStyles: Record<string, string> = {
  "مكتمل": "text-green-400 bg-green-400/10 border-green-400/20",
  "قيد الشحن": "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "معلق": "text-orange-400 bg-orange-400/10 border-orange-400/20",
  "ملغي": "text-red-400 bg-red-400/10 border-red-400/20",
};

function timeAgo(iso: string) {
  try {
    const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (diff < 60) return "الآن";
    if (diff < 3600) return `منذ ${Math.floor(diff / 60)} دقيقة`;
    if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} ساعة`;
    if (diff < 172800) return "أمس";
    return new Date(iso).toLocaleDateString("ar-JO");
  } catch { return ""; }
}

export default function RecentOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async (silent = false) => {
      if (!silent) setLoading(true);
      try {
        const data = await adminApi.dashboard();
        setOrders(data.recentOrders || []);
      } catch {
        // silent fail
      } finally {
        if (!silent) setLoading(false);
      }
    };
    fetch();
    const interval = setInterval(() => fetch(true), 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">أحدث الطلبات</h3>
          <p className="text-white/40 text-xs mt-0.5">تتحدث تلقائياً</p>
        </div>
        {loading && <Loader2 size={13} className="animate-spin text-red-400/60" />}
      </div>

      {orders.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center py-6 gap-2 text-center">
          <ShoppingCart size={24} className="text-white/15" />
          <p className="text-white/30 text-xs">لا توجد طلبات بعد</p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-white/[0.05]">
          {orders.slice(0, 5).map((order) => {
            const arStatus = statusToAr[order.status] || order.status;
            return (
              <div key={order.id} className="flex items-center gap-3 py-2.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.3), rgba(220,38,38,0.1))" }}>
                  {order.customerName?.[0] || "#"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold truncate">{order.customerName}</p>
                  <p className="text-white/40 text-[10px]">{timeAgo(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-xs font-bold" style={{ fontFamily: "'Orbitron', monospace" }}>
                    {order.total?.toLocaleString("en")}
                  </p>
                  <p className="text-white/30 text-[10px]">JOD</p>
                </div>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${statusStyles[arStatus] || "text-white/50"}`}>
                  {arStatus}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
