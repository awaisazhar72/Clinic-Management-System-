"use client";

import { RotateCw, User, XCircle, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Appointment, AppointmentStatus } from "@/types";

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

interface ScheduleListRowProps {
  appointment: Appointment;
  onViewProfile?: () => void;
  onReschedule?: () => void;
  onCancel?: () => void;
  onMarkDone?: () => void;
}

export function ScheduleListRow({
  appointment,
  onViewProfile,
  onReschedule,
  onCancel,
  onMarkDone,
}: ScheduleListRowProps) {
  const isCompleted = appointment.status === "completed";
  const isCancelled = appointment.status === "cancelled";

  return (
    <div className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
      {/* Time + type */}
      <div className="w-24 shrink-0">
        <p className="text-sm font-semibold text-foreground">{appointment.time}</p>
        <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          {appointment.visitType === "walk-in" ? "Walk-in" : "Consultation"}
        </p>
      </div>

      {/* Avatar */}
      <Avatar className="size-9 shrink-0">
        <AvatarFallback className="bg-primary/10 text-xs text-primary">
          {initials(appointment.patientName)}
        </AvatarFallback>
      </Avatar>

      {/* Name + status */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{appointment.patientName}</p>
        <Badge variant={statusVariant[appointment.status]} className="mt-0.5 capitalize">
          {appointment.status.replace("-", " ")}
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1.5">
        {onViewProfile && (
          <Button variant="outline" size="icon" className="size-8" onClick={onViewProfile}>
            <User className="size-4" />
          </Button>
        )}

        {!isCompleted && !isCancelled && (
          <>
            {onMarkDone && (
              <Button
                size="sm"
                variant="outline"
                className="border-success/30 text-success hover:bg-success/10"
                onClick={onMarkDone}
              >
                <CheckCircle2 className="size-3.5" />
                Done
              </Button>
            )}
            {onReschedule && (
              <Button variant="outline" size="icon" className="size-8" onClick={onReschedule}>
                <RotateCw className="size-4" />
              </Button>
            )}
            {onCancel && (
              <Button
                variant="outline"
                size="icon"
                className={cn("size-8 text-destructive hover:bg-destructive/10")}
                onClick={onCancel}
              >
                <XCircle className="size-4" />
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}