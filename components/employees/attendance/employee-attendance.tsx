"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { AttendanceStats } from "@/components/employees/attendance/attendance-stats";
import { AttendanceList } from "@/components/employees/attendance/attendance-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmployeeAttendanceProps {
  employeeId: string;
}

export function EmployeeAttendance({ employeeId }: EmployeeAttendanceProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-4">
      <AttendanceStats employeeId={employeeId} />
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
            <AttendanceList 
              employeeId={employeeId} 
              selectedDate={selectedDate} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}