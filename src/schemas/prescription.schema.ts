import { z } from "zod";

export const medicineSchema = z.object({
  name: z.string().min(1, "Enter medicine name"),
  frequency: z.string().min(1, "Select frequency"),
  timing: z.string().min(1, "Select timing"),
  duration: z.string().min(1, "Select duration"),
});

export const prescriptionSchema = z.object({
  patientName: z.string().min(2, "Enter the patient's name"),
  patientAge: z.string().optional(),
  patientGender: z.enum(["Male", "Female", "Other"]).optional(),
  diagnosis: z.string().min(2, "Enter a diagnosis"),
  pulse: z.string().optional(),
  bp: z.string().optional(),
  spo2: z.string().optional(),
  temp: z.string().optional(),
  weight: z.string().optional(),
  specialTests: z.array(z.string()).default([]),
  furtherPlan: z.string().optional(),
  medicines: z.array(medicineSchema).min(1, "Add at least one medicine"),
  notes: z.string().optional(),
});

export type PrescriptionFormValues = z.infer<typeof prescriptionSchema>;

export const layoutSettingsSchema = z.object({
  clinicName: z.string().min(1, "Enter clinic name"),
  clinicTagline: z.string().optional(),
  clinicNameUrdu: z.string().optional(),
  clinicTaglineUrdu: z.string().optional(),
  doctorName: z.string().min(1, "Enter doctor name"),
  doctorPhone: z.string().optional(),
  degrees: z.string().optional(),
  degreesUrdu: z.string().optional(),
  specialties: z.string().optional(),
  specialtiesUrdu: z.string().optional(),
});

export type LayoutSettingsFormValues = z.infer<typeof layoutSettingsSchema>;