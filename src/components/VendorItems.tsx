import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";

// Mock data for copper commodity items
const mockCopperItems = [
  {
    srNo: 1,
    partName: "Copper Tube Assembly",
    partCode: "CU-2847",
    copperWtPcs: 0.45,
    lme: 8500,
    freight: 120,
    capillaryWtPcs: 0.08,
    bme: 9200,
    fabCostFreight: 450,
    bopPart: "BOP-123",
    price: 850,
    brazingWeight: 0.02,
    labour: 120,
    consumables: 45,
    admitCost: 75,
    packingHandling: 35,
    freight2: 80,
  },
  {
    srNo: 2,
    partName: "Copper Connector",
    partCode: "CU-9123",
    copperWtPcs: 0.32,
    lme: 8500,
    freight: 120,
    capillaryWtPcs: 0.05,
    bme: 9200,
    fabCostFreight: 380,
    bopPart: "BOP-456",
    price: 620,
    brazingWeight: 0.015,
    labour: 95,
    consumables: 35,
    admitCost: 60,
    packingHandling: 28,
    freight2: 65,
  },
  {
    srNo: 3,
    partName: "Copper Heat Exchanger",
    partCode: "CU-4556",
    copperWtPcs: 0.68,
    lme: 8500,
    freight: 120,
    capillaryWtPcs: 0.12,
    bme: 9200,
    fabCostFreight: 620,
    bopPart: "BOP-789",
    price: 1250,
    brazingWeight: 0.03,
    labour: 180,
    consumables: 65,
    admitCost: 110,
    packingHandling: 52,
    freight2: 120,
  },
];

interface VendorItemsProps {
  vendorId: string;
}

const calculateValues = (item: typeof mockCopperItems[0]) => {
  // RM Cost of Copper = (weight x LME cost + freight)
  const rmCostCopper = (item.copperWtPcs * item.lme) + item.freight;
  
  // Copper Cost = BME + Fab Cost & Freight
  const copperCost = item.bme + item.fabCostFreight;
  
  // RM Cost of capillary = Copper Cost * Capillary wt
  const rmCostCapillary = copperCost * item.capillaryWtPcs;
  
  // Total RM Cost
  const totalRMCost = rmCostCopper + rmCostCapillary;
  
  // Total Amt (BOP Part)
  const totalAmtBOP = item.price;
  
  // Total Amt (Brazing) - assuming it's related to brazing weight
  const totalAmtBrazing = item.brazingWeight * item.lme;
  
  // Inventory carrying cost 0%
  const inventoryCarryingCost = 0;
  
  // Rejection on RM 1%
  const rejectionRM = totalRMCost * 0.01;
  
  // Rejection Recovery @ 75%
  const rejectionRecovery = rejectionRM * 0.75;
  
  // Total after rejections
  const totalAfterRejection = totalRMCost + totalAmtBOP + totalAmtBrazing + rejectionRM - rejectionRecovery;
  
  // Profit 20%
  const profit = totalAfterRejection * 0.20;
  
  // G-Total
  const gTotal = totalAfterRejection + item.labour + item.consumables + item.admitCost + profit + item.packingHandling + item.freight2;
  
  return {
    rmCostCopper,
    copperCost,
    rmCostCapillary,
    totalRMCost,
    totalAmtBOP,
    totalAmtBrazing,
    inventoryCarryingCost,
    rejectionRM,
    rejectionRecovery,
    totalAfterRejection,
    profit,
    gTotal,
  };
};

