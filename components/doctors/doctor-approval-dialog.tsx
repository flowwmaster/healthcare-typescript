"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, XCircle } from "lucide-react";

interface DoctorApprovalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (notes: string) => Promise<void>;
  onDecline: (reason: string) => Promise<void>;
  type: "approve" | "decline";
  doctorName: string;
}

export function DoctorApprovalDialog({
  isOpen,
  onClose,
  onApprove,
  onDecline,
  type,
  doctorName,
}: DoctorApprovalDialogProps) {
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (type === "approve") {
        await onApprove(notes);
        toast({
          title: "Doctor Approved",
          description: "The doctor has been successfully approved.",
        });
      } else {
        await onDecline(notes);
        toast({
          title: "Doctor Declined",
          description: "The doctor application has been declined.",
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "approve" ? "Approve Doctor" : "Decline Application"}
          </DialogTitle>
          <DialogDescription>
            {type === "approve"
              ? `Add approval notes for ${doctorName}`
              : `Provide a reason for declining ${doctorName}'s application`}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder={
              type === "approve"
                ? "Add any notes about the approval..."
                : "Explain why this application is being declined..."
            }
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            variant={type === "approve" ? "default" : "destructive"}
          >
            {type === "approve" ? (
              <CheckCircle className="mr-2 h-4 w-4" />
            ) : (
              <XCircle className="mr-2 h-4 w-4" />
            )}
            {isLoading
              ? "Processing..."
              : type === "approve"
              ? "Approve Doctor"
              : "Decline Application"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}