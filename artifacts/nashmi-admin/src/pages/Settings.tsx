import { useState } from "react";
import { Settings as SettingsIcon, Save, Globe, Bell, Shield, Palette, RefreshCw } from "lucide-react";
import { useLang } from "@/i18n/context";

export default function SettingsPage() {
  const { t, lang, setLang } = useLang();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.3), rgba(220,38,38,0.1))" }}>
            <SettingsIcon size={16} className="text-red-400" />
          </div>
          <h1 className="text-white text-2xl font-bold">{t("الإعدادات")}</h1>
        </div>
        <button onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "rgba(220,38,38,0.85)", boxShadow: "0 0 15px rgba(220,38,38,0.3)" }}>
          {saved ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
          {saved ? t("تم الحفظ!") : t("حفظ الإعدادات")}
        </button>
      </div>

      <div className="space-y-4">
        {[
          { icon: Globe, label: t("اللغة"), desc: t("Arabic (الأردن)"), type: "select", options: [{ label: t("العربية"), value: "ar" }, { label: t("English"), value: "en" }] },
          { icon: Bell, label: t("الإشعارات"), desc: t("إشعارات الطلبات الجديدة"), type: "toggle" },
          { icon: Shield, label: t("المصادقة"), desc: t("مصادقة ثنائية (2FA)"), type: "toggle" },
          { icon: Palette, label: t("المظهر"), desc: t("داكن - الوضع الليلي"), type: "toggle" },
        ].map((s) => (
          <div key={s.label} className="stat-card p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(220,38,38,0.15)" }}>
                <s.icon size={18} className="text-red-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{s.label}</p>
                <p className="text-white/40 text-xs">{s.desc}</p>
              </div>
            </div>
            {s.type === "select" ? (
              <select value={lang} onChange={(e) => setLang(e.target.value as "ar" | "en")}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-white text-sm focus:outline-none focus:border-red-500/50"
                style={{ background: "rgba(255,255,255,0.05)" }}>
                {s.options?.map((o) => <option key={o.value} value={o.value} style={{ background: "#111" }}>{o.label}</option>)}
              </select>
            ) : (
              <div className="w-10 h-5 rounded-full cursor-pointer relative transition-colors bg-red-500/30"
                style={{ background: "rgba(220,38,38,0.3)" }}>
                <div className="w-4 h-4 rounded-full bg-red-400 absolute top-0.5 right-0.5 transition-all shadow-md" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}