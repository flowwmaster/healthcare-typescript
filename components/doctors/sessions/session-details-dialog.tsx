"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SessionNotes } from "./session-notes";
import { SessionFeedback } from "./session-feedback";

interface Session {
  id: string;
  patient: {
    name: string;
    imageUrl: string;
    email: string;
  };
  date: Date;
  startTime: string;
  endTime: string;
  status: "scheduled" | "completed" | "cancelled";
  recordingUrl?: string;
  notes?: string;
  feedback?: {
    rating: number;
    comment: string;
    date: Date;
  } | null;
}

interface SessionDetailsDialogProps {
  session: Session | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveNotes: (sessionId: string, notes: string) => Promise<void>;
}

export function SessionDetailsDialog({
  session,
  isOpen,
  onClose,
  onSaveNotes,
}: SessionDetailsDialogProps) {
  if (!session) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Session Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={session.patient.imageUrl}
                alt={session.patient.name}
              />
              <AvatarFallback>
                {session.patient.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{session.patient.name}</h3>
              <p className="text-sm text-muted-foreground">
                {session.patient.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Date</p>
              <p className="text-sm text-muted-foreground">
                {format(session.date, "MMMM dd, yyyy")}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Time</p>
              <p className="text-sm text-muted-foreground">
                {session.startTime} - {session.endTime}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Status</p>
              <Badge
                variant={
                  session.status === "completed"
                    ? "success"
                    : session.status === "scheduled"
                    ? "default"
                    : "destructive"
                }
              >
                {session.status.charAt(0).toUpperCase() +
                  session.status.slice(1)}
              </Badge>
            </div>
            {session.recordingUrl && (
              <div>
                <p className="text-sm font-medium">Recording</p>
                <Button variant="link" className="px-0" asChild>
                  <a
                    href={session.recordingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Video className="h-4 w-4 mr-2" />
                    View Recording
                  </a>
                </Button>
              </div>
            )}
          </div>

          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>
            <TabsContent value="notes" className="mt-4">
              <SessionNotes
                sessionId={session.id}
                initialNotes={session.notes}
                onSave={(notes) => onSaveNotes(session.id, notes)}
              />
            </TabsContent>
            <TabsContent value="feedback" className="mt-4">
              <SessionFeedback feedback={session?.feedback} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
