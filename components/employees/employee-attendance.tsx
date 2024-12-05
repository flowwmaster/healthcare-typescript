"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { MapPin } from "lucide-react";

interface EmployeeAttendanceProps {
  employeeId: string;
}

interface AttendanceRecord {
  date: Date;
  signInTime: string;
  signOutTime?: string;
  signInLocation: {
    latitude: number;
    longitude: number;
    address: string;
  };
  signOutLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  status: "present" | "absent" | "late" | "early-leave";
}

export function EmployeeAttendance({ employeeId }: EmployeeAttendanceProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock data - replace with API call
  const attendanceRecords: AttendanceRecord[] = [
    {
      date: new Date(),
      signInTime: "09:00 AM",
      signOutTime: "06:00 PM",
      signInLocation: {
        latitude: 40.7128,
        longitude: -74.0060,
        address: "123 Office Street, New York",
      },
      signOutLocation: {
        latitude: 40.7128,
        longitude: -74.0060,
        address: "123 Office Street, New York",
      },
      status: "present",
    },
    {
      date: new Date(Date.now() - 86400000), // Yesterday
      signInTime: "09:30 AM",
      signOutTime: "05:30 PM",
      signInLocation: {
        latitude: 40.7128,
        longitude: -74.0060,
        address: "123 Office Street, New York",
      },
      signOutLocation: {
        latitude: 40.7128,
        longitude: -74.0060,
        address: "123 Office Street, New York",
      },
      status: "late",
    },
  ];

  const stats = {
    present: attendanceRecords.filter(r => r.status === "present").length,
    late: attendanceRecords.filter(r => r.status === "late").length,
    absent: attendanceRecords.filter(r => r.status === "absent").length,
    earlyLeave: attendanceRecords.filter(r => r.status === "early-leave").length,
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Present Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.present}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.late}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Absents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.absent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Early Leaves</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.earlyLeave}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-12">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-8">
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Sign In</TableHead>
                  <TableHead>Sign Out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{format(record.date, "MMM dd, yyyy")}</TableCell>
                    <TableCell>{record.signInTime}</TableCell>
                    <TableCell>{record.signOutTime || "Not signed out"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          record.status === "present" ? "success" :
                          record.status === "late" ? "warning" :
                          record.status === "absent" ? "destructive" :
                          "secondary"
                        }
                      >
                        {record.status.replace("-", " ").toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 lg:px-3"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}