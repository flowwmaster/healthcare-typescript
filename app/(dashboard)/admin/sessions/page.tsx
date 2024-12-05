"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SessionList } from "@/components/sessions/session-list";
import { SessionFilters } from "@/components/sessions/session-filters";
import { SessionStats } from "@/components/sessions/session-stats";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SessionsPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | "scheduled" | "completed" | "cancelled">("all");
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
        heading="Sessions" 
        text="View and manage all therapy sessions"
      >
        <Button onClick={() => router.push("/admin/sessions/schedule")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Schedule Session
        </Button>
      </DashboardHeader>
      <div className="space-y-6">
        <SessionStats />
        <div className="space-y-4">
          <SessionFilters
            statusFilter={statusFilter}
            dateRange={dateRange}
            onStatusChange={setStatusFilter}
            onDateRangeChange={setDateRange}
          />
          <SessionList
            statusFilter={statusFilter}
            dateRange={dateRange}
          />
        </div>
      </div>
    </DashboardShell>
  );
}