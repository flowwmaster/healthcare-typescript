export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "doctor" | "patient" | "employee" | "subadmin";
  status: "active" | "pending" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: "active" | "inactive";
}

export interface Session {
  id: string;
  patientId: string;
  doctorId: string;
  startTime: Date;
  endTime: Date;
  status: "scheduled" | "completed" | "cancelled";
  recordingUrl?: string;
  recordingExpiryDate?: Date;
}

export interface Appointment {
  id: string;
  sessionId: string;
  patientId: string;
  doctorId: string;
  branchId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: "scheduled" | "completed" | "cancelled";
  cancellationReason?: string;
  cancellationTime?: Date;
}

export interface DoctorAvailability {
  id: string;
  doctorId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  status: "available" | "unavailable";
}

export interface Employee {
  id: string;
  userId: string;
  branchId: string;
  position: string;
  department: string;
  joiningDate: Date;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: Date;
  signInTime: Date;
  signOutTime?: Date;
  signInLocation: {
    latitude: number;
    longitude: number;
  };
  signOutLocation?: {
    latitude: number;
    longitude: number;
  };
}

export interface PatientPackage {
  id: string;
  patientId: string;
  totalSessions: number;
  completedSessions: number;
  pendingSessions: number;
  startDate: Date;
  endDate?: Date;
  status: "active" | "completed" | "expired";
}

export interface DoctorPayout {
  id: string;
  doctorId: string;
  month: number;
  year: number;
  totalSessions: number;
  amount: number;
  status: "pending" | "paid";
  paidDate?: Date;
  invoiceUrl?: string;
}