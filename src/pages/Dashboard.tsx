import { DashboardStats } from "@/components/DashboardStats";
import { CostChart } from "@/components/CostChart";
import { AlertsPanel } from "@/components/AlertsPanel";
import { RecentActivity } from "@/components/RecentActivity";
import { Navigation } from "@/components/Navigation";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">Procurement Dashboard</h1>
          <p className="text-muted-foreground">Real-time cost intelligence and vendor management</p>
        </div>

        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CostChart />
          </div>
          <div>
            <AlertsPanel />
          </div>
        </div>

        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;
