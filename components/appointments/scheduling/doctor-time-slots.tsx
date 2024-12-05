"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Clock } from "lucide-react";

interface DoctorTimeSlotsProps {
  doctorId: string;
  date: Date;
  onTimeSlotSelect: (timeSlot: string) => void;
}

export function DoctorTimeSlots({
  doctorId,
  date,
  onTimeSlotSelect,
}: DoctorTimeSlotsProps) {
  // Mock data - replace with API call
  const availableSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Available Time Slots - {format(date, "MMM dd, yyyy")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {availableSlots.map((slot) => (
            <Button
              key={slot}
              variant="outline"
              className="w-full"
              onClick={() => onTimeSlotSelect(slot)}
            >
              <Clock className="mr-2 h-4 w-4" />
              {slot}
            </Button>
          ))}
        </div>
        {availableSlots.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No available time slots for this date
          </p>
        )}
      </CardContent>
    </Card>
  );
}
