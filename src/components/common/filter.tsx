"use client";

import { SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  placeholder?: string;
}

export function Filter({ label, value, onChange, options, placeholder = "All" }: FilterProps) {
  return (
    <div className="flex items-center gap-2">
      {label && (
        <span className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground">
          <SlidersHorizontal className="size-3.5" />
          {label}
        </span>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full sm:w-40" size="sm">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
