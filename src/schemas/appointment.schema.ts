import { z } from "zod";

export const appointmentSchema = z.object({
  patientName: z.string().min(2, "Enter the patient's name"),
  doctorId: z.string().min(1, "Select a doctor"),
  date: z.date({ message: "Select a date" }),
  time: z.string().min(1, "Select a time slot"),
  reason: z.string().min(2, "Enter a reason for the visit"),
  status: z.enum(["scheduled", "completed", "cancelled", "no-show"]),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
