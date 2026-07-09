"use client";

import { useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/common/page-header";
import { SearchBar } from "@/components/common/search-bar";
import { Filter } from "@/components/common/filter";
import { Pagination } from "@/components/common/pagination";
import { DataTable } from "@/components/tables/data-table";
import { ConfirmDialog } from "@/components/modals/confirm-dialog";
import { StaffFormDialog } from "@/components/forms/staff-form-dialog";

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

import { staffMock } from "@/constants/staff-mock";
import type { Staff } from "@/types";
import type { StaffFormValues } from "@/schemas/staff.schema";

const PAGE_SIZE = 6;

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>(staffMock);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Staff | null>(null);

  const departments = useMemo(
    () => Array.from(new Set(staff.map((s) => s.department))),
    [staff]
  );

  const filtered = useMemo(() => {
    return staff.filter((s) => {
      const matchesSearch =
        s.fullName.toLowerCase().includes(search.toLowerCase()) ||
        s.role.toLowerCase().includes(search.toLowerCase());
      const matchesDepartment = departmentFilter === "all" || s.department === departmentFilter;
      const matchesStatus = statusFilter === "all" || s.status === statusFilter;
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [staff, search, departmentFilter, statusFilter]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleAdd = () => {
    setEditingStaff(null);
    setFormOpen(true);
  };

  const handleEdit = (member: Staff) => {
    setEditingStaff(member);
    setFormOpen(true);
  };

  const handleSave = (values: StaffFormValues) => {
    if (editingStaff) {
      setStaff((prev) =>
        prev.map((s) => (s.id === editingStaff.id ? { ...s, ...values } : s))
      );
    } else {
      setStaff((prev) => [
        { id: `st-${Date.now()}`, joinedOn: "Just now", ...values },
        ...prev,
      ]);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setStaff((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    toast.success(`${deleteTarget.fullName} removed from staff`);
  };

  const columns: ColumnDef<Staff>[] = [
    {
      header: "Staff member",
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
            <p className="truncate text-xs text-muted-foreground">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    { header: "Role", accessorKey: "role" },
    {
      header: "Department",
      accessorKey: "department",
      cell: ({ row }) => <Badge variant="outline">{row.original.department}</Badge>,
    },
    { header: "Phone", accessorKey: "phone" },
    {
      header: "Joined",
      accessorKey: "joinedOn",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">{row.original.joinedOn ?? "—"}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "active" ? "success" : "secondary"} className="capitalize">
          {row.original.status}
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
        title="Staff"
        description="Manage non-medical and support staff at your clinic."
        action={
          <Button size="sm" onClick={handleAdd}>
            <Plus className="size-4" />
            Add staff member
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
            placeholder="Search by name or role..."
            className="flex-1"
          />
          <div className="flex gap-2">
            <Filter
              label="Department"
              value={departmentFilter}
              onChange={(v) => {
                setDepartmentFilter(v);
                setPage(1);
              }}
              options={[
                { label: "All", value: "all" },
                ...departments.map((d) => ({ label: d, value: d })),
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
        emptyTitle="No staff members found"
        emptyDescription="Try adjusting your search or filters, or add a new staff member."
      />

      {filtered.length > 0 && (
        <Pagination page={page} pageSize={PAGE_SIZE} total={filtered.length} onPageChange={setPage} />
      )}

      <StaffFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        staff={editingStaff}
        onSaved={handleSave}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Remove staff member?"
        description={`This will permanently remove ${deleteTarget?.fullName ?? "this staff member"} from your records.`}
        confirmLabel="Remove"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
