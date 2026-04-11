import { Plus, RefreshCw, Download, Shield, Bell, Settings } from "lucide-react";

const actions = [
  { icon: <Plus size={16} />, label: "منتج جديد", color: "#dc2626" },
  { icon: <RefreshCw size={16} />, label: "تحديث البيانات", color: "#3b82f6" },
  { icon: <Download size={16} />, label: "تصدير التقرير", color: "#f97316" },
  { icon: <Shield size={16} />, label: "فحص أمني", color: "#10b981" },
  { icon: <Bell size={16} />, label: "إشعار جماعي", color: "#8b5cf6" },
  { icon: <Settings size={16} />, label: "الإعدادات", color: "#64748b" },
];

export default function QuickActions() {
  return (
    <div className="stat-card">
      <div className="mb-4">
        <h3 className="text-white font-semibold text-sm">إجراءات سريعة</h3>
        <p className="text-white/40 text-xs mt-0.5">Quick Actions</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex flex-col items-center gap-2 p-3 rounded-xl border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.03] transition-all duration-200 group"
            data-testid={`action-${action.label}`}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              style={{ background: `${action.color}18`, color: action.color }}
            >
              {action.icon}
            </div>
            <span className="text-white/50 text-[10px] font-medium group-hover:text-white/70 transition-colors">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
