
import { Card, CardContent } from "@/components/ui/card";
import { BillsHeader } from "./your-bills/BillsHeader";
import { BillFilters } from "./your-bills/BillFilters";
import { BillsTable } from "./your-bills/BillsTable";
import { Bill } from "@/types/bill";

const YourBills = () => {
  const mockBills: Bill[] = [
    {
      kind: "food",
      amount: 211,
      date: new Date("2025-01-01"),
      time: "12:00",
      personsInvolved: [],
      remark: "asd",
      status: "validator_pending"
    },
    {
      kind: "cab",
      amount: 1111,
      date: new Date("2025-01-03"),
      time: "14:00",
      personsInvolved: [],
      remark: "saas",
      status: "validator_pending"
    }
  ];

  return (
    <Card>
      <BillsHeader />
      <CardContent>
        <BillFilters />
        <BillsTable bills={mockBills} />
      </CardContent>
    </Card>
  );
};

export default YourBills;
