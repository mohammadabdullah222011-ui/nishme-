import { recentOrders } from "@/data/mockData";

const statusStyles: Record<string, string> = {
  "مكتمل": "text-green-400 bg-green-400/10 border-green-400/20",
  "قيد الشحن": "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "معلق": "text-orange-400 bg-orange-400/10 border-orange-400/20",
  "ملغي": "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function RecentOrders() {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">أحدث الطلبات</h3>
          <p className="text-white/40 text-xs mt-0.5">آخر 5 طلبات</p>
        </div>
        <button
          className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors"
          data-testid="button-view-all-orders"
        >
          عرض الكل
        </button>
      </div>

      <div className="flex flex-col divide-y divide-white/[0.05]">
        {recentOrders.map((order) => (
          <div key={order.id} className="flex items-center gap-3 py-2.5" data-testid={`order-${order.id}`}>
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.3), rgba(220,38,38,0.1))" }}
            >
              {order.customer[0]}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">{order.customer}</p>
              <p className="text-white/40 text-[10px] truncate">{order.product}</p>
            </div>

            {/* Amount */}
            <div className="text-right">
              <p
                className="text-white text-xs font-bold"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                {order.amount.toLocaleString()}
              </p>
              <p className="text-white/30 text-[10px]">JOD</p>
            </div>

            {/* Status */}
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusStyles[order.status] || "text-white/50"}`}
            >
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
