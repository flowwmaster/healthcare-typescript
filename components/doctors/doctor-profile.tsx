"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface DoctorProfileProps {
  doctorId: string;
}

export function DoctorProfile({ doctorId }: DoctorProfileProps) {
  // Mock data - replace with API call
  const doctor = {
    id: doctorId,
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1234567890",
    specialty: "Psychiatrist",
    qualifications: "MD, PhD in Clinical Psychology",
    experience: "15 years",
    languages: ["English", "Spanish"],
    status: "approved",
    availability: "online",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
    resume: "https://example.com/resume.pdf",
    address: "123 Medical Center Dr, City, Country",
    bio: "Specialized in cognitive behavioral therapy with extensive experience in treating anxiety and depression.",
    rating: 4.8,
    totalSessions: 150,
    completedSessions: 142,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={doctor.imageUrl} alt={doctor.name} />
              <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{doctor.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Badge variant={doctor.status === "approved" ? "success" : "secondary"}>
              {doctor.status}
            </Badge>
            <Badge variant={doctor.availability === "online" ? "default" : "secondary"}>
              {doctor.availability}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-1">
              <span className="text-sm font-medium">Email:</span>
              <span className="text-sm">{doctor.email}</span>
              <span className="text-sm font-medium">Phone:</span>
              <span className="text-sm">{doctor.phone}</span>
              <span className="text-sm font-medium">Experience:</span>
              <span className="text-sm">{doctor.experience}</span>
              <span className="text-sm font-medium">Languages:</span>
              <span className="text-sm">{doctor.languages.join(", ")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-1">
              <span className="text-sm font-medium">Qualifications:</span>
              <span className="text-sm">{doctor.qualifications}</span>
              <span className="text-sm font-medium">Total Sessions:</span>
              <span className="text-sm">{doctor.totalSessions}</span>
              <span className="text-sm font-medium">Completed:</span>
              <span className="text-sm">{doctor.completedSessions}</span>
              <span className="text-sm font-medium">Rating:</span>
              <span className="text-sm">{doctor.rating}/5.0</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Bio</h4>
            <p className="text-sm text-muted-foreground">{doctor.bio}</p>
          </div>
          {doctor.resume && (
            <div>
              <a
                href={doctor.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                View Resume
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}