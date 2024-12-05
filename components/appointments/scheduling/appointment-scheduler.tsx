"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DoctorTimeSlots } from "./doctor-time-slots";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  patientId: z.string().min(1, "Please select a patient"),
  doctorId: z.string().min(1, "Please select a doctor"),
  appointmentType: z.string().min(1, "Please select appointment type"),
  date: z.date({
    required_error: "Please select a date",
  }),
  timeSlot: z.string().min(1, "Please select a time slot"),
});

export function AppointmentScheduler() {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: "",
      doctorId: "",
      appointmentType: "",
      timeSlot: "",
    },
  });

  // Mock data - replace with API calls
  const patients = [
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    },
    {
      id: "2",
      name: "Emma Wilson",
      email: "emma@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
  ];

  const doctors = [
    {
      id: "1",
      name: "Dr. Sarah Wilson",
      specialty: "Psychiatrist",
      availability: "online",
      rating: 4.8,
      imageUrl:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Clinical Psychologist",
      availability: "online",
      rating: 4.9,
      imageUrl:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop",
    },
  ];

  const appointmentTypes = [
    { value: "initial", label: "Initial Consultation" },
    { value: "followup", label: "Follow-up" },
    { value: "therapy", label: "Therapy Session" },
    { value: "assessment", label: "Assessment" },
  ];

  const handleDoctorSelect = (doctorId: string) => {
    const doctor = doctors.find((d) => d.id === doctorId);
    setSelectedDoctor(doctor);
    form.setValue("doctorId", doctorId);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Implement appointment scheduling logic here
      console.log(values);

      toast({
        title: "Success",
        description: "Appointment scheduled successfully",
      });

      router.push("/admin/appointments");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule appointment",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="patientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Patient</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a patient" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={patient.imageUrl}
                                alt={patient.name}
                              />
                              <AvatarFallback>
                                {patient.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{patient.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="doctorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Doctor</FormLabel>
                  <Select
                    onValueChange={handleDoctorSelect}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a doctor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={doctor.imageUrl}
                                alt={doctor.name}
                              />
                              <AvatarFallback>
                                {doctor.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{doctor.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedDoctor && (
              <div className="rounded-lg border p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={selectedDoctor.imageUrl}
                      alt={selectedDoctor.name}
                    />
                    <AvatarFallback>
                      {selectedDoctor.name
                        .split(" ")
                        .map((n: any) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedDoctor.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedDoctor.specialty}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Badge
                    variant={
                      selectedDoctor.availability === "online"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {selectedDoctor.availability}
                  </Badge>
                  <div className="text-sm">
                    Rating: {selectedDoctor.rating}/5.0
                  </div>
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="appointmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Appointment Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select appointment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {appointmentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Select Date</FormLabel>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      className="rounded-md border"
                      disabled={(date) => date < new Date()}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedDoctor && form.watch("date") && (
                <DoctorTimeSlots
                  doctorId={selectedDoctor.id}
                  date={form.watch("date")}
                  onTimeSlotSelect={(timeSlot) =>
                    form.setValue("timeSlot", timeSlot)
                  }
                />
              )}
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full">
          Schedule Appointment
        </Button>
      </form>
    </Form>
  );
}
