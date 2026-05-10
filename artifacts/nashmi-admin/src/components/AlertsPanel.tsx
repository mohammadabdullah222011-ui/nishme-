import { ShieldAlert, Users, AlertTriangle, ChevronRight } from "lucide-react";
import { alertCards } from "@/data/mockData";

const icons: Record<string, React.ReactNode> = {
  ShieldAlert: <ShieldAlert size={18} />,
  Users: <Users size={18} />,
  AlertTriangle: <AlertTriangle size={18} />,
};

const severityStyles: Record<string, { border: string; icon: string; badge: string }> = {
  high: {
    border: "rgba(220,38,38,0.3)",
    icon: "#dc2626",
    badge: "bg-red-500/15 text-red-400",
  },
  medium: {
    border: "rgba(249,115,22,0.25)",
    icon: "#f97316",
    badge: "bg-orange-500/15 text-orange-400",
  },
  low: {
    border: "rgba(59,130,246,0.2)",
    icon: "#60a5fa",
    badge: "bg-blue-500/15 text-blue-400",
  },
};

export default function AlertsPanel() {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">لوحة التنبيهات</h3>
          <p className="text-white/40 text-xs mt-0.5">Issues & Alerts</p>
        </div>
        <span
          className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
          style={{ background: "rgba(220,38,38,0.15)", color: "#f87171" }}
        >
          {alertCards.reduce((sum, a) => sum + a.count, 0)} نشط
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {alertCards.map((alert) => {
          const style = severityStyles[alert.severity];
          return (
            <div
              key={alert.id}
              className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:opacity-90 transition-opacity"
              style={{
                background: "rgba(255,255,255,0.025)",
                borderColor: style.border,
              }}
              data-testid={`alert-${alert.id}`}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.05)", color: style.icon }}
              >
                {icons[alert.icon]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold">{alert.title}</p>
                <p className="text-white/40 text-[10px]">{alert.desc}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${style.badge}`}
                >
                  {alert.count}
                </span>
                <ChevronRight size={12} className="text-white/20" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Scan progress */}
      <div className="mt-4 pt-4 border-t border-white/[0.06]">
        <div className="flex items-center justify-between mb-2">
          <p className="text-white/50 text-xs font-medium">فحص أمني جارٍ...</p>
          <p className="text-red-400 text-xs font-bold">68%</p>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "68%" }} />
        </div>
      </div>
    </div>
  );
}
