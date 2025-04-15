
import { CurrencyInputField } from "../CurrencyInputField";
import { FileUploadField } from "../FileUploadField";
import { PersonSelectionField } from "../PersonSelectionField";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { BillType } from "./bill-types";

interface BillFormFieldsProps {
  type: BillType;
  title: string;
  values: Record<string, any>;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
  showAttachmentField?: boolean;
  showBikeNumberField?: boolean;
  isAmountReadOnly?: boolean;
}

export function BillFormFields({
  type,
  title,
  values,
  onChange,
  errors,
  showAttachmentField = false,
  showBikeNumberField = false,
  isAmountReadOnly = false
}: BillFormFieldsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">{title} Bill Details</h3>
      <div className="grid grid-cols-1 gap-6">
        <CurrencyInputField
          label="Amount (₹)"
          value={values.amount}
          onChange={(value) => onChange("amount", value)}
          error={errors[`${type}_amount`]}
          readOnly={isAmountReadOnly}
        />

        {showBikeNumberField && (
          <div>
            <Label htmlFor="bikeNumber">Bike Number</Label>
            <Input
              id="bikeNumber"
              placeholder="Enter bike number"
              value={values.bikeNumber || ""}
              onChange={(e) => onChange("bikeNumber", e.target.value)}
              className={errors.bike_number ? "border-destructive" : ""}
            />
            {errors.bike_number && <p className="text-sm text-destructive mt-1">{errors.bike_number}</p>}
          </div>
        )}

        {showAttachmentField && (
          <FileUploadField
            label="Attach Bill"
            value={values.attachedBill}
            onChange={(file) => onChange("attachedBill", file)}
          />
        )}

        <PersonSelectionField
          label="Persons Involved"
          value={values.personsInvolved || []}
          onChange={(persons) => onChange("personsInvolved", persons)}
          error={errors[`${type}_persons`]}
        />
      </div>
    </div>
  );
}
