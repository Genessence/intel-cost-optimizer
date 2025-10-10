import { useSearchParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock vendor data - in a real app this would come from an API
const mockVendorData = {
  "V-0234": {
    id: "V-0234",
    name: "Atlas Manufacturing Co.",
    items: [
      {
        partCode: "AL-2847",
        description: "Aluminum Housing Component",
        quantityAnnual: 15000,
        qualifiableCost: 67500,
        lessQualifiableCost: 48750,
        nonQualifiableCost: 26250,
        totalCost: 142500,
      },
      {
        partCode: "ST-9123",
        description: "Steel Bracket Assembly",
        quantityAnnual: 22000,
        qualifiableCost: 118800,
        lessQualifiableCost: 59400,
        nonQualifiableCost: 19800,
        totalCost: 198000,
      },
    ],
  },
  "V-0189": {
    id: "V-0189",
    name: "Precision Components Inc.",
    items: [
      {
        partCode: "AL-2847",
        description: "Aluminum Housing Component",
        quantityAnnual: 15000,
        qualifiableCost: 71250,
        lessQualifiableCost: 45000,
        nonQualifiableCost: 28500,
        totalCost: 144750,
      },
      {
        partCode: "BR-4556",
        description: "Brass Fitting Set",
        quantityAnnual: 8500,
        qualifiableCost: 45900,
        lessQualifiableCost: 22950,
        nonQualifiableCost: 7650,
        totalCost: 76500,
      },
    ],
  },
  "V-0342": {
    id: "V-0342",
    name: "Global Steel Supply",
    items: [
      {
        partCode: "ST-9123",
        description: "Steel Bracket Assembly",
        quantityAnnual: 22000,
        qualifiableCost: 110000,
        lessQualifiableCost: 66000,
        nonQualifiableCost: 22000,
        totalCost: 198000,
      },
    ],
  },
};

const VendorComparison = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const vendorIds = searchParams.get("vendors")?.split(",") || [];

  const vendors = vendorIds
    .map(id => mockVendorData[id as keyof typeof mockVendorData])
    .filter(Boolean);

  if (vendors.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto p-6">
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground mb-4">No vendors selected for comparison</p>
              <Button onClick={() => navigate("/vendors")}>Go to Vendors</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Get all unique items across selected vendors
  const allItems = new Map<string, any>();
  vendors.forEach(vendor => {
    vendor.items.forEach(item => {
      if (!allItems.has(item.partCode)) {
        allItems.set(item.partCode, {
          partCode: item.partCode,
          description: item.description,
          vendors: {},
        });
      }
      allItems.get(item.partCode).vendors[vendor.id] = item;
    });
  });

  // Prepare chart data
  const chartData = vendors.map(vendor => {
    const totals = vendor.items.reduce(
      (acc, item) => ({
        qualifiable: acc.qualifiable + item.qualifiableCost,
        lessQualifiable: acc.lessQualifiable + item.lessQualifiableCost,
        nonQualifiable: acc.nonQualifiable + item.nonQualifiableCost,
      }),
      { qualifiable: 0, lessQualifiable: 0, nonQualifiable: 0 }
    );
    return {
      name: vendor.name.split(" ")[0],
      qualifiable: totals.qualifiable,
      lessQualifiable: totals.lessQualifiable,
      nonQualifiable: totals.nonQualifiable,
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Button variant="ghost" size="sm" onClick={() => navigate("/vendors")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Vendors
              </Button>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Vendor Comparison</h1>
            <p className="text-muted-foreground">
              Comparing {vendors.length} vendor{vendors.length > 1 ? "s" : ""} across procurement items
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vendors.map(vendor => {
            const totalCost = vendor.items.reduce((sum, item) => sum + item.totalCost, 0);
            return (
              <Card key={vendor.id}>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{vendor.id}</Badge>
                      <p className="text-sm text-muted-foreground">{vendor.items.length} items</p>
                    </div>
                    <h3 className="font-semibold text-lg">{vendor.name}</h3>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-muted-foreground">Total Cost</p>
                      <p className="text-2xl font-bold">${totalCost.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Cost Structure Comparison</CardTitle>
            <CardDescription>Breakdown by cost category across selected vendors</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" />
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

        <Card>
          <CardHeader>
            <CardTitle>Item-by-Item Comparison</CardTitle>
            <CardDescription>Detailed cost breakdown for common procurement items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Array.from(allItems.values()).map(item => (
                <div key={item.partCode} className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b">
                    <div>
                      <h4 className="font-semibold">{item.partCode}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vendor</TableHead>
                        <TableHead className="text-right">Quantity/Year</TableHead>
                        <TableHead className="text-right">Qualifiable</TableHead>
                        <TableHead className="text-right">Less-Qualifiable</TableHead>
                        <TableHead className="text-right">Non-Qualifiable</TableHead>
                        <TableHead className="text-right">Total Cost</TableHead>
                        <TableHead className="text-right">Variance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendors.map(vendor => {
                        const vendorItem = item.vendors[vendor.id];
                        if (!vendorItem) {
                          return (
                            <TableRow key={vendor.id}>
                              <TableCell className="font-medium">{vendor.name}</TableCell>
                              <TableCell colSpan={6} className="text-center text-muted-foreground">
                                Not procured from this vendor
                              </TableCell>
                            </TableRow>
                          );
                        }

                        // Calculate variance from average
                        const allCosts = Object.values(item.vendors).map((v: any) => v.totalCost);
                        const avgCost = allCosts.reduce((a: number, b: number) => a + b, 0) / allCosts.length;
                        const variance = ((vendorItem.totalCost - avgCost) / avgCost) * 100;

                        return (
                          <TableRow key={vendor.id}>
                            <TableCell className="font-medium">{vendor.name}</TableCell>
                            <TableCell className="text-right">
                              {vendorItem.quantityAnnual.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right">
                              ${vendorItem.qualifiableCost.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right">
                              ${vendorItem.lessQualifiableCost.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right">
                              ${vendorItem.nonQualifiableCost.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                              ${vendorItem.totalCost.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                {variance > 0 ? (
                                  <TrendingUp className="h-4 w-4 text-destructive" />
                                ) : (
                                  <TrendingDown className="h-4 w-4 text-success" />
                                )}
                                <span
                                  className={
                                    variance > 0 ? "text-destructive font-medium" : "text-success font-medium"
                                  }
                                >
                                  {variance > 0 ? "+" : ""}
                                  {variance.toFixed(1)}%
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorComparison;
