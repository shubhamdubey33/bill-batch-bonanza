
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PersonInvolved, mockUsers } from "@/types/bill";

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

  const addPerson = (person: PersonInvolved) => {
    // Check if person already exists in the list
    if (!value.some(p => p._id === person._id)) {
      // Only allow up to 4 persons
      if (value.length < 4) {
        onChange([...value, person]);
      }
    }
    setOpen(false);
  };

  const removePerson = (id: string) => {
    onChange(value.filter(person => person._id !== id));
  };

  // Filter out already selected persons
  const availablePersons = mockUsers.filter(
    user => !value.some(person => person._id === user._id)
  );

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        <span className="text-xs text-muted-foreground">
          {value.length}/4 selected
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2 mb-2">
          {value.map(person => (
            <Badge key={person._id} variant="secondary" className="flex items-center gap-1">
              {person.name}
              <button 
                onClick={() => removePerson(person._id)}
                className="ml-1 rounded-full hover:bg-muted p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-full justify-between",
                error && "border-destructive"
              )}
              disabled={value.length >= 4}
            >
              <span>
                {value.length >= 4 
                  ? "Maximum persons added" 
                  : "Select a person"}
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search people..." />
              <CommandEmpty>No person found.</CommandEmpty>
              <CommandGroup>
                {availablePersons.map(person => (
                  <CommandItem
                    key={person._id}
                    onSelect={() => addPerson(person)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span>{person.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ID: {person.employeeId}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
