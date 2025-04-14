
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const YourBills = () => {
  const mockBills = [
    {
      type: "Food",
      amount: "₹211",
      date: "Wed Jan 01 2025",
      persons: 1,
      remarks: "asd",
      status: "pending"
    },
    {
      type: "Cab",
      amount: "₹1111",
      date: "Fri Jan 03 2025",
      persons: 1,
      remarks: "saas",
      status: "pending"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Bills</CardTitle>
        <CardDescription>Review your uploaded bills and their status</CardDescription>
        <div className="text-sm">Total Approved Amount: ₹0</div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 mb-6">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jan">January</SelectItem>
              <SelectItem value="feb">February</SelectItem>
              <SelectItem value="mar">March</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="cab">Cab</SelectItem>
              <SelectItem value="stay">Stay</SelectItem>
              <SelectItem value="misc">Miscellaneous</SelectItem>
              <SelectItem value="bike">Bike</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex-1">
            <Input placeholder="Search by status, remark, amount or bill type..." />
          </div>
        </div>
        
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
              {mockBills.map((bill, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-2">{bill.type}</td>
                  <td className="py-3 px-2">{bill.amount}</td>
                  <td className="py-3 px-2">{bill.date}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        {bill.persons}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2">{bill.remarks}</td>
                  <td className="py-3 px-2">
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      Pending
                    </Badge>
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
      </CardContent>
    </Card>
  );
};

export default YourBills;
