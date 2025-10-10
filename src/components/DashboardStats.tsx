import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, Package, DollarSign, AlertCircle } from "lucide-react";

const stats = [
  {
    title: "Total Vendors",
    value: "342",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "primary",
  },
  {
    title: "Active Items",
    value: "1,247",
    change: "+8.2%",
    trend: "up",
    icon: Package,
    color: "accent",
  },
  {
    title: "Cost Savings",
    value: "$2.4M",
    change: "+18.3%",
    trend: "up",
    icon: DollarSign,
    color: "success",
  },
  {
    title: "Pending Approvals",
    value: "23",
    change: "-5.1%",
    trend: "down",
    icon: AlertCircle,
    color: "warning",
  },
];

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isPositive = stat.trend === "up";
        const TrendIcon = isPositive ? TrendingUp : TrendingDown;

        return (
          <Card key={stat.title} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${stat.color}/10`}>
                  <Icon className={`h-6 w-6 text-${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                  <TrendIcon className="h-4 w-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
