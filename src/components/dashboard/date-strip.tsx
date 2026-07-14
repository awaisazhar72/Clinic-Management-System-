"use client";

import { useMemo, useRef } from "react";
import { addDays, format, isSameDay, isToday, startOfWeek } from "date-fns";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateStripProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  daysToShow?: number;
}

export function DateStrip({ selectedDate, onSelectDate, daysToShow = 14 }: DateStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const days = useMemo(() => {
    const start = startOfWeek(selectedDate);
    return Array.from({ length: daysToShow }, (_, i) => addDays(start, i - 2));
  }, [selectedDate, daysToShow]);

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center">
      {/* Jump to date */}
      <div className="flex shrink-0 items-center gap-2 sm:border-r sm:border-border sm:pr-4">
        <CalendarDays className="size-4 text-muted-foreground" />
        <div className="space-y-0.5">
          <label className="block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            Jump to Date
          </label>
          <input
            type="date"
            value={format(selectedDate, "yyyy-MM-dd")}
            onChange={(e) => {
              if (e.target.value) onSelectDate(new Date(`${e.target.value}T00:00:00`));
            }}
            className="bg-transparent text-sm font-medium text-foreground outline-none [color-scheme:light]"
          />
        </div>
      </div>

      {/* Scrollable day strip */}
      <div
        ref={scrollRef}
        className="flex flex-1 gap-2 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:thin]"
      >
        {days.map((day) => {
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentDay = isToday(day);

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onSelectDate(day)}
              className={cn(
                "flex min-w-16 shrink-0 flex-col items-center rounded-lg border px-3 py-2 transition-colors",
                isSelected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-transparent bg-secondary/50 text-foreground hover:bg-secondary"
              )}
            >
              {isCurrentDay && !isSelected && (
                <span className="text-[9px] font-bold uppercase text-primary">Today</span>
              )}
              {isCurrentDay && isSelected && (
                <span className="text-[9px] font-bold uppercase text-primary-foreground/80">
                  Today
                </span>
              )}
              <span
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-wide",
                  isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                )}
              >
                {format(day, "EEE")}
              </span>
              <span className="text-lg font-bold leading-tight">{format(day, "d")}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}