import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VendorTable } from "@/components/VendorTable";
import { Navigation } from "@/components/Navigation";
import { Search, Download, Filter, ArrowLeft } from "lucide-react";

const Vendors = () => {
  const { commodityId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  
  const commodityName = commodityId 
    ? commodityId.charAt(0).toUpperCase() + commodityId.slice(1).replace('-', ' ')
    : "All Commodities";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col gap-2">
          {commodityId && (
            <Link 
              to="/costing" 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground w-fit mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Commodities
            </Link>
          )}
          <h1 className="text-4xl font-bold tracking-tight">
            {commodityName} Vendors
          </h1>
          <p className="text-muted-foreground">
            {commodityId 
              ? `Vendors supplying ${commodityName.toLowerCase()} products` 
              : "Manage and analyze vendor relationships and costs"}
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle>{commodityName} Vendors</CardTitle>
                <CardDescription>
                  {commodityId 
                    ? `Active vendors for ${commodityName.toLowerCase()}` 
                    : "342 active vendors across all categories"}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors by name, ID, or location..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <VendorTable searchQuery={searchQuery} commodityId={commodityId} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Vendors;
