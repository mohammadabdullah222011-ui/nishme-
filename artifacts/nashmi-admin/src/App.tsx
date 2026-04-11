import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Dashboard from "@/pages/Dashboard";
import Analytics from "@/pages/Analytics";
import Orders from "@/pages/Orders";
import Products from "@/pages/Products";
import Users from "@/pages/Users";

const queryClient = new QueryClient();

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <Topbar sidebarCollapsed={collapsed} />

      <main
        className="transition-all duration-300 pt-16 min-h-screen"
        style={{ marginRight: collapsed ? "68px" : "220px" }}
      >
        <div className="p-5">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/analytics" component={Analytics} />
            <Route path="/orders" component={Orders} />
            <Route path="/products" component={Products} />
            <Route path="/users" component={Users} />
            <Route>
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-8xl font-bold text-red-500/20 mb-3" style={{ fontFamily: "'Orbitron', monospace" }}>
                    404
                  </p>
                  <p className="text-white/50 text-sm">الصفحة غير موجودة</p>
                </div>
              </div>
            </Route>
          </Switch>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AdminLayout />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
