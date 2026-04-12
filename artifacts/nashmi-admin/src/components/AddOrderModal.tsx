import { useState } from "react";
import Modal from "@/components/Modal";
import { ShoppingCart } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (order: any) => void;
}

export default function AddOrderModal({ open, onClose, onAdd }: Props) {
  const [form, setForm] = useState({ customer: "", product: "", amount: "", status: "معلق" });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customer || !form.product || !form.amount) return;
    const id = `ORD-${8842 + Math.floor(Math.random() * 100)}`;
    onAdd({ ...form, amount: Number(form.amount), id, time: "الآن" });
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); setForm({ customer: "", product: "", amount: "", status: "معلق" }); }, 1000);
  };

  return (
    <Modal open={open} onClose={onClose} title="إضافة طلب جديد">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" dir="rtl">
        <div>
          <label className="text-white/60 text-xs font-medium block mb-1.5">اسم العميل</label>
          <input
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
            placeholder="مثال: محمد العتيبي"
            value={form.customer}
            onChange={(e) => setForm({ ...form, customer: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="text-white/60 text-xs font-medium block mb-1.5">المنتج</label>
          <input
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
            placeholder="مثال: PlayStation 5"
            value={form.product}
            onChange={(e) => setForm({ ...form, product: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">المبلغ (JOD)</label>
            <input
              type="number"
              min="0"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
              placeholder="0"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">الحالة</label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
              style={{ background: "rgba(255,255,255,0.05)" }}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              {["معلق", "مكتمل", "قيد الشحن", "ملغي"].map((s) => (
                <option key={s} value={s} style={{ background: "#111" }}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 flex items-center justify-center gap-2 mt-1"
          style={{
            background: saved ? "rgba(16,185,129,0.85)" : "rgba(220,38,38,0.85)",
            boxShadow: saved ? "0 0 20px rgba(16,185,129,0.4)" : "0 0 20px rgba(220,38,38,0.3)",
          }}
        >
          <ShoppingCart size={15} />
          {saved ? "تم الحفظ ✓" : "إضافة الطلب"}
        </button>
      </form>
    </Modal>
  );
}
