
import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TimePickerFieldProps {
  label: string;
  value: string;
  onChange: (time: string) => void;
  error?: string;
}

export function TimePickerField({
  label,
  value,
  onChange,
  error
}: TimePickerFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="time">{label}</Label>
      <div className="relative">
        <Input
          id="time"
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "pl-10",
            error && "border-destructive"
          )}
        />
        <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
