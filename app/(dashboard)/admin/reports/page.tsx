"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ReportsOverview } from "@/components/reports/reports-overview";
import { ReportsList } from "@/components/reports/reports-list";
import { ReportsFilters } from "@/components/reports/reports-filters";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ReportsPage() {
  const [reportType, setReportType] = useState<
    "all" | "financial" | "clinical" | "operational"
  >("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Reports & Analytics" 
        text="View and analyze system performance"
      >
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </DashboardHeader>
      <div className="space-y-6">
        <ReportsOverview />
        <div className="space-y-4">
          <ReportsFilters
            reportType={reportType}
            dateRange={dateRange}
            onReportTypeChange={setReportType}
            onDateRangeChange={setDateRange}
          />
          <ReportsList
            reportType={reportType}
            dateRange={dateRange}
          />
        </div>
      </div>
    </DashboardShell>
  )
}