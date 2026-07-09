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
import { staffSchema, type StaffFormValues } from "@/schemas/staff.schema";
import type { Staff } from "@/types";

interface StaffFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff?: Staff | null;
  onSaved: (values: StaffFormValues) => void | Promise<void>;
}

const defaultValues: StaffFormValues = {
  fullName: "",
  role: "",
  department: "",
  email: "",
  phone: "",
  status: "active",
};

export function StaffFormDialog({ open, onOpenChange, staff, onSaved }: StaffFormDialogProps) {
  const isEdit = !!staff;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      reset(
        staff
          ? {
              fullName: staff.fullName,
              role: staff.role,
              department: staff.department,
              email: staff.email,
              phone: staff.phone,
              status: staff.status,
            }
          : defaultValues
      );
    }
  }, [open, staff, reset]);

  const onSubmit = async (values: StaffFormValues) => {
    try {
      await onSaved(values);
      toast.success(isEdit ? "Staff member updated" : "Staff member added");
      onOpenChange(false);
    } catch {
      toast.error("Couldn't save staff member. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit staff member" : "Add new staff member"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update this staff member's details below."
              : "Fill in the details to add a new staff member."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Full name" htmlFor="fullName" required error={errors.fullName?.message}>
            <Input id="fullName" placeholder="e.g. Nadia Yousaf" {...register("fullName")} />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Role" htmlFor="role" required error={errors.role?.message}>
              <Input id="role" placeholder="e.g. Head Nurse" {...register("role")} />
            </FormField>
            <FormField label="Department" htmlFor="department" required error={errors.department?.message}>
              <Input id="department" placeholder="e.g. Nursing" {...register("department")} />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Phone" htmlFor="phone" required error={errors.phone?.message}>
              <Input id="phone" placeholder="+92 300 1234567" {...register("phone")} />
            </FormField>
            <FormField label="Status" required>
              <Select
                value={watch("status")}
                onValueChange={(v) => setValue("status", v as StaffFormValues["status"])}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <FormField label="Email" htmlFor="email" required error={errors.email?.message}>
            <Input id="email" type="email" placeholder="staff@sehatos.com" {...register("email")} />
          </FormField>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              {isEdit ? "Save changes" : "Add staff member"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
