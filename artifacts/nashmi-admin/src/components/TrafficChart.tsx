import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { trafficData } from "@/data/mockData";

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
            {p.name === "visits" ? "الزيارات" : "المبيعات"}: {p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function TrafficChart() {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">الزيارات والمبيعات</h3>
          <p className="text-white/40 text-xs mt-0.5">هذا الأسبوع</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-white/50">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "#dc2626" }} />
            الزيارات
          </span>
          <span className="flex items-center gap-1.5 text-white/50">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "#f97316" }} />
            المبيعات
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={trafficData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="visits" fill="#dc2626" radius={[4, 4, 0, 0]} opacity={0.85} />
          <Bar dataKey="sales" fill="#f97316" radius={[4, 4, 0, 0]} opacity={0.75} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
