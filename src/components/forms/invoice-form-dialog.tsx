"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormField } from "@/components/forms/form-field";
import { invoiceSchema, type InvoiceFormValues, type InvoiceFormOutput } from "@/schemas/invoice.schema";
import { cn } from "@/lib/utils";

interface InvoiceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: (values: InvoiceFormOutput) => void | Promise<void>;
}

const defaultValues: InvoiceFormValues = {
  patientName: "",
  dueAt: new Date(),
  items: [{ description: "", quantity: 1, unitPrice: 0 }],
};

export function InvoiceFormDialog({ open, onOpenChange, onSaved }: InvoiceFormDialogProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InvoiceFormValues, unknown, InvoiceFormOutput>({
    resolver: zodResolver(invoiceSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const items = watch("items");
  const total =
    items?.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0), 0) ?? 0;

  useEffect(() => {
    if (open) reset(defaultValues);
  }, [open, reset]);

  const onSubmit = async (values: InvoiceFormOutput) => {
    try {
      await onSaved(values);
      toast.success("Invoice created");
      onOpenChange(false);
    } catch {
      toast.error("Couldn't create invoice. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create new invoice</DialogTitle>
          <DialogDescription>
            Add line items and set a due date to generate a new invoice.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Patient name" htmlFor="patientName" required error={errors.patientName?.message}>
              <Input id="patientName" placeholder="e.g. Sara Malik" {...register("patientName")} />
            </FormField>

            <FormField label="Due date" required error={errors.dueAt?.message as string | undefined}>
              <Controller
                control={control}
                name="dueAt"
                render={({ field }) => (
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn("w-full justify-start font-normal", !field.value && "text-muted-foreground")}
                      >
                        <CalendarIcon className="size-4" />
                        {field.value ? format(field.value, "MMM d, yyyy") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setCalendarOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </FormField>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Line items</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ description: "", quantity: 1, unitPrice: 0 })}
              >
                <Plus className="size-3.5" />
                Add item
              </Button>
            </div>

            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                  <Input
                    placeholder="Description"
                    className="flex-1"
                    {...register(`items.${index}.description` as const)}
                  />
                  <Input
                    type="number"
                    placeholder="Qty"
                    min={1}
                    className="w-16"
                    {...register(`items.${index}.quantity` as const)}
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    min={0}
                    className="w-24"
                    {...register(`items.${index}.unitPrice` as const)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => fields.length > 1 && remove(index)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
            {errors.items && (
              <p className="text-xs text-destructive">{errors.items.message as string}</p>
            )}
          </div>

          <div className="flex items-center justify-between rounded-md bg-accent/50 px-4 py-3">
            <span className="text-sm font-medium text-foreground">Total</span>
            <span className="text-lg font-semibold text-foreground">${total.toFixed(2)}</span>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              Create invoice
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
