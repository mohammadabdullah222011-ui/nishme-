import { useState } from "react";
import { Bell, Search, ChevronDown, Check, ShieldAlert, AlertTriangle, Info, Zap, X } from "lucide-react";
import { notifications } from "@/data/mockData";

interface TopbarProps {
  sidebarCollapsed: boolean;
}

const notifIcons: Record<string, React.ReactNode> = {
  alert: <ShieldAlert size={14} className="text-red-400" />,
  warning: <AlertTriangle size={14} className="text-orange-400" />,
  info: <Info size={14} className="text-blue-400" />,
  success: <Check size={14} className="text-green-400" />,
};

export default function Topbar({ sidebarCollapsed }: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [serverStatus, setServerStatus] = useState(true);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header
      className={`fixed top-0 left-0 h-16 z-30 flex items-center justify-between px-5 border-b border-white/[0.06] transition-all duration-300 ${
        sidebarCollapsed ? "right-[68px]" : "right-[220px]"
      }`}
      style={{ background: "rgba(9,9,9,0.95)", backdropFilter: "blur(20px)" }}
    >
      {/* Left: Welcome */}
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-white font-semibold text-sm leading-none">Welcome Back</h2>
          <p className="text-white/40 text-xs mt-0.5">Hey, Admin!</p>
        </div>

        {/* Server Status Toggle */}
        <button
          onClick={() => setServerStatus(!serverStatus)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
            serverStatus
              ? "border-green-500/30 text-green-400 bg-green-500/10"
              : "border-red-500/30 text-red-400 bg-red-500/10"
          }`}
          data-testid="button-server-status"
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${serverStatus ? "bg-green-400" : "bg-red-400"} pulse-dot`}
          />
          {serverStatus ? "Servers Online" : "Servers Down"}
        </button>
      </div>

      {/* Right: Search + Notif + Profile */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search size={14} className="absolute top-1/2 -translate-y-1/2 left-3 text-white/30" />
          <input
            type="search"
            placeholder="Search..."
            className="bg-white/5 border border-white/8 rounded-xl py-2 pl-8 pr-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/40 transition-colors w-48"
            data-testid="input-search"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="relative p-2 rounded-xl border border-white/8 text-white/50 hover:text-white hover:border-white/15 hover:bg-white/5 transition-all duration-200"
            data-testid="button-notifications"
          >
            <Bell size={17} />
            {unread > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                style={{ background: "#dc2626", boxShadow: "0 0 8px rgba(220,38,38,0.6)" }}
              >
                {unread}
              </span>
            )}
          </button>

          {notifOpen && (
            <div
              className="absolute left-0 top-12 w-80 rounded-2xl border border-white/8 shadow-2xl z-50 overflow-hidden"
              style={{ background: "rgba(12,12,12,0.98)", backdropFilter: "blur(20px)" }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
                <p className="text-white font-semibold text-sm">الإشعارات</p>
                <div className="flex items-center gap-2">
                  {unread > 0 && (
                    <span className="text-xs text-red-400 font-medium">{unread} جديد</span>
                  )}
                  <button onClick={() => setNotifOpen(false)} className="text-white/30 hover:text-white/60 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`flex gap-3 px-4 py-3 border-b border-white/5 hover:bg-white/3 transition-colors ${!n.read ? "bg-white/[0.02]" : ""}`}
                    data-testid={`notif-${n.id}`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {notifIcons[n.type] || <Info size={14} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-semibold">{n.title}</p>
                      <p className="text-white/50 text-xs mt-0.5 leading-relaxed">{n.desc}</p>
                      <p className="text-white/25 text-[10px] mt-1">{n.time}</p>
                    </div>
                    {!n.read && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/8 hover:border-white/15 hover:bg-white/5 transition-all duration-200"
            data-testid="button-profile"
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #dc2626, #7f1d1d)" }}
            >
              A
            </div>
            <span className="text-white/80 text-sm font-medium hidden sm:block">Admin</span>
            <ChevronDown size={14} className={`text-white/40 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
          </button>

          {profileOpen && (
            <div
              className="absolute left-0 top-12 w-44 rounded-xl border border-white/8 shadow-2xl z-50 overflow-hidden"
              style={{ background: "rgba(12,12,12,0.98)" }}
            >
              {["الملف الشخصي", "الإعدادات", "تسجيل الخروج"].map((item) => (
                <button
                  key={item}
                  className="w-full text-right px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                  onClick={() => setProfileOpen(false)}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
