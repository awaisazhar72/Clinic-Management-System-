import { z } from "zod";

export const medicineSchema = z.object({
  name: z.string().min(1, "Enter medicine name"),
  dosage: z.string().min(1, "Enter dosage"),
  frequency: z.string().min(1, "Enter frequency"),
  duration: z.string().min(1, "Enter duration"),
});

export const prescriptionSchema = z.object({
  patientName: z.string().min(2, "Enter the patient's name"),
  doctorName: z.string().min(2, "Enter the doctor's name"),
  diagnosis: z.string().min(2, "Enter a diagnosis"),
  medicines: z.array(medicineSchema).min(1, "Add at least one medicine"),
  notes: z.string().optional(),
});

export type PrescriptionFormValues = z.infer<typeof prescriptionSchema>;
