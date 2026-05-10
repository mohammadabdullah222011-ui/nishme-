import { Shield, UserCheck, Key, Lock, AlertTriangle, CheckCircle } from "lucide-react";
import { useLang } from "@/i18n/context";

export default function Security() {
  const { t } = useLang();
  const logs = [
    { action: t("تسجيل دخول"), user: "admin@nashmi.com", time: "منذ 5 دقائق", status: "success" },
    { action: t("تغيير كلمة المرور"), user: "admin@nashmi.com", time: "منذ ساعتين", status: "success" },
    { action: t("محاولة دخول فاشلة"), user: "unknown@test.com", time: "منذ 3 ساعات", status: "failed" },
    { action: t("تحديث الصلاحيات"), user: "admin@nashmi.com", time: "منذ يوم", status: "success" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.3), rgba(220,38,38,0.1))" }}>
          <Shield size={16} className="text-red-400" />
        </div>
        <h1 className="text-white text-2xl font-bold">{t("الأمان")}</h1>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: t("المستخدمون النشطون"), value: "1", icon: UserCheck },
          { label: t("جلسات اليوم"), value: "3", icon: Key },
          { label: t("محاولات فاشلة"), value: "1", icon: Lock },
          { label: t("نشاط مشبوه"), value: "0", icon: AlertTriangle },
        ].map((s) => (
          <div key={s.label} className="stat-card py-4 text-center">
            <s.icon size={18} className="text-red-400 mx-auto mb-2" />
            <p className="text-white font-bold text-lg" style={{ fontFamily: "'Orbitron', monospace" }}>{s.value}</p>
            <p className="text-white/40 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="stat-card">
        <h2 className="text-white font-semibold text-sm mb-4">{t("سجل النشاط")}</h2>
        <div className="space-y-2">
          {logs.map((log, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center gap-3">
                {log.status === "success" ? <CheckCircle size={16} className="text-green-400" /> : <AlertTriangle size={16} className="text-red-400" />}
                <div>
                  <p className="text-white/80 text-xs font-medium">{log.action}</p>
                  <p className="text-white/40 text-[10px]">{log.user}</p>
                </div>
              </div>
              <span className="text-white/30 text-xs">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}