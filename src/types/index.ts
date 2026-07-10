export interface Doctor {
  id: string;
  fullName: string;
  specialty: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  rating?: number;
  experienceYears?: number;
  status: "active" | "on-leave" | "inactive";
  bio?: string;
  consultationFee?: number;
}

export interface DoctorAvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface DoctorScheduleEntry {
  id: string;
  patientName: string;
  time: string;
  date: string;
  status: AppointmentStatus;
}

export interface LeaveRequest {
  id: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: "approved" | "pending" | "rejected";
}

export interface Patient {
  id: string;
  fullName: string;
  age: number;
  gender: "male" | "female" | "other";
  phone: string;
  email?: string;
  address?: string;
  bloodGroup?: string;
  lastVisit?: string;
  avatarUrl?: string;
  status?: "active" | "inactive";
}

export interface MedicalRecord {
  id: string;
  condition: string;
  diagnosedOn: string;
  notes?: string;
  status: "ongoing" | "resolved";
}

export interface PatientDocument {
  id: string;
  name: string;
  type: "lab-report" | "prescription" | "scan" | "other";
  uploadedAt: string;
  sizeLabel: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  type: "appointment" | "prescription" | "billing" | "note";
}

export type AppointmentStatus = "scheduled" | "completed" | "cancelled" | "no-show";

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  reason?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  doctorName?: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  issuedAt: string;
  dueAt: string;
  items?: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Payment {
  id: string;
  invoiceNumber: string;
  patientName: string;
  amount: number;
  method: "cash" | "card" | "bank-transfer" | "insurance";
  paidAt: string;
}

export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  vendor?: string;
}

export interface Transaction {
  id: string;
  type: "income" | "expense";
  description: string;
  amount: number;
  date: string;
  reference: string;
}

export interface Staff {
  id: string;
  fullName: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  joinedOn?: string;
  avatarUrl?: string;
}

export interface PrescriptionMedicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface PrescriptionVitals {
  pulse?: string;
  bp?: string;
  spo2?: string;
  temp?: string;
  weight?: string;
  weightUnit?: string;
}

export interface Prescription {
  id: string;
  patientName: string;
  patientAge?: string;
  patientGender?: "Male" | "Female" | "Other";
  doctorName: string;
  createdAt: string;
  diagnosis: string;
  vitals?: PrescriptionVitals;
  specialTests?: string[];
  medicines: PrescriptionMedicine[];
  furtherPlan?: string;
  notes?: string;
}

export interface PrescriptionLayoutSettings {
  logoUrl?: string;
  clinicName: string;
  clinicTagline: string;
  clinicNameUrdu: string;
  clinicTaglineUrdu: string;
  doctorName: string;
  doctorPhone: string;
  degrees: string;
  degreesUrdu: string;
  specialties: string;
  specialtiesUrdu: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
