import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { categoryDistribution } from "@/data/mockData";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div
        className="rounded-xl px-3 py-2 border border-white/10 text-xs"
        style={{ background: "rgba(10,10,10,0.95)" }}
      >
        <p className="text-white font-semibold">{d.name}</p>
        <p style={{ color: d.color }}>{d.value}%</p>
      </div>
    );
  }
  return null;
};

export default function CategoryChart() {
  return (
    <div className="stat-card">
      <div className="mb-3">
        <h3 className="text-white font-semibold text-sm">توزيع الفئات</h3>
        <p className="text-white/40 text-xs mt-0.5">Category Distribution</p>
      </div>

      <div className="flex items-center gap-4">
        <ResponsiveContainer width="50%" height={130}>
          <PieChart>
            <Pie
              data={categoryDistribution}
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={55}
              paddingAngle={3}
              dataKey="value"
            >
              {categoryDistribution.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex flex-col gap-2 flex-1">
          {categoryDistribution.map((cat) => (
            <div key={cat.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: cat.color }}
                />
                <span className="text-white/60 text-xs">{cat.name}</span>
              </div>
              <span className="text-white font-semibold text-xs">{cat.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
