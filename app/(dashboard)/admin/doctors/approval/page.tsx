"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DoctorApprovalList } from "@/components/doctors/approval/doctor-approval-list";
import { DoctorApprovalFilters } from "@/components/doctors/approval/doctor-approval-filters";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DoctorApprovalPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "declined">("pending");
  const router = useRouter();

  return (
    <DashboardShell>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Doctors
      </Button>
      <DashboardHeader
        heading="Doctor Approvals"
        text="Review and manage doctor registration requests"
      />
      <div className="space-y-4">
        <DoctorApprovalFilters
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />
        <DoctorApprovalList statusFilter={statusFilter} />
      </div>
    </DashboardShell>
  );
}