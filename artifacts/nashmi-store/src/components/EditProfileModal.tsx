import { useState, useEffect } from "react";
import { X, User, Mail, Phone, Save } from "lucide-react";
import { useUser } from "@/context/UserContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ open, onClose }: Props) {
  const { user, updateProfile } = useUser();
  const [form, setForm] = useState({ name: "", phone: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) setForm({ name: user.name, phone: user.phone });
  }, [user, open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: form.name, phone: form.phone });
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
        style={{ background: "rgba(10,10,10,0.98)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b border-white/8"
          style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.08), transparent)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
              style={{ background: "linear-gradient(135deg, #dc2626, #7f1d1d)", boxShadow: "0 0 15px rgba(220,38,38,0.4)" }}
            >
              {user.avatar}
            </div>
            <div>
              <p className="text-white font-bold text-base">{user.name}</p>
              <p className="text-white/40 text-xs">{user.role === "admin" ? "مدير النظام" : "مستخدم"}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/30 hover:text-white hover:bg-white/8 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-4" dir="rtl">
          {/* Email (read-only) */}
          <div>
            <label className="text-white/50 text-xs font-medium block mb-1.5">البريد الإلكتروني</label>
            <div className="relative">
              <Mail size={14} className="absolute top-1/2 -translate-y-1/2 right-3.5 text-white/20" />
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full bg-white/3 border border-white/8 rounded-xl py-2.5 pr-9 pl-4 text-white/40 text-sm cursor-not-allowed"
                dir="ltr"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-white/50 text-xs font-medium block mb-1.5">الاسم الكامل</label>
            <div className="relative">
              <User size={14} className="absolute top-1/2 -translate-y-1/2 right-3.5 text-white/30" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="اسمك الكامل"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pr-9 pl-4 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors placeholder:text-white/20"
                required
                data-testid="input-edit-name"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-white/50 text-xs font-medium block mb-1.5">رقم الهاتف</label>
            <div className="relative">
              <Phone size={14} className="absolute top-1/2 -translate-y-1/2 right-3.5 text-white/30" />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+962 7X XXX XXXX"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pr-9 pl-4 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors placeholder:text-white/20"
                dir="ltr"
                data-testid="input-edit-phone"
              />
            </div>
          </div>

          {/* Role badge */}
          <div
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold ${
              user.role === "admin"
                ? "border-red-500/25 text-red-400 bg-red-500/8"
                : "border-blue-500/20 text-blue-300 bg-blue-500/8"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${user.role === "admin" ? "bg-red-500" : "bg-blue-400"}`} />
            {user.role === "admin" ? "مدير النظام (Admin)" : "مستخدم عادي"}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all duration-300 mt-1"
            style={{
              background: saved ? "rgba(16,185,129,0.9)" : "linear-gradient(135deg, #dc2626, #b91c1c)",
              boxShadow: saved ? "0 0 20px rgba(16,185,129,0.4)" : "0 0 20px rgba(220,38,38,0.35)",
            }}
            data-testid="button-save-profile"
          >
            <Save size={15} />
            {saved ? "تم الحفظ ✓" : "حفظ التعديلات"}
          </button>
        </form>
      </div>
    </div>
  );
}
