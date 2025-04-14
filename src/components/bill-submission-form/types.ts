
import { PersonInvolved } from "@/types/bill";
import { BillType } from "./bill-types";

export interface BaseBillFormFields {
  date: Date | undefined;
  time: string;
  remark: string;
  amount: string;
  personsInvolved: PersonInvolved[];
  status: string;
}

export interface BillSpecificFields {
  food: {
    amount: string;
    personsInvolved: PersonInvolved[];
    attachedBill: File | string | undefined;
  };
  cab: {
    amount: string;
    personsInvolved: PersonInvolved[];
    attachedBill: File | string | undefined;
  };
  stay: {
    amount: string;
    personsInvolved: PersonInvolved[];
    attachedBill: File | string | undefined;
  };
  miscellaneous: {
    amount: string;
    personsInvolved: PersonInvolved[];
    attachedBill: File | string | undefined;
  };
  bike: {
    amount: string;
    bikeNumber: string;
    personsInvolved: PersonInvolved[];
  };
}

export interface BillFormProps {
  type: BillType;
  billFields: BillSpecificFields[BillType];
  handleFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}
