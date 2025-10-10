import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, TrendingDown, Clock } from "lucide-react";

const alerts = [
  {
    type: "market",
    severity: "warning",
    title: "Aluminum Price Surge",
    description: "LME Aluminum up 6.2% in 24h",
    icon: TrendingUp,
    time: "2h ago",
  },
  {
    type: "approval",
    severity: "info",
    title: "Pending Approval",
    description: "3 non-qualifiable cost items need review",
    icon: Clock,
    time: "5h ago",
  },
  {
    type: "market",
    severity: "success",
    title: "Steel Price Drop",
    description: "Hot-rolled coil down 4.8%",
    icon: TrendingDown,
    time: "1d ago",
  },
  {
    type: "vendor",
    severity: "warning",
    title: "Vendor Performance",
    description: "Vendor #234 cost variance >15%",
    icon: AlertTriangle,
    time: "2d ago",
  },
];

const severityColors = {
  warning: "warning",
  info: "primary",
  success: "success",
};

export const AlertsPanel = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Market & System Alerts</CardTitle>
        <CardDescription>Real-time notifications and insights</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;
          const color = severityColors[alert.severity as keyof typeof severityColors];

          return (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors cursor-pointer"
            >
              <div className={`p-2 rounded-lg bg-${color}/10 shrink-0`}>
                <Icon className={`h-4 w-4 text-${color}`} />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold truncate">{alert.title}</p>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {alert.time}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
