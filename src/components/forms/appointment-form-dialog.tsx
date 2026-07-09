"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/forms/form-field";
import {
  appointmentSchema,
  type AppointmentFormValues,
} from "@/schemas/appointment.schema";
import { doctorsMock } from "@/constants/doctors-mock";
import { TIME_SLOTS } from "@/constants/appointments-mock";
import type { Appointment } from "@/types";
import { cn } from "@/lib/utils";

interface AppointmentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment?: Appointment | null;
  defaultDate?: Date;
  onSaved: (values: AppointmentFormValues) => void | Promise<void>;
}

function buildDefaults(appointment?: Appointment | null, defaultDate?: Date): AppointmentFormValues {
  if (appointment) {
    return {
      patientName: appointment.patientName,
      doctorId: appointment.doctorId,
      date: new Date(appointment.date),
      time: appointment.time,
      reason: appointment.reason ?? "",
      status: appointment.status,
    };
  }
  return {
    patientName: "",
    doctorId: "",
    date: defaultDate ?? new Date(),
    time: "",
    reason: "",
    status: "scheduled",
  };
}

export function AppointmentFormDialog({
  open,
  onOpenChange,
  appointment,
  defaultDate,
  onSaved,
}: AppointmentFormDialogProps) {
  const isEdit = !!appointment;
  const [calendarOpen, setCalendarOpen] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: buildDefaults(appointment, defaultDate),
  });

  useEffect(() => {
    if (open) {
      reset(buildDefaults(appointment, defaultDate));
    }
  }, [open, appointment, defaultDate, reset]);

  const onSubmit = async (values: AppointmentFormValues) => {
    try {
      await onSaved(values);
      toast.success(isEdit ? "Appointment updated" : "Appointment booked");
      onOpenChange(false);
    } catch {
      toast.error("Couldn't save appointment. Please try again.");
    }
  };

  const selectedDate = watch("date");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit appointment" : "Book new appointment"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the appointment details below."
              : "Fill in the details to schedule a new appointment."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Patient name" htmlFor="patientName" required error={errors.patientName?.message}>
            <Input id="patientName" placeholder="e.g. Sara Malik" {...register("patientName")} />
          </FormField>

          <FormField label="Doctor" required error={errors.doctorId?.message}>
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

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Date" required error={errors.date?.message as string | undefined}>
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start font-normal",
                          !field.value && "text-muted-foreground"
                        )}
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

            <FormField label="Time slot" required error={errors.time?.message}>
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

          <FormField label="Reason for visit" htmlFor="reason" required error={errors.reason?.message}>
            <Input id="reason" placeholder="e.g. Follow-up consultation" {...register("reason")} />
          </FormField>

          {isEdit && (
            <FormField label="Status" required>
              <Select
                value={watch("status")}
                onValueChange={(v) => setValue("status", v as AppointmentFormValues["status"])}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="no-show">No-show</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              {isEdit ? "Save changes" : "Book appointment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
