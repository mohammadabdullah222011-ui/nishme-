import { useState } from "react";
import { Server, Activity, Cpu, Database, Wifi, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { useLang } from "@/i18n/context";

export default function ServerPage() {
  const { t } = useLang();
  const [services] = useState([
    { name: "API Server", status: "online", uptime: "99.9%", port: 5001 },
    { name: "Store Frontend", status: "online", uptime: "99.8%", port: 3001 },
    { name: "Admin Panel", status: "online", uptime: "99.8%", port: 3002 },
    { name: "Database", status: "online", uptime: "99.9%", port: 5432 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.3), rgba(220,38,38,0.1))" }}>
            <Server size={16} className="text-red-400" />
          </div>
          <h1 className="text-white text-2xl font-bold">{t("الخوادم")}</h1>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/60 border border-white/10 hover:text-white transition-all">
          <RefreshCw size={14} />{t("تحديث")}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((s) => (
          <div key={s.name} className="stat-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.status === "online" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)" }}>
                  <Activity size={18} className={s.status === "online" ? "text-green-400" : "text-red-400"} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{s.name}</p>
                  <p className="text-white/40 text-xs">Port {s.port}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {s.status === "online" ? <CheckCircle size={14} className="text-green-400" /> : <XCircle size={14} className="text-red-400" />}
                <span className={`text-xs font-semibold ${s.status === "online" ? "text-green-400" : "text-red-400"}`}>
                  {s.status === "online" ? t("نشط") : t("معطل")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-white/40">Uptime: <span className="text-white/70 font-mono">{s.uptime}</span></span>
              <span className="text-white/40">Latency: <span className="text-white/70 font-mono">12ms</span></span>
            </div>
          </div>
        ))}
      </div>

      <div className="stat-card">
        <h2 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
          <Cpu size={14} className="text-red-400" />
          {t("أداء النظام")}
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "CPU", value: "23%", icon: Cpu },
            { label: "Memory", value: "1.2 GB", icon: Database },
            { label: "Network", value: "45 Mbps", icon: Wifi },
          ].map((m) => (
            <div key={m.label} className="text-center p-3 rounded-xl border border-white/[0.06]">
              <m.icon size={16} className="text-white/30 mx-auto mb-1" />
              <p className="text-white font-bold text-sm" style={{ fontFamily: "'Orbitron', monospace" }}>{m.value}</p>
              <p className="text-white/40 text-[10px]">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}