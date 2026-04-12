import { useState } from "react";
import { recentOrders } from "@/data/mockData";
import { Search, Filter, Download, Plus } from "lucide-react";
import AddOrderModal from "@/components/AddOrderModal";

const initialOrders = [
  ...recentOrders,
  { id: "ORD-8836", customer: "خالد الدوسري", product: "SteelSeries Arctis Nova", amount: 599, status: "مكتمل", time: "منذ 3 ساعات" },
  { id: "ORD-8835", customer: "منى الغامدي", product: "Logitech G502 X", amount: 329, status: "قيد الشحن", time: "منذ 4 ساعات" },
  { id: "ORD-8834", customer: "يوسف الشمري", product: "Gaming Chair RGB", amount: 1899, status: "مكتمل", time: "منذ 5 ساعات" },
  { id: "ORD-8833", customer: "ريم الأحمدي", product: "Nintendo Switch OLED", amount: 1299, status: "معلق", time: "أمس" },
];

const statusStyles: Record<string, string> = {
  "مكتمل": "text-green-400 bg-green-400/10 border-green-400/20",
  "قيد الشحن": "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "معلق": "text-orange-400 bg-orange-400/10 border-orange-400/20",
  "ملغي": "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = orders.filter(
    (o) =>
      o.customer.includes(search) ||
      o.product.includes(search) ||
      o.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (order: any) => {
    setOrders([order, ...orders]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">الطلبات</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200"
            style={{ background: "rgba(220,38,38,0.85)", boxShadow: "0 0 15px rgba(220,38,38,0.3)" }}
            data-testid="button-add-order"
          >
            <Plus size={15} />
            طلب جديد
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all duration-200"
            data-testid="button-export-orders"
          >
            <Download size={15} />
            تصدير
          </button>
        </div>
      </div>

      <div className="stat-card">
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={14} className="absolute top-1/2 -translate-y-1/2 left-3 text-white/30" />
            <input
              type="search"
              placeholder="البحث في الطلبات..."
              className="w-full bg-white/5 border border-white/8 rounded-xl py-2 pl-8 pr-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/40 transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="input-orders-search"
            />
          </div>
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/8 text-white/50 hover:text-white hover:border-white/15 text-sm transition-all"
            data-testid="button-orders-filter"
          >
            <Filter size={14} />
            فلتر
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["رقم الطلب", "العميل", "المنتج", "المبلغ", "الحالة", "الوقت"].map((h) => (
                  <th key={h} className="text-right text-white/35 font-medium text-xs pb-3 px-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                  data-testid={`order-row-${order.id}`}
                >
                  <td className="py-3 px-2">
                    <span className="text-red-400 font-mono text-xs font-semibold">{order.id}</span>
                  </td>
                  <td className="py-3 px-2 text-white/80 font-medium">{order.customer}</td>
                  <td className="py-3 px-2 text-white/60">{order.product}</td>
                  <td className="py-3 px-2">
                    <span className="text-white font-bold text-xs" style={{ fontFamily: "'Orbitron', monospace" }}>
                      {order.amount.toLocaleString()} JOD
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${statusStyles[order.status] || "text-white/50"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-white/35 text-xs">{order.time}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-white/30 text-sm">
                    لا توجد نتائج
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddOrderModal open={showModal} onClose={() => setShowModal(false)} onAdd={handleAdd} />
    </div>
  );
}
