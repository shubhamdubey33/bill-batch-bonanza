
import { PersonInvolved } from "@/types/bill";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Loader2 } from "lucide-react";

interface PersonSearchResultsProps {
  isSearching: boolean;
  searchResults: PersonInvolved[];
  addPerson: (person: PersonInvolved) => void;
}

export function PersonSearchResults({
  isSearching,
  searchResults,
  addPerson,
}: PersonSearchResultsProps) {
  if (isSearching) {
    return (
      <div className="flex items-center justify-center py-6">
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        <span>Searching...</span>
      </div>
    );
  }

  return (
    <>
      <CommandEmpty>No person found</CommandEmpty>
      <CommandGroup>
        {searchResults.map((person) => (
          <CommandItem
            key={person._id}
            onSelect={() => addPerson(person)}
            className="flex items-center justify-between"
          >
            <div className="flex flex-col">
              <span>{person.name}</span>
              <span className="text-xs text-muted-foreground">
                ID: {person.employeeId}
              </span>
            </div>
          </CommandItem>
        ))}
      </CommandGroup>
    </>
  );
}
