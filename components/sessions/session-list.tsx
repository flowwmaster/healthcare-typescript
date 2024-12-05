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
import { format, isWithinInterval } from "date-fns";
import { Eye, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SessionListProps {
  statusFilter: "all" | "scheduled" | "completed" | "cancelled";
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

export function SessionList({ statusFilter, dateRange }: SessionListProps) {
  // Mock data - replace with API call
  const sessions = [
    {
      id: "1",
      patient: {
        name: "John Smith",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      },
      doctor: {
        name: "Dr. Sarah Wilson",
        imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
      },
      date: new Date(),
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      status: "completed",
      recordingUrl: "https://example.com/recording/1",
      notes: "Regular therapy session",
    },
    {
      id: "2",
      patient: {
        name: "Emma Johnson",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      },
      doctor: {
        name: "Dr. Michael Chen",
        imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop",
      },
      date: new Date(),
      startTime: "2:00 PM",
      endTime: "3:00 PM",
      status: "scheduled",
      notes: "Initial consultation",
    },
  ].filter((session) => {
    const matchesStatus = statusFilter === "all" || session.status === statusFilter;
    const matchesDateRange =
      !dateRange.from ||
      !dateRange.to ||
      isWithinInterval(session.date, {
        start: dateRange.from,
        end: dateRange.to,
      });

    return matchesStatus && matchesDateRange;
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Doctor</TableHead>
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
                    <AvatarImage src={session.patient.imageUrl} alt={session.patient.name} />
                    <AvatarFallback>{session.patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{session.patient.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={session.doctor.imageUrl} alt={session.doctor.name} />
                    <AvatarFallback>{session.doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <span>{session.doctor.name}</span>
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
                  {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
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
              <TableCell colSpan={6} className="text-center py-6">
                <div className="text-muted-foreground">No sessions found</div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}