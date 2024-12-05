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
import { Download, Eye } from "lucide-react";

interface ReportsListProps {
  reportType: "all" | "financial" | "clinical" | "operational";
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

export function ReportsList({ reportType, dateRange }: ReportsListProps) {
  // Mock data - replace with API call
  const reports = [
    {
      id: "REP-001",
      title: "Monthly Revenue Report",
      type: "financial",
      date: new Date(),
      status: "generated",
      insights: "15% increase in revenue compared to last month",
    },
    {
      id: "REP-002",
      title: "Patient Outcomes Analysis",
      type: "clinical",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: "pending",
      insights: "Improved recovery rates in anxiety treatment",
    },
    {
      id: "REP-003",
      title: "Resource Utilization Report",
      type: "operational",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      status: "generated",
      insights: "85% therapist utilization rate achieved",
    },
  ].filter((report) => {
    const matchesType = reportType === "all" || report.type === reportType;
    const matchesDateRange =
      !dateRange.from ||
      !dateRange.to ||
      isWithinInterval(report.date, {
        start: dateRange.from,
        end: dateRange.to,
      });

    return matchesType && matchesDateRange;
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Report ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Key Insights</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">{report.id}</TableCell>
              <TableCell>{report.title}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    report.type === "financial"
                      ? "default"
                      : report.type === "clinical"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{format(report.date, "MMM dd, yyyy")}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    report.status === "generated" ? "success" : "warning"
                  }
                >
                  {report.status.charAt(0).toUpperCase() +
                    report.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="max-w-[300px] truncate">
                {report.insights}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {reports.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                <div className="text-muted-foreground">No reports found</div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
