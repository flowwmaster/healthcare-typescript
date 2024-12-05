"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PatientAssignmentForm } from "@/components/patients/patient-assignment-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AssignPatientPage() {
  const router = useRouter();

  return (
    <DashboardShell>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Patients
      </Button>
      <DashboardHeader
        heading="Assign Patient"
        text="Assign sessions and doctor to patient"
      />
      <PatientAssignmentForm />
    </DashboardShell>
  );
}