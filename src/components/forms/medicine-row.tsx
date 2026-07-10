"use client";

import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { frequencyOptions, timingOptions, durationOptions } from "@/constants/prescriptions-mock";

export interface MedicineRowValue {
  name: string;
  frequency: string;
  timing: string;
  duration: string;
}

interface MedicineRowProps {
  index: number;
  value: MedicineRowValue;
  onChange: (value: MedicineRowValue) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export function MedicineRow({ index, value, onChange, onRemove, canRemove }: MedicineRowProps) {
  return (
    <div className="space-y-2 rounded-md border border-border p-3">
      <div className="flex items-start gap-2">
        <span className="mt-2.5 text-sm font-medium text-muted-foreground">{index + 1}.</span>
        <Input
          placeholder="Medicine Name (e.g. Onat 5mg Tab.)"
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
          className="flex-1"
        />
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 text-muted-foreground hover:text-destructive"
            onClick={onRemove}
          >
            <Trash2 className="size-4" />
          </Button>
        )}
      </div>

      <div className="ml-6 grid grid-cols-3 gap-2">
        <Select value={value.frequency} onValueChange={(v) => onChange({ ...value, frequency: v })}>
          <SelectTrigger className="w-full" size="sm">
            <SelectValue placeholder="Frequency" />
          </SelectTrigger>
          <SelectContent>
            {frequencyOptions.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={value.timing} onValueChange={(v) => onChange({ ...value, timing: v })}>
          <SelectTrigger className="w-full" size="sm">
            <SelectValue placeholder="Timing" />
          </SelectTrigger>
          <SelectContent>
            {timingOptions.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={value.duration} onValueChange={(v) => onChange({ ...value, duration: v })}>
          <SelectTrigger className="w-full" size="sm">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            {durationOptions.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}