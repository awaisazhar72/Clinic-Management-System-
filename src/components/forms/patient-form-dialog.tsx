"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/forms/form-field";
import { patientSchema, type PatientFormValues, type PatientFormOutput } from "@/schemas/patient.schema";
import type { Patient } from "@/types";

interface PatientFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient?: Patient | null;
  onSaved: (values: PatientFormOutput) => void | Promise<void>;
}

const defaultValues: PatientFormValues = {
  fullName: "",
  age: 0,
  gender: "male",
  phone: "",
  email: "",
  address: "",
  bloodGroup: "",
};

export function PatientFormDialog({
  open,
  onOpenChange,
  patient,
  onSaved,
}: PatientFormDialogProps) {
  const isEdit = !!patient;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormValues, unknown, PatientFormOutput>({
    resolver: zodResolver(patientSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      reset(
        patient
          ? {
              fullName: patient.fullName,
              age: patient.age,
              gender: patient.gender,
              phone: patient.phone,
              email: patient.email ?? "",
              address: patient.address ?? "",
              bloodGroup: patient.bloodGroup ?? "",
            }
          : defaultValues
      );
    }
  }, [open, patient, reset]);

  const onSubmit = async (values: PatientFormOutput) => {
    try {
      await onSaved(values);
      toast.success(isEdit ? "Patient updated" : "Patient added");
      onOpenChange(false);
    } catch {
      toast.error("Couldn't save patient. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit patient" : "Add new patient"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the patient's details below."
              : "Fill in the patient's details to add them to your clinic records."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Full name" htmlFor="fullName" required error={errors.fullName?.message}>
            <Input id="fullName" placeholder="e.g. Sara Malik" {...register("fullName")} />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Age" htmlFor="age" required error={errors.age?.message}>
              <Input id="age" type="number" min={0} max={120} {...register("age")} />
            </FormField>
            <FormField label="Gender" required error={errors.gender?.message}>
              <Select
                value={watch("gender")}
                onValueChange={(v) => setValue("gender", v as PatientFormValues["gender"])}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Phone" htmlFor="phone" required error={errors.phone?.message}>
              <Input id="phone" placeholder="+92 300 1234567" {...register("phone")} />
            </FormField>
            <FormField label="Blood group" htmlFor="bloodGroup">
              <Input id="bloodGroup" placeholder="e.g. O+" {...register("bloodGroup")} />
            </FormField>
          </div>

          <FormField label="Email" htmlFor="email" error={errors.email?.message}>
            <Input id="email" type="email" placeholder="patient@example.com" {...register("email")} />
          </FormField>

          <FormField label="Address" htmlFor="address">
            <Input id="address" placeholder="Street, area, city" {...register("address")} />
          </FormField>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              {isEdit ? "Save changes" : "Add patient"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
