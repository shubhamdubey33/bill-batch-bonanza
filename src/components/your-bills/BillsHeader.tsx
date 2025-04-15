
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function BillsHeader() {
  return (
    <CardHeader>
      <CardTitle>Your Bills</CardTitle>
      <CardDescription>Review your uploaded bills and their status</CardDescription>
      <div className="text-sm">Total Approved Amount: ₹0</div>
    </CardHeader>
  );
}
