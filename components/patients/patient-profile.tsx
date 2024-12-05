"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PatientProfileProps {
  patientId: string;
}

export function PatientProfile({ patientId }: PatientProfileProps) {
  // Mock data - replace with API call
  const patient = {
    id: patientId,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    address: "123 Main St, City, Country",
    dateOfBirth: "1990-01-01",
    gender: "Male",
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "+1987654321",
    },
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-1">
            <span className="text-sm font-medium">Name:</span>
            <span className="text-sm">{patient.name}</span>
            <span className="text-sm font-medium">Email:</span>
            <span className="text-sm">{patient.email}</span>
            <span className="text-sm font-medium">Phone:</span>
            <span className="text-sm">{patient.phone}</span>
            <span className="text-sm font-medium">Address:</span>
            <span className="text-sm">{patient.address}</span>
            <span className="text-sm font-medium">Date of Birth:</span>
            <span className="text-sm">{patient.dateOfBirth}</span>
            <span className="text-sm font-medium">Gender:</span>
            <span className="text-sm">{patient.gender}</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-1">
            <span className="text-sm font-medium">Name:</span>
            <span className="text-sm">{patient.emergencyContact.name}</span>
            <span className="text-sm font-medium">Relationship:</span>
            <span className="text-sm">{patient.emergencyContact.relationship}</span>
            <span className="text-sm font-medium">Phone:</span>
            <span className="text-sm">{patient.emergencyContact.phone}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}