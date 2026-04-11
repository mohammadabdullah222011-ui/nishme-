import RevenueChart from "@/components/RevenueChart";
import TrafficChart from "@/components/TrafficChart";
import CategoryChart from "@/components/CategoryChart";
import StatCard from "@/components/StatCard";
import { TrendingUp, Eye, MousePointer, Clock } from "lucide-react";

const stats = [
  { title: "إجمالي الزيارات", value: "32.7K", change: 14.2, icon: <Eye size={16} className="text-blue-400" />, iconBg: "rgba(59,130,246,0.12)" },
  { title: "معدل الارتداد", value: "24.6", unit: "%", change: -3.1, icon: <MousePointer size={16} className="text-green-400" />, iconBg: "rgba(16,185,129,0.12)" },
  { title: "الوقت في الموقع", value: "4:32", unit: "دقيقة", change: 5.8, icon: <Clock size={16} className="text-purple-400" />, iconBg: "rgba(139,92,246,0.12)" },
  { title: "معدل التحويل", value: "7.4", unit: "%", change: 3.2, icon: <TrendingUp size={16} className="text-red-400" />, iconBg: "rgba(220,38,38,0.12)", glowRed: true },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-white text-2xl font-bold">التحليلات</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => <StatCard key={s.title} {...s} />)}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2"><RevenueChart /></div>
        <CategoryChart />
      </div>
      <TrafficChart />
    </div>
  );
}
