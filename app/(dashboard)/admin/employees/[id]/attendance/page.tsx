"use client";

import { useParams } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { EmployeeAttendance } from "@/components/employees/attendance/employee-attendance";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmployeeAttendancePage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = params.id as string;

  return (
    <DashboardShell>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Employee
      </Button>
      <DashboardHeader
        heading="Attendance Records"
        text="View and manage employee attendance"
      />
      <EmployeeAttendance employeeId={employeeId} />
    </DashboardShell>
  );
}