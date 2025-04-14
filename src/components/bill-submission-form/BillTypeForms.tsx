
import { CurrencyInputField } from "../CurrencyInputField";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { PersonSelectionField } from "../PersonSelectionField";
import { FileUploadField } from "../FileUploadField";
import { BillFormProps } from "./types";
import { billTypeLabels } from "./bill-types";

export function FoodBillForm({ type, billFields, handleFieldChange, errors }: BillFormProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">{billTypeLabels[type]} Bill Details</h3>
      <div className="grid grid-cols-1 gap-6">
        <CurrencyInputField
          label="Amount (₹)"
          value={billFields.amount}
          onChange={(value) => handleFieldChange("amount", value)}
          error={errors[`${type}_amount`]}
        />
        <FileUploadField
          label="Attach Bill"
          value={billFields.attachedBill}
          onChange={(file) => handleFieldChange("attachedBill", file)}
        />
        <PersonSelectionField
          label="Persons Involved"
          value={billFields.personsInvolved}
          onChange={(persons) => handleFieldChange("personsInvolved", persons)}
          error={errors[`${type}_persons`]}
        />
      </div>
    </div>
  );
}

export function CabBillForm({ type, billFields, handleFieldChange, errors }: BillFormProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">{billTypeLabels[type]} Bill Details</h3>
      <div className="grid grid-cols-1 gap-6">
        <CurrencyInputField
          label="Amount (₹)"
          value={billFields.amount}
          onChange={(value) => handleFieldChange("amount", value)}
          error={errors[`${type}_amount`]}
        />
        <FileUploadField
          label="Attach Bill"
          value={billFields.attachedBill}
          onChange={(file) => handleFieldChange("attachedBill", file)}
        />
        <PersonSelectionField
          label="Persons Involved"
          value={billFields.personsInvolved}
          onChange={(persons) => handleFieldChange("personsInvolved", persons)}
          error={errors[`${type}_persons`]}
        />
      </div>
    </div>
  );
}

export function StayBillForm({ type, billFields, handleFieldChange, errors }: BillFormProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">{billTypeLabels[type]} Bill Details</h3>
      <div className="grid grid-cols-1 gap-6">
        <CurrencyInputField
          label="Amount (₹)"
          value={billFields.amount}
          onChange={(value) => handleFieldChange("amount", value)}
          error={errors[`${type}_amount`]}
        />
        <FileUploadField
          label="Attach Bill"
          value={billFields.attachedBill}
          onChange={(file) => handleFieldChange("attachedBill", file)}
        />
        <PersonSelectionField
          label="Persons Involved"
          value={billFields.personsInvolved}
          onChange={(persons) => handleFieldChange("personsInvolved", persons)}
          error={errors[`${type}_persons`]}
        />
      </div>
    </div>
  );
}

export function MiscellaneousBillForm({ type, billFields, handleFieldChange, errors }: BillFormProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">{billTypeLabels[type]} Bill Details</h3>
      <div className="grid grid-cols-1 gap-6">
        <CurrencyInputField
          label="Amount (₹)"
          value={billFields.amount}
          onChange={(value) => handleFieldChange("amount", value)}
          error={errors[`${type}_amount`]}
        />
        <FileUploadField
          label="Attach Bill"
          value={billFields.attachedBill}
          onChange={(file) => handleFieldChange("attachedBill", file)}
        />
        <PersonSelectionField
          label="Persons Involved"
          value={billFields.personsInvolved}
          onChange={(persons) => handleFieldChange("personsInvolved", persons)}
          error={errors[`${type}_persons`]}
        />
      </div>
    </div>
  );
}

export function BikeBillForm({ type, billFields, handleFieldChange, errors }: BillFormProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">{billTypeLabels[type]} Bill Details</h3>
      <div className="grid grid-cols-1 gap-6">
        <CurrencyInputField
          label="Amount (₹)"
          value={billFields.amount}
          onChange={(value) => handleFieldChange("amount", value)}
          error={errors[`${type}_amount`]}
          readOnly={true}
        />
        <div>
          <Label htmlFor="bikeNumber">Bike Number</Label>
          <Input
            id="bikeNumber"
            placeholder="Enter bike number"
            value={billFields.bikeNumber}
            onChange={(e) => handleFieldChange("bikeNumber", e.target.value)}
            className={errors.bike_number ? "border-destructive" : ""}
          />
          {errors.bike_number && <p className="text-sm text-destructive mt-1">{errors.bike_number}</p>}
        </div>
        <PersonSelectionField
          label="Persons Involved"
          value={billFields.personsInvolved}
          onChange={(persons) => handleFieldChange("personsInvolved", persons)}
          error={errors[`${type}_persons`]}
        />
      </div>
    </div>
  );
}

export function BillTypeForm({ type, billFields, handleFieldChange, errors }: BillFormProps) {
  switch (type) {
    case 'food':
      return <FoodBillForm type={type} billFields={billFields} handleFieldChange={handleFieldChange} errors={errors} />;
    case 'cab':
      return <CabBillForm type={type} billFields={billFields} handleFieldChange={handleFieldChange} errors={errors} />;
    case 'stay':
      return <StayBillForm type={type} billFields={billFields} handleFieldChange={handleFieldChange} errors={errors} />;
    case 'miscellaneous':
      return <MiscellaneousBillForm type={type} billFields={billFields} handleFieldChange={handleFieldChange} errors={errors} />;
    case 'bike':
      return <BikeBillForm type={type} billFields={billFields} handleFieldChange={handleFieldChange} errors={errors} />;
    default:
      return null;
  }
}
