"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowLeft, Download } from "lucide-react";

import { SearchBar } from "@/components/common/search-bar";
import { Filter } from "@/components/common/filter";
import { Pagination } from "@/components/common/pagination";
import { DataTable } from "@/components/tables/data-table";
import { PatientProfileDialog } from "@/components/dashboard/patient-profile-dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { appointmentsMock } from "@/constants/appointments-mock";
import type { Appointment, AppointmentStatus } from "@/types";

const PAGE_SIZE = 8;

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

export default function PastHistoryPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [profileOpen, setProfileOpen] = useState(false);
  const [profilePatient, setProfilePatient] = useState<Appointment | null>(null);

  const handleViewDetails = (appointment: Appointment) => {
    setProfilePatient(appointment);
    setProfileOpen(true);
  };

  // History = anything not currently "scheduled" (i.e. concluded appointments)
  const historyRecords = useMemo(
    () =>
      appointmentsMock
        .filter((a) => a.status !== "scheduled")
        .sort((a, b) => b.date.localeCompare(a.date)),
    []
  );

  const filtered = useMemo(() => {
    return historyRecords.filter((apt) => {
      const matchesSearch = apt.patientName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [historyRecords, search, statusFilter]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const totals = useMemo(
    () => ({
      total: historyRecords.length,
      done: historyRecords.filter((a) => a.status === "completed").length,
      cancelled: historyRecords.filter((a) => a.status === "cancelled" || a.status === "no-show").length,
    }),
    [historyRecords]
  );

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
            <p className="truncate text-xs text-muted-foreground">ID: {row.original.patientId}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Concluded",
      accessorKey: "date",
      cell: ({ row }) => (
        <div>
          <p className="text-sm text-foreground">{format(new Date(row.original.date), "MMM d, yyyy")}</p>
          <p className="text-xs text-muted-foreground">{row.original.time}</p>
        </div>
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
      header: "Modality",
      accessorKey: "visitType",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.visitType === "walk-in" ? "Walk-in" : "Consultation"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleViewDetails(row.original)}
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => router.push("/appointments")}>
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">Archives</h1>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Past appointment history
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="rounded-md border border-border px-3 py-1.5 text-center">
            <p className="text-sm font-semibold text-foreground">{totals.total}</p>
            <p className="text-[10px] uppercase text-muted-foreground">Total</p>
          </div>
          <div className="rounded-md border border-border px-3 py-1.5 text-center">
            <p className="text-sm font-semibold text-success">{totals.done}</p>
            <p className="text-[10px] uppercase text-muted-foreground">Done</p>
          </div>
          <div className="rounded-md border border-border px-3 py-1.5 text-center">
            <p className="text-sm font-semibold text-destructive">{totals.cancelled}</p>
            <p className="text-[10px] uppercase text-muted-foreground">X</p>
          </div>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar
            value={search}
            onChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            placeholder="Search patient..."
            className="flex-1"
          />
          <div className="flex items-center gap-2">
            <Filter
              label="Status"
              value={statusFilter}
              onChange={(v) => {
                setStatusFilter(v);
                setPage(1);
              }}
              options={[
                { label: "All Status", value: "all" },
                { label: "Completed", value: "completed" },
                { label: "Cancelled", value: "cancelled" },
                { label: "No-show", value: "no-show" },
              ]}
            />
            <Button variant="outline" size="sm">
              <Download className="size-3.5" />
              Export
            </Button>
          </div>
        </div>
      </Card>

      <DataTable
        columns={columns}
        data={paginated}
        emptyTitle="No history records found"
        emptyDescription="Completed and cancelled appointments will appear here."
      />

      {filtered.length > 0 && (
        <Pagination page={page} pageSize={PAGE_SIZE} total={filtered.length} onPageChange={setPage} />
      )}

      <PatientProfileDialog
        open={profileOpen}
        onOpenChange={setProfileOpen}
        patientName={profilePatient?.patientName ?? null}
        patientId={profilePatient?.patientId}
      />
    </div>
  );
}