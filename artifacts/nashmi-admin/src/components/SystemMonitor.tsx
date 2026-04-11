import { useState, useEffect } from "react";
import { Activity, Cpu, HardDrive, Zap, Clock, MemoryStick } from "lucide-react";
import { systemMetrics } from "@/data/mockData";

interface MetricBarProps {
  label: string;
  value: number;
  unit?: string;
  icon: React.ReactNode;
  critical?: number;
}

function MetricBar({ label, value, unit = "%", icon, critical = 85 }: MetricBarProps) {
  const [displayed, setDisplayed] = useState(0);
  const isCritical = value >= critical;

  useEffect(() => {
    const timer = setTimeout(() => setDisplayed(value), 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={isCritical ? "text-red-400" : "text-white/40"}>{icon}</span>
          <span className="text-white/70 text-xs font-medium">{label}</span>
        </div>
        <span
          className={`text-xs font-bold font-mono ${isCritical ? "text-red-400" : "text-white/80"}`}
          style={{ fontFamily: "'Orbitron', monospace" }}
        >
          {value}{unit}
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${displayed}%`,
            background: isCritical
              ? "linear-gradient(90deg, #dc2626, #f87171)"
              : value > 60
              ? "linear-gradient(90deg, #dc2626, #ef4444)"
              : "linear-gradient(90deg, #059669, #10b981)",
            boxShadow: isCritical
              ? "0 0 10px rgba(220,38,38,0.7)"
              : value > 60
              ? "0 0 8px rgba(220,38,38,0.4)"
              : "0 0 8px rgba(5,150,105,0.4)",
          }}
        />
      </div>
    </div>
  );
}

export default function SystemMonitor() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [rps, setRps] = useState(systemMetrics.requestsPerMin);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setRps(280 + Math.floor(Math.random() * 40));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">مراقبة النظام</h3>
          <p className="text-white/40 text-xs mt-0.5">DevOps Monitoring</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-green-400 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot" />
          Live
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <MetricBar label="CPU Usage" value={systemMetrics.cpu} icon={<Cpu size={13} />} critical={85} />
        <MetricBar label="RAM Usage" value={systemMetrics.ram} icon={<MemoryStick size={13} />} critical={85} />
        <MetricBar label="Disk I/O" value={systemMetrics.disk} icon={<HardDrive size={13} />} critical={90} />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/[0.06]">
        <div className="text-center">
          <p
            className="text-white text-base font-bold"
            style={{ fontFamily: "'Orbitron', monospace", color: "#f87171" }}
          >
            {systemMetrics.apiLatency}ms
          </p>
          <p className="text-white/35 text-[10px] mt-0.5">API Latency</p>
        </div>
        <div className="text-center border-x border-white/[0.06]">
          <p className="text-white text-base font-bold" style={{ fontFamily: "'Orbitron', monospace" }}>
            {systemMetrics.uptime}%
          </p>
          <p className="text-white/35 text-[10px] mt-0.5">Uptime</p>
        </div>
        <div className="text-center">
          <p className="text-white text-base font-bold" style={{ fontFamily: "'Orbitron', monospace" }}>
            {rps}
          </p>
          <p className="text-white/35 text-[10px] mt-0.5">Req/min</p>
        </div>
      </div>
    </div>
  );
}
