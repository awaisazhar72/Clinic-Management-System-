import { z } from "zod";

export const quickAppointmentSchema = z.object({
  type: z.enum(["consultation", "walk-in"]),
  doctorId: z.string().min(1, "Select a doctor"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone number"),
  cnic: z.string().optional(),
  fullName: z.string().min(2, "Enter patient's full name"),
  gender: z.enum(["male", "female", "other"], { message: "Select gender" }),
  age: z.coerce.number().min(0, "Enter a valid age").max(120, "Enter a valid age"),
  weight: z.string().optional(),
  height: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  paymentCollected: z.boolean().default(false),
  paymentAmount: z.coerce.number().min(0).default(1500),
});

export type QuickAppointmentFormValues = z.input<typeof quickAppointmentSchema>;
export type QuickAppointmentFormOutput = z.output<typeof quickAppointmentSchema>;