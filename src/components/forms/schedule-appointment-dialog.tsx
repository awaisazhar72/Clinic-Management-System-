"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  Download,
  Loader2,
  Phone,
  Stethoscope,
  User,
} from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/forms/form-field";
import { cn } from "@/lib/utils";

import { doctorsMock } from "@/constants/doctors-mock";
import { TIME_SLOTS } from "@/constants/appointments-mock";
import {
  quickAppointmentSchema,
  type QuickAppointmentFormValues,
  type QuickAppointmentFormOutput,
} from "@/schemas/quick-appointment.schema";

interface BookedResult {
  ticketId: string;
  patient: string;
  phone: string;
  date: string;
  time: string;
  type: "Consultation" | "Walk-in";
  refId: string;
  amount: number;
}

const defaultValues: QuickAppointmentFormValues = {
  type: "walk-in",
  doctorId: "",
  phone: "",
  cnic: "",
  fullName: "",
  gender: "male",
  age: 0,
  weight: "",
  height: "",
  date: new Date().toISOString().slice(0, 10),
  time: "",
  paymentCollected: true,
  paymentAmount: 1500,
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
function tomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function ScheduleAppointmentDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [result, setResult] = useState<BookedResult | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuickAppointmentFormValues, unknown, QuickAppointmentFormOutput>({
    resolver: zodResolver(quickAppointmentSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      reset(defaultValues);
      setResult(null);
    }
  }, [open, reset]);

  const type = watch("type");
  const isConsultation = type === "consultation";

  const onSubmit = async (values: QuickAppointmentFormOutput) => {
    await new Promise((r) => setTimeout(r, 700));

    const doctor = doctorsMock.find((d) => d.id === values.doctorId);
    const ticketSuffix = Math.random().toString(16).slice(2, 8).toUpperCase();
    const refSuffix = Math.random().toString(16).slice(2, 9).toUpperCase();

    setResult({
      ticketId: `TKT-${ticketSuffix}`,
      patient: values.fullName,
      phone: values.phone,
      date: values.date
        ? new Date(values.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      time: values.time || "Now",
      type: isConsultation ? "Consultation" : "Walk-in",
      refId: `APT-${refSuffix}`,
      amount: values.paymentAmount,
    });

    toast.success(`${values.fullName}'s appointment is confirmed`, {
      description: doctor ? `With ${doctor.fullName}` : undefined,
    });
  };

  const handleDone = () => {
    onOpenChange(false);
  };

  const handleReceipt = () => {
    toast.success("Receipt downloaded");
  };

  // ---- Success state ----
  if (result) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden gap-0">
          <div className="bg-success px-6 py-5 text-success-foreground">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/20">
                <CheckCircle2 className="size-5" />
              </div>
              <div>
                <p className="font-semibold">Appointment Booked!</p>
                <p className="text-sm text-success-foreground/90">
                  {result.patient}&apos;s appointment is confirmed.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Ticket ID
                </p>
                <p className="text-lg font-semibold text-primary">{result.ticketId}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-3 py-1 text-xs font-medium text-warning-foreground">
                <span className="size-1.5 rounded-full bg-warning" />
                Scheduled
              </span>
            </div>

            <dl className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-muted-foreground">
                  <User className="size-4" /> Patient
                </dt>
                <dd className="font-medium text-foreground">{result.patient}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="size-4" /> Phone
                </dt>
                <dd className="font-medium text-foreground">{result.phone}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Date</dt>
                <dd className="font-medium text-foreground">{result.date}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Time</dt>
                <dd className="font-medium text-primary">{result.time}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-muted-foreground">
                  <Stethoscope className="size-4" /> Type
                </dt>
                <dd className="font-medium text-foreground">{result.type}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground"># Ref ID</dt>
                <dd className="font-medium text-foreground">{result.refId}</dd>
              </div>
            </dl>

            <div className="flex items-center justify-between rounded-md border border-success/20 bg-success/10 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-success">Consultation Fee — PAID</p>
                <p className="text-xs text-success/80">Cash received at reception</p>
              </div>
              <p className="text-base font-semibold text-success">
                PKR {result.amount.toLocaleString()}
              </p>
            </div>

            <p className="text-center text-xs text-muted-foreground">City Care Clinic</p>

            <div className="flex gap-3 pt-1">
              <Button variant="outline" className="flex-1" onClick={handleDone}>
                Done
              </Button>
              <Button className="flex-1 bg-success text-success-foreground hover:bg-success/90" onClick={handleReceipt}>
                <Download className="size-4" />
                Receipt
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // ---- Form state ----
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Appt</DialogTitle>
          <DialogDescription>Add a new patient visit.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Type toggle */}
          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Appointment Type
            </p>
            <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1">
              <button
                type="button"
                onClick={() => setValue("type", "consultation")}
                className={cn(
                  "rounded-md py-2 text-sm font-medium transition-colors",
                  isConsultation
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Consultation
              </button>
              <button
                type="button"
                onClick={() => setValue("type", "walk-in")}
                className={cn(
                  "rounded-md py-2 text-sm font-medium transition-colors",
                  !isConsultation
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Walk-In
              </button>
            </div>
          </div>

          {/* Doctor select */}
          <FormField label="Booking for Doctor" required error={errors.doctorId?.message}>
            <Select value={watch("doctorId")} onValueChange={(v) => setValue("doctorId", v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctorsMock.map((doc) => (
                  <SelectItem key={doc.id} value={doc.id}>
                    {doc.fullName} — {doc.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Phone + CNIC */}
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Phone Number" htmlFor="phone" required error={errors.phone?.message}>
              <Input id="phone" placeholder="+92 300 1234567" {...register("phone")} />
            </FormField>
            <FormField
              label={
                <>
                  CNIC <span className="font-normal text-muted-foreground">Optional Lookup</span>
                </>
              }
              htmlFor="cnic"
            >
              <Input id="cnic" placeholder="12345-1234567-1" {...register("cnic")} />
            </FormField>
          </div>

          {/* Full name */}
          <FormField label="Full Name" htmlFor="fullName" required error={errors.fullName?.message}>
            <Input id="fullName" placeholder="e.g. Ali Raza" {...register("fullName")} />
          </FormField>

          {/* Gender / Age / Weight / Height */}
          <div className="grid grid-cols-4 gap-3">
            <FormField label="Gender" required error={errors.gender?.message}>
              <Select
                value={watch("gender")}
                onValueChange={(v) => setValue("gender", v as QuickAppointmentFormValues["gender"])}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Age" required error={errors.age?.message}>
              <Input placeholder="Yrs" {...register("age")} />
            </FormField>
            <FormField label="Weight">
              <Input placeholder="Kg" {...register("weight")} />
            </FormField>
            <FormField label="Height">
              <Input placeholder="Cm" {...register("height")} />
            </FormField>
          </div>

          {/* Date & Time - only for Consultation */}
          {isConsultation && (
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label={
                  <span className="flex w-full items-center justify-between">
                    Date
                    <span className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => setValue("date", todayISO())}
                        className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-secondary-foreground"
                      >
                        TODAY
                      </button>
                      <button
                        type="button"
                        onClick={() => setValue("date", tomorrowISO())}
                        className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-secondary-foreground"
                      >
                        TMRW
                      </button>
                    </span>
                  </span>
                }
              >
                <Input type="date" {...register("date")} />
              </FormField>
              <FormField label="Time" error={errors.time?.message}>
                <Select value={watch("time")} onValueChange={(v) => setValue("time", v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            </div>
          )}

          {/* Payment collected */}
          <label className="flex cursor-pointer items-center justify-between rounded-md border border-success/30 bg-success/10 px-4 py-3">
            <span className="flex items-center gap-2">
              <Checkbox
                checked={watch("paymentCollected")}
                onCheckedChange={(v) => setValue("paymentCollected", !!v)}
              />
              <span>
                <span className="block text-sm font-medium text-success">Payment Collected</span>
                <span className="block text-xs text-success/80">
                  Rs {Number(watch("paymentAmount") || 0).toLocaleString()} received
                </span>
              </span>
            </span>
            <CheckCircle2 className="size-5 text-success" />
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              <CheckCircle2 className="size-4" />
              Confirm Appointment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}