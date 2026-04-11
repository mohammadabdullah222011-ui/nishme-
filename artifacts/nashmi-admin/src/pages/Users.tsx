import { Search, Plus } from "lucide-react";

const users = [
  { id: 1, name: "محمد العتيبي", email: "m.otaibi@mail.com", orders: 14, spent: 12500, status: "نشط", joined: "يناير 2024" },
  { id: 2, name: "سارة الزهراني", email: "s.zahrani@mail.com", orders: 8, spent: 6800, status: "نشط", joined: "مارس 2024" },
  { id: 3, name: "فيصل الحربي", email: "f.harbi@mail.com", orders: 21, spent: 18900, status: "VIP", joined: "أكتوبر 2023" },
  { id: 4, name: "نورة القحطاني", email: "n.qahtani@mail.com", orders: 5, spent: 3200, status: "نشط", joined: "فبراير 2024" },
  { id: 5, name: "عبدالله المطيري", email: "a.mutairi@mail.com", orders: 2, spent: 899, status: "غير نشط", joined: "أبريل 2024" },
  { id: 6, name: "خالد الدوسري", email: "k.dosari@mail.com", orders: 33, spent: 31200, status: "VIP", joined: "يوليو 2023" },
  { id: 7, name: "منى الغامدي", email: "m.ghamdi@mail.com", orders: 9, spent: 7400, status: "نشط", joined: "مايو 2024" },
];

const statusStyles: Record<string, string> = {
  "نشط": "text-green-400 bg-green-400/10 border-green-400/20",
  "غير نشط": "text-white/30 bg-white/5 border-white/10",
  "VIP": "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
};

export default function Users() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">المستخدمون</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: "rgba(220,38,38,0.85)", boxShadow: "0 0 15px rgba(220,38,38,0.3)" }}
          data-testid="button-add-user"
        >
          <Plus size={15} />
          إضافة مستخدم
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "إجمالي المستخدمين", value: "15,480", color: "#dc2626" },
          { label: "المستخدمون النشطون", value: "12,340", color: "#10b981" },
          { label: "عملاء VIP", value: "847", color: "#f59e0b" },
        ].map((item) => (
          <div key={item.label} className="stat-card text-center">
            <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', monospace", color: item.color }}>
              {item.value}
            </p>
            <p className="text-white/40 text-xs mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="stat-card">
        <div className="relative mb-5">
          <Search size={14} className="absolute top-1/2 -translate-y-1/2 left-3 text-white/30" />
          <input
            type="search"
            placeholder="البحث في المستخدمين..."
            className="w-full bg-white/5 border border-white/8 rounded-xl py-2 pl-8 pr-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/40 transition-colors"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["المستخدم", "البريد الإلكتروني", "الطلبات", "الإنفاق", "الحالة", "تاريخ الانضمام"].map((h) => (
                  <th key={h} className="text-right text-white/35 font-medium text-xs pb-3 px-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #dc2626, #7f1d1d)" }}
                      >
                        {user.name[0]}
                      </div>
                      <span className="text-white/80 font-medium text-xs">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-white/40 text-xs">{user.email}</td>
                  <td className="py-3 px-2 text-white/70 text-xs">{user.orders}</td>
                  <td className="py-3 px-2 text-white font-bold text-xs" style={{ fontFamily: "'Orbitron', monospace" }}>
                    {user.spent.toLocaleString()} ر
                  </td>
                  <td className="py-3 px-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${statusStyles[user.status]}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-white/35 text-xs">{user.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
