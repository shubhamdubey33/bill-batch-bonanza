
// Base bill interface
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

export type BillStatus = "validator_pending" | "validator_approved" | "approver_pending" | "approver_rejected" | "approver_approved";

export interface PersonInvolved {
  _id: string;
  name: string;
  employeeId: string;
}

// Food bill interface
export interface FoodBill extends BaseBill {
  kind: "food";
}

// Cab bill interface
export interface CabBill extends BaseBill {
  kind: "cab";
}

// Stay bill interface
export interface StayBill extends BaseBill {
  kind: "stay";
}

// Miscellaneous bill interface
export interface MiscellaneousBill extends BaseBill {
  kind: "miscellaneous";
}

// Bike bill interface
export interface BikeBill extends BaseBill {
  kind: "bike";
  bikeNumber: string;
}

// Union type for all bill types
export type Bill = FoodBill | CabBill | StayBill | MiscellaneousBill | BikeBill;

// Mock users data for demo purposes
export const mockUsers = [
  { _id: "1", name: "Shubham Dubey", employeeId: "EMP001" },
  { _id: "2", name: "Jane Doe", employeeId: "EMP002" },
  { _id: "3", name: "John Smith", employeeId: "EMP003" },
  { _id: "4", name: "Alice Johnson", employeeId: "EMP004" }
];
