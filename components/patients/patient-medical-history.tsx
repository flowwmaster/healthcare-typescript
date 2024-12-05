"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

interface PatientMedicalHistoryProps {
  patientId: string;
}

interface MedicalRecord {
  id: string;
  date: Date;
  type: "diagnosis" | "prescription" | "note";
  title: string;
  description: string;
  doctor: string;
}

export function PatientMedicalHistory({ patientId }: PatientMedicalHistoryProps) {
  // Mock data - replace with API call
  const medicalRecords: MedicalRecord[] = [
    {
      id: "1",
      date: new Date(),
      type: "diagnosis",
      title: "Initial Assessment",
      description: "Patient shows signs of mild anxiety and depression",
      doctor: "Dr. Sarah Wilson",
    },
    {
      id: "2",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      type: "prescription",
      title: "Medication Prescribed",
      description: "Prescribed anti-anxiety medication - 10mg daily",
      doctor: "Dr. Michael Chen",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {medicalRecords.map((record) => (
              <div
                key={record.id}
                className="flex flex-col space-y-2 p-4 border rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <Badge
                    variant={
                      record.type === "diagnosis"
                        ? "default"
                        : record.type === "prescription"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {format(record.date, "MMM dd, yyyy")}
                  </span>
                </div>
                <h4 className="font-medium">{record.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {record.description}
                </p>
                <div className="text-sm text-muted-foreground">
                  Recorded by: {record.doctor}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}