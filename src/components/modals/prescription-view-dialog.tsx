"use client";

import { Printer } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { APP_NAME } from "@/constants";
import type { Prescription } from "@/types";

export function PrescriptionViewDialog({
  open,
  onOpenChange,
  prescription,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prescription: Prescription | null;
}) {
  if (!prescription) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pr-6">
            <span>Prescription</span>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="size-3.5" />
              Print
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">{APP_NAME}</p>
              <p className="text-xs text-muted-foreground">{prescription.createdAt}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Dr. {prescription.doctorName}</p>
              <p className="text-xs text-muted-foreground">Attending physician</p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-xs text-muted-foreground">Patient</p>
            <p className="text-sm font-medium text-foreground">{prescription.patientName}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Diagnosis</p>
            <p className="text-sm font-medium text-foreground">{prescription.diagnosis}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">Medicines (Rx)</p>
            <ul className="space-y-2">
              {prescription.medicines.map((med, i) => (
                <li key={i} className="rounded-md bg-accent/40 px-3 py-2">
                  <p className="text-sm font-medium text-foreground">{med.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {med.dosage} &middot; {med.frequency} &middot; {med.duration}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {prescription.notes && (
            <div>
              <p className="text-xs text-muted-foreground">Notes</p>
              <p className="text-sm text-foreground">{prescription.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
