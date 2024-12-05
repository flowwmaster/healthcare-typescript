"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { AppointmentList } from "@/components/appointments/appointment-list";
import { AppointmentFilters } from "@/components/appointments/appointment-filters";
import { AppointmentStats } from "@/components/appointments/appointment-stats";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AppointmentsPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");
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
        heading="Appointments" 
        text="Manage patient appointments"
      >
        <Button onClick={() => router.push("/admin/appointments/schedule")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Schedule Appointment
        </Button>
      </DashboardHeader>
      <div className="space-y-6">
        <AppointmentStats />
        <div className="space-y-4">
          <AppointmentFilters
            statusFilter={statusFilter}
            dateRange={dateRange}
            onStatusChange={setStatusFilter}
            onDateRangeChange={setDateRange}
          />
          <AppointmentList
            statusFilter={statusFilter}
            dateRange={dateRange}
          />
        </div>
      </div>
    </DashboardShell>
  )
}