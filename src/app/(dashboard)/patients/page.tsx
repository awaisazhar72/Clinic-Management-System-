"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Plus, Trash2, Pencil, Eye } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/common/page-header";
import { SearchBar } from "@/components/common/search-bar";
import { Filter } from "@/components/common/filter";
import { Pagination } from "@/components/common/pagination";
import { DataTable } from "@/components/tables/data-table";
import { ConfirmDialog } from "@/components/modals/confirm-dialog";
import { PatientFormDialog } from "@/components/forms/patient-form-dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";

import { patientsMock } from "@/constants/patients-mock";
import type { Patient } from "@/types";

const PAGE_SIZE = 5;

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function PatientsPage() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>(patientsMock);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Patient | null>(null);

  const filtered = useMemo(() => {
    return patients.filter((p) => {
      const matchesSearch =
        p.fullName.toLowerCase().includes(search.toLowerCase()) ||
        p.phone.includes(search) ||
        (p.email ?? "").toLowerCase().includes(search.toLowerCase());
      const matchesGender = genderFilter === "all" || p.gender === genderFilter;
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      return matchesSearch && matchesGender && matchesStatus;
    });
  }, [patients, search, genderFilter, statusFilter]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleAdd = () => {
    setEditingPatient(null);
    setFormOpen(true);
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setFormOpen(true);
  };

  const handleSave = (values: Omit<Patient, "id" | "lastVisit" | "status" | "avatarUrl">) => {
    if (editingPatient) {
      setPatients((prev) =>
        prev.map((p) => (p.id === editingPatient.id ? { ...p, ...values } : p))
      );
    } else {
      setPatients((prev) => [
        {
          id: `p-${Date.now()}`,
          lastVisit: "—",
          status: "active",
          ...values,
        },
        ...prev,
      ]);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setPatients((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    toast.success(`${deleteTarget.fullName} removed from records`);
  };

  const columns: ColumnDef<Patient>[] = [
    {
      header: "Patient",
      accessorKey: "fullName",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="size-9 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {initials(row.original.fullName)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{row.original.fullName}</p>
            <p className="truncate text-xs text-muted-foreground">{row.original.email ?? "—"}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Age / Gender",
      accessorKey: "age",
      cell: ({ row }) => (
        <span className="capitalize text-sm text-foreground">
          {row.original.age} yrs &middot; {row.original.gender}
        </span>
      ),
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "Last visit",
      accessorKey: "lastVisit",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">{row.original.lastVisit ?? "—"}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "active" ? "success" : "secondary"} className="capitalize">
          {row.original.status ?? "active"}
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
            <DropdownMenuItem onClick={() => router.push(`/patients/${row.original.id}`)}>
              <Eye className="size-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(row.original)}>
              <Pencil className="size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setDeleteTarget(row.original)}
            >
              <Trash2 className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Patients"
        description="Manage your clinic's patient records."
        action={
          <Button size="sm" onClick={handleAdd}>
            <Plus className="size-4" />
            Add patient
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
            placeholder="Search by name, phone, or email..."
            className="flex-1"
          />
          <div className="flex gap-2">
            <Filter
              label="Gender"
              value={genderFilter}
              onChange={(v) => {
                setGenderFilter(v);
                setPage(1);
              }}
              options={[
                { label: "All", value: "all" },
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
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
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
          </div>
        </div>
      </Card>

      <DataTable
        columns={columns}
        data={paginated}
        onRowClick={(patient) => router.push(`/patients/${patient.id}`)}
        emptyTitle="No patients found"
        emptyDescription="Try adjusting your search or filters, or add a new patient."
      />

      {filtered.length > 0 && (
        <Pagination page={page} pageSize={PAGE_SIZE} total={filtered.length} onPageChange={setPage} />
      )}

      <PatientFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        patient={editingPatient}
        onSaved={handleSave}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete patient record?"
        description={`This will permanently remove ${deleteTarget?.fullName ?? "this patient"} from your records.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
