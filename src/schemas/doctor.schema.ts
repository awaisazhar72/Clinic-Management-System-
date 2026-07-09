import { z } from "zod";

export const doctorSchema = z.object({
  fullName: z.string().min(2, "Enter the doctor's full name"),
  specialty: z.string().min(2, "Enter a specialty"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone number"),
  experienceYears: z.coerce.number().min(0, "Enter valid years of experience").max(60),
  consultationFee: z.coerce.number().min(0, "Enter a valid fee"),
  status: z.enum(["active", "on-leave", "inactive"]),
  bio: z.string().optional(),
});

export type DoctorFormValues = z.input<typeof doctorSchema>;
export type DoctorFormOutput = z.output<typeof doctorSchema>;
