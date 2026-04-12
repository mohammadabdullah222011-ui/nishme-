import { useState } from "react";
import { Search, Plus, Shield, ShieldOff, UserCheck, UserX } from "lucide-react";

type Role = "admin" | "user";
type Status = "نشط" | "غير نشط" | "VIP";

interface UserRecord {
  id: number;
  name: string;
  email: string;
  orders: number;
  spent: number;
  status: Status;
  joined: string;
  role: Role;
}

const initialUsers: UserRecord[] = [
  { id: 1, name: "محمد العتيبي",   email: "m.otaibi@mail.com",  orders: 14, spent: 12500, status: "نشط",     joined: "يناير 2024",   role: "admin" },
  { id: 2, name: "سارة الزهراني", email: "s.zahrani@mail.com", orders: 8,  spent: 6800,  status: "نشط",     joined: "مارس 2024",    role: "user"  },
  { id: 3, name: "فيصل الحربي",   email: "f.harbi@mail.com",   orders: 21, spent: 18900, status: "VIP",     joined: "أكتوبر 2023",  role: "user"  },
  { id: 4, name: "نورة القحطاني", email: "n.qahtani@mail.com", orders: 5,  spent: 3200,  status: "نشط",     joined: "فبراير 2024",  role: "user"  },
  { id: 5, name: "عبدالله المطيري",email: "a.mutairi@mail.com", orders: 2,  spent: 899,   status: "غير نشط", joined: "أبريل 2024",   role: "user"  },
  { id: 6, name: "خالد الدوسري",  email: "k.dosari@mail.com",  orders: 33, spent: 31200, status: "VIP",     joined: "يوليو 2023",   role: "admin" },
  { id: 7, name: "منى الغامدي",   email: "m.ghamdi@mail.com",  orders: 9,  spent: 7400,  status: "نشط",     joined: "مايو 2024",    role: "user"  },
];

const statusStyles: Record<string, string> = {
  "نشط":     "text-green-400 bg-green-400/10 border-green-400/20",
  "غير نشط": "text-white/30 bg-white/5 border-white/10",
  "VIP":     "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
};

export default function Users() {
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | Role>("all");
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const toggleRole = (id: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, role: u.role === "admin" ? "user" : "admin" } : u
      )
    );
    setConfirmId(null);
  };

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.includes(search) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const adminCount = users.filter((u) => u.role === "admin").length;
  const userCount  = users.filter((u) => u.role === "user").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">المستخدمون والصلاحيات</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: "rgba(220,38,38,0.85)", boxShadow: "0 0 15px rgba(220,38,38,0.3)" }}
          data-testid="button-add-user"
        >
          <Plus size={15} />
          إضافة مستخدم
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "إجمالي المستخدمين", value: users.length.toString(),   color: "#dc2626" },
          { label: "الأدمن",            value: adminCount.toString(),      color: "#f87171" },
          { label: "المستخدمون",        value: userCount.toString(),       color: "#60a5fa" },
          { label: "VIP",               value: users.filter(u => u.status === "VIP").length.toString(), color: "#f59e0b" },
        ].map((item) => (
          <div key={item.label} className="stat-card text-center">
            <p className="text-2xl font-bold" style={{ fontFamily: "'Orbitron', monospace", color: item.color }}>
              {item.value}
            </p>
            <p className="text-white/40 text-xs mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="stat-card">
        {/* Toolbar */}
        <div className="flex gap-3 mb-5 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <Search size={14} className="absolute top-1/2 -translate-y-1/2 left-3 text-white/30" />
            <input
              type="search"
              placeholder="البحث باسم المستخدم أو البريد..."
              className="w-full bg-white/5 border border-white/8 rounded-xl py-2 pl-8 pr-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/40 transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Role filter tabs */}
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
            {(["all", "admin", "user"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  roleFilter === r ? "text-white" : "text-white/35 hover:text-white/60"
                }`}
                style={
                  roleFilter === r
                    ? { background: "rgba(220,38,38,0.3)", boxShadow: "0 0 10px rgba(220,38,38,0.2)" }
                    : {}
                }
              >
                {r === "all" ? "الكل" : r === "admin" ? "أدمن" : "مستخدم"}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["المستخدم", "البريد الإلكتروني", "الطلبات", "الإنفاق", "الحالة", "الدور", "تغيير الدور"].map((h) => (
                  <th key={h} className="text-right text-white/35 font-medium text-xs pb-3 px-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  {/* Name */}
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 relative"
                        style={{ background: "linear-gradient(135deg, #dc2626, #7f1d1d)" }}
                      >
                        {user.name[0]}
                        {user.role === "admin" && (
                          <span
                            className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                            style={{ background: "#dc2626", boxShadow: "0 0 6px rgba(220,38,38,0.8)" }}
                            title="Admin"
                          >
                            <Shield size={8} className="text-white" />
                          </span>
                        )}
                      </div>
                      <span className="text-white/80 font-medium text-xs">{user.name}</span>
                    </div>
                  </td>
                  {/* Email */}
                  <td className="py-3 px-2 text-white/40 text-xs">{user.email}</td>
                  {/* Orders */}
                  <td className="py-3 px-2 text-white/70 text-xs">{user.orders}</td>
                  {/* Spent */}
                  <td className="py-3 px-2 text-white font-bold text-xs" style={{ fontFamily: "'Orbitron', monospace" }}>
                    {user.spent.toLocaleString()} JOD
                  </td>
                  {/* Status */}
                  <td className="py-3 px-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${statusStyles[user.status]}`}>
                      {user.status}
                    </span>
                  </td>
                  {/* Role badge */}
                  <td className="py-3 px-2">
                    {user.role === "admin" ? (
                      <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border w-fit text-red-400 bg-red-400/10 border-red-400/25">
                        <Shield size={10} />
                        أدمن
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border w-fit text-blue-300 bg-blue-400/8 border-blue-400/20">
                        <UserCheck size={10} />
                        مستخدم
                      </span>
                    )}
                  </td>
                  {/* Toggle role button */}
                  <td className="py-3 px-2">
                    {confirmId === user.id ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleRole(user.id)}
                          className="text-[10px] px-2 py-0.5 rounded-lg font-bold text-white transition-all"
                          style={{ background: user.role === "admin" ? "rgba(59,130,246,0.3)" : "rgba(220,38,38,0.3)" }}
                        >
                          تأكيد
                        </button>
                        <button
                          onClick={() => setConfirmId(null)}
                          className="text-[10px] px-2 py-0.5 rounded-lg text-white/40 hover:text-white/60 border border-white/10 transition-all"
                        >
                          إلغاء
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmId(user.id)}
                        className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-semibold border transition-all duration-200 hover:opacity-90 ${
                          user.role === "admin"
                            ? "text-blue-400 border-blue-400/20 hover:bg-blue-400/10"
                            : "text-red-400 border-red-400/20 hover:bg-red-400/10"
                        }`}
                        data-testid={`button-toggle-role-${user.id}`}
                      >
                        {user.role === "admin" ? (
                          <><ShieldOff size={12} /> إزالة الأدمن</>
                        ) : (
                          <><Shield size={12} /> منح أدمن</>
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-white/30 text-sm">
                    لا توجد نتائج
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/[0.06]">
          <p className="text-white/30 text-xs">الأدوار:</p>
          <span className="flex items-center gap-1.5 text-xs text-red-400">
            <Shield size={11} /> أدمن — صلاحيات كاملة
          </span>
          <span className="flex items-center gap-1.5 text-xs text-blue-300">
            <UserCheck size={11} /> مستخدم — صلاحيات محدودة
          </span>
        </div>
      </div>
    </div>
  );
}
