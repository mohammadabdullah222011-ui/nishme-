import { useState, useEffect, useCallback } from "react";
import { Bell, Check, Info, ShieldAlert, AlertTriangle, Trash2, Loader2 } from "lucide-react";
import { adminApi, type AdminNotification } from "@/lib/api";
import { useLang } from "@/i18n/context";

const notifIcons: Record<string, React.ReactNode> = {
  new_order: <Info size={14} className="text-blue-400" />,
  status_change: <ShieldAlert size={14} className="text-orange-400" />,
  info: <Info size={14} className="text-blue-400" />,
  alert: <ShieldAlert size={14} className="text-red-400" />,
  warning: <AlertTriangle size={14} className="text-orange-400" />,
  success: <Check size={14} className="text-green-400" />,
};

function formatTime(iso: string, t: (key: string) => string) {
  try {
    const d = new Date(iso);
    const now = new Date();
    const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
    if (diff < 60) return t("الآن");
    if (diff < 3600) return t("منذ %d دقيقة").replace("%d", String(Math.floor(diff / 60)));
    if (diff < 86400) return t("منذ %d ساعة").replace("%d", String(Math.floor(diff / 3600)));
    return d.toLocaleDateString("ar-JO");
  } catch { return iso; }
}

export default function NotificationsPage() {
  const { t } = useLang();
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifs = useCallback(async () => {
    try {
      const data = await adminApi.getNotifications();
      setNotifications(data);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchNotifs(); }, [fetchNotifs]);

  const handleMarkRead = async () => {
    try {
      await adminApi.markNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch { /* ignore */ }
  };

  const unread = notifications.filter((n) => !n.read).length;

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-red-500" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.3), rgba(220,38,38,0.1))" }}>
            <Bell size={16} className="text-red-400" />
          </div>
          <h1 className="text-white text-2xl font-bold">{t("الإشعارات")}</h1>
          {unread > 0 && (
            <span className="text-xs text-red-400 font-medium bg-red-400/10 px-2 py-0.5 rounded-full border border-red-400/20">
              {unread} {t("غير مقروء")}
            </span>
          )}
        </div>
        {unread > 0 && (
          <button onClick={handleMarkRead}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "rgba(220,38,38,0.85)" }}>
            <Check size={15} />{t("تعيين الكل مقروء")}
          </button>
        )}
      </div>

      <div className="stat-card">
        {notifications.length === 0 ? (
          <div className="py-12 text-center">
            <Bell size={32} className="text-white/20 mx-auto mb-3" />
            <p className="text-white/30 text-sm">{t("لا توجد إشعارات")}</p>
          </div>
        ) : (
          <div className="space-y-1">
            {notifications.map((n) => (
              <div key={n.id} className={`flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] transition-colors ${!n.read ? "bg-white/[0.02] border-red-500/10" : ""}`}>
                <div className="mt-0.5">{notifIcons[n.type] || <Info size={14} />}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm">{n.title}</p>
                  <p className="text-white/50 text-xs mt-1">{n.desc}</p>
                  <p className="text-white/25 text-[10px] mt-1">{formatTime(n.createdAt, t)}</p>
                </div>
                {!n.read && <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}