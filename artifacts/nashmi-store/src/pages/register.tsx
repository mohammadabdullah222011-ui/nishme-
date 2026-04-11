import { useState } from "react";
import { Link } from "wouter";
import { Gamepad2, Eye, EyeOff, Mail, Lock, User, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("كلمة المرور وتأكيدها غير متطابقتين");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16 pb-12">
      <div className="absolute inset-0 hero-grid opacity-30" style={{ top: 64 }} />
      <div
        className="absolute top-1/3 right-1/4 w-80 h-64 blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #dc2626, transparent)" }}
      />

      <div className="relative w-full max-w-md">
        <div
          className="rounded-3xl p-8 sm:p-10 border border-white/10"
          style={{ background: "rgba(10,10,10,0.9)", backdropFilter: "blur(20px)" }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{
                background: "linear-gradient(135deg, #dc2626, #7f1d1d)",
                boxShadow: "0 0 20px rgba(220,38,38,0.4)",
              }}
            >
              <Gamepad2 size={28} className="text-white" />
            </div>
            <h1
              className="text-3xl font-black text-white"
              style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 900 }}
            >
              نشمي سوق
            </h1>
            <p className="text-white/40 text-sm mt-1">إنشاء حساب جديد</p>
          </div>

          {success ? (
            <div className="flex flex-col items-center py-8 text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}
              >
                <CheckCircle size={40} className="text-green-400" />
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">مرحباً بك!</h3>
              <p className="text-white/50 mb-6">تم إنشاء حسابك بنجاح. يمكنك الآن تسجيل الدخول.</p>
              <Link href="/login">
                <button
                  className="px-8 py-3 rounded-2xl font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)" }}
                  data-testid="button-go-to-login"
                >
                  تسجيل الدخول
                </button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div
                  className="p-3 rounded-xl border border-red-500/30 text-red-400 text-sm text-center"
                  style={{ background: "rgba(220,38,38,0.08)" }}
                >
                  {error}
                </div>
              )}

              <div>
                <label className="block text-white/50 text-sm mb-2 font-medium">الاسم الكامل</label>
                <div className="relative">
                  <User size={16} className="absolute top-1/2 -translate-y-1/2 right-4 text-white/30" />
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="اسمك الكامل"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-11 pl-4 text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
                    data-testid="input-register-name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/50 text-sm mb-2 font-medium">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail size={16} className="absolute top-1/2 -translate-y-1/2 right-4 text-white/30" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="example@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-11 pl-4 text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
                    data-testid="input-register-email"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/50 text-sm mb-2 font-medium">كلمة المرور</label>
                <div className="relative">
                  <Lock size={16} className="absolute top-1/2 -translate-y-1/2 right-4 text-white/30" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="كلمة مرور قوية"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-11 pl-10 text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
                    data-testid="input-register-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 -translate-y-1/2 left-4 text-white/30 hover:text-white/60 transition-colors"
                    data-testid="button-toggle-register-password"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-white/50 text-sm mb-2 font-medium">تأكيد كلمة المرور</label>
                <div className="relative">
                  <Lock size={16} className="absolute top-1/2 -translate-y-1/2 right-4 text-white/30" />
                  <input
                    type="password"
                    required
                    value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                    placeholder="أعد إدخال كلمة المرور"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-11 pl-4 text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
                    data-testid="input-register-confirm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl font-bold text-white text-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-70 mt-2"
                style={{
                  background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                  boxShadow: "0 0 20px rgba(220,38,38,0.4)",
                }}
                data-testid="button-register-submit"
              >
                {loading ? "جارٍ إنشاء الحساب..." : "إنشاء حساب"}
              </button>
            </form>
          )}

          {!success && (
            <p className="text-center text-white/40 text-sm mt-5">
              لديك حساب بالفعل؟{" "}
              <Link href="/login" className="text-red-400 hover:text-red-300 font-semibold transition-colors">
                تسجيل الدخول
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