export const VendorItems = ({ vendorId }: VendorItemsProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Procured Items - Copper Commodity</CardTitle>
            <CardDescription>Detailed cost breakdown for all copper parts sourced from this vendor</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border px-3 py-2 text-left font-semibold sticky left-0 bg-muted/50 z-10 min-w-[60px]">Sr No</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold sticky left-[60px] bg-muted/50 z-10 min-w-[180px]">Part Name</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold min-w-[120px]">Part Code</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[120px]">Copper Wt/Pcs (KG)</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[100px]">LME</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[100px]">Freight</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[140px] bg-blue-50 dark:bg-blue-950">RM Cost of Copper</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[140px]">Capillary Wt/Pcs (KG)</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[100px]">BME</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[140px]">Fab Cost & Freight</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[120px] bg-blue-50 dark:bg-blue-950">Copper Cost</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[140px] bg-blue-50 dark:bg-blue-950">RM Cost of Capillary</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[120px] bg-green-50 dark:bg-green-950">Total RM Cost</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold min-w-[120px]">BOP Part</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[100px]">Price</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[120px] bg-green-50 dark:bg-green-950">Total Amt</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[140px]">Brazing Weight (KG)</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[120px] bg-green-50 dark:bg-green-950">Total Amt</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[160px]">Inventory Carrying Cost (0%)</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[140px] bg-red-50 dark:bg-red-950">Rejection on RM (1%)</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[160px] bg-green-50 dark:bg-green-950">Rejection Recovery (75%)</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[100px] bg-yellow-50 dark:bg-yellow-950">Total</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[100px]">Labour</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[120px]">Consumables</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[120px]">Admit Cost</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[120px] bg-purple-50 dark:bg-purple-950">Profit (20%)</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[140px]">Packing & Handling</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[100px]">Freight</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold min-w-[120px] bg-amber-50 dark:bg-amber-950">G-Total</th>
                </tr>
              </thead>
              <tbody>
                {mockCopperItems.map((item) => {
                  const calculated = calculateValues(item);
                  return (
                    <tr key={item.srNo} className="hover:bg-muted/30">
                      <td className="border border-border px-3 py-2 text-center sticky left-0 bg-background z-10">{item.srNo}</td>
                      <td className="border border-border px-3 py-2 sticky left-[60px] bg-background z-10">{item.partName}</td>
                      <td className="border border-border px-3 py-2 font-mono text-sm">{item.partCode}</td>
                      <td className="border border-border px-3 py-2 text-right">{item.copperWtPcs.toFixed(3)}</td>
                      <td className="border border-border px-3 py-2 text-right">{item.lme.toLocaleString()}</td>
                      <td className="border border-border px-3 py-2 text-right">{item.freight.toFixed(2)}</td>
                      <td className="border border-border px-3 py-2 text-right font-semibold bg-blue-50 dark:bg-blue-950">{calculated.rmCostCopper.toFixed(2)}</td>
                      <td className="border border-border px-3 py-2 text-right">{item.capillaryWtPcs.toFixed(3)}</td>
                      <td className="border border-border px-3 py-2 text-right">{item.bme.toLocaleString()}</td>
                      <td className="border border-border px-3 py-2 text-right">{item.fabCostFreight.toFixed(2)}</td>
                      <td className="border border-border px-3 py-2 text-right font-semibold bg-blue-50 dark:bg-blue-950">{calculated.copperCost.toFixed(2)}</td>
                      <td className="border border-border px-3 py-2 text-right font-semibold bg-blue-50 dark:bg-blue-950">{calculated.rmCostCapillary.toFixed(2)}</td>
                      <td className="border border-border px-3 py-2 text-right font-semibold bg-green-50 dark:bg-green-950">{calculated.totalRMCost.toFixed(2)}</td>
                      <td className="border border-border px-3 py-2 font-mono text-sm">{item.bopPart}</td>
                      <td className="border border-border px-3 py-2 text-right">{item.price.toFixed(2)}</td>
                      <td className="border border-border px-3 py-2 text-right font-semibold bg-green-50 dark:bg-green-950">{calculated.totalAmtBOP.toFixed(2)}</td>
                      <td className="border border-border px-3 py-2 text-right">{item.brazingWeight.toFixed(3)}</td>
                      <td className="border border-border px-3 py-2 text-right font-semibold bg-green-50 dark:bg-green-950">{calculated.totalAmtBrazing.toFixed(2)}</td>
                      <td className="border border-border px-3 py-2 text-right">{calculated.inventoryCarryingCost.toFixed(2)}</td>
                      <td className="border border-border px-3 py-2 text-right bg-red-50 dark:bg-red-950">{calculated.rejectionRM.toFixed(2)}</td>
                      <td className="border border-border px-3 py-2 text-right bg-green-50 dark:bg-green-950">{calculated.rejectionRecovery.toFixed(2)}</td>
                      <td className="border border-border px-3 py-2 text-right font-semibold bg-yellow-50 dark:bg-yellow-950">{calculated.totalAfterRejection.toFixed(2)}</td>
                      <td className="border border-border px-3 py-2 text-right">{item.labour.toFixed(2)}</td>
                      <td className="border border-border px-3 py-2 text-right">{item.consumables.toFixed(2)}</td>
                      <td className="border border-border px-3 py-2 text-right">{item.admitCost.toFixed(2)}</td>
                      <td className="border border-border px-3 py-2 text-right font-semibold bg-purple-50 dark:bg-purple-950">{calculated.profit.toFixed(2)}</td>
                      <td className="border border-border px-3 py-2 text-right">{item.packingHandling.toFixed(2)}</td>
                      <td className="border border-border px-3 py-2 text-right">{item.freight2.toFixed(2)}</td>
                      <td className="border border-border px-3 py-2 text-right font-bold bg-amber-50 dark:bg-amber-950">{calculated.gTotal.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 bg-blue-50 dark:bg-blue-950 border border-border"></span>
            Calculated - Copper costs
          </p>
          <p className="flex items-center gap-2 mt-1">
            <span className="inline-block w-4 h-4 bg-green-50 dark:bg-green-950 border border-border"></span>
            Calculated - Totals
          </p>
          <p className="flex items-center gap-2 mt-1">
            <span className="inline-block w-4 h-4 bg-yellow-50 dark:bg-yellow-950 border border-border"></span>
            Subtotal before profit
          </p>
          <p className="flex items-center gap-2 mt-1">
            <span className="inline-block w-4 h-4 bg-amber-50 dark:bg-amber-950 border border-border"></span>
            Grand Total
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
