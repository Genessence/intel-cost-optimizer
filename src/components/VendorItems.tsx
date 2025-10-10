import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ItemCostBreakdown } from "@/components/ItemCostBreakdown";
import { Badge } from "@/components/ui/badge";

const mockItems = [
  {
    partCode: "AL-2847",
    description: "Aluminum Housing Component - High Precision",
    quantityAnnual: 15000,
    currentCost: 142500,
    lastUpdate: "2024-10-01",
    category: "Machined Parts",
  },
  {
    partCode: "ST-9123",
    description: "Steel Bracket Assembly - Industrial Grade",
    quantityAnnual: 22000,
    currentCost: 198000,
    lastUpdate: "2024-09-28",
    category: "Structural Components",
  },
  {
    partCode: "BR-4556",
    description: "Brass Fitting Set - Marine Application",
    quantityAnnual: 8500,
    currentCost: 76500,
    lastUpdate: "2024-09-15",
    category: "Fittings",
  },
];

interface VendorItemsProps {
  vendorId: string;
}

export const VendorItems = ({ vendorId }: VendorItemsProps) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Procured Items</CardTitle>
        <CardDescription>All parts and components sourced from this vendor</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible value={expandedItem || ""} onValueChange={setExpandedItem}>
          {mockItems.map((item) => (
            <AccordionItem key={item.partCode} value={item.partCode}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold text-left">{item.partCode}</p>
                      <p className="text-sm text-muted-foreground text-left">{item.description}</p>
                    </div>
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-semibold">${item.currentCost.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.quantityAnnual.toLocaleString()} units/year
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ItemCostBreakdown partCode={item.partCode} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
