"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DoctorFiltersProps {
  statusFilter: "all" | "pending" | "approved" | "declined";
  availabilityFilter: "all" | "online" | "offline";
  onStatusChange: (value: "all" | "pending" | "approved" | "declined") => void;
  onAvailabilityChange: (value: "all" | "online" | "offline") => void;
}

export function DoctorFilters({
  statusFilter,
  availabilityFilter,
  onStatusChange,
  onAvailabilityChange,
}: DoctorFiltersProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
      <Select
        value={statusFilter}
        onValueChange={(value: "all" | "pending" | "approved" | "declined") => onStatusChange(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending Approval</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="declined">Declined</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={availabilityFilter}
        onValueChange={(value: "all" | "online" | "offline") => onAvailabilityChange(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by availability" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Availability</SelectItem>
          <SelectItem value="online">Online</SelectItem>
          <SelectItem value="offline">Offline</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}