
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DatePickerField } from "../DatePickerField";
import { TimePickerField } from "../TimePickerField";
import { BaseBillFormFields } from "./types";

interface CommonDetailsFormProps {
  commonFields: Omit<BaseBillFormFields, "amount" | "personsInvolved" | "status">;
  handleCommonFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function CommonDetailsForm({ 
  commonFields, 
  handleCommonFieldChange, 
  errors 
}: CommonDetailsFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DatePickerField
            label="Date"
            value={commonFields.date}
            onChange={(date) => handleCommonFieldChange("date", date)}
            error={errors.date}
          />
          
          <TimePickerField
            label="Time"
            value={commonFields.time}
            onChange={(time) => handleCommonFieldChange("time", time)}
            error={errors.time}
          />
        </div>

        <div>
          <Label htmlFor="remark">Remark</Label>
          <Textarea
            id="remark"
            placeholder="Enter any additional information..."
            value={commonFields.remark}
            onChange={(e) => handleCommonFieldChange("remark", e.target.value)}
            className="resize-none min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
}
