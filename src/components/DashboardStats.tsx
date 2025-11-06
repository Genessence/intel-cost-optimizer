import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, Package, Factory, Layers } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

type TimePeriod = "monthly" | "quarterly" | "yearly";

const getStatsForPeriod = (period: TimePeriod) => {
  const periodData = {
    monthly: {
      vendors: { total: "342", change: "+12.5%" },
      items: { total: "1,247", change: "+8.2%" },
    },
    quarterly: {
      vendors: { total: "342", change: "+28.3%" },
      items: { total: "1,247", change: "+15.7%" },
    },
    yearly: {
      vendors: { total: "342", change: "+45.2%" },
      items: { total: "1,247", change: "+32.1%" },
    },
  };
  return periodData[period];
};

const commodityTrends = [
  { name: "Cu (Copper)", price: "$8,234/MT", change: "+2.3%", trend: "up", index: "LME" },
  { name: "Al (Aluminum)", price: "$2,156/MT", change: "-1.2%", trend: "down", index: "LME" },
  { name: "Zn (Zinc)", price: "$2,489/MT", change: "+3.7%", trend: "up", index: "LME" },
  { name: "Steel", price: "$675/MT", change: "+0.8%", trend: "up", index: "SBB" },
];

export const DashboardStats = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("monthly");
  const stats = getStatsForPeriod(timePeriod);

  return (
    <div className="space-y-6">
      {/* Time Period Selector */}
      <div className="flex justify-end">
        <Tabs value={timePeriod} onValueChange={(v) => setTimePeriod(v as TimePeriod)}>
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Vendors */}
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-6 relative">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stats.vendors.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                {stats.vendors.change.startsWith('+') ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{stats.vendors.change}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Vendors</p>
              <p className="text-3xl font-bold tracking-tight">{stats.vendors.total}</p>
            </div>
          </CardContent>
        </Card>

        {/* Active Items */}
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-6 relative">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <Package className="h-6 w-6 text-accent" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stats.items.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                {stats.items.change.startsWith('+') ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{stats.items.change}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Active Items</p>
              <p className="text-3xl font-bold tracking-tight">{stats.items.total}</p>
            </div>
          </CardContent>
        </Card>

        {/* RM Vendors */}
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-6 relative">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-success/10">
                <Layers className="h-6 w-6 text-success" />
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-success">
                <TrendingUp className="h-4 w-4" />
                <span>+5.2%</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">RM Vendors</p>
              <p className="text-3xl font-bold tracking-tight">187</p>
            </div>
          </CardContent>
        </Card>

        {/* PM Vendors */}
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-warning/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-6 relative">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-warning/10">
                <Factory className="h-6 w-6 text-warning" />
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-success">
                <TrendingUp className="h-4 w-4" />
                <span>+3.8%</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">PM Vendors</p>
              <p className="text-3xl font-bold tracking-tight">155</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Commodity Trends */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Live Commodity Trends</h3>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              Live
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {commodityTrends.map((commodity) => (
              <div key={commodity.name} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{commodity.name}</p>
                    <p className="text-xl font-bold mt-1">{commodity.price}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {commodity.index}
                  </Badge>
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium mt-2 ${commodity.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                  {commodity.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  <span>{commodity.change}</span>
                  <span className="text-xs text-muted-foreground ml-1">24h</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
