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
import { format } from "date-fns";

interface PatientSessionsProps {
  patientId: string;
}

export function PatientSessions({ patientId }: PatientSessionsProps) {
  // Mock data - replace with API call
  const sessions = [
    {
      id: "1",
      doctorName: "Dr. Smith",
      date: new Date(),
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      status: "Completed",
      recordingUrl: "https://example.com/recording/1",
    },
    {
      id: "2",
      doctorName: "Dr. Johnson",
      date: new Date(),
      startTime: "2:00 PM",
      endTime: "3:00 PM",
      status: "Scheduled",
      recordingUrl: null,
    },
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Doctor</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Recording</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell>{session.doctorName}</TableCell>
              <TableCell>{format(session.date, "MMM dd, yyyy")}</TableCell>
              <TableCell>
                {session.startTime} - {session.endTime}
              </TableCell>
              <TableCell>
                <Badge
                  variant={session.status === "Completed" ? "default" : "secondary"}
                >
                  {session.status}
                </Badge>
              </TableCell>
              <TableCell>
                {session.recordingUrl ? (
                  <a
                    href={session.recordingUrl}
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Recording
                  </a>
                ) : (
                  "Not available"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}