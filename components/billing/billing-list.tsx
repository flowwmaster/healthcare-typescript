"use client";

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
import { format, isWithinInterval } from "date-fns";
import { Download, Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BillingListProps {
  statusFilter: "all" | "paid" | "pending" | "overdue";
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

export function BillingList({ statusFilter, dateRange }: BillingListProps) {
  // Mock data - replace with API call
  const invoices = [
    {
      id: "INV-001",
      patient: "John Smith",
      amount: 500,
      date: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "pending",
      description: "Therapy Sessions - March 2024",
    },
    {
      id: "INV-002",
      patient: "Emma Johnson",
      amount: 750,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      status: "paid",
      description: "Consultation and Follow-up",
    },
  ].filter((invoice) => {
    const matchesStatus =
      statusFilter === "all" || invoice.status === statusFilter;
    const matchesDateRange =
      !dateRange.from ||
      !dateRange.to ||
      isWithinInterval(invoice.date, {
        start: dateRange.from,
        end: dateRange.to,
      });

    return matchesStatus && matchesDateRange;
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.patient}</TableCell>
              <TableCell>₹{invoice.amount.toLocaleString()}</TableCell>
              <TableCell>{format(invoice.date, "MMM dd, yyyy")}</TableCell>
              <TableCell>{format(invoice.dueDate, "MMM dd, yyyy")}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    invoice.status === "paid"
                      ? "success"
                      : invoice.status === "pending"
                      ? "default"
                      : "destructive"
                  }
                >
                  {invoice.status.charAt(0).toUpperCase() +
                    invoice.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {invoices.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                <div className="text-muted-foreground">No invoices found</div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
