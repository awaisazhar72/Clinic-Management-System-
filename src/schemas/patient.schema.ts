import { z } from "zod";

export const patientSchema = z.object({
  fullName: z.string().min(2, "Enter the patient's full name"),
  age: z.coerce.number().min(0, "Enter a valid age").max(120, "Enter a valid age"),
  gender: z.enum(["male", "female", "other"], {
    message: "Select a gender",
  }),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address").optional().or(z.literal("")),
  address: z.string().optional(),
  bloodGroup: z.string().optional(),
});

export type PatientFormValues = z.input<typeof patientSchema>;
export type PatientFormOutput = z.output<typeof patientSchema>;
