import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Package,
  Shield,
  Bell,
  ChevronRight,
  Gamepad2,
  Server,
  FileText,
} from "lucide-react";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "لوحة التحكم" },
  { href: "/analytics", icon: BarChart3, label: "التحليلات" },
  { href: "/orders", icon: ShoppingCart, label: "الطلبات" },
  { href: "/products", icon: Package, label: "المنتجات" },
  { href: "/users", icon: Users, label: "المستخدمون" },
  { href: "/reports", icon: FileText, label: "التقارير" },
  { href: "/security", icon: Shield, label: "الأمان" },
  { href: "/server", icon: Server, label: "الخوادم" },
];

const bottomItems = [
  { href: "/notifications", icon: Bell, label: "الإشعارات", badge: 5 },
  { href: "/settings", icon: Settings, label: "الإعدادات" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const [location] = useLocation();

  return (
    <aside
      className={`fixed top-0 right-0 h-screen z-40 flex flex-col border-l border-white/[0.06] transition-all duration-300 ${
        collapsed ? "w-[68px]" : "w-[220px]"
      }`}
      style={{ background: "rgba(9,9,9,0.97)", backdropFilter: "blur(20px)" }}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/[0.06] ${collapsed ? "justify-center" : ""}`}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #dc2626, #7f1d1d)",
            boxShadow: "0 0 15px rgba(220,38,38,0.4)",
          }}
        >
          <Gamepad2 size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-white font-bold text-sm leading-none" style={{ fontFamily: "'Orbitron', monospace" }}>
              نشمي
            </p>
            <p className="text-white/40 text-xs mt-0.5">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 flex flex-col gap-1">
        {!collapsed && (
          <p className="text-white/25 text-[10px] font-semibold uppercase tracking-wider px-3 mb-1">
            القائمة الرئيسية
          </p>
        )}
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = location === href;
          return (
            <Link key={href} href={href}>
              <div
                className={`sidebar-link ${isActive ? "active" : "text-white/50"} ${collapsed ? "justify-center px-2" : ""}`}
                title={collapsed ? label : undefined}
                data-testid={`sidebar-link-${label}`}
              >
                <Icon size={18} className="flex-shrink-0" />
                {!collapsed && <span>{label}</span>}
              </div>
            </Link>
          );
        })}

        <div className="mt-4 mb-1">
          {!collapsed && (
            <p className="text-white/25 text-[10px] font-semibold uppercase tracking-wider px-3 mb-1">
              أخرى
            </p>
          )}
          {bottomItems.map(({ href, icon: Icon, label, badge }) => {
            const isActive = location === href;
            return (
              <Link key={href} href={href}>
                <div
                  className={`sidebar-link ${isActive ? "active" : "text-white/50"} ${collapsed ? "justify-center px-2" : ""} relative`}
                  data-testid={`sidebar-link-${label}`}
                >
                  <div className="relative">
                    <Icon size={18} />
                    {badge && !collapsed && (
                      <span
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                        style={{ background: "#dc2626" }}
                      >
                        {badge}
                      </span>
                    )}
                  </div>
                  {!collapsed && <span>{label}</span>}
                  {badge && collapsed && (
                    <span
                      className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full"
                      style={{ background: "#dc2626", boxShadow: "0 0 6px rgba(220,38,38,0.7)" }}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Toggle button */}
      <div className="p-2 border-t border-white/[0.06]">
        <button
          onClick={onToggle}
          className={`w-full flex items-center justify-center py-2 rounded-xl text-white/30 hover:text-white/60 hover:bg-white/5 transition-all duration-200 ${collapsed ? "" : "gap-2 px-3"}`}
          data-testid="button-sidebar-toggle"
        >
          <ChevronRight
            size={16}
            className={`transition-transform duration-300 ${collapsed ? "" : "rotate-180"}`}
          />
          {!collapsed && <span className="text-xs">طي القائمة</span>}
        </button>
      </div>
    </aside>
  );
}
