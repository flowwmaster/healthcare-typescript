"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { EmployeeList } from "@/components/employees/employee-list";
import { EmployeeSearch } from "@/components/employees/employee-search";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  return (
    <DashboardShell>
      <DashboardHeader heading="Employees" text="Manage employee records">
        <Button onClick={() => router.push("/admin/employees/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </DashboardHeader>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <EmployeeSearch onSearch={setSearchQuery} />
        </div>
        <EmployeeList searchQuery={searchQuery} />
      </div>
    </DashboardShell>
  );
}