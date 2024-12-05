"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DoctorApprovalDialog } from "./doctor-approval-dialog";
import { Eye, MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface DoctorActionsProps {
  doctorId: string;
  doctorName: string;
  status: "pending" | "approved" | "declined";
  onStatusChange?: (status: "approved" | "declined", notes: string) => Promise<void>;
}

export function DoctorActions({
  doctorId,
  doctorName,
  status,
  onStatusChange,
}: DoctorActionsProps) {
  const router = useRouter();
  const [approvalDialog, setApprovalDialog] = useState<{
    isOpen: boolean;
    type: "approve" | "decline";
  }>({
    isOpen: false,
    type: "approve",
  });

  const handleApprove = async (notes: string) => {
    if (onStatusChange) {
      await onStatusChange("approved", notes);
    }
  };

  const handleDecline = async (notes: string) => {
    if (onStatusChange) {
      await onStatusChange("declined", notes);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push(`/admin/doctors/${doctorId}`)}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          {status === "pending" && (
            <>
              <DropdownMenuItem
                onClick={() =>
                  setApprovalDialog({ isOpen: true, type: "approve" })
                }
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setApprovalDialog({ isOpen: true, type: "decline" })
                }
                className="text-destructive"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Decline
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <DoctorApprovalDialog
        isOpen={approvalDialog.isOpen}
        onClose={() => setApprovalDialog({ ...approvalDialog, isOpen: false })}
        onApprove={handleApprove}
        onDecline={handleDecline}
        type={approvalDialog.type}
        doctorName={doctorName}
      />
    </>
  );
}