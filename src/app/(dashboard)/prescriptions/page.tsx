"use client";

import { useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Eye, FileText, Plus, Printer } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { SearchBar } from "@/components/common/search-bar";
import { DataTable } from "@/components/tables/data-table";
import { PrescriptionFormDialog } from "@/components/forms/prescription-form-dialog";
import { PrescriptionViewDialog } from "@/components/modals/prescription-view-dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { prescriptionsMock } from "@/constants/prescriptions-mock";
import type { Prescription } from "@/types";
import type { PrescriptionFormValues } from "@/schemas/prescription.schema";

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(prescriptionsMock);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [viewing, setViewing] = useState<Prescription | null>(null);

  const filtered = useMemo(() => {
    return prescriptions.filter(
      (rx) =>
        rx.patientName.toLowerCase().includes(search.toLowerCase()) ||
        rx.doctorName.toLowerCase().includes(search.toLowerCase()) ||
        rx.diagnosis.toLowerCase().includes(search.toLowerCase())
    );
  }, [prescriptions, search]);

  const handleSave = (values: PrescriptionFormValues) => {
    const newRx: Prescription = {
      id: `rx-${Date.now()}`,
      patientName: values.patientName,
      doctorName: values.doctorName.replace("Dr. ", ""),
      diagnosis: values.diagnosis,
      medicines: values.medicines,
      notes: values.notes,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    setPrescriptions((prev) => [newRx, ...prev]);
  };

  const columns: ColumnDef<Prescription>[] = [
    {
      header: "Patient",
      accessorKey: "patientName",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{row.original.patientName}</p>
            <p className="truncate text-xs text-muted-foreground">{row.original.diagnosis}</p>
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
      header: "Medicines",
      accessorKey: "medicines",
      cell: ({ row }) => (
        <Badge variant="secondary">{row.original.medicines.length} medicine(s)</Badge>
      ),
    },
    { header: "Date", accessorKey: "createdAt" },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setViewing(row.original);
            }}
          >
            <Eye className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setViewing(row.original);
              setTimeout(() => window.print(), 200);
            }}
          >
            <Printer className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Prescriptions"
        description="Create and manage patient prescriptions."
        action={
          <Button size="sm" onClick={() => setFormOpen(true)}>
            <Plus className="size-4" />
            Create prescription
          </Button>
        }
      />

      <Card className="p-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by patient, doctor, or diagnosis..."
        />
      </Card>

      <DataTable
        columns={columns}
        data={filtered}
        onRowClick={(rx) => setViewing(rx)}
        emptyTitle="No prescriptions found"
        emptyDescription="Try adjusting your search, or create a new prescription."
      />

      <PrescriptionFormDialog open={formOpen} onOpenChange={setFormOpen} onSaved={handleSave} />
      <PrescriptionViewDialog
        open={!!viewing}
        onOpenChange={(open) => !open && setViewing(null)}
        prescription={viewing}
      />
    </div>
  );
}
