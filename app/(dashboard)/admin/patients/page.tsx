"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PatientList } from "@/components/patients/patient-list";
import { PatientSearch } from "@/components/patients/patient-search";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  return (
    <DashboardShell>
      <DashboardHeader heading="Patients" text="Manage patient records">
        <Button onClick={() => router.push("/admin/patients/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </DashboardHeader>
      <div className="space-y-4">
        <PatientSearch onSearch={setSearchQuery} />
        <PatientList searchQuery={searchQuery} />
      </div>
    </DashboardShell>
  );
}