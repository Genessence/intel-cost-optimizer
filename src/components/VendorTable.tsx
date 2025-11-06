import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, ArrowLeftRight } from "lucide-react";

const mockVendors = [
  {
    id: "V-0234",
    name: "Atlas Manufacturing Co.",
    location: "Detroit, MI",
    totalItems: 147,
    lastNegotiation: "2024-09-15",
    annualSpend: 2450000,
    status: "active",
  },
  {
    id: "V-0189",
    name: "Precision Components Inc.",
    location: "San Jose, CA",
    totalItems: 93,
    lastNegotiation: "2024-08-22",
    annualSpend: 1875000,
    status: "active",
  },
  {
    id: "V-0342",
    name: "Global Steel Supply",
    location: "Pittsburgh, PA",
    totalItems: 68,
    lastNegotiation: "2024-07-10",
    annualSpend: 3120000,
    status: "review",
  },
  {
    id: "V-0156",
    name: "TechParts Distribution",
    location: "Austin, TX",
    totalItems: 215,
    lastNegotiation: "2024-10-01",
    annualSpend: 1650000,
    status: "active",
  },
  {
    id: "V-0298",
    name: "Metro Fasteners Ltd.",
    location: "Cleveland, OH",
    totalItems: 124,
    lastNegotiation: "2024-06-18",
    annualSpend: 980000,
    status: "pending",
  },
];

interface VendorTableProps {
  searchQuery: string;
  commodityId?: string;
}

export const VendorTable = ({ searchQuery, commodityId }: VendorTableProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const itemsPerPage = 10;

  const filteredVendors = mockVendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedVendors = filteredVendors.slice(startIndex, startIndex + itemsPerPage);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "review":
        return "secondary";
      case "pending":
        return "outline";
      default:
        return "default";
    }
  };

  const toggleVendorSelection = (vendorId: string) => {
    setSelectedVendors(prev =>
      prev.includes(vendorId)
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const toggleAll = () => {
    if (selectedVendors.length === displayedVendors.length) {
      setSelectedVendors([]);
    } else {
      setSelectedVendors(displayedVendors.map(v => v.id));
    }
  };

  const handleCompare = () => {
    navigate(`/compare?vendors=${selectedVendors.join(',')}`);
  };

  return (
    <div className="space-y-4">
      {selectedVendors.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-sm font-medium">
            {selectedVendors.length} vendor{selectedVendors.length > 1 ? 's' : ''} selected
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedVendors([])}>
              Clear Selection
            </Button>
            <Button 
              size="sm" 
              onClick={handleCompare}
              disabled={selectedVendors.length < 2}
            >
              <ArrowLeftRight className="h-4 w-4 mr-2" />
              Compare Vendors
            </Button>
          </div>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedVendors.length === displayedVendors.length && displayedVendors.length > 0}
                onCheckedChange={toggleAll}
              />
            </TableHead>
            <TableHead>Vendor ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Items</TableHead>
            <TableHead>Last Negotiation</TableHead>
            <TableHead className="text-right">Annual Spend</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedVendors.map((vendor) => (
            <TableRow key={vendor.id} className="hover:bg-muted/50">
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedVendors.includes(vendor.id)}
                  onCheckedChange={() => toggleVendorSelection(vendor.id)}
                />
              </TableCell>
              <TableCell 
                className="font-mono text-sm cursor-pointer"
                onClick={() => navigate(`/vendors/${vendor.id}`)}
              >
                {vendor.id}
              </TableCell>
              <TableCell 
                className="font-medium cursor-pointer"
                onClick={() => navigate(`/vendors/${vendor.id}`)}
              >
                {vendor.name}
              </TableCell>
              <TableCell 
                className="text-muted-foreground cursor-pointer"
                onClick={() => navigate(`/vendors/${vendor.id}`)}
              >
                {vendor.location}
              </TableCell>
              <TableCell 
                className="text-right cursor-pointer"
                onClick={() => navigate(`/vendors/${vendor.id}`)}
              >
                {vendor.totalItems}
              </TableCell>
              <TableCell 
                className="cursor-pointer"
                onClick={() => navigate(`/vendors/${vendor.id}`)}
              >
                {new Date(vendor.lastNegotiation).toLocaleDateString()}
              </TableCell>
              <TableCell 
                className="text-right font-medium cursor-pointer"
                onClick={() => navigate(`/vendors/${vendor.id}`)}
              >
                ${vendor.annualSpend.toLocaleString()}
              </TableCell>
              <TableCell onClick={() => navigate(`/vendors/${vendor.id}`)} className="cursor-pointer">
                <Badge variant={getStatusVariant(vendor.status)}>
                  {vendor.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredVendors.length)} of{" "}
            {filteredVendors.length} vendors
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
