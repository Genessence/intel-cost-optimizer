import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/Navigation";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const costBreakdownData = [
  { name: "Qualifiable", value: 2340000, color: "hsl(var(--chart-1))" },
  { name: "Less-Qualifiable", value: 1050000, color: "hsl(var(--chart-2))" },
  { name: "Non-Qualifiable", value: 540000, color: "hsl(var(--chart-3))" },
];

const vendorComparisonData = [
  { vendor: "Atlas Mfg", qualifiable: 420000, lessQualifiable: 180000, nonQualifiable: 90000 },
  { vendor: "Precision Co", qualifiable: 385000, lessQualifiable: 175000, nonQualifiable: 85000 },
  { vendor: "Global Steel", qualifiable: 450000, lessQualifiable: 195000, nonQualifiable: 105000 },
  { vendor: "TechParts", qualifiable: 365000, lessQualifiable: 160000, nonQualifiable: 75000 },
];

const commodityTrends = [
  { month: "May", aluminum: 2.35, steel: 850, copper: 8.45 },
  { month: "Jun", aluminum: 2.42, steel: 865, copper: 8.72 },
  { month: "Jul", aluminum: 2.38, steel: 842, copper: 8.58 },
  { month: "Aug", aluminum: 2.51, steel: 878, copper: 9.12 },
  { month: "Sep", aluminum: 2.45, steel: 855, copper: 8.92 },
  { month: "Oct", aluminum: 2.58, steel: 890, copper: 9.24 },
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">Analytics & Insights</h1>
          <p className="text-muted-foreground">Data-driven cost intelligence and forecasting</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vendors">Vendor Comparison</TabsTrigger>
            <TabsTrigger value="commodities">Commodity Trends</TabsTrigger>
            <TabsTrigger value="savings">Savings Projections</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Breakdown by Category</CardTitle>
                  <CardDescription>Total annual costs</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={costBreakdownData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {costBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                  <CardDescription>Performance indicators at a glance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Annual Spend</p>
                      <p className="text-2xl font-bold">$3.93M</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-success">↓ 8.2%</p>
                      <p className="text-xs text-muted-foreground">vs last year</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Cost per Item</p>
                      <p className="text-2xl font-bold">$3,152</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-success">↓ 5.7%</p>
                      <p className="text-xs text-muted-foreground">vs last quarter</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Vendor Efficiency Score</p>
                      <p className="text-2xl font-bold">87.3</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-success">↑ 3.1%</p>
                      <p className="text-xs text-muted-foreground">vs last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Cost Comparison</CardTitle>
                <CardDescription>Cost structure analysis across top vendors</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={vendorComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="vendor" />
                    <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="qualifiable" fill="hsl(var(--chart-1))" name="Qualifiable" />
                    <Bar dataKey="lessQualifiable" fill="hsl(var(--chart-2))" name="Less-Qualifiable" />
                    <Bar dataKey="nonQualifiable" fill="hsl(var(--chart-3))" name="Non-Qualifiable" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commodities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Commodity Price Trends</CardTitle>
                <CardDescription>6-month market index tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={commodityTrends}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="aluminum"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      name="Aluminum ($/kg)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="steel"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      name="Steel ($/ton)"
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="copper"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={2}
                      name="Copper ($/kg)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="savings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Projected Cost Savings</CardTitle>
                <CardDescription>Optimization opportunities based on market intelligence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-success/5 border-success/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Aluminum Renegotiation Opportunity</h4>
                      <p className="text-2xl font-bold text-success">$124,500</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Current market prices are 5.2% below contracted rates with 3 vendors. Recommend
                      renegotiating by Q1 2025.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg bg-success/5 border-success/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Steel Bulk Discount</h4>
                      <p className="text-2xl font-bold text-success">$87,300</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Consolidating steel sourcing to 2 vendors (from 4) could unlock volume discounts of
                      6-8%.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg bg-primary/5 border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Process Optimization</h4>
                      <p className="text-2xl font-bold text-primary">$56,200</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Standardizing BOP processes across vendors could reduce conversion costs by 4-5%.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
