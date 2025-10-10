import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Unlock, RefreshCw, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface ItemCostBreakdownProps {
  partCode: string;
}

const qualifiableData = [
  {
    material: "Aluminum 6061",
    composition: 85,
    indexSource: "LME Aluminum",
    livePrice: 2.45,
    grossWeight: 2.5,
    netWeight: 2.1,
    scrapWeight: 0.4,
    rmCost: 4.37,
    settleExp: 0.12,
    trial: 0.08,
  },
  {
    material: "Copper",
    composition: 15,
    indexSource: "LME Copper",
    livePrice: 8.92,
    grossWeight: 0.5,
    netWeight: 0.4,
    scrapWeight: 0.1,
    rmCost: 0.54,
    settleExp: 0.05,
    trial: 0.03,
  },
];

const lessQualifiableData = {
  bop: 12.5,
  conversionCost: 8.3,
  overheadCost: 5.2,
  profitOnConversion: 2.1,
  profitOnRM: 1.8,
  transport: 3.4,
};

export const ItemCostBreakdown = ({ partCode }: ItemCostBreakdownProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [lessQualifiableEditing, setLessQualifiableEditing] = useState(false);

  const totalQualifiable = qualifiableData.reduce((sum, item) => 
    sum + item.rmCost + item.settleExp + item.trial, 0
  );

  const totalLessQualifiable = Object.values(lessQualifiableData).reduce((sum, val) => sum + val, 0);

  return (
    <div className="mt-4 space-y-4">
      <Tabs defaultValue="qualifiable" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="qualifiable">Qualifiable Cost</TabsTrigger>
          <TabsTrigger value="less-qualifiable">Less-Qualifiable Cost</TabsTrigger>
          <TabsTrigger value="non-qualifiable">Non-Qualifiable Cost</TabsTrigger>
        </TabsList>

        <TabsContent value="qualifiable" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Qualifiable Cost Breakdown</CardTitle>
                  <CardDescription>Real-time market-indexed cost components</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Prices
                  </Button>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? <Unlock className="h-4 w-4 mr-2" /> : <Lock className="h-4 w-4 mr-2" />}
                    {isEditing ? "Save" : "Edit"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead className="text-right">% Comp.</TableHead>
                    <TableHead>Index Source</TableHead>
                    <TableHead className="text-right">Live Price ($/kg)</TableHead>
                    <TableHead className="text-right">Gross Wt</TableHead>
                    <TableHead className="text-right">Net Wt</TableHead>
                    <TableHead className="text-right">Scrap Wt</TableHead>
                    <TableHead className="text-right">RM Cost ($)</TableHead>
                    <TableHead className="text-right">Settle Exp ($)</TableHead>
                    <TableHead className="text-right">Trial ($)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {qualifiableData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{row.material}</TableCell>
                      <TableCell className="text-right">{row.composition}%</TableCell>
                      <TableCell>
                        <Badge variant="outline">{row.indexSource}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono">${row.livePrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{row.grossWeight}</TableCell>
                      <TableCell className="text-right">{row.netWeight}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{row.scrapWeight}</TableCell>
                      <TableCell className="text-right font-semibold">${row.rmCost.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${row.settleExp.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${row.trial.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/50 font-semibold">
                    <TableCell colSpan={7}>Total Qualifiable Cost</TableCell>
                    <TableCell className="text-right" colSpan={3}>${totalQualifiable.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="less-qualifiable" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Less-Qualifiable Cost Components</CardTitle>
                  <CardDescription>Negotiated and agreed-upon cost elements</CardDescription>
                </div>
                <Button
                  variant={lessQualifiableEditing ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLessQualifiableEditing(!lessQualifiableEditing)}
                >
                  {lessQualifiableEditing ? <Unlock className="h-4 w-4 mr-2" /> : <Lock className="h-4 w-4 mr-2" />}
                  {lessQualifiableEditing ? "Request Approval" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">BOP (Bill of Process)</label>
                    <Input
                      type="number"
                      value={lessQualifiableData.bop}
                      disabled={!lessQualifiableEditing}
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Conversion Cost</label>
                    <Input
                      type="number"
                      value={lessQualifiableData.conversionCost}
                      disabled={!lessQualifiableEditing}
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Overhead Cost</label>
                    <Input
                      type="number"
                      value={lessQualifiableData.overheadCost}
                      disabled={!lessQualifiableEditing}
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Profit on Conversion</label>
                    <Input
                      type="number"
                      value={lessQualifiableData.profitOnConversion}
                      disabled={!lessQualifiableEditing}
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Profit on RM + Conversion</label>
                    <Input
                      type="number"
                      value={lessQualifiableData.profitOnRM}
                      disabled={!lessQualifiableEditing}
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Transport</label>
                    <Input
                      type="number"
                      value={lessQualifiableData.transport}
                      disabled={!lessQualifiableEditing}
                      className="font-mono"
                    />
                  </div>
                </div>
                <div className="pt-4 border-t flex items-center justify-between">
                  <p className="font-semibold">Total Less-Qualifiable Cost</p>
                  <p className="text-2xl font-bold">${totalLessQualifiable.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="non-qualifiable" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Non-Qualifiable Cost Items</CardTitle>
              <CardDescription>Special tooling, certifications, and unique processes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-4 border rounded-lg bg-warning/5 border-warning/20">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <p className="text-sm">
                    Changes to non-qualifiable costs require approval from procurement manager
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tooling Cost</label>
                    <Input type="number" placeholder="Enter tooling cost" className="font-mono" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Unique Certifications</label>
                    <Input type="text" placeholder="Certification type and cost" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Special Processes</label>
                    <Input type="text" placeholder="Process description and cost" />
                  </div>
                </div>
                <Button className="w-full">Submit for Approval</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
