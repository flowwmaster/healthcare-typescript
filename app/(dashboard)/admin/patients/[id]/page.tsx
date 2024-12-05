"use client";

import { useParams } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientProfile } from "@/components/patients/patient-profile";
import { PatientSessions } from "@/components/patients/patient-sessions";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PatientDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const patientId = params.id as string;

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
        heading="Patient Details"
        text="View and manage patient information"
      />
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <PatientProfile patientId={patientId} />
        </TabsContent>
        <TabsContent value="sessions">
          <PatientSessions patientId={patientId} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}