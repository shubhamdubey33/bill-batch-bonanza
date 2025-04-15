
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function BillFilters() {
  return (
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
  );
}
