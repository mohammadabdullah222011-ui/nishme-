import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";

const logoImg = `/admin/logo-nashmi.png`;

export default function AdminLoginGate({ children }: { children: React.ReactNode }) {
  const { token, login, loading } = useAdminAuth();
  const [email, setEmail] = useState("admin@nashmi.com");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  if (token) return <>{children}</>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "بيانات الدخول غير صحيحة");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(5,5,5,0.98)", backdropFilter: "blur(20px)" }}
    >
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "linear-gradient(rgba(220,38,38,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.15) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative w-full max-w-sm">
        <div className="rounded-3xl p-8 border border-white/10 shadow-2xl"
          style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(30px)" }}>

          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "linear-gradient(135deg, #dc2626, #7f1d1d)", boxShadow: "0 0 20px rgba(220,38,38,0.5)" }}>
              <Shield size={26} className="text-white" />
            </div>
            <h1 className="text-white text-2xl font-bold" style={{ fontFamily: "'Orbitron', monospace" }}>ADMIN PANEL</h1>
            <p className="text-white/40 text-sm mt-1">نشمي سوق — لوحة الإدارة</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl border border-red-500/30 text-red-400 text-sm text-center"
              style={{ background: "rgba(220,38,38,0.08)" }}>{error}</div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">البريد الإلكتروني</label>
              <div className="relative">
                <Mail size={15} className="absolute top-1/2 -translate-y-1/2 left-3.5 text-white/30" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors"
                  dir="ltr" />
              </div>
            </div>

            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">كلمة المرور</label>
              <div className="relative">
                <Lock size={15} className="absolute top-1/2 -translate-y-1/2 left-3.5 text-white/30" />
                <input type={showPw ? "text" : "password"} required value={password}
                  onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-9 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute top-1/2 -translate-y-1/2 right-3.5 text-white/30 hover:text-white/60 transition-colors">
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <p className="text-white/25 text-xs text-center">كلمة المرور الافتراضية: admin123</p>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
              style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", boxShadow: "0 0 20px rgba(220,38,38,0.35)" }}>
              <Shield size={15} />
              {loading ? "جارٍ التحقق..." : "دخول الإدارة"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
