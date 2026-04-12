import { useState } from "react";
import Modal from "@/components/Modal";
import { Package } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (product: any) => void;
}

const categories = ["كمبيوتر", "كونسول", "إكسسوارات", "ألعاب"];

export default function AddProductModal({ open, onClose, onAdd }: Props) {
  const [form, setForm] = useState({ name: "", category: categories[0], price: "", stock: "", status: "متوفر" });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) return;
    onAdd({ ...form, price: Number(form.price), stock: Number(form.stock), id: Date.now() });
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); setForm({ name: "", category: categories[0], price: "", stock: "", status: "متوفر" }); }, 1000);
  };

  return (
    <Modal open={open} onClose={onClose} title="إضافة منتج جديد">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" dir="rtl">
        <div>
          <label className="text-white/60 text-xs font-medium block mb-1.5">اسم المنتج</label>
          <input
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
            placeholder="مثال: PlayStation 5"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">الفئة</label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
              style={{ background: "rgba(255,255,255,0.05)" }}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {categories.map((c) => <option key={c} value={c} style={{ background: "#111" }}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">الحالة</label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
              style={{ background: "rgba(255,255,255,0.05)" }}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              {["متوفر", "منخفض", "نفد"].map((s) => <option key={s} value={s} style={{ background: "#111" }}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">السعر (JOD)</label>
            <input
              type="number"
              min="0"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
              placeholder="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">الكمية</label>
            <input
              type="number"
              min="0"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
              placeholder="0"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              required
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
          <Package size={15} />
          {saved ? "تم الحفظ ✓" : "إضافة المنتج"}
        </button>
      </form>
    </Modal>
  );
}
