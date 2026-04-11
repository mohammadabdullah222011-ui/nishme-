import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { SiX, SiInstagram, SiDiscord } from "react-icons/si";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", message: "" });
    }, 4000);
  };

  const contactInfo = [
    { icon: Mail, label: "البريد الإلكتروني", value: "info@nashmi.sa" },
    { icon: Phone, label: "رقم الجوال", value: "+966 50 000 0000" },
    { icon: MapPin, label: "العنوان", value: "الرياض، المملكة العربية السعودية" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            className="text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 900 }}
          >
            تواصل معنا
          </h1>
          <p className="text-white/40 text-lg max-w-md mx-auto">
            نحن هنا لمساعدتك. أرسل لنا رسالة وسنرد عليك في أقرب وقت.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/8"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(220,38,38,0.12)" }}
                >
                  <Icon size={20} className="text-red-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-1">
                    {label}
                  </p>
                  <p className="text-white font-semibold text-sm">{value}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div
              className="p-5 rounded-2xl border border-white/8"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-4">
                تابعنا
              </p>
              <div className="flex gap-3">
                {[SiX, SiInstagram, SiDiscord].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-red-400 hover:border-red-500/40 hover:bg-red-600/10 transition-all duration-200"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div
              className="p-5 rounded-2xl border border-red-900/20"
              style={{ background: "rgba(220,38,38,0.04)" }}
            >
              <p className="text-red-400 text-sm font-bold mb-3">ساعات الدعم</p>
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/50">الأحد - الخميس</span>
                  <span className="text-white/80 font-medium">9ص - 6م</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">الجمعة - السبت</span>
                  <span className="text-white/80 font-medium">10ص - 4م</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div
              className="rounded-3xl p-8 border border-white/8"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}
                  >
                    <CheckCircle size={40} className="text-green-400" />
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-3">تم الإرسال!</h3>
                  <p className="text-white/50">شكراً لتواصلك معنا. سنرد عليك قريباً.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="text-white font-bold text-xl mb-2">أرسل رسالة</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/50 text-sm mb-2 font-medium">
                        الاسم
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="اسمك الكريم"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500/50 transition-colors"
                        data-testid="input-contact-name"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-sm mb-2 font-medium">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="بريدك الإلكتروني"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500/50 transition-colors"
                        data-testid="input-contact-email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/50 text-sm mb-2 font-medium">
                      الرسالة
                    </label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="اكتب رسالتك هنا..."
                      rows={6}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500/50 transition-colors resize-none"
                      data-testid="input-contact-message"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 hover:scale-[1.02] active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                      boxShadow: "0 0 20px rgba(220,38,38,0.4)",
                    }}
                    data-testid="button-contact-submit"
                  >
                    <Send size={20} />
                    إرسال الرسالة
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
