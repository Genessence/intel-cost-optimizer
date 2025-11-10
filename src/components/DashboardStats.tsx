import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, Package, Factory, Layers, Activity, Link2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

type TimePeriod = "monthly" | "quarterly" | "yearly";

const getStatsForPeriod = (period: TimePeriod) => {
  const periodData = {
    monthly: {
      vendors: { total: "342", change: "+12.5%", assessments: "127" },
      items: { total: "1,247", change: "+8.2%", assessments: "456" },
    },
    quarterly: {
      vendors: { total: "342", change: "+28.3%", assessments: "318" },
      items: { total: "1,247", change: "+15.7%", assessments: "1,089" },
    },
    yearly: {
      vendors: { total: "342", change: "+45.2%", assessments: "1,245" },
      items: { total: "1,247", change: "+32.1%", assessments: "4,328" },
    },
  };
  return periodData[period];
};

const commodityTrends = [
  { name: "Cu (Copper)", price: "$8,234/MT", change: "+2.3%", trend: "up", index: "LME" },
  { name: "Al (Aluminum)", price: "$2,156/MT", change: "-1.2%", trend: "down", index: "LME" },
  { name: "Zn (Zinc)", price: "$2,489/MT", change: "+3.7%", trend: "up", index: "LME" },
  { name: "Steel", price: "$675/MT", change: "+0.8%", trend: "up", index: "SBB" },
  { name: "Ni (Nickel)", price: "$18,456/MT", change: "+1.5%", trend: "up", index: "LME" },
  { name: "Pb (Lead)", price: "$2,087/MT", change: "-0.4%", trend: "down", index: "LME" },
];

// Dummy data for commodity trend charts (last 30 days)
const copperTrendData = [
  { day: "D1", price: 8050 },
  { day: "D5", price: 8120 },
  { day: "D10", price: 8090 },
  { day: "D15", price: 8180 },
  { day: "D20", price: 8150 },
  { day: "D25", price: 8200 },
  { day: "D30", price: 8234 },
];

const aluminumTrendData = [
  { day: "D1", price: 2180 },
  { day: "D5", price: 2165 },
  { day: "D10", price: 2190 },
  { day: "D15", price: 2175 },
  { day: "D20", price: 2160 },
  { day: "D25", price: 2170 },
  { day: "D30", price: 2156 },
];

const zincTrendData = [
  { day: "D1", price: 2400 },
  { day: "D5", price: 2420 },
  { day: "D10", price: 2410 },
  { day: "D15", price: 2450 },
  { day: "D20", price: 2460 },
  { day: "D25", price: 2475 },
  { day: "D30", price: 2489 },
];

const steelTrendData = [
  { day: "D1", price: 670 },
  { day: "D5", price: 668 },
  { day: "D10", price: 672 },
  { day: "D15", price: 671 },
  { day: "D20", price: 673 },
  { day: "D25", price: 674 },
  { day: "D30", price: 675 },
];

// Linked indices information
const linkedIndices = [
  { name: "LME (London Metal Exchange)", commodities: ["Copper", "Aluminum", "Zinc", "Nickel", "Lead"], status: "active" },
  { name: "SBB (Steel Benchmarker)", commodities: ["Hot-rolled coil", "Cold-rolled coil"], status: "active" },
  { name: "COMEX (Commodity Exchange)", commodities: ["Gold", "Silver"], status: "active" },
  { name: "MCX (Multi Commodity Exchange)", commodities: ["Copper", "Zinc", "Aluminum"], status: "active" },
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
              <div className="flex items-center gap-2 mt-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{stats.vendors.assessments}</span> assessments
                </p>
              </div>
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
              <div className="flex items-center gap-2 mt-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{stats.items.assessments}</span> assessments
                </p>
              </div>
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

      {/* Linked Indices */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="h-5 w-5" />
                Linked Market Indices
              </CardTitle>
              <CardDescription>Real-time market data sources for commodity pricing</CardDescription>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              {linkedIndices.length} Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {linkedIndices.map((index) => (
              <div key={index.name} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-sm">{index.name}</h4>
                    <Badge variant="outline" className="mt-2 bg-success/10 text-success border-success/20 text-xs">
                      {index.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {index.commodities.map((commodity) => (
                    <Badge key={commodity} variant="secondary" className="text-xs">
                      {commodity}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Commodity Prices */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Live Commodity Prices</CardTitle>
              <CardDescription>Current spot prices with 24-hour changes</CardDescription>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20 animate-pulse">
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* Live Commodity Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Copper (Cu) - 30 Day Trend</CardTitle>
            <CardDescription>LME Copper spot price per metric ton</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={copperTrendData}>
                <defs>
                  <linearGradient id="colorCopper" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" domain={['dataMin - 50', 'dataMax + 50']} />
                <Tooltip 
                  formatter={(value: number) => `$${value}/MT`}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="hsl(var(--chart-1))" 
                  fillOpacity={1}
                  fill="url(#colorCopper)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Aluminum (Al) - 30 Day Trend</CardTitle>
            <CardDescription>LME Aluminum spot price per metric ton</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={aluminumTrendData}>
                <defs>
                  <linearGradient id="colorAluminum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" domain={['dataMin - 20', 'dataMax + 20']} />
                <Tooltip 
                  formatter={(value: number) => `$${value}/MT`}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="hsl(var(--chart-2))" 
                  fillOpacity={1}
                  fill="url(#colorAluminum)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Zinc (Zn) - 30 Day Trend</CardTitle>
            <CardDescription>LME Zinc spot price per metric ton</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={zincTrendData}>
                <defs>
                  <linearGradient id="colorZinc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" domain={['dataMin - 30', 'dataMax + 30']} />
                <Tooltip 
                  formatter={(value: number) => `$${value}/MT`}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="hsl(var(--chart-3))" 
                  fillOpacity={1}
                  fill="url(#colorZinc)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Steel - 30 Day Trend</CardTitle>
            <CardDescription>SBB Hot-rolled coil price per metric ton</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={steelTrendData}>
                <defs>
                  <linearGradient id="colorSteel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip 
                  formatter={(value: number) => `$${value}/MT`}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="hsl(var(--chart-4))" 
                  fillOpacity={1}
                  fill="url(#colorSteel)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
