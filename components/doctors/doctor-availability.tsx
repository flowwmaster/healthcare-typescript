"use client";

import { useState } from "react";
import { AvailabilityStatus } from "./availability/availability-status";
import { AvailabilitySchedule } from "./availability/availability-schedule";

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

interface DoctorAvailabilityProps {
  doctorId: string;
}

export function DoctorAvailability({ doctorId }: DoctorAvailabilityProps) {
  // Mock data - replace with API call
  const initialTimeSlots: TimeSlot[] = [
    {
      id: "1",
      day: "Monday",
      startTime: "09:00",
      endTime: "17:00",
    },
    {
      id: "2",
      day: "Wednesday",
      startTime: "10:00",
      endTime: "18:00",
    },
  ];

  const handleStatusChange = async (status: boolean) => {
    // Implement status change logic here
    console.log("Updating availability status:", status);
  };

  const handleScheduleSave = async (slots: TimeSlot[]) => {
    // Implement save logic here
    console.log("Saving availability schedule:", slots);
  };

  return (
    <div className="space-y-6">
      <AvailabilityStatus
        doctorId={doctorId}
        initialStatus={true}
        onStatusChange={handleStatusChange}
      />
      <AvailabilitySchedule
        doctorId={doctorId}
        timeSlots={initialTimeSlots}
        onSave={handleScheduleSave}
      />
    </div>
  );
}