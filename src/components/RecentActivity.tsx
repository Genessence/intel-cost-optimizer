import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileEdit, CheckCircle, AlertCircle, Clock } from "lucide-react";

const activities = [
  {
    type: "approval",
    status: "approved",
    title: "Non-Qualifiable Cost Approved",
    description: "Special tooling for Part #AL-2847 - Vendor #234",
    amount: "$12,450",
    user: "Sarah Chen",
    time: "15 minutes ago",
  },
  {
    type: "update",
    status: "pending",
    title: "Cost Structure Updated",
    description: "Aluminum composition adjusted for Part #ST-9123",
    amount: "-$3,200",
    user: "Mike Rodriguez",
    time: "1 hour ago",
  },
  {
    type: "negotiation",
    status: "completed",
    title: "Vendor Negotiation Completed",
    description: "Annual contract renewal - Vendor #189",
    amount: "$48,900",
    user: "Emma Thompson",
    time: "3 hours ago",
  },
  {
    type: "review",
    status: "pending",
    title: "Quarterly Review Scheduled",
    description: "Less-Qualifiable costs review - Multiple vendors",
    amount: "N/A",
    user: "System",
    time: "5 hours ago",
  },
];

const statusConfig = {
  approved: { icon: CheckCircle, color: "success", label: "Approved" },
  pending: { icon: Clock, color: "warning", label: "Pending" },
  completed: { icon: CheckCircle, color: "primary", label: "Completed" },
  rejected: { icon: AlertCircle, color: "destructive", label: "Rejected" },
};

export const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates and approvals across all vendors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const config = statusConfig[activity.status as keyof typeof statusConfig];
            const Icon = config.icon;

            return (
              <div
                key={index}
                className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0"
              >
                <div className={`p-2 rounded-lg bg-${config.color}/10 shrink-0 mt-1`}>
                  <Icon className={`h-5 w-5 text-${config.color}`} />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold truncate">{activity.title}</p>
                    <Badge variant="outline" className={`shrink-0 border-${config.color}/20 bg-${config.color}/5`}>
                      {config.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{activity.user}</span>
                    <span>•</span>
                    <span>{activity.time}</span>
                    {activity.amount !== "N/A" && (
                      <>
                        <span>•</span>
                        <span className={activity.amount.startsWith("-") ? "text-success font-medium" : "font-medium"}>
                          {activity.amount}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
