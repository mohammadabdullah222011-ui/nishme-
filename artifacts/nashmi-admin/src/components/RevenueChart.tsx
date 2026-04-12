import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { revenueData } from "@/data/mockData";
import { useState } from "react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-xl px-3 py-2 border border-white/10 text-xs"
        style={{ background: "rgba(10,10,10,0.95)" }}
      >
        <p className="text-white/60 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="font-semibold">
            {p.name}: {typeof p.value === "number" && p.name === "revenue"
              ? `${p.value.toLocaleString()} JOD`
              : p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  const [view, setView] = useState<"revenue" | "orders">("revenue");

  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">تحليل الإيرادات</h3>
          <p className="text-white/40 text-xs mt-0.5">الأشهر السبعة الماضية</p>
        </div>
        <div className="flex gap-1 p-1 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
          {(["revenue", "orders"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                view === v
                  ? "text-white"
                  : "text-white/40 hover:text-white/60"
              }`}
              style={
                view === v
                  ? { background: "rgba(220,38,38,0.3)", boxShadow: "0 0 10px rgba(220,38,38,0.2)" }
                  : {}
              }
              data-testid={`button-chart-${v}`}
            >
              {v === "revenue" ? "الإيرادات" : "الطلبات"}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey={view}
            stroke="#dc2626"
            strokeWidth={2}
            fill="url(#redGradient)"
            dot={{ fill: "#dc2626", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#ef4444", strokeWidth: 2, stroke: "rgba(220,38,38,0.4)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
