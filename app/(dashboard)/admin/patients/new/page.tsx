"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PatientRegistrationForm } from "@/components/patients/patient-registration-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewPatientPage() {
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
        heading="Add New Patient"
        text="Register a new patient in the system"
      />
      <PatientRegistrationForm />
    </DashboardShell>
  );
}