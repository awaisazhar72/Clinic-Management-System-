"use client";

import { useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  CalendarDays,
  List,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
  CalendarClock,
} from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/common/page-header";
import { SearchBar } from "@/components/common/search-bar";
import { Filter } from "@/components/common/filter";
import { Pagination } from "@/components/common/pagination";
import { DataTable } from "@/components/tables/data-table";
import { AppointmentCalendarView } from "@/components/dashboard/appointment-calendar-view";
import { AppointmentFormDialog } from "@/components/forms/appointment-form-dialog";
import { ConfirmDialog } from "@/components/modals/confirm-dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { appointmentsMock } from "@/constants/appointments-mock";
import { doctorsMock } from "@/constants/doctors-mock";
import type { Appointment, AppointmentStatus } from "@/types";
import type { AppointmentFormValues } from "@/schemas/appointment.schema";

const PAGE_SIZE = 6;

const statusVariant: Record<AppointmentStatus, "success" | "warning" | "destructive" | "secondary"> = {
  scheduled: "warning",
  completed: "success",
  cancelled: "destructive",
  "no-show": "secondary",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(appointmentsMock);
  const [view, setView] = useState<"calendar" | "table">("calendar");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [doctorFilter, setDoctorFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [defaultDate, setDefaultDate] = useState<Date | undefined>(undefined);
  const [cancelTarget, setCancelTarget] = useState<Appointment | null>(null);

  const filtered = useMemo(() => {
    return appointments.filter((apt) => {
      const matchesSearch =
        apt.patientName.toLowerCase().includes(search.toLowerCase()) ||
        apt.doctorName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
      const matchesDoctor = doctorFilter === "all" || apt.doctorId === doctorFilter;
      return matchesSearch && matchesStatus && matchesDoctor;
    });
  }, [appointments, search, statusFilter, doctorFilter]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleBookNew = (date?: Date) => {
    setEditingAppointment(null);
    setDefaultDate(date);
    setFormOpen(true);
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setDefaultDate(undefined);
    setFormOpen(true);
  };

  const handleSave = (values: AppointmentFormValues) => {
    const doctor = doctorsMock.find((d) => d.id === values.doctorId);
    const dateStr = format(values.date, "yyyy-MM-dd");

    if (editingAppointment) {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === editingAppointment.id
            ? {
                ...a,
                patientName: values.patientName,
                doctorId: values.doctorId,
                doctorName: doctor?.fullName.replace("Dr. ", "") ?? a.doctorName,
                date: dateStr,
                time: values.time,
                reason: values.reason,
                status: values.status,
              }
            : a
        )
      );
    } else {
      setAppointments((prev) => [
        {
          id: `apt-${Date.now()}`,
          patientId: `p-${Date.now()}`,
          patientName: values.patientName,
          doctorId: values.doctorId,
          doctorName: doctor?.fullName.replace("Dr. ", "") ?? "",
          date: dateStr,
          time: values.time,
          reason: values.reason,
          status: values.status,
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

  const columns: ColumnDef<Appointment>[] = [
    {
      header: "Patient",
      accessorKey: "patientName",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="size-9 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {initials(row.original.patientName)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{row.original.patientName}</p>
            <p className="truncate text-xs text-muted-foreground">{row.original.reason}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Doctor",
      accessorKey: "doctorName",
      cell: ({ row }) => <span className="text-sm text-foreground">Dr. {row.original.doctorName}</span>,
    },
    {
      header: "Date & time",
      accessorKey: "date",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {format(new Date(row.original.date), "MMM d, yyyy")} &middot; {row.original.time}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <Badge variant={statusVariant[row.original.status]} className="capitalize">
          {row.original.status.replace("-", " ")}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(row.original)}>
              <Pencil className="size-4" />
              Edit / Reschedule
            </DropdownMenuItem>
            {row.original.status === "scheduled" && (
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setCancelTarget(row.original)}
              >
                <Trash2 className="size-4" />
                Cancel
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Appointments"
        description="Book, manage, and track patient appointments."
        action={
          <Button size="sm" onClick={() => handleBookNew()}>
            <Plus className="size-4" />
            Book appointment
          </Button>
        }
      />

      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar
            value={search}
            onChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            placeholder="Search by patient or doctor..."
            className="flex-1"
          />
          <div className="flex flex-wrap gap-2">
            <Filter
              label="Doctor"
              value={doctorFilter}
              onChange={(v) => {
                setDoctorFilter(v);
                setPage(1);
              }}
              options={[
                { label: "All", value: "all" },
                ...doctorsMock.map((d) => ({ label: d.fullName, value: d.id })),
              ]}
            />
            <Filter
              label="Status"
              value={statusFilter}
              onChange={(v) => {
                setStatusFilter(v);
                setPage(1);
              }}
              options={[
                { label: "All", value: "all" },
                { label: "Scheduled", value: "scheduled" },
                { label: "Completed", value: "completed" },
                { label: "Cancelled", value: "cancelled" },
                { label: "No-show", value: "no-show" },
              ]}
            />
            <div className="flex rounded-md border border-border p-0.5">
              <Button
                variant={view === "calendar" ? "secondary" : "ghost"}
                size="icon"
                className="size-8"
                onClick={() => setView("calendar")}
              >
                <CalendarDays className="size-4" />
              </Button>
              <Button
                variant={view === "table" ? "secondary" : "ghost"}
                size="icon"
                className="size-8"
                onClick={() => setView("table")}
              >
                <List className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {view === "calendar" ? (
        <AppointmentCalendarView
          appointments={filtered}
          onDayClick={(date) => handleBookNew(date)}
          onAppointmentClick={(apt) => handleEdit(apt)}
        />
      ) : (
        <>
          <DataTable
            columns={columns}
            data={paginated}
            emptyTitle="No appointments found"
            emptyDescription="Try adjusting your search or filters, or book a new appointment."
          />
          {filtered.length > 0 && (
            <Pagination page={page} pageSize={PAGE_SIZE} total={filtered.length} onPageChange={setPage} />
          )}
        </>
      )}

      <AppointmentFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        appointment={editingAppointment}
        defaultDate={defaultDate}
        onSaved={handleSave}
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
