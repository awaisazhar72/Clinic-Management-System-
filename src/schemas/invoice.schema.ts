import { z } from "zod";

export const invoiceItemSchema = z.object({
  description: z.string().min(1, "Enter a description"),
  quantity: z.coerce.number().min(1, "Min 1"),
  unitPrice: z.coerce.number().min(0, "Enter a valid price"),
});

export const invoiceSchema = z.object({
  patientName: z.string().min(2, "Enter the patient's name"),
  dueAt: z.date({ message: "Select a due date" }),
  items: z.array(invoiceItemSchema).min(1, "Add at least one line item"),
});

export type InvoiceFormValues = z.input<typeof invoiceSchema>;
export type InvoiceFormOutput = z.output<typeof invoiceSchema>;
