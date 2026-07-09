import type { MedicalRecord, Patient, PatientDocument, TimelineEvent } from "@/types";

export const patientsMock: Patient[] = [
  {
    id: "p-1",
    fullName: "Sara Malik",
    age: 29,
    gender: "female",
    phone: "+92 301 1112223",
    email: "sara.malik@example.com",
    address: "House 12, Street 5, DHA Phase 6, Karachi",
    bloodGroup: "O+",
    lastVisit: "Jul 6, 2026",
    status: "active",
  },
  {
    id: "p-2",
    fullName: "Bilal Ahmed",
    age: 34,
    gender: "male",
    phone: "+92 301 9876543",
    email: "bilal.ahmed@example.com",
    address: "Flat 4B, Clifton Block 2, Karachi",
    bloodGroup: "A+",
    lastVisit: "Jul 4, 2026",
    status: "active",
  },
  {
    id: "p-3",
    fullName: "Hina Farooq",
    age: 41,
    gender: "female",
    phone: "+92 333 4455667",
    email: "hina.farooq@example.com",
    bloodGroup: "B-",
    lastVisit: "Jun 29, 2026",
    status: "active",
  },
  {
    id: "p-4",
    fullName: "Ali Raza",
    age: 8,
    gender: "male",
    phone: "+92 300 1231234",
    address: "Gulshan-e-Iqbal, Block 6, Karachi",
    lastVisit: "Jun 20, 2026",
    status: "inactive",
  },
  {
    id: "p-5",
    fullName: "Zainab Sheikh",
    age: 57,
    gender: "female",
    phone: "+92 345 7778889",
    email: "zainab.sheikh@example.com",
    bloodGroup: "AB+",
    lastVisit: "Jul 8, 2026",
    status: "active",
  },
  {
    id: "p-6",
    fullName: "Usman Ghani",
    age: 63,
    gender: "male",
    phone: "+92 322 5556667",
    address: "North Nazimabad, Block L, Karachi",
    bloodGroup: "O-",
    lastVisit: "May 30, 2026",
    status: "inactive",
  },
  {
    id: "p-7",
    fullName: "Mahnoor Iqbal",
    age: 19,
    gender: "female",
    phone: "+92 312 9990001",
    email: "mahnoor.iqbal@example.com",
    lastVisit: "Jul 7, 2026",
    status: "active",
  },
];

export const medicalRecordsMock: Record<string, MedicalRecord[]> = {
  "p-1": [
    { id: "mr-1", condition: "Seasonal allergies", diagnosedOn: "Mar 2025", status: "ongoing", notes: "Managed with antihistamines during spring." },
    { id: "mr-2", condition: "Vitamin D deficiency", diagnosedOn: "Jan 2026", status: "resolved", notes: "Supplementation completed, levels normalized." },
  ],
  "p-2": [
    { id: "mr-3", condition: "Hypertension", diagnosedOn: "Aug 2024", status: "ongoing", notes: "On regular medication, monitored quarterly." },
  ],
};

export const patientDocumentsMock: Record<string, PatientDocument[]> = {
  "p-1": [
    { id: "doc-1", name: "CBC Lab Report - Jun 2026.pdf", type: "lab-report", uploadedAt: "Jun 28, 2026", sizeLabel: "1.2 MB" },
    { id: "doc-2", name: "Prescription - Antihistamine.pdf", type: "prescription", uploadedAt: "Mar 14, 2025", sizeLabel: "180 KB" },
  ],
  "p-2": [
    { id: "doc-3", name: "ECG Scan - Jul 2026.pdf", type: "scan", uploadedAt: "Jul 4, 2026", sizeLabel: "3.4 MB" },
  ],
};

export const patientTimelineMock: Record<string, TimelineEvent[]> = {
  "p-1": [
    { id: "t-1", title: "Appointment completed", description: "Follow-up with Dr. Ayesha Khan", date: "Jul 6, 2026", type: "appointment" },
    { id: "t-2", title: "Prescription issued", description: "Cetirizine 10mg, once daily", date: "Jul 6, 2026", type: "prescription" },
    { id: "t-3", title: "Invoice generated", description: "$45.00 — Consultation fee", date: "Jul 6, 2026", type: "billing" },
    { id: "t-4", title: "Lab report uploaded", description: "CBC panel results", date: "Jun 28, 2026", type: "note" },
  ],
  "p-2": [
    { id: "t-5", title: "Appointment scheduled", description: "Cardiology review with Dr. Ayesha Khan", date: "Jul 12, 2026", type: "appointment" },
    { id: "t-6", title: "Appointment completed", description: "Routine BP check", date: "Jul 4, 2026", type: "appointment" },
  ],
};
