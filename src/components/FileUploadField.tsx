
import * as React from "react";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadFieldProps {
  label: string;
  value: File | string | undefined;
  onChange: (file: File | undefined) => void;
  error?: string;
}

export function FileUploadField({
  label,
  value,
  onChange,
  error
}: FileUploadFieldProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0]);
    }
  };

  const getFileName = () => {
    if (!value) return "No file selected";
    if (typeof value === "string") return value;
    return value.name;
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div
        className={cn(
          "border border-input rounded-md p-4 cursor-pointer hover:bg-muted transition-colors text-center",
          error && "border-destructive"
        )}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
        />
        <UploadCloud className="h-6 w-6 mx-auto mb-2" />
        <p className="text-sm font-medium">{getFileName()}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {value ? "Click to change file" : "Click to upload or drag and drop"}
        </p>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
