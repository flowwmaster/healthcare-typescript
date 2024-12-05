"use client";

import { Badge } from "@/components/ui/badge";

interface DoctorStatusBadgeProps {
  status: "pending" | "approved" | "declined";
}

export function DoctorStatusBadge({ status }: DoctorStatusBadgeProps) {
  const variants = {
    pending: "warning",
    approved: "success",
    declined: "destructive",
  } as const;

  return (
    <Badge variant={variants[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}