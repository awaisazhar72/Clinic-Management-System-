"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid, List, Plus } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/common/page-header";
import { SearchBar } from "@/components/common/search-bar";
import { Filter } from "@/components/common/filter";
import { Pagination } from "@/components/common/pagination";
import { EmptyState } from "@/components/common/empty-state";
import { DoctorCard } from "@/components/cards/doctor-card";
import { DoctorFormDialog } from "@/components/forms/doctor-form-dialog";
import { ConfirmDialog } from "@/components/modals/confirm-dialog";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";

import { doctorsMock } from "@/constants/doctors-mock";
import type { Doctor } from "@/types";

const PAGE_SIZE = 6;

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const statusVariant: Record<Doctor["status"], "success" | "warning" | "secondary"> = {
  active: "success",
  "on-leave": "warning",
  inactive: "secondary",
};

export default function DoctorsPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>(doctorsMock);
  const [search, setSearch] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [view, setView] = useState<"grid" | "table">("grid");
  const [page, setPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Doctor | null>(null);

  const specialties = useMemo(
    () => Array.from(new Set(doctors.map((d) => d.specialty))),
    [doctors]
  );

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const matchesSearch =
        d.fullName.toLowerCase().includes(search.toLowerCase()) ||
        d.specialty.toLowerCase().includes(search.toLowerCase());
      const matchesSpecialty = specialtyFilter === "all" || d.specialty === specialtyFilter;
      const matchesStatus = statusFilter === "all" || d.status === statusFilter;
      return matchesSearch && matchesSpecialty && matchesStatus;
    });
  }, [doctors, search, specialtyFilter, statusFilter]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleAdd = () => {
    setEditingDoctor(null);
    setFormOpen(true);
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormOpen(true);
  };

  const handleSave = (values: Omit<Doctor, "id" | "rating" | "avatarUrl">) => {
    if (editingDoctor) {
      setDoctors((prev) =>
        prev.map((d) => (d.id === editingDoctor.id ? { ...d, ...values } : d))
      );
    } else {
      setDoctors((prev) => [
        { id: `d-${Date.now()}`, rating: 0, ...values },
        ...prev,
      ]);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDoctors((prev) => prev.filter((d) => d.id !== deleteTarget.id));
    toast.success(`${deleteTarget.fullName} removed from staff`);
  };

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Doctors"
        description="Manage your clinic's medical staff."
        action={
          <Button size="sm" onClick={handleAdd}>
            <Plus className="size-4" />
            Add doctor
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
            placeholder="Search by name or specialty..."
            className="flex-1"
          />
          <div className="flex flex-wrap gap-2">
            <Filter
              label="Specialty"
              value={specialtyFilter}
              onChange={(v) => {
                setSpecialtyFilter(v);
                setPage(1);
              }}
              options={[
                { label: "All", value: "all" },
                ...specialties.map((s) => ({ label: s, value: s })),
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
                { label: "On Leave", value: "on-leave" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
            <div className="flex rounded-md border border-border p-0.5">
              <Button
                variant={view === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="size-8"
                onClick={() => setView("grid")}
              >
                <LayoutGrid className="size-4" />
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

      {filtered.length === 0 ? (
        <EmptyState
          title="No doctors found"
          description="Try adjusting your search or filters, or add a new doctor."
        />
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onClick={() => router.push(`/doctors/${doctor.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((doctor) => (
                <TableRow
                  key={doctor.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/doctors/${doctor.id}`)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9 shrink-0">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {initials(doctor.fullName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{doctor.fullName}</p>
                        <p className="truncate text-xs text-muted-foreground">{doctor.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{doctor.specialty}</TableCell>
                  <TableCell>{doctor.experienceYears} yrs</TableCell>
                  <TableCell>${doctor.consultationFee}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[doctor.status]} className="capitalize">
                      {doctor.status.replace("-", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/doctors/${doctor.id}`)}>
                          <Eye className="size-4" />
                          View profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(doctor)}>
                          <Pencil className="size-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => setDeleteTarget(doctor)}
                        >
                          <Trash2 className="size-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {filtered.length > 0 && (
        <Pagination page={page} pageSize={PAGE_SIZE} total={filtered.length} onPageChange={setPage} />
      )}

      <DoctorFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        doctor={editingDoctor}
        onSaved={handleSave}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Remove doctor from staff?"
        description={`This will permanently remove ${deleteTarget?.fullName ?? "this doctor"} from your clinic staff.`}
        confirmLabel="Remove"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
