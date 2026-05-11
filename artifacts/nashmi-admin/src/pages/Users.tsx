import { useState, useEffect, useCallback } from "react";
import { Search, Shield, ShieldOff, UserCheck, Loader2, RefreshCw, Users as UsersIcon } from "lucide-react";
import { adminApi, type AdminUser } from "@/lib/api";
import { useLang } from "@/i18n/context";

function joinedDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("ar-JO", { year: "numeric", month: "long" });
  } catch { return iso; }
}

export default function Users() {
  const { t } = useLang();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchUsers = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const data = await adminApi.getUsers();
      setUsers(data);
      setError("");
    } catch (e: any) {
      if (!silent) setError(e.message);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(() => fetchUsers(true), 15000);
    return () => clearInterval(interval);
  }, [fetchUsers]);

  const toggleRole = async (user: AdminUser) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    setUpdatingId(user.id);
    setConfirmId(null);
    try {
      const updated = await adminApi.updateUserRole(user.id, newRole);
      setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, role: updated.role } : u));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const usersArray = Array.isArray(users) ? users : [];
  const filtered = usersArray.filter((u) => {
    const matchSearch = u.name.includes(search) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const adminCount = usersArray.filter((u) => u.role === "admin").length;
  const userCount = usersArray.filter((u) => u.role === "user").length;
  const totalSpent = usersArray.reduce((s, u) => s + u.totalSpent, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-white text-2xl font-bold">{t("المستخدمون والصلاحيات")}</h1>
          <span className="text-white/30 text-sm">{usersArray.length})</span>
          <button onClick={() => fetchUsers()} title={t("تحديث")}
            className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: t("إجمالي المستخدمين"), value: users.length, color: "#dc2626" },
          { label: t("المديرون"), value: adminCount, color: "#f87171" },
          { label: t("العملاء"), value: userCount, color: "#60a5fa" },
          { label: t("إجمالي الإنفاق"), value: `${totalSpent.toLocaleString("en")} JD`, color: "#34d399", small: true },
        ].map((item) => (
          <div key={item.label} className="stat-card text-center py-3">
            <p className={`font-bold ${item.small ? "text-lg" : "text-2xl"}`}
              style={{ fontFamily: "'Orbitron', monospace", color: item.color }}>
              {item.value}
            </p>
            <p className="text-white/40 text-xs mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      {error && (
        <div className="p-3 rounded-xl border border-red-500/25 text-red-400 text-sm"
          style={{ background: "rgba(220,38,38,0.08)" }}>⚠️ {error}</div>
      )}

      <div className="stat-card">
        {/* Toolbar */}
        <div className="flex gap-3 mb-5 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <Search size={14} className="absolute top-1/2 -translate-y-1/2 left-3 text-white/30" />
            <input type="search" placeholder={t("البحث بالاسم أو البريد...")}
              className="w-full bg-white/5 border border-white/8 rounded-xl py-2 pl-8 pr-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/40 transition-colors"
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
            {(["all", "admin", "user"] as const).map((r) => (
              <button key={r} onClick={() => setRoleFilter(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${roleFilter === r ? "text-white" : "text-white/35 hover:text-white/60"}`}
                style={roleFilter === r ? { background: "rgba(220,38,38,0.3)", boxShadow: "0 0 10px rgba(220,38,38,0.2)" } : {}}>
                {r === "all" ? t("الكل") : r === "admin" ? t("مدير") : t("عميل")}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 gap-3">
            <Loader2 size={24} className="animate-spin text-red-500" />
            <span className="text-white/40 text-sm">{t("جارٍ تحميل المستخدمين...")}</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {[t("المستخدم"), t("البريد الإلكتروني"), t("الطلبات"), t("الإنفاق (JD)"), t("الدور"), t("تغيير الصلاحية"), t("تاريخ الانضمام")].map((h) => (
                    <th key={h} className="text-right text-white/35 font-medium text-xs pb-3 px-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 relative"
                          style={{ background: "linear-gradient(135deg, #dc2626, #7f1d1d)" }}>
                          {user.name?.[0] || "?"}
                          {user.role === "admin" && (
                            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                              style={{ background: "#dc2626", boxShadow: "0 0 6px rgba(220,38,38,0.8)" }}>
                              <Shield size={8} className="text-white" />
                            </span>
                          )}
                        </div>
                        <span className="text-white/80 font-medium text-xs">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-white/40 text-xs" dir="ltr">{user.email}</td>
                    <td className="py-3 px-2 text-white/70 text-xs">{user.orderCount}</td>
                    <td className="py-3 px-2 text-white font-bold text-xs" style={{ fontFamily: "'Orbitron', monospace" }}>
                      {user.totalSpent.toLocaleString("en")}
                    </td>
                    <td className="py-3 px-2">
                      {user.role === "admin" ? (
                        <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border w-fit text-red-400 bg-red-400/10 border-red-400/25">
                          <Shield size={10} />{t("مدير")}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border w-fit text-blue-300 bg-blue-400/8 border-blue-400/20">
                          <UserCheck size={10} />{t("عميل")}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-2">
                      {updatingId === user.id ? (
                        <Loader2 size={14} className="animate-spin text-red-400" />
                      ) : confirmId === user.id ? (
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => toggleRole(user)}
                            className="text-[10px] px-2 py-0.5 rounded-lg font-bold text-white transition-all"
                            style={{ background: user.role === "admin" ? "rgba(59,130,246,0.3)" : "rgba(220,38,38,0.3)" }}>
                            {t("تأكيد")}
                          </button>
                          <button onClick={() => setConfirmId(null)}
                            className="text-[10px] px-2 py-0.5 rounded-lg text-white/40 hover:text-white/60 border border-white/10 transition-all">
                            {t("إلغاء")}
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmId(user.id)}
                          className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-semibold border transition-all duration-200 ${user.role === "admin" ? "text-blue-400 border-blue-400/20 hover:bg-blue-400/10" : "text-red-400 border-red-400/20 hover:bg-red-400/10"}`}>
                          {user.role === "admin" ? <><ShieldOff size={12} />{t("إزالة المدير")}</> : <><Shield size={12} />{t("ترقية لمدير")}</>}
                        </button>
                      )}
                    </td>
                    <td className="py-3 px-2 text-white/35 text-xs">{joinedDate(user.createdAt)}</td>
                  </tr>
                ))}
                {filtered.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center">
                      <UsersIcon size={28} className="mx-auto text-white/10 mb-2" />
                      <p className="text-white/30 text-sm">{search ? t("لا توجد نتائج") : t("لا يوجد مستخدمون بعد")}</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/[0.06]">
          <p className="text-white/30 text-xs">{t("الصلاحيات:")}</p>
          <span className="flex items-center gap-1.5 text-xs text-red-400"><Shield size={11} />{t("مدير — صلاحيات كاملة")}</span>
          <span className="flex items-center gap-1.5 text-xs text-blue-300"><UserCheck size={11} />{t("عميل — صلاحيات محدودة")}</span>
        </div>
      </div>
    </div>
  );
}
