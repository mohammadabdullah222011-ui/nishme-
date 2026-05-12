import { X, Package, ShoppingCart, CreditCard, User, Calendar, Phone, MapPin, DollarSign } from "lucide-react";
import type { AdminOrder } from "@/lib/api";

interface Props {
  order: AdminOrder | null;
  onClose: () => void;
}

const statusToAr: Record<string, string> = {
  pending: "معلق",
  shipped: "قيد الشحن",
  completed: "مكتمل",
  cancelled: "ملغي",
};

const statusStyles: Record<string, string> = {
  completed: "text-green-400 bg-green-400/10 border-green-400/20",
  shipped: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  pending: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  cancelled: "text-red-400 bg-red-400/10 border-red-400/20",
};

function formatDateFull(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("ar-JO", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
}

export default function OrderDetailModal({ order, onClose }: Props) {
  if (!order) return null;

  const arStatus = statusToAr[order.status] || order.status;
  const items = order.items || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        style={{ background: "rgba(14,14,14,0.98)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.3), rgba(220,38,38,0.1))" }}>
              <ShoppingCart size={16} className="text-red-400" />
            </div>
            <div>
              <h2 className="text-white font-bold text-base">تفاصيل الطلب</h2>
              <p className="text-red-400 font-mono text-xs">#{String(order.id).padStart(4, "0")}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-all">
            <X size={16} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center gap-2 mb-2">
                <User size={14} className="text-white/30" />
                <span className="text-white/40 text-xs">العميل</span>
              </div>
              <p className="text-white font-semibold text-sm">{order.customerName}</p>
            </div>
            <div className="p-4 rounded-xl border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Phone size={14} className="text-white/30" />
                <span className="text-white/40 text-xs">رقم الهاتف</span>
              </div>
              <p className="text-white/80 text-sm font-mono" dir="ltr">{order.phone || "—"}</p>
            </div>
            <div className="p-4 rounded-xl border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} className="text-white/30" />
                <span className="text-white/40 text-xs">العنوان</span>
              </div>
              <p className="text-white/80 text-sm">{order.address || "—"}</p>
            </div>
            <div className="p-4 rounded-xl border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={14} className="text-white/30" />
                <span className="text-white/40 text-xs">التاريخ</span>
              </div>
              <p className="text-white/80 text-sm">{formatDateFull(order.createdAt)}</p>
            </div>
            <div className="p-4 rounded-xl border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Package size={14} className="text-white/30" />
                <span className="text-white/40 text-xs">الحالة</span>
              </div>
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${statusStyles[order.status] || "text-white/50"}`}>
                {arStatus}
              </span>
            </div>
            <div className="p-4 rounded-xl border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={14} className="text-white/30" />
                <span className="text-white/40 text-xs">طريقة الدفع</span>
              </div>
              <p className="text-white/80 text-sm">{order.paymentMethod === "click" ? "تحويل بنكي / كليك" : "الدفع عند الاستلام"}</p>
            </div>
          </div>

          {/* Total */}
          <div className="p-4 rounded-xl border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard size={14} className="text-white/30" />
              <span className="text-white/40 text-xs">الإجمالي</span>
            </div>
            <p className="text-white font-bold text-lg" style={{ fontFamily: "'Orbitron', monospace" }}>
              {order.total.toLocaleString("en")} <span className="text-sm">JD</span>
            </p>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <Package size={14} className="text-red-400" />
              المنتجات المطلوبة ({items.length})
            </h3>
            {items.length === 0 ? (
              <p className="text-white/30 text-sm text-center py-6">لا توجد منتجات في هذا الطلب</p>
            ) : (
              <div className="space-y-2">
                {items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-white/10" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white/30 flex-shrink-0 border border-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
                        <Package size={18} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white/85 font-medium text-sm truncate">{item.name}</p>
                      <p className="text-white/40 text-xs mt-0.5">
                        {item.quantity} × {item.price.toLocaleString("en")} JD
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-sm" style={{ fontFamily: "'Orbitron', monospace" }}>
                        {(item.quantity * item.price).toLocaleString("en")} JD
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Total line */}
          {items.length > 0 && (
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-white/50 text-sm">المجموع</span>
              <span className="text-white font-bold text-base" style={{ fontFamily: "'Orbitron', monospace" }}>
                {order.total.toLocaleString("en")} JD
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}