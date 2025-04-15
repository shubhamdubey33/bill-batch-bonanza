
// Person Types
export interface PersonInvolved {
  _id: string;
  name: string;
  employeeId: string;
}

// Bill Status Types
export type BillStatus = 
  | "validator_pending"
  | "validator_approved" 
  | "approver_pending" 
  | "approver_rejected" 
  | "approver_approved";

// Base Bill Interface
export interface BaseBill {
  _id?: string;
  date: Date;
  time: string;
  amount: number;
  remark: string;
  status: BillStatus;
  personsInvolved: PersonInvolved[];
  attachedBill?: File | string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Specific Bill Types
export interface FoodBill extends BaseBill {
  kind: "food";
}

export interface CabBill extends BaseBill {
  kind: "cab";
}

export interface StayBill extends BaseBill {
  kind: "stay";
}

export interface MiscellaneousBill extends BaseBill {
  kind: "miscellaneous";
}

export interface BikeBill extends BaseBill {
  kind: "bike";
  bikeNumber: string;
}

// Union type for all bill types
export type Bill = FoodBill | CabBill | StayBill | MiscellaneousBill | BikeBill;

// Mock data
export const mockUsers: PersonInvolved[] = [
  { _id: "1", name: "Shubham Dubey", employeeId: "EMP001" },
  { _id: "2", name: "Jane Doe", employeeId: "EMP002" },
  { _id: "3", name: "John Smith", employeeId: "EMP003" },
  { _id: "4", name: "Alice Johnson", employeeId: "EMP004" }
];
