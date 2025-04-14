
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CurrencyInputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function CurrencyInputField({
  label,
  value,
  onChange,
  error
}: CurrencyInputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    onChange(numericValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="amount">{label}</Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
          ₹
        </div>
        <Input
          id="amount"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Enter amount..."
          className={cn(
            "pl-8",
            error && "border-destructive"
          )}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
