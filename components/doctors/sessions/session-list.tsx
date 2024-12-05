"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Eye, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Session {
  id: string;
  patient: {
    name: string;
    imageUrl: string;
  };
  date: Date;
  startTime: string;
  endTime: string;
  status: "scheduled" | "completed" | "cancelled";
  recordingUrl?: string;
  notes?: string;
}

interface SessionListProps {
  sessions: Session[];
  onViewDetails: (sessionId: string) => void;
}

export function SessionList({ sessions, onViewDetails }: SessionListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
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
                  <span className="font-medium">{session.patient.name}</span>
                </div>
              </TableCell>
              <TableCell>{format(session.date, "MMM dd, yyyy")}</TableCell>
              <TableCell>
                {session.startTime} - {session.endTime}
              </TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(session.id)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                  {session.recordingUrl && (
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={session.recordingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Recording
                      </a>
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
          {sessions.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                <div className="text-muted-foreground">
                  No sessions found for this date
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
