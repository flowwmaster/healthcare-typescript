"use client";

import { useState } from "react";
import { SessionCalendar } from "./sessions/session-calendar";
import { SessionStats } from "./sessions/session-stats";
import { SessionList } from "./sessions/session-list";
import { SessionDetailsDialog } from "./sessions/session-details-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface DoctorSessionsProps {
  doctorId: string;
}

interface Session {
  id: string;
  patient: {
    name: string;
    imageUrl: string;
    email: string;
  };
  date: Date;
  startTime: string;
  endTime: string;
  status: "scheduled" | "completed" | "cancelled";
  recordingUrl?: string;
  notes?: string;
  feedback?: {
    rating: number;
    comment: string;
    date: Date;
  } | null;
}

export function DoctorSessions({ doctorId }: DoctorSessionsProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const { toast } = useToast();

  // Mock data - replace with API calls
  const stats = {
    total: 245,
    completed: 180,
    upcoming: 45,
    cancelled: 20,
  };

  const sessions: Session[] = [
    {
      id: "1",
      patient: {
        name: "John Smith",
        email: "john@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      },
      date: new Date(),
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      status: "completed",
      recordingUrl: "https://example.com/recording/1",
      notes: "Patient showed significant improvement in anxiety management.",
      feedback: {
        rating: 4.5,
        comment:
          "Very helpful session. Dr. Wilson was very understanding and provided great insights.",
        date: new Date(),
      },
    },
    {
      id: "2",
      patient: {
        name: "Emma Wilson",
        email: "emma@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      },
      date: new Date(),
      startTime: "2:00 PM",
      endTime: "3:00 PM",
      status: "scheduled",
      notes: "Follow-up session for depression treatment.",
      feedback: null,
    },
  ];

  const handleViewDetails = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    setSelectedSession(session || null);
  };

  const handleSaveNotes = async (sessionId: string, notes: string) => {
    try {
      // Implement API call to save notes
      console.log("Saving notes for session:", sessionId, notes);
      toast({
        title: "Success",
        description: "Session notes have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save session notes.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <SessionStats stats={stats} />

      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-4">
          <SessionCalendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </div>

        <div className="md:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <SessionList
                sessions={sessions}
                onViewDetails={handleViewDetails}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <SessionDetailsDialog
        session={selectedSession}
        isOpen={!!selectedSession}
        onClose={() => setSelectedSession(null)}
        onSaveNotes={handleSaveNotes}
      />
    </div>
  );
}
