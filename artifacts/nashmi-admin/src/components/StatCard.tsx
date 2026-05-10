import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  icon: React.ReactNode;
  iconBg?: string;
  glowRed?: boolean;
}

export default function StatCard({
  title,
  value,
  unit,
  change,
  icon,
  iconBg = "rgba(220,38,38,0.12)",
  glowRed = false,
}: StatCardProps) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <div
      className={`stat-card ${glowRed ? "glow-border-red" : ""}`}
      style={glowRed ? { borderColor: "rgba(220,38,38,0.3)" } : {}}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: iconBg }}
        >
          {icon}
        </div>
        {change !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
              isPositive
                ? "text-green-400 bg-green-400/10"
                : "text-red-400 bg-red-400/10"
            }`}
          >
            {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div>
        <div className="flex items-baseline gap-1.5">
          <span
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "'Orbitron', monospace" }}
          >
            {typeof value === "number" ? value.toLocaleString() : value}
          </span>
          {unit && <span className="text-white/40 text-sm">{unit}</span>}
        </div>
        <p className="text-white/50 text-xs mt-1 font-medium">{title}</p>
      </div>
    </div>
  );
}
