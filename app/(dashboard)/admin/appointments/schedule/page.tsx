"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { AppointmentScheduler } from "@/components/appointments/scheduling/appointment-scheduler";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ScheduleAppointmentPage() {
  const router = useRouter();

  return (
    <DashboardShell>
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Appointments
      </Button>
      <DashboardHeader
        heading="Schedule Appointment"
        text="Schedule a new appointment for a patient"
      />
      <AppointmentScheduler />
    </DashboardShell>
  );
}
