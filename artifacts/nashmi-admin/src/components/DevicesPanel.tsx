import { Smartphone, Monitor, Tablet } from "lucide-react";
import { devices } from "@/data/mockData";

const icons: Record<string, React.ReactNode> = {
  "الجوال": <Smartphone size={13} />,
  "سطح المكتب": <Monitor size={13} />,
  "التابلت": <Tablet size={13} />,
};

export default function DevicesPanel() {
  return (
    <div className="stat-card">
      <div className="mb-4">
        <h3 className="text-white font-semibold text-sm">أجهزة المستخدمين</h3>
        <p className="text-white/40 text-xs mt-0.5">Device Breakdown</p>
      </div>

      <div className="flex flex-col gap-3">
        {devices.map((device) => (
          <div key={device.type} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/60">
                <span style={{ color: device.color }}>{icons[device.type]}</span>
                <span className="text-xs">{device.type}</span>
              </div>
              <span className="text-white font-bold text-xs" style={{ fontFamily: "'Orbitron', monospace" }}>
                {device.percentage}%
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${device.percentage}%`,
                  background: `linear-gradient(90deg, ${device.color}, ${device.color}aa)`,
                  boxShadow: `0 0 8px ${device.color}66`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.06] grid grid-cols-3 gap-2">
        {devices.map((device) => (
          <div key={device.type} className="text-center">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-1"
              style={{ background: `${device.color}15`, color: device.color }}
            >
              {icons[device.type]}
            </div>
            <p className="text-[10px] text-white/40">{device.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
