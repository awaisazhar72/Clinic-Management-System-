import { z } from "zod";

export const staffSchema = z.object({
  fullName: z.string().min(2, "Enter the staff member's full name"),
  role: z.string().min(2, "Enter a role"),
  department: z.string().min(2, "Enter a department"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone number"),
  status: z.enum(["active", "inactive"]),
});

export type StaffFormValues = z.infer<typeof staffSchema>;
