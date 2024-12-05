"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SessionScheduler } from "@/components/sessions/scheduling/session-scheduler";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ScheduleSessionPage() {
  const router = useRouter();

  return (
    <DashboardShell>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Sessions
      </Button>
      <DashboardHeader
        heading="Schedule Session"
        text="Schedule a new therapy session"
      />
      <SessionScheduler />
    </DashboardShell>
  );
}