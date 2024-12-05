"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { DoctorApprovalDialog } from "./doctor-approval-dialog";
import { Eye, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DoctorApprovalListProps {
  statusFilter: "all" | "pending" | "approved" | "declined";
}

export function DoctorApprovalList({ statusFilter }: DoctorApprovalListProps) {
  const router = useRouter();
  const [selectedDoctor, setSelectedDoctor] = useState<{
    id: string;
    name: string;
    action: "approve" | "decline";
  } | null>(null);

  // Mock data - replace with API call
  const doctors = [
    {
      id: "1",
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@example.com",
      specialty: "Psychiatrist",
      submittedAt: "2024-02-20",
      status: "pending",
      resumeUrl: "https://example.com/resume.pdf",
      imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      email: "michael.chen@example.com",
      specialty: "Clinical Psychologist",
      submittedAt: "2024-02-19",
      status: "approved",
      resumeUrl: "https://example.com/resume.pdf",
      imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop",
    },
  ].filter(doctor => 
    statusFilter === "all" || doctor.status === statusFilter
  );

  const handleApproval = async (notes: string) => {
    if (!selectedDoctor) return;
    
    // Implement approval logic here
    console.log(`Approving doctor ${selectedDoctor.id} with notes: ${notes}`);
    setSelectedDoctor(null);
  };

  const handleDecline = async (notes: string) => {
    if (!selectedDoctor) return;
    
    // Implement decline logic here
    console.log(`Declining doctor ${selectedDoctor.id} with notes: ${notes}`);
    setSelectedDoctor(null);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={doctor.imageUrl} alt={doctor.name} />
                      <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{doctor.name}</div>
                      <div className="text-sm text-muted-foreground">{doctor.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell>{doctor.submittedAt}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      doctor.status === "approved" ? "success" :
                      doctor.status === "pending" ? "warning" : "destructive"
                    }
                  >
                    {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={doctor.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View
                    </a>
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/admin/doctors/${doctor.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                    {doctor.status === "pending" && (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => setSelectedDoctor({
                            id: doctor.id,
                            name: doctor.name,
                            action: "approve"
                          })}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setSelectedDoctor({
                            id: doctor.id,
                            name: doctor.name,
                            action: "decline"
                          })}
                        >
                          Decline
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedDoctor && (
        <DoctorApprovalDialog
          isOpen={true}
          onClose={() => setSelectedDoctor(null)}
          onApprove={handleApproval}
          onDecline={handleDecline}
          type={selectedDoctor.action}
          doctorName={selectedDoctor.name}
        />
      )}
    </>
  );
}