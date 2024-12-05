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
import { Eye, MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DoctorListProps {
  searchQuery: string;
  statusFilter: "all" | "pending" | "approved" | "declined";
  availabilityFilter: "all" | "online" | "offline";
}

export function DoctorList({ 
  searchQuery, 
  statusFilter, 
  availabilityFilter 
}: DoctorListProps) {
  const router = useRouter();

  // Mock data - replace with actual API call
  const doctors = [
    {
      id: "1",
      name: "Dr. Sarah Wilson",
      specialty: "Psychiatrist",
      email: "sarah.wilson@example.com",
      phone: "+1234567890",
      status: "pending",
      availability: "online",
      totalSessions: 150,
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Clinical Psychologist",
      email: "michael.chen@example.com",
      phone: "+1987654321",
      status: "approved",
      availability: "offline",
      totalSessions: 280,
      rating: 4.9,
      imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop",
    },
  ].filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || doctor.status === statusFilter;
    const matchesAvailability = availabilityFilter === "all" || doctor.availability === availabilityFilter;
    
    return matchesSearch && matchesStatus && matchesAvailability;
  });

  const handleStatusChange = async (doctorId: string, newStatus: "approved" | "declined") => {
    // Implement status change logic here
    console.log(`Changing status for doctor ${doctorId} to ${newStatus}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Doctor</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Sessions</TableHead>
            <TableHead>Rating</TableHead>
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
                <Badge variant={doctor.availability === "online" ? "default" : "secondary"}>
                  {doctor.availability}
                </Badge>
              </TableCell>
              <TableCell>{doctor.totalSessions}</TableCell>
              <TableCell>{doctor.rating}/5.0</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => router.push(`/admin/doctors/${doctor.id}`)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    {doctor.status === "pending" && (
                      <>
                        <DropdownMenuItem onClick={() => handleStatusChange(doctor.id, "approved")}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(doctor.id, "declined")}>
                          <XCircle className="mr-2 h-4 w-4" />
                          Decline
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}