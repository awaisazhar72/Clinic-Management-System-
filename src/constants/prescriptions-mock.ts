import type { Prescription, PrescriptionLayoutSettings } from "@/types";

export const prescriptionsMock: Prescription[] = [
  {
    id: "rx-1",
    patientName: "Sara Malik",
    patientAge: "29",
    patientGender: "Female",
    doctorName: "Ayesha Khan",
    createdAt: "Jul 6, 2026",
    diagnosis: "Seasonal allergic rhinitis",
    vitals: { pulse: "76/min", bp: "118/76", spo2: "98%", temp: "98.4 F", weight: "58", weightUnit: "kg" },
    specialTests: ["CBC", "ESR"],
    medicines: [
      { name: "Cetirizine 10mg Tab.", frequency: "1 Morning", duration: "10 days", dosage: "None" },
      { name: "Fluticasone Nasal Spray", frequency: "2 Morning-Evening", duration: "14 days", dosage: "None" },
    ],
    furtherPlan: "Follow up if symptoms persist beyond 2 weeks.",
    notes: "Avoid known allergens, dust exposure, and cold beverages.",
  },
  {
    id: "rx-2",
    patientName: "Bilal Ahmed",
    patientAge: "34",
    patientGender: "Male",
    doctorName: "Usman Tariq",
    createdAt: "Jul 4, 2026",
    diagnosis: "Mild knee joint inflammation",
    vitals: { pulse: "80/min", bp: "124/80", spo2: "97%", temp: "98.6 F", weight: "82", weightUnit: "kg" },
    specialTests: ["Chest X-Ray"],
    medicines: [
      { name: "Ibuprofen 400mg Tab.", frequency: "2 Morning-Evening", duration: "7 days", dosage: "After meal" },
      { name: "Diclofenac Gel 1%", frequency: "3 Morning-Afternoon-Evening", duration: "10 days", dosage: "None" },
    ],
    furtherPlan: "Apply ice pack 15 minutes, 3x daily.",
    notes: "Avoid strenuous activity for 2 weeks.",
  },
  {
    id: "rx-3",
    patientName: "Hina Farooq",
    patientAge: "41",
    patientGender: "Female",
    doctorName: "Fatima Noor",
    createdAt: "Jun 29, 2026",
    diagnosis: "Vitamin D deficiency",
    vitals: { pulse: "72/min", bp: "110/70", spo2: "99%", temp: "98.2 F", weight: "64", weightUnit: "kg" },
    specialTests: ["Lipid Profile", "HbA1c"],
    medicines: [{ name: "Vitamin D3 50,000 IU", frequency: "1 Morning", duration: "8 weeks", dosage: "Once weekly" }],
    furtherPlan: "Recheck levels after 2 months.",
    notes: "Increase sun exposure and dietary calcium intake.",
  },
];

// Quick-select recent patients for the prescription writer
export const recentPatientsMock = [
  { id: "p-1", name: "Sara Malik", age: "29", gender: "Female" as const },
  { id: "p-2", name: "Bilal Ahmed", age: "34", gender: "Male" as const },
  { id: "p-3", name: "Hina Farooq", age: "41", gender: "Female" as const },
  { id: "p-5", name: "Zainab Sheikh", age: "57", gender: "Female" as const },
  { id: "p-7", name: "Mahnoor Iqbal", age: "19", gender: "Female" as const },
];

// Quick-pick special test chips
export const specialTestOptions = [
  "CBC",
  "ESR",
  "Urine RE",
  "Blood Sugar (F)",
  "Blood Sugar (R)",
  "LFTs",
  "RFTs",
  "Lipid Profile",
  "HbA1c",
  "TSH",
  "Ultrasound Abd/Pelvis",
  "Chest X-Ray",
  "ECG",
  "H. Pylori",
];

// Medicine form quick-pick options
export const frequencyOptions = ["1 Morning", "1 Evening", "2 Morning-Evening", "3 Morning-Afternoon-Evening", "1 Night", "SOS"];
export const timingOptions = ["None", "Before meal", "After meal", "Empty stomach", "With meal"];
export const durationOptions = ["3 days", "5 days", "7 days", "10 days", "14 days", "1 month", "Continue", "Once weekly", "8 weeks"];

export const defaultLayoutSettings: PrescriptionLayoutSettings = {
  clinicName: "Ali Clinic",
  clinicTagline: "Cardiologist Clinic",
  clinicNameUrdu: "علی کلینک",
  clinicTaglineUrdu: "دل کے امراض کا ماہر کلینک",
  doctorName: "Dr. Ali Khan",
  doctorPhone: "0302 9302392",
  degrees: "MBBS, FCPS",
  degreesUrdu: "ایم بی بی ایس، ایف سی پی ایس",
  specialties: "Certified Health Expert",
  specialtiesUrdu: "مصدقہ صحت کے ماہر",
};