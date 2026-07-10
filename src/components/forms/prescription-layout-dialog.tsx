"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LayoutGrid, Loader2, Lock, Image as ImageIcon } from "lucide-react";
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
import { FormField } from "@/components/forms/form-field";
import {
  layoutSettingsSchema,
  type LayoutSettingsFormValues,
} from "@/schemas/prescription.schema";
import type { PrescriptionLayoutSettings } from "@/types";

interface PrescriptionLayoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: PrescriptionLayoutSettings;
  onSaved: (values: LayoutSettingsFormValues) => void;
}

export function PrescriptionLayoutDialog({
  open,
  onOpenChange,
  settings,
  onSaved,
}: PrescriptionLayoutDialogProps) {
  const [logoName, setLogoName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LayoutSettingsFormValues>({
    resolver: zodResolver(layoutSettingsSchema),
    defaultValues: settings,
  });

  useEffect(() => {
    if (open) reset(settings);
  }, [open, settings, reset]);

  const onSubmit = async (values: LayoutSettingsFormValues) => {
    onSaved(values);
    toast.success("Prescription layout saved");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LayoutGrid className="size-4 text-primary" />
            Prescription Layout Settings
          </DialogTitle>
          <DialogDescription>Customize your prescription header and footer.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Logo upload */}
          <div className="flex items-center gap-4 rounded-lg border border-border p-4">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <ImageIcon className="size-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Clinic / Hospital Logo</p>
              <p className="text-xs text-muted-foreground">
                Upload your clinic logo to appear on the top-center of every prescription PDF. PNG or JPG
                recommended (Max 1MB).
              </p>
              <label className="mt-2 inline-block cursor-pointer">
                <span className="inline-flex h-8 items-center rounded-md border border-input px-3 text-xs font-medium hover:bg-accent">
                  Choose Logo File
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setLogoName(e.target.files?.[0]?.name ?? null)}
                />
              </label>
              {logoName && <p className="mt-1 text-xs text-muted-foreground">{logoName}</p>}
            </div>
          </div>

          {/* Bilingual fields */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <p className="col-span-1 text-sm font-semibold text-foreground">English Details</p>
            <p className="col-span-1 text-right text-sm font-semibold text-foreground" dir="rtl">
              اردو تفصیلات
            </p>

            <FormField
              label={
                <span className="flex items-center gap-1">
                  Clinic Name <Lock className="size-3 text-muted-foreground" />
                </span>
              }
              htmlFor="clinicName"
              error={errors.clinicName?.message}
            >
              <Input id="clinicName" disabled {...register("clinicName")} />
            </FormField>
            <FormField label="کلینک کا نام" htmlFor="clinicNameUrdu">
              <Input id="clinicNameUrdu" dir="rtl" className="text-right" {...register("clinicNameUrdu")} />
            </FormField>

            <FormField label="Clinic Tagline/Subtitle" htmlFor="clinicTagline">
              <Input id="clinicTagline" {...register("clinicTagline")} />
            </FormField>
            <FormField label="ذیلی عنوان" htmlFor="clinicTaglineUrdu">
              <Input id="clinicTaglineUrdu" dir="rtl" className="text-right" {...register("clinicTaglineUrdu")} />
            </FormField>

            <FormField label="Doctor Name & Phone" htmlFor="doctorName" error={errors.doctorName?.message}>
              <div className="flex gap-2">
                <Input id="doctorName" {...register("doctorName")} />
                <Input placeholder="Phone" {...register("doctorPhone")} />
              </div>
            </FormField>
            <FormField label="ڈاکٹر کا نام" htmlFor="doctorNameUrdu">
              <Input dir="rtl" className="text-right" placeholder="ڈاکٹر علی خان" />
            </FormField>

            <FormField label="Degrees" htmlFor="degrees">
              <Input id="degrees" placeholder="MBBS, FCPS" {...register("degrees")} />
            </FormField>
            <FormField label="ڈگریاں" htmlFor="degreesUrdu">
              <Input id="degreesUrdu" dir="rtl" className="text-right" {...register("degreesUrdu")} />
            </FormField>

            <FormField label="Specialties / Memberships" htmlFor="specialties">
              <Input id="specialties" {...register("specialties")} />
            </FormField>
            <FormField label="خصوصیات / ممبرشپ" htmlFor="specialtiesUrdu">
              <Input id="specialtiesUrdu" dir="rtl" className="text-right" {...register("specialtiesUrdu")} />
            </FormField>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              Save Layout
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}