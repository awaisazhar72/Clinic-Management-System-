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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/forms/form-field";
import { doctorSchema, type DoctorFormValues, type DoctorFormOutput } from "@/schemas/doctor.schema";
import type { Doctor } from "@/types";

interface DoctorFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor?: Doctor | null;
  onSaved: (values: DoctorFormOutput) => void | Promise<void>;
}

const defaultValues: DoctorFormValues = {
  fullName: "",
  specialty: "",
  email: "",
  phone: "",
  experienceYears: 0,
  consultationFee: 0,
  status: "active",
  bio: "",
};

export function DoctorFormDialog({
  open,
  onOpenChange,
  doctor,
  onSaved,
}: DoctorFormDialogProps) {
  const isEdit = !!doctor;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DoctorFormValues, unknown, DoctorFormOutput>({
    resolver: zodResolver(doctorSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      reset(
        doctor
          ? {
              fullName: doctor.fullName,
              specialty: doctor.specialty,
              email: doctor.email,
              phone: doctor.phone,
              experienceYears: doctor.experienceYears ?? 0,
              consultationFee: doctor.consultationFee ?? 0,
              status: doctor.status,
              bio: doctor.bio ?? "",
            }
          : defaultValues
      );
    }
  }, [open, doctor, reset]);

  const onSubmit = async (values: DoctorFormOutput) => {
    try {
      await onSaved(values);
      toast.success(isEdit ? "Doctor profile updated" : "Doctor added");
      onOpenChange(false);
    } catch {
      toast.error("Couldn't save doctor. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit doctor" : "Add new doctor"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the doctor's profile details below."
              : "Fill in the doctor's details to add them to your clinic staff."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Full name" htmlFor="fullName" required error={errors.fullName?.message}>
            <Input id="fullName" placeholder="e.g. Dr. Ayesha Khan" {...register("fullName")} />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Specialty" htmlFor="specialty" required error={errors.specialty?.message}>
              <Input id="specialty" placeholder="e.g. Cardiologist" {...register("specialty")} />
            </FormField>
            <FormField label="Status" required>
              <Select
                value={watch("status")}
                onValueChange={(v) => setValue("status", v as DoctorFormValues["status"])}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Phone" htmlFor="phone" required error={errors.phone?.message}>
              <Input id="phone" placeholder="+92 300 1234567" {...register("phone")} />
            </FormField>
            <FormField label="Email" htmlFor="email" required error={errors.email?.message}>
              <Input id="email" type="email" placeholder="doctor@clinic.com" {...register("email")} />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Experience (years)"
              htmlFor="experienceYears"
              required
              error={errors.experienceYears?.message}
            >
              <Input id="experienceYears" type="number" min={0} max={60} {...register("experienceYears")} />
            </FormField>
            <FormField
              label="Consultation fee ($)"
              htmlFor="consultationFee"
              required
              error={errors.consultationFee?.message}
            >
              <Input id="consultationFee" type="number" min={0} {...register("consultationFee")} />
            </FormField>
          </div>

          <FormField label="Bio" htmlFor="bio">
            <Textarea id="bio" placeholder="Short professional summary..." rows={3} {...register("bio")} />
          </FormField>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              {isEdit ? "Save changes" : "Add doctor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
