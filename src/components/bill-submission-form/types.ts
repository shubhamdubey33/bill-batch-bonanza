
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

// Define the specific fields for each bill type
export interface FoodBillFields {
  amount: string;
  personsInvolved: PersonInvolved[];
  attachedBill: File | string | undefined;
}

export interface CabBillFields {
  amount: string;
  personsInvolved: PersonInvolved[];
  attachedBill: File | string | undefined;
}

export interface StayBillFields {
  amount: string;
  personsInvolved: PersonInvolved[];
  attachedBill: File | string | undefined;
}

export interface MiscellaneousBillFields {
  amount: string;
  personsInvolved: PersonInvolved[];
  attachedBill: File | string | undefined;
}

export interface BikeBillFields {
  amount: string;
  bikeNumber: string;
  personsInvolved: PersonInvolved[];
}

export interface BillSpecificFields {
  food: FoodBillFields;
  cab: CabBillFields;
  stay: StayBillFields;
  miscellaneous: MiscellaneousBillFields;
  bike: BikeBillFields;
}

export interface BillFormProps {
  type: BillType;
  billFields: BillSpecificFields[BillType];
  handleFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}
