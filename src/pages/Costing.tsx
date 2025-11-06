import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Package } from "lucide-react";

const commodities = [
  { id: "aluminum", name: "Aluminum", totalVendors: 42, annualSpend: 5200000, trend: "+2.3%" },
  { id: "steel", name: "Steel", totalVendors: 38, annualSpend: 8900000, trend: "-1.5%" },
  { id: "copper", name: "Copper", totalVendors: 28, annualSpend: 3400000, trend: "+4.1%" },
  { id: "plastic", name: "Plastic Polymers", totalVendors: 51, annualSpend: 2100000, trend: "+0.8%" },
  { id: "rubber", name: "Rubber", totalVendors: 24, annualSpend: 1600000, trend: "-0.5%" },
  { id: "titanium", name: "Titanium", totalVendors: 15, annualSpend: 4200000, trend: "+3.2%" },
  { id: "glass", name: "Glass", totalVendors: 19, annualSpend: 890000, trend: "+1.1%" },
  { id: "ceramics", name: "Ceramics", totalVendors: 12, annualSpend: 650000, trend: "-2.0%" },
  { id: "composites", name: "Composite Materials", totalVendors: 22, annualSpend: 3800000, trend: "+5.6%" },
  { id: "electronics", name: "Electronic Components", totalVendors: 67, annualSpend: 6700000, trend: "+1.9%" },
];

const Costing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">Commodity Costing</h1>
          <p className="text-muted-foreground">Select a commodity to view and manage vendor relationships</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {commodities.map((commodity) => (
            <Card 
              key={commodity.id}
              className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
              onClick={() => navigate(`/costing/${commodity.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    commodity.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className="h-4 w-4" />
                    {commodity.trend}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{commodity.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vendors</span>
                    <span className="font-medium">{commodity.totalVendors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Annual Spend</span>
                    <span className="font-medium">${(commodity.annualSpend / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Costing;
