"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { BillingStats } from "@/components/billing/billing-stats";
import { BillingList } from "@/components/billing/billing-list";
import { BillingFilters } from "@/components/billing/billing-filters";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BillingPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "pending" | "overdue">("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const router = useRouter();

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Billing & Payments" 
        text="Manage invoices and payment records"
      >
        <Button onClick={() => router.push("/admin/billing/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </DashboardHeader>
      <div className="space-y-6">
        <BillingStats />
        <div className="space-y-4">
          <BillingFilters
            statusFilter={statusFilter}
            dateRange={dateRange}
            onStatusChange={setStatusFilter}
            onDateRangeChange={setDateRange}
          />
          <BillingList
            statusFilter={statusFilter}
            dateRange={dateRange}
          />
        </div>
      </div>
    </DashboardShell>
  );
}