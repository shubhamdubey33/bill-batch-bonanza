
// Define bill type constants
export type BillType = "food" | "cab" | "stay" | "miscellaneous" | "bike";

export const billTypeLabels: Record<BillType, string> = {
  food: "Food",
  cab: "Cab",
  stay: "Stay",
  miscellaneous: "Miscellaneous",
  bike: "Bike"
};

// Fixed amount for bike bills
export const BIKE_FIXED_AMOUNT = "150";
