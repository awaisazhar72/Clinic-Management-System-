import type { Appointment } from "@/types";

export const dashboardStats = {
  totalPatients: { value: 1284, trend: 8.2 },
  todayAppointments: { value: 42, trend: -3.1 },
  monthlyRevenue: { value: 18420, trend: 12.4 },
  activeDoctors: { value: 16, trend: 0 },
};

export const weeklyRevenue = [
  { label: "Mon", value: 4200 },
  { label: "Tue", value: 3800 },
  { label: "Wed", value: 5100 },
  { label: "Thu", value: 4700 },
  { label: "Fri", value: 6200 },
  { label: "Sat", value: 3200 },
  { label: "Sun", value: 2100 },
];

export const appointmentsBySpecialty = [
  { label: "Cardiology", value: 32 },
  { label: "Dermatology", value: 18 },
  { label: "Pediatrics", value: 24 },
  { label: "Orthopedics", value: 15 },
  { label: "General", value: 21 },
];

export const invoiceStatusBreakdown = [
  { label: "Paid", value: 62, color: "var(--color-success)" },
  { label: "Pending", value: 25, color: "var(--color-warning)" },
  { label: "Overdue", value: 13, color: "var(--color-destructive)" },
];

export const latestAppointments: Appointment[] = [
  {
    id: "apt-1",
    patientId: "p-1",
    patientName: "Sara Malik",
    doctorId: "d-1",
    doctorName: "Ayesha Khan",
    date: "Today",
    time: "10:30 AM",
    status: "scheduled",
    reason: "Follow-up consultation",
  },
  {
    id: "apt-2",
    patientId: "p-2",
    patientName: "Bilal Ahmed",
    doctorId: "d-2",
    doctorName: "Usman Tariq",
    date: "Today",
    time: "11:15 AM",
    status: "scheduled",
    reason: "Routine checkup",
  },
  {
    id: "apt-3",
    patientId: "p-3",
    patientName: "Hina Farooq",
    doctorId: "d-1",
    doctorName: "Ayesha Khan",
    date: "Today",
    time: "12:00 PM",
    status: "completed",
    reason: "Skin allergy",
  },
  {
    id: "apt-4",
    patientId: "p-4",
    patientName: "Ali Raza",
    doctorId: "d-3",
    doctorName: "Fatima Noor",
    date: "Today",
    time: "1:30 PM",
    status: "cancelled",
    reason: "Vaccination",
  },
  {
    id: "apt-5",
    patientId: "p-5",
    patientName: "Zainab Sheikh",
    doctorId: "d-2",
    doctorName: "Usman Tariq",
    date: "Today",
    time: "2:45 PM",
    status: "scheduled",
    reason: "Blood pressure review",
  },
];

export const upcomingDoctorSchedule = [
  { name: "Dr. Ayesha Khan", specialty: "Cardiology", nextSlot: "10:30 AM", patientsToday: 8 },
  { name: "Dr. Usman Tariq", specialty: "Orthopedics", nextSlot: "11:15 AM", patientsToday: 6 },
  { name: "Dr. Fatima Noor", specialty: "Pediatrics", nextSlot: "1:30 PM", patientsToday: 10 },
];
