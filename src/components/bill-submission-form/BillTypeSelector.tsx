
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BillType, billTypeLabels } from "./bill-types";

interface BillTypeSelectorProps {
  selectedTypes: BillType[];
  toggleBillType: (type: BillType) => void;
  error?: string;
}

export function BillTypeSelector({ selectedTypes, toggleBillType, error }: BillTypeSelectorProps) {
  return (
    <div>
      <Label className="mb-2 block">Bill Types</Label>
      <div className="flex flex-wrap gap-4">
        {(Object.keys(billTypeLabels) as BillType[]).map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <Checkbox 
              id={`bill-type-${type}`} 
              checked={selectedTypes.includes(type)}
              onCheckedChange={() => toggleBillType(type)}
            />
            <label
              htmlFor={`bill-type-${type}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {billTypeLabels[type]}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="text-sm text-destructive mt-2">{error}</p>}
    </div>
  );
}
