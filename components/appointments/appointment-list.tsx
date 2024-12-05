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
import { Eye, Video, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppointmentListProps {
  statusFilter: "all" | "upcoming" | "completed" | "cancelled";
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

export function AppointmentList({
  statusFilter,
  dateRange,
}: AppointmentListProps) {
  // Mock data - replace with API call
  const appointments = [
    {
      id: "1",
      patient: {
        name: "John Smith",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      },
      doctor: {
        name: "Dr. Sarah Wilson",
        imageUrl:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
      },
      date: new Date(),
      time: "10:00 AM",
      type: "Initial Consultation",
      status: "upcoming",
      meetingUrl: "https://meet.example.com/abc123",
    },
    {
      id: "2",
      patient: {
        name: "Emma Johnson",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      },
      doctor: {
        name: "Dr. Michael Chen",
        imageUrl:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop",
      },
      date: new Date(),
      time: "2:00 PM",
      type: "Follow-up",
      status: "completed",
      meetingUrl: "https://meet.example.com/xyz789",
    },
  ].filter((appointment) => {
    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;
    const matchesDateRange =
      !dateRange.from ||
      !dateRange.to ||
      isWithinInterval(appointment.date, {
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
            <TableHead>Date & Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={appointment.patient.imageUrl}
                      alt={appointment.patient.name}
                    />
                    <AvatarFallback>
                      {appointment.patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">
                    {appointment.patient.name}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={appointment.doctor.imageUrl}
                      alt={appointment.doctor.name}
                    />
                    <AvatarFallback>
                      {appointment.doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{appointment.doctor.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">
                    {format(appointment.date, "MMM dd, yyyy")}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {appointment.time}
                  </div>
                </div>
              </TableCell>
              <TableCell>{appointment.type}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    appointment.status === "completed"
                      ? "success"
                      : appointment.status === "upcoming"
                      ? "default"
                      : "destructive"
                  }
                >
                  {appointment.status.charAt(0).toUpperCase() +
                    appointment.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    {appointment.status === "upcoming" && (
                      <DropdownMenuItem>
                        <Video className="mr-2 h-4 w-4" />
                        Join Meeting
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {appointments.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                <div className="text-muted-foreground">
                  No appointments found
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
