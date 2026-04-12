import { useState } from "react";
import Modal from "@/components/Modal";
import { TrendingUp } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (sale: any) => void;
}

export default function AddSaleModal({ open, onClose, onAdd }: Props) {
  const [form, setForm] = useState({ product: "", quantity: "", revenue: "", channel: "الموقع الإلكتروني", date: "" });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.product || !form.quantity || !form.revenue) return;
    onAdd({ ...form, quantity: Number(form.quantity), revenue: Number(form.revenue), id: Date.now() });
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); setForm({ product: "", quantity: "", revenue: "", channel: "الموقع الإلكتروني", date: "" }); }, 1000);
  };

  return (
    <Modal open={open} onClose={onClose} title="تسجيل مبيعة جديدة">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" dir="rtl">
        <div>
          <label className="text-white/60 text-xs font-medium block mb-1.5">المنتج</label>
          <input
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
            placeholder="مثال: Xbox Series X"
            value={form.product}
            onChange={(e) => setForm({ ...form, product: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">الكمية المباعة</label>
            <input
              type="number"
              min="1"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
              placeholder="0"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">الإيراد (JOD)</label>
            <input
              type="number"
              min="0"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
              placeholder="0"
              value={form.revenue}
              onChange={(e) => setForm({ ...form, revenue: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">قناة البيع</label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
              style={{ background: "rgba(255,255,255,0.05)" }}
              value={form.channel}
              onChange={(e) => setForm({ ...form, channel: e.target.value })}
            >
              {["الموقع الإلكتروني", "تطبيق الجوال", "المتجر", "وسيط"].map((c) => (
                <option key={c} value={c} style={{ background: "#111" }}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">التاريخ</label>
            <input
              type="date"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
              style={{ colorScheme: "dark" }}
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
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
          <TrendingUp size={15} />
          {saved ? "تم الحفظ ✓" : "تسجيل المبيعة"}
        </button>
      </form>
    </Modal>
  );
}
