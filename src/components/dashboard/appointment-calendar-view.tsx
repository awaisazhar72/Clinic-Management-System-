"use client";

import { useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Appointment } from "@/types";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface AppointmentCalendarViewProps {
  appointments: Appointment[];
  onDayClick: (date: Date) => void;
  onAppointmentClick: (appointment: Appointment) => void;
}

export function AppointmentCalendarView({
  appointments,
  onDayClick,
  onAppointmentClick,
}: AppointmentCalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const appointmentsByDate = useMemo(() => {
    const map = new Map<string, Appointment[]>();
    for (const apt of appointments) {
      const key = apt.date;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(apt);
    }
    return map;
  }, [appointments]);

  return (
    <div className="rounded-lg border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-base font-semibold text-foreground">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date())}>
            Today
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Weekday header */}
      <div className="grid grid-cols-7 border-b border-border">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="px-2 py-2 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7">
        {days.map((day) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const dayAppointments = appointmentsByDate.get(dateKey) ?? [];
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isCurrentDay = isToday(day);

          return (
            <div
              key={dateKey}
              onClick={() => onDayClick(day)}
              className={cn(
                "group min-h-28 border-b border-r border-border p-2 last:border-r-0 [&:nth-child(7n)]:border-r-0 cursor-pointer transition-colors hover:bg-accent/40",
                !isCurrentMonth && "bg-muted/30"
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full text-xs font-medium",
                    isCurrentDay
                      ? "bg-primary text-primary-foreground"
                      : isCurrentMonth
                      ? "text-foreground"
                      : "text-muted-foreground/50"
                  )}
                >
                  {format(day, "d")}
                </span>
                <Plus className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="mt-1.5 space-y-1">
                {dayAppointments.slice(0, 2).map((apt) => (
                  <button
                    key={apt.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAppointmentClick(apt);
                    }}
                    className={cn(
                      "block w-full truncate rounded px-1.5 py-0.5 text-left text-[11px] font-medium",
                      apt.status === "scheduled" && "bg-warning/10 text-warning-foreground",
                      apt.status === "completed" && "bg-success/10 text-success",
                      apt.status === "cancelled" && "bg-destructive/10 text-destructive line-through",
                      apt.status === "no-show" && "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {apt.time} &middot; {apt.patientName}
                  </button>
                ))}
                {dayAppointments.length > 2 && (
                  <Badge variant="outline" className="text-[10px]">
                    +{dayAppointments.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
