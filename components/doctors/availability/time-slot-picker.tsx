"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

interface TimeSlotPickerProps {
  slot: TimeSlot;
  onUpdate: (id: string, field: keyof TimeSlot, value: string) => void;
  onRemove: (id: string) => void;
}

export function TimeSlotPicker({
  slot,
  onUpdate,
  onRemove,
}: TimeSlotPickerProps) {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <Select
        value={slot.day}
        onValueChange={(value) => onUpdate(slot.id, "day", value)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select day" />
        </SelectTrigger>
        <SelectContent>
          {daysOfWeek.map((day) => (
            <SelectItem key={day} value={day}>
              {day}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={slot.startTime}
        onValueChange={(value) => onUpdate(slot.id, "startTime", value)}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Start time" />
        </SelectTrigger>
        <SelectContent>
          {timeOptions.map((time) => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <span className="text-muted-foreground">to</span>

      <Select
        value={slot.endTime}
        onValueChange={(value) => onUpdate(slot.id, "endTime", value)}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="End time" />
        </SelectTrigger>
        <SelectContent>
          {timeOptions.map((time) => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="ghost" size="icon" onClick={() => onRemove(slot.id)}>
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}
