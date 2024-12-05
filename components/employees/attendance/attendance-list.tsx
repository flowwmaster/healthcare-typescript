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
import { MapPin } from "lucide-react";
import { LocationDialog } from "@/components/employees/attendance/location-dialog";
import { useState } from "react";

interface AttendanceListProps {
  employeeId: string;
  selectedDate?: Date;
}

interface AttendanceRecord {
  id: string;
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

export function AttendanceList({ employeeId, selectedDate }: AttendanceListProps) {
  const [selectedLocation, setSelectedLocation] = useState<{
    type: "signin" | "signout";
    location: { latitude: number; longitude: number; address: string };
  } | null>(null);

  // Mock data - replace with API call
  const records: AttendanceRecord[] = [
    {
      id: "1",
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
      id: "2",
      date: new Date(Date.now() - 86400000),
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
  ].filter(record => 
    !selectedDate || 
    format(record.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
  );

  return (
    <>
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
          {records.map((record) => (
            <TableRow key={record.id}>
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
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedLocation({
                      type: "signin",
                      location: record.signInLocation
                    })}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                  {record.signOutLocation && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedLocation({
                        type: "signout",
                        location: record.signOutLocation!
                      })}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
          {records.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                <div className="text-muted-foreground">
                  No attendance records found for this date
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <LocationDialog
        isOpen={!!selectedLocation}
        onClose={() => setSelectedLocation(null)}
        location={selectedLocation?.location}
        type={selectedLocation?.type}
      />
    </>
  );
}