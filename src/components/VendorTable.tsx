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
import { ChevronLeft, ChevronRight } from "lucide-react";

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
}

export const VendorTable = ({ searchQuery }: VendorTableProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
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

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
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
            <TableRow
              key={vendor.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => navigate(`/vendors/${vendor.id}`)}
            >
              <TableCell className="font-mono text-sm">{vendor.id}</TableCell>
              <TableCell className="font-medium">{vendor.name}</TableCell>
              <TableCell className="text-muted-foreground">{vendor.location}</TableCell>
              <TableCell className="text-right">{vendor.totalItems}</TableCell>
              <TableCell>{new Date(vendor.lastNegotiation).toLocaleDateString()}</TableCell>
              <TableCell className="text-right font-medium">
                ${vendor.annualSpend.toLocaleString()}
              </TableCell>
              <TableCell>
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
