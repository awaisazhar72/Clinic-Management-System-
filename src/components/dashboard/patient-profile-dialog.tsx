"use client";

import { useMemo } from "react";
import { Printer, X, CalendarDays } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/common/empty-state";

import {
  patientsMock,
  patientDocumentsMock,
  patientTimelineMock,
} from "@/constants/patients-mock";
import { invoicesMock } from "@/constants/billing-mock";
import { toast } from "sonner";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface PatientProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Free-form patient name (from an appointment record) used to look up / fall back on. */
  patientName: string | null;
  patientId?: string | null;
}

export function PatientProfileDialog({
  open,
  onOpenChange,
  patientName,
  patientId,
}: PatientProfileDialogProps) {
  const patient = useMemo(() => {
    if (patientId) {
      const byId = patientsMock.find((p) => p.id === patientId);
      if (byId) return byId;
    }
    if (patientName) {
      const byName = patientsMock.find(
        (p) => p.fullName.toLowerCase() === patientName.toLowerCase()
      );
      if (byName) return byName;
    }
    // Fallback: build a minimal stand-in profile so the dialog always has something to show
    return {
      id: "unknown",
      fullName: patientName ?? "Unknown Patient",
      age: 0,
      gender: "other" as const,
      phone: "—",
      bloodGroup: undefined,
      lastVisit: undefined,
      status: "active" as const,
    };
  }, [patientId, patientName]);

  const documents = patientDocumentsMock[patient.id] ?? [];
  const timeline = patientTimelineMock[patient.id] ?? [];
  const invoices = invoicesMock.filter((i) => i.patientName === patient.fullName);

  const totalVisits = timeline.filter((t) => t.type === "appointment").length || (patient.lastVisit ? 1 : 0);
  const missedCancelled = 0;

  const handlePrint = () => {
    toast.success(`Preparing report for ${patient.fullName}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto p-0 gap-0" showCloseButton={false}>
        <VisuallyHidden>
          <DialogTitle>{patient.fullName}&apos;s profile</DialogTitle>
        </VisuallyHidden>

        {/* Header */}
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {initials(patient.fullName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold uppercase tracking-wide text-foreground">
                {patient.fullName}
              </p>
              <p className="text-sm text-muted-foreground">
                {patient.phone} &middot; {patient.age}y &middot; {patient.gender.charAt(0).toUpperCase()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="size-3.5" />
              Print Report
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="size-4" />
            </Button>
          </div>
        </div>

        <div className="px-6 pt-4">
          <Badge variant="secondary" className="gap-1.5">
            <CalendarDays className="size-3" />
            {totalVisits} visit{totalVisits === 1 ? "" : "s"}
          </Badge>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="px-6 pt-4 pb-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="edit">Edit Patient</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="rounded-lg border border-border p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Patient Information
              </p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  <p className="font-medium text-foreground">{patient.fullName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">{patient.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Age</p>
                  <p className="font-medium text-foreground">{patient.age} years</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Gender</p>
                  <p className="font-medium capitalize text-foreground">{patient.gender}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Blood Group</p>
                  <p className="font-medium text-foreground">{patient.bloodGroup ?? "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Visit</p>
                  <p className="font-medium text-foreground">{patient.lastVisit ?? "—"}</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CalendarDays className="size-4" />
                No upcoming appointments scheduled.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Total Visits
                </p>
                <p className="mt-1 text-2xl font-semibold text-success">{totalVisits}</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Missed / Cancelled
                </p>
                <p className="mt-1 text-2xl font-semibold text-destructive">{missedCancelled}</p>
              </div>
            </div>
          </TabsContent>

          {/* History */}
          <TabsContent value="history" className="pt-4">
            {timeline.length === 0 ? (
              <EmptyState title="No visit history" description="Past visits will appear here." />
            ) : (
              <ol className="relative space-y-4 border-l border-border pl-5">
                {timeline.map((event) => (
                  <li key={event.id}>
                    <p className="text-sm font-medium text-foreground">{event.title}</p>
                    {event.description && (
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    )}
                    <p className="mt-0.5 text-xs text-muted-foreground">{event.date}</p>
                  </li>
                ))}
              </ol>
            )}
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing" className="pt-4">
            {invoices.length === 0 ? (
              <EmptyState title="No billing records" description="Invoices for this patient will appear here." />
            ) : (
              <div className="space-y-2">
                {invoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3 text-sm"
                  >
                    <div>
                      <p className="font-medium text-foreground">{inv.invoiceNumber}</p>
                      <p className="text-xs text-muted-foreground">{inv.issuedAt}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">${inv.amount}</p>
                      <Badge
                        variant={
                          inv.status === "paid"
                            ? "success"
                            : inv.status === "pending"
                            ? "warning"
                            : "destructive"
                        }
                        className="mt-0.5 capitalize"
                      >
                        {inv.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Documents */}
          <TabsContent value="documents" className="pt-4">
            {documents.length === 0 ? (
              <EmptyState title="No documents" description="Uploaded documents will appear here." />
            ) : (
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3 text-sm"
                  >
                    <p className="font-medium text-foreground">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.uploadedAt}</p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Edit Patient */}
          <TabsContent value="edit" className="pt-4">
            <EmptyState
              title="Edit from Patients module"
              description="Open this patient's full record under Patients to make changes."
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}