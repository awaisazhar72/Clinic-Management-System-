import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

export function LatestAppointmentsList({ appointments }: { appointments: Appointment[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest appointments</CardTitle>
        <CardAction>
          <Link
            href="/appointments"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all
            <ArrowUpRight className="size-3.5" />
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-border">
          {appointments.map((apt) => (
            <li key={apt.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <Avatar className="size-9 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {initials(apt.patientName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{apt.patientName}</p>
                <p className="truncate text-xs text-muted-foreground">
                  Dr. {apt.doctorName} &middot; {apt.reason}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs text-muted-foreground">{apt.time}</p>
                <Badge variant={statusVariant[apt.status]} className="mt-1 capitalize">
                  {apt.status.replace("-", " ")}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
