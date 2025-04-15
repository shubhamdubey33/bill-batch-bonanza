
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { BillStatusBadge } from "./BillStatusBadge";
import { Bill } from "@/types/bill";

interface BillsTableProps {
  bills: Bill[];
}

export function BillsTable({ bills }: BillsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-2 font-medium">Type</th>
            <th className="text-left py-3 px-2 font-medium">Amount</th>
            <th className="text-left py-3 px-2 font-medium">Date</th>
            <th className="text-left py-3 px-2 font-medium">Persons</th>
            <th className="text-left py-3 px-2 font-medium">Remarks</th>
            <th className="text-left py-3 px-2 font-medium">Status</th>
            <th className="text-left py-3 px-2 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => (
            <tr key={index} className="border-b">
              <td className="py-3 px-2">{bill.kind}</td>
              <td className="py-3 px-2">₹{bill.amount}</td>
              <td className="py-3 px-2">{bill.date.toDateString()}</td>
              <td className="py-3 px-2">
                <div className="flex items-center">
                  <span className="inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    {bill.personsInvolved.length}
                  </span>
                </div>
              </td>
              <td className="py-3 px-2">{bill.remark}</td>
              <td className="py-3 px-2">
                <BillStatusBadge status={bill.status} />
              </td>
              <td className="py-3 px-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
