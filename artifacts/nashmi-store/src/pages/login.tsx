import { useState } from "react";
import { Link } from "wouter";
import { Gamepad2, Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage("تم تسجيل الدخول بنجاح! مرحباً بك في نشمي سوق.");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      {/* Background */}
      <div
        className="absolute inset-0 hero-grid opacity-30"
        style={{ top: 64 }}
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-64 blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #dc2626, transparent)" }}
      />

      <div className="relative w-full max-w-md">
        {/* Card */}
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
            <p className="text-white/40 text-sm mt-1">تسجيل الدخول إلى حسابك</p>
          </div>

          {message ? (
            <div
              className="p-5 rounded-2xl border border-green-500/30 text-center mb-4"
              style={{ background: "rgba(34,197,94,0.1)" }}
            >
              <p className="text-green-400 font-semibold">{message}</p>
              <Link href="/">
                <button className="mt-3 text-sm text-white/60 hover:text-white transition-colors">
                  العودة للرئيسية
                </button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Email */}
              <div>
                <label className="block text-white/50 text-sm mb-2 font-medium">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute top-1/2 -translate-y-1/2 right-4 text-white/30"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-11 pl-4 text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
                    data-testid="input-login-email"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-white/50 text-sm mb-2 font-medium">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute top-1/2 -translate-y-1/2 right-4 text-white/30"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="كلمة المرور"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-11 pl-10 text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
                    data-testid="input-login-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 -translate-y-1/2 left-4 text-white/30 hover:text-white/60 transition-colors"
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <a href="#" className="text-red-400 text-sm hover:text-red-300 transition-colors">
                  نسيت كلمة المرور؟
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl font-bold text-white text-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:scale-100"
                style={{
                  background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                  boxShadow: "0 0 20px rgba(220,38,38,0.4)",
                }}
                data-testid="button-login-submit"
              >
                {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
              </button>
            </form>
          )}

          {!message && (
            <p className="text-center text-white/40 text-sm mt-6">
              ليس لديك حساب؟{" "}
              <Link href="/register" className="text-red-400 hover:text-red-300 font-semibold transition-colors">
                إنشاء حساب
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
