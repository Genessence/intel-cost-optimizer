import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", qualifiable: 420000, lessQualifiable: 180000, nonQualifiable: 90000 },
  { month: "Feb", qualifiable: 385000, lessQualifiable: 175000, nonQualifiable: 85000 },
  { month: "Mar", qualifiable: 410000, lessQualifiable: 190000, nonQualifiable: 95000 },
  { month: "Apr", qualifiable: 365000, lessQualifiable: 165000, nonQualifiable: 80000 },
  { month: "May", qualifiable: 390000, lessQualifiable: 185000, nonQualifiable: 88000 },
  { month: "Jun", qualifiable: 350000, lessQualifiable: 160000, nonQualifiable: 75000 },
];

export const CostChart = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Cost Breakdown Trends</CardTitle>
        <CardDescription>6-month overview of costs by category</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorQualifiable" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorLessQualifiable" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorNonQualifiable" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" tickFormatter={(value) => `$${value / 1000}k`} />
            <Tooltip 
              formatter={(value: number) => `$${value.toLocaleString()}`}
              contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="qualifiable" 
              stroke="hsl(var(--chart-1))" 
              fillOpacity={1}
              fill="url(#colorQualifiable)"
              name="Qualifiable Cost"
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="lessQualifiable" 
              stroke="hsl(var(--chart-2))" 
              fillOpacity={1}
              fill="url(#colorLessQualifiable)"
              name="Less-Qualifiable Cost"
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="nonQualifiable" 
              stroke="hsl(var(--chart-3))" 
              fillOpacity={1}
              fill="url(#colorNonQualifiable)"
              name="Non-Qualifiable Cost"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
