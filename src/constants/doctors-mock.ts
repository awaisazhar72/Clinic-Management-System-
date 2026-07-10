import type {
  Doctor,
  DoctorAvailabilitySlot,
  DoctorScheduleEntry,
  LeaveRequest,
} from "@/types";

export const doctorsMock: Doctor[] = [
  {
    id: "d-1",
    fullName: "Dr. Ayesha Khan",
    specialty: "Cardiologist",
    email: "ayesha.khan@clinic.com",
    phone: "+92 300 1234567",
    rating: 4.8,
    experienceYears: 9,
    status: "active",
    consultationFee: 45,
    bio: "Specializes in interventional cardiology with a focus on preventive heart care and long-term patient wellness plans.",
  },
  {
    id: "d-2",
    fullName: "Dr. Usman Tariq",
    specialty: "Orthopedic Surgeon",
    email: "usman.tariq@clinic.com",
    phone: "+92 301 2345678",
    rating: 4.6,
    experienceYears: 12,
    status: "active",
    consultationFee: 50,
    bio: "Focuses on sports injuries, joint replacement, and post-surgical rehabilitation programs.",
  },
  {
    id: "d-3",
    fullName: "Dr. Fatima Noor",
    specialty: "Pediatrician",
    email: "fatima.noor@clinic.com",
    phone: "+92 302 3456789",
    rating: 4.9,
    experienceYears: 7,
    status: "active",
    consultationFee: 35,
    bio: "Dedicated to child healthcare from infancy through adolescence, with a gentle, family-centered approach.",
  },
  {
    id: "d-4",
    fullName: "Dr. Hamza Sheikh",
    specialty: "Dermatologist",
    email: "hamza.sheikh@clinic.com",
    phone: "+92 303 4567890",
    rating: 4.5,
    experienceYears: 6,
    status: "on-leave",
    consultationFee: 40,
    bio: "Treats a wide range of skin, hair, and nail conditions, including cosmetic dermatology.",
  },
  {
    id: "d-5",
    fullName: "Dr. Sadia Malik",
    specialty: "Neurologist",
    email: "sadia.malik@clinic.com",
    phone: "+92 304 5678901",
    rating: 4.7,
    experienceYears: 14,
    status: "active",
    consultationFee: 60,
    bio: "Expert in migraine management, epilepsy, and neurodegenerative disorders.",
  },
  {
    id: "d-6",
    fullName: "Dr. Omar Farooq",
    specialty: "General Physician",
    email: "omar.farooq@clinic.com",
    phone: "+92 305 6789012",
    rating: 4.3,
    experienceYears: 4,
    status: "inactive",
    consultationFee: 25,
    bio: "Provides comprehensive primary care for patients of all ages.",
  },
];

export const doctorAvailabilityMock: Record<string, DoctorAvailabilitySlot[]> = {
  "d-1": [
    { day: "Monday", startTime: "09:00 AM", endTime: "01:00 PM", isAvailable: true },
    { day: "Tuesday", startTime: "09:00 AM", endTime: "01:00 PM", isAvailable: true },
    { day: "Wednesday", startTime: "—", endTime: "—", isAvailable: false },
    { day: "Thursday", startTime: "02:00 PM", endTime: "06:00 PM", isAvailable: true },
    { day: "Friday", startTime: "09:00 AM", endTime: "01:00 PM", isAvailable: true },
    { day: "Saturday", startTime: "10:00 AM", endTime: "12:00 PM", isAvailable: true },
    { day: "Sunday", startTime: "—", endTime: "—", isAvailable: false },
  ],
};

export const doctorScheduleMock: Record<string, DoctorScheduleEntry[]> = {
  "d-1": [
    { id: "s-1", patientName: "Sara Malik", time: "10:30 AM", date: "Today", status: "scheduled" },
    { id: "s-2", patientName: "Bilal Ahmed", time: "11:15 AM", date: "Today", status: "scheduled" },
    { id: "s-3", patientName: "Hina Farooq", time: "12:00 PM", date: "Today", status: "completed" },
    { id: "s-4", patientName: "Zainab Sheikh", time: "02:45 PM", date: "Tomorrow", status: "scheduled" },
  ],
};

export const doctorLeaveRequestsMock: Record<string, LeaveRequest[]> = {
  "d-4": [
    { id: "l-1", fromDate: "Jul 8, 2026", toDate: "Jul 14, 2026", reason: "Family emergency", status: "approved" },
  ],
  "d-1": [
    { id: "l-2", fromDate: "Aug 1, 2026", toDate: "Aug 3, 2026", reason: "Conference travel", status: "pending" },
  ],
};
