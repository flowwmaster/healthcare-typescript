"use client";

import { useParams } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DoctorProfile } from "@/components/doctors/doctor-profile";
import { DoctorAvailability } from "@/components/doctors/doctor-availability";
import { DoctorSessions } from "@/components/doctors/doctor-sessions";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DoctorDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const doctorId = params.id as string;

  return (
    <DashboardShell>
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Doctors
      </Button>
      <DashboardHeader
        heading="Doctor Details"
        text="View and manage doctor information"
      />
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <DoctorProfile doctorId={doctorId} />
        </TabsContent>
        <TabsContent value="availability">
          <DoctorAvailability doctorId={doctorId} />
        </TabsContent>
        <TabsContent value="sessions">
          <DoctorSessions doctorId={doctorId} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
