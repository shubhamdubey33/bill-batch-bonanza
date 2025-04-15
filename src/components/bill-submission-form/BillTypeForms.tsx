
import { billTypeLabels } from "./bill-types";
import { BillFormProps } from "./types";
import { BillFormFields } from "./BillFormFields";

export function BillTypeForm({ type, billFields, handleFieldChange, errors }: BillFormProps) {
  const hasAttachment = type !== 'bike';
  const showBikeNumber = type === 'bike';
  const isAmountReadOnly = type === 'bike';
  
  return (
    <BillFormFields
      type={type}
      title={billTypeLabels[type]}
      values={billFields}
      onChange={handleFieldChange}
      errors={errors}
      showAttachmentField={hasAttachment}
      showBikeNumberField={showBikeNumber}
      isAmountReadOnly={isAmountReadOnly}
    />
  );
}
