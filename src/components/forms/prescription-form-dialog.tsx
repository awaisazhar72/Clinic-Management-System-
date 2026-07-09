"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/forms/form-field";
import {
  prescriptionSchema,
  type PrescriptionFormValues,
} from "@/schemas/prescription.schema";

interface PrescriptionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: (values: PrescriptionFormValues) => void | Promise<void>;
}

const defaultValues: PrescriptionFormValues = {
  patientName: "",
  doctorName: "",
  diagnosis: "",
  medicines: [{ name: "", dosage: "", frequency: "", duration: "" }],
  notes: "",
};

export function PrescriptionFormDialog({
  open,
  onOpenChange,
  onSaved,
}: PrescriptionFormDialogProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PrescriptionFormValues>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({ control, name: "medicines" });

  useEffect(() => {
    if (open) reset(defaultValues);
  }, [open, reset]);

  const onSubmit = async (values: PrescriptionFormValues) => {
    try {
      await onSaved(values);
      toast.success("Prescription created");
      onOpenChange(false);
    } catch {
      toast.error("Couldn't create prescription. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create new prescription</DialogTitle>
          <DialogDescription>
            Add diagnosis and medicines to generate a new prescription.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Patient name" htmlFor="patientName" required error={errors.patientName?.message}>
              <Input id="patientName" placeholder="e.g. Sara Malik" {...register("patientName")} />
            </FormField>
            <FormField label="Doctor" htmlFor="doctorName" required error={errors.doctorName?.message}>
              <Input id="doctorName" placeholder="e.g. Dr. Ayesha Khan" {...register("doctorName")} />
            </FormField>
          </div>

          <FormField label="Diagnosis" htmlFor="diagnosis" required error={errors.diagnosis?.message}>
            <Input id="diagnosis" placeholder="e.g. Seasonal allergic rhinitis" {...register("diagnosis")} />
          </FormField>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Medicines</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ name: "", dosage: "", frequency: "", duration: "" })}
              >
                <Plus className="size-3.5" />
                Add medicine
              </Button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="rounded-md border border-border p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      Medicine {index + 1}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-6 text-muted-foreground hover:text-destructive"
                      onClick={() => fields.length > 1 && remove(index)}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Medicine name"
                    {...register(`medicines.${index}.name` as const)}
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      placeholder="Dosage"
                      {...register(`medicines.${index}.dosage` as const)}
                    />
                    <Input
                      placeholder="Frequency"
                      {...register(`medicines.${index}.frequency` as const)}
                    />
                    <Input
                      placeholder="Duration"
                      {...register(`medicines.${index}.duration` as const)}
                    />
                  </div>
                </div>
              ))}
            </div>
            {errors.medicines && (
              <p className="text-xs text-destructive">{errors.medicines.message as string}</p>
            )}
          </div>

          <FormField label="Notes" htmlFor="notes">
            <Textarea id="notes" placeholder="Additional instructions..." rows={3} {...register("notes")} />
          </FormField>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              Create prescription
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
