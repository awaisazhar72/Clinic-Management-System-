"use client";

import { useMemo, useState } from "react";
import { format, isSameDay } from "date-fns";
import {
  AlertCircle,
  CalendarClock,
  CalendarDays,
  Download,
  EyeOff,
  List,
  Plus,
} from "lucide-react";
import { toast } from "sonner";

import { DateStrip } from "@/components/dashboard/date-strip";
import { ScheduleListRow } from "@/components/dashboard/schedule-list-row";
import { AppointmentCalendarView } from "@/components/dashboard/appointment-calendar-view";
import { ScheduleAppointmentDialog } from "@/components/forms/schedule-appointment-dialog";
import { PatientProfileDialog } from "@/components/dashboard/patient-profile-dialog";
import { ConfirmDialog } from "@/components/modals/confirm-dialog";
import { EmptyState } from "@/components/common/empty-state";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { appointmentsMock } from "@/constants/appointments-mock";
import { doctorsMock } from "@/constants/doctors-mock";
import type { Appointment } from "@/types";
import type { QuickAppointmentFormOutput } from "@/schemas/quick-appointment.schema";
import { cn } from "@/lib/utils";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(appointmentsMock);
  const [selectedDate, setSelectedDate] = useState(() => new Date("2026-07-11T00:00:00"));
  const [view, setView] = useState<"list" | "calendar">("list");
  const [search, setSearch] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("all");
  const [hideCompleted, setHideCompleted] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [defaultDate, setDefaultDate] = useState<Date | undefined>(undefined);
  const [cancelTarget, setCancelTarget] = useState<Appointment | null>(null);

  const [profileOpen, setProfileOpen] = useState(false);
  const [profilePatient, setProfilePatient] = useState<Appointment | null>(null);

  const pendingCount = useMemo(
    () => appointments.filter((a) => a.status === "scheduled").length,
    [appointments]
  );

  const dayAppointments = useMemo(() => {
    return appointments
      .filter((apt) => isSameDay(new Date(apt.date), selectedDate))
      .filter((apt) => {
        const matchesSearch =
          apt.patientName.toLowerCase().includes(search.toLowerCase()) ||
          apt.doctorName.toLowerCase().includes(search.toLowerCase());
        const matchesDoctor = doctorFilter === "all" || apt.doctorId === doctorFilter;
        const matchesHideCompleted = !hideCompleted || apt.status !== "completed";
        return matchesSearch && matchesDoctor && matchesHideCompleted;
      })
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [appointments, selectedDate, search, doctorFilter, hideCompleted]);

  const handleBookNew = (date?: Date) => {
    setEditingAppointment(null);
    setDefaultDate(date ?? selectedDate);
    setFormOpen(true);
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setDefaultDate(undefined);
    setFormOpen(true);
  };

  const handleViewProfile = (appointment: Appointment) => {
    setProfilePatient(appointment);
    setProfileOpen(true);
  };

  const handleSave = (values: QuickAppointmentFormOutput) => {
    const doctor = doctorsMock.find((d) => d.id === values.doctorId);

    if (editingAppointment) {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === editingAppointment.id
            ? {
                ...a,
                patientName: values.fullName,
                doctorId: values.doctorId,
                doctorName: doctor?.fullName.replace("Dr. ", "") ?? a.doctorName,
                date: values.date || a.date,
                time: values.time || a.time,
                visitType: values.type,
              }
            : a
        )
      );
    } else {
      setAppointments((prev) => [
        {
          id: `apt-${Date.now()}`,
          patientId: `p-${Date.now()}`,
          patientName: values.fullName,
          doctorId: values.doctorId,
          doctorName: doctor?.fullName.replace("Dr. ", "") ?? "",
          date: values.date || format(new Date(), "yyyy-MM-dd"),
          time: values.time || "Now",
          status: "scheduled",
          visitType: values.type,
        },
        ...prev,
      ]);
    }
  };

  const handleCancel = async () => {
    if (!cancelTarget) return;
    setAppointments((prev) =>
      prev.map((a) => (a.id === cancelTarget.id ? { ...a, status: "cancelled" } : a))
    );
    toast.success(`Appointment with ${cancelTarget.patientName} cancelled`);
  };

  const handleMarkDone = (appointment: Appointment) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === appointment.id ? { ...a, status: "completed" } : a))
    );
    toast.success(`${appointment.patientName}'s visit marked as completed`);
  };

  const handleExport = () => {
    toast.success("Exporting appointments...");
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <CalendarClock className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Appointments Hub
            </h1>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Manage patient schedule
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="size-4" />
            Export
          </Button>
          <Button size="sm" onClick={() => handleBookNew()}>
            <Plus className="size-4" />
            Book
          </Button>
        </div>
      </div>

      {/* Filter bar */}
      <Card>
        <CardContent className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <Input
            placeholder="Quick search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="lg:flex-1"
          />

          <Select value={doctorFilter} onValueChange={setDoctorFilter}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="All Doctors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Doctors</SelectItem>
              {doctorsMock.map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {d.fullName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive">
            <AlertCircle className="size-3.5" />
            {pendingCount} Pending
          </span>

          <button
            type="button"
            onClick={() => setHideCompleted((v) => !v)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
              hideCompleted
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            <EyeOff className="size-3.5" />
            Hide Comp.
          </button>

          <div className="flex shrink-0 rounded-md border border-border p-0.5">
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setView("list")}
            >
              <List className="size-3.5" />
              List
            </Button>
            <Button
              variant={view === "calendar" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setView("calendar")}
            >
              <CalendarDays className="size-3.5" />
              Calendar
            </Button>
          </div>
        </CardContent>
      </Card>

      {view === "list" ? (
        <>
          {/* Date strip */}
          <DateStrip selectedDate={selectedDate} onSelectDate={setSelectedDate} />

          {/* Today's schedule */}
          <Card>
            <CardContent>
              <div className="mb-2 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <CalendarDays className="size-4 text-muted-foreground" />
                  {isSameDay(selectedDate, new Date("2026-07-11T00:00:00"))
                    ? "Today's Schedule"
                    : `Schedule for ${format(selectedDate, "MMM d, yyyy")}`}
                </h2>
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {dayAppointments.length} record{dayAppointments.length === 1 ? "" : "s"}
                </span>
              </div>

              {dayAppointments.length === 0 ? (
                <EmptyState
                  title="No appointments for this day"
                  description="Try a different date or book a new appointment."
                  action={{ label: "Book appointment", onClick: () => handleBookNew() }}
                />
              ) : (
                <div className="divide-y divide-border">
                  {dayAppointments.map((apt) => (
                    <ScheduleListRow
                      key={apt.id}
                      appointment={apt}
                      onViewProfile={() => handleViewProfile(apt)}
                      onMarkDone={
                        apt.status === "scheduled" ? () => handleMarkDone(apt) : undefined
                      }
                      onReschedule={() => handleEdit(apt)}
                      onCancel={
                        apt.status === "scheduled" ? () => setCancelTarget(apt) : undefined
                      }
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        <AppointmentCalendarView
          appointments={appointments}
          onDayClick={(date) => handleBookNew(date)}
          onAppointmentClick={(apt) => handleEdit(apt)}
        />
      )}

      <ScheduleAppointmentDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        appointment={editingAppointment}
        defaultDate={defaultDate}
        onSaved={handleSave}
      />

      <PatientProfileDialog
        open={profileOpen}
        onOpenChange={setProfileOpen}
        patientName={profilePatient?.patientName ?? null}
        patientId={profilePatient?.patientId}
      />

      <ConfirmDialog
        open={!!cancelTarget}
        onOpenChange={(open) => !open && setCancelTarget(null)}
        title="Cancel appointment?"
        description={`This will cancel the appointment with ${cancelTarget?.patientName ?? "this patient"}. They will be notified.`}
        confirmLabel="Yes, cancel it"
        variant="destructive"
        onConfirm={handleCancel}
      />
    </div>
  );
}