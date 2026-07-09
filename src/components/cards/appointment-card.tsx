import { CalendarClock, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Appointment, AppointmentStatus } from "@/types";
import { cn } from "@/lib/utils";

const statusVariant: Record<AppointmentStatus, "success" | "warning" | "destructive" | "secondary"> = {
  scheduled: "warning",
  completed: "success",
  cancelled: "destructive",
  "no-show": "secondary",
};

export function AppointmentCard({
  appointment,
  onClick,
}: {
  appointment: Appointment;
  onClick?: () => void;
}) {
  return (
    <Card
      className={cn(onClick && "cursor-pointer transition-shadow hover:shadow-md")}
      onClick={onClick}
    >
      <CardContent className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <CalendarClock className="size-5" />
          </div>
          <div>
            <p className="font-medium text-foreground">{appointment.patientName}</p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <User className="size-3.5" />
              Dr. {appointment.doctorName}
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
              <Clock className="size-3.5" />
              {appointment.date} &middot; {appointment.time}
            </p>
          </div>
        </div>
        <Badge variant={statusVariant[appointment.status]} className="capitalize shrink-0">
          {appointment.status.replace("-", " ")}
        </Badge>
      </CardContent>
    </Card>
  );
}
