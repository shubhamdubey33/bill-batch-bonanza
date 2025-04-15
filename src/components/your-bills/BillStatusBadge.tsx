
import { Badge } from "@/components/ui/badge";
import { BillStatus } from "@/types/bill";

interface BillStatusBadgeProps {
  status: BillStatus;
}

export function BillStatusBadge({ status }: BillStatusBadgeProps) {
  const getStatusStyles = (status: BillStatus) => {
    switch (status) {
      case "validator_pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "validator_approved":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "approver_pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "approver_rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "approver_approved":
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  return (
    <Badge variant="outline" className={getStatusStyles(status)}>
      {status === "validator_pending" ? "Pending" : status.replace("_", " ")}
    </Badge>
  );
}
