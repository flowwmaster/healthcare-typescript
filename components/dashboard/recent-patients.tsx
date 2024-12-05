"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const patients = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    sessions: 12,
    completed: 4,
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    sessions: 24,
    completed: 10,
    status: "Active",
  },
  // Add more mock data as needed
];

export function RecentPatients() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Total Sessions</TableHead>
          <TableHead>Completed</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell className="font-medium">{patient.name}</TableCell>
            <TableCell>{patient.email}</TableCell>
            <TableCell>{patient.sessions}</TableCell>
            <TableCell>{patient.completed}</TableCell>
            <TableCell>{patient.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}