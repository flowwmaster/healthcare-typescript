"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DoctorApprovalFiltersProps {
  statusFilter: "all" | "pending" | "approved" | "declined";
  onStatusChange: (value: "all" | "pending" | "approved" | "declined") => void;
}

export function DoctorApprovalFilters({
  statusFilter,
  onStatusChange,
}: DoctorApprovalFiltersProps) {
  return (
    <div className="flex justify-end">
      <Select
        value={statusFilter}
        onValueChange={(value: "all" | "pending" | "approved" | "declined") => onStatusChange(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Applications</SelectItem>
          <SelectItem value="pending">Pending Review</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="declined">Declined</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}