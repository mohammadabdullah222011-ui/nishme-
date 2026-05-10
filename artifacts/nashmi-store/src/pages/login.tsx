import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useUser } from "@/context/UserContext";

const logoImg = `${import.meta.env.BASE_URL}logo-nashmi.png`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [, navigate] = useLocation();
  const { login } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "بيانات الدخول غير صحيحة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="absolute inset-0 hero-grid opacity-30" style={{ top: 64 }} />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-64 blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #dc2626, transparent)" }}
      />

      <div className="relative w-full max-w-md">
        <div
          className="rounded-3xl p-8 sm:p-10 border border-white/10"
          style={{ background: "rgba(10,10,10,0.9)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex flex-col items-center mb-8">
            <img src={logoImg} alt="نشمي سوق" className="h-16 w-auto object-contain mb-3"
              style={{ filter: "drop-shadow(0 0 12px rgba(220,38,38,0.5))" }} />
            <p className="text-white/40 text-sm">تسجيل الدخول إلى حسابك</p>
            <p className="text-white/25 text-xs mt-1">
              استخدم <span className="text-red-400/70">admin@nashmi.com</span> للدخول كمدير
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl border border-red-500/30 text-red-400 text-sm text-center"
              style={{ background: "rgba(220,38,38,0.08)" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-white/50 text-sm mb-2 font-medium">البريد الإلكتروني</label>
              <div className="relative">
                <Mail size={16} className="absolute top-1/2 -translate-y-1/2 right-4 text-white/30" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com" dir="ltr"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-11 pl-4 text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
                  data-testid="input-login-email" />
              </div>
            </div>

            <div>
              <label className="block text-white/50 text-sm mb-2 font-medium">كلمة المرور</label>
              <div className="relative">
                <Lock size={16} className="absolute top-1/2 -translate-y-1/2 right-4 text-white/30" />
                <input type={showPassword ? "text" : "password"} required value={password}
                  onChange={(e) => setPassword(e.target.value)} placeholder="كلمة المرور"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-11 pl-10 text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
                  data-testid="input-login-password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 left-4 text-white/30 hover:text-white/60 transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-2xl font-bold text-white text-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:scale-100"
              style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", boxShadow: "0 0 20px rgba(220,38,38,0.4)" }}
              data-testid="button-login-submit">
              {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
            </button>
          </form>

          <p className="text-center text-white/40 text-sm mt-6">
            ليس لديك حساب؟{" "}
            <Link href="/register" className="text-red-400 hover:text-red-300 font-semibold transition-colors">
              إنشاء حساب
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
