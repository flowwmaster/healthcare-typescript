"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { EmployeeRegistrationForm } from "@/components/employees/employee-registration-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewEmployeePage() {
  const router = useRouter();

  return (
    <DashboardShell>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Employees
      </Button>
      <DashboardHeader
        heading="Add New Employee"
        text="Register a new employee in the system"
      />
      <div className="grid gap-6">
        <EmployeeRegistrationForm />
      </div>
    </DashboardShell>
  );
}