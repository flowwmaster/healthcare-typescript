"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DoctorRegistrationForm } from "@/components/doctors/doctor-registration-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewDoctorPage() {
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
        heading="Add New Doctor"
        text="Register a new doctor in the system"
      />
      <div className="grid gap-6">
        <DoctorRegistrationForm />
      </div>
    </DashboardShell>
  );
}