
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PersonInvolved } from "@/types/bill";
import { PersonSearchResults } from "./person-selection/PersonSearchResults";
import { SelectedPersonList } from "./person-selection/SelectedPersonList";
import { usePersonSearch } from "@/hooks/usePersonSearch";

interface PersonSelectionFieldProps {
  label: string;
  value: PersonInvolved[];
  onChange: (persons: PersonInvolved[]) => void;
  error?: string;
}

export function PersonSelectionField({
  label,
  value,
  onChange,
  error
}: PersonSelectionFieldProps) {
  const [open, setOpen] = useState(false);
  const { 
    searchTerm, 
    isSearching, 
    searchResults, 
    handleSearchChange, 
    clearSearchTerm 
  } = usePersonSearch();

  const addPerson = (person: PersonInvolved) => {
    if (!value.some(p => p._id === person._id)) {
      if (value.length < 4) {
        onChange([...value, person]);
        clearSearchTerm();
        setOpen(false);
      }
    }
  };

  const removePerson = (personToRemove: PersonInvolved) => {
    onChange(value.filter(person => person._id !== personToRemove._id));
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        <span className="text-xs text-muted-foreground">
          {value.length}/4 selected
        </span>
      </div>
      
      <div className="space-y-2">
        <SelectedPersonList selectedPersons={value} onRemove={removePerson} />
        
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "w-full justify-between",
                error && "border-destructive",
                value.length >= 4 && "opacity-50 cursor-not-allowed"
              )}
              disabled={value.length >= 4}
            >
              <span>
                {value.length >= 4 
                  ? "Maximum persons added" 
                  : "Search by name or employee ID"}
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
            <Command>
              <CommandInput 
                placeholder="Type to search..."
                value={searchTerm}
                onValueChange={handleSearchChange}
              />
              <PersonSearchResults 
                isSearching={isSearching} 
                searchResults={searchResults}
                addPerson={addPerson}
              />
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
}
