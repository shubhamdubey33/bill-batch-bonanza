
import { Badge } from "@/components/ui/badge";
import { PersonInvolved } from "@/types/bill";
import { X } from "lucide-react";

interface SelectedPersonListProps {
  selectedPersons: PersonInvolved[];
  onRemove: (person: PersonInvolved) => void;
}

export function SelectedPersonList({
  selectedPersons,
  onRemove,
}: SelectedPersonListProps) {
  return (
    <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-2 border rounded-md">
      {selectedPersons.map((person) => (
        <Badge
          key={person._id}
          variant="secondary"
          className="flex items-center gap-1 py-1 px-2"
        >
          <span>{person.name}</span>
          <button
            type="button"
            onClick={() => onRemove(person)}
            className="ml-1 hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
            aria-label={`Remove ${person.name}`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
}
