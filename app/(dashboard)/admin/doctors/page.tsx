"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DoctorList } from "@/components/doctors/doctor-list";
import { DoctorSearch } from "@/components/doctors/doctor-search";
import { DoctorFilters } from "@/components/doctors/doctor-filters";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "declined">("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<"all" | "online" | "offline">("all");
  const router = useRouter();

  return (
    <DashboardShell>
      <DashboardHeader heading="Doctors" text="Manage doctor profiles and approvals">
        <Button onClick={() => router.push("/admin/doctors/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Doctor
        </Button>
      </DashboardHeader>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <DoctorSearch onSearch={setSearchQuery} />
          <DoctorFilters 
            statusFilter={statusFilter}
            availabilityFilter={availabilityFilter}
            onStatusChange={setStatusFilter}
            onAvailabilityChange={setAvailabilityFilter}
          />
        </div>
        <DoctorList 
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          availabilityFilter={availabilityFilter}
        />
      </div>
    </DashboardShell>
  );
}