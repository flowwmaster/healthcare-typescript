"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Save, Trash2 } from "lucide-react";
import { TimeSlotPicker } from "./time-slot-picker";
import { useToast } from "@/components/ui/use-toast";

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

interface AvailabilityScheduleProps {
  doctorId: string;
  timeSlots: TimeSlot[];
  onSave: (slots: TimeSlot[]) => Promise<void>;
}

export function AvailabilitySchedule({
  doctorId,
  timeSlots: initialTimeSlots,
  onSave,
}: AvailabilityScheduleProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(initialTimeSlots);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddTimeSlot = () => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      day: "Monday",
      startTime: "09:00",
      endTime: "17:00",
    };
    setTimeSlots([...timeSlots, newSlot]);
  };

  const handleRemoveTimeSlot = (id: string) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id));
  };

  const handleUpdateTimeSlot = (
    id: string,
    field: keyof TimeSlot,
    value: string
  ) => {
    setTimeSlots(
      timeSlots.map((slot) =>
        slot.id === id ? { ...slot, [field]: value } : slot
      )
    );
  };

  const handleSaveSchedule = async () => {
    setIsLoading(true);
    try {
      await onSave(timeSlots);
      toast({
        title: "Success",
        description: "Availability schedule has been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update availability schedule.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Weekly Schedule</CardTitle>
        <Button onClick={handleAddTimeSlot} size="sm">
          <Clock className="mr-2 h-4 w-4" />
          Add Time Slot
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {timeSlots.map((slot) => (
          <TimeSlotPicker
            key={slot.id}
            slot={slot}
            onUpdate={handleUpdateTimeSlot}
            onRemove={handleRemoveTimeSlot}
          />
        ))}

        {timeSlots.length > 0 && (
          <Button
            className="w-full"
            onClick={handleSaveSchedule}
            disabled={isLoading}
          >
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Saving..." : "Save Schedule"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
