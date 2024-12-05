"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface SessionCalendarProps {
  onDateSelect: (date: Date | undefined) => void;
  selectedDate: Date | undefined;
}

export function SessionCalendar({
  onDateSelect,
  selectedDate,
}: SessionCalendarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Date</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          className="rounded-md border"
          initialFocus
        />
      </CardContent>
    </Card>
  );
}
