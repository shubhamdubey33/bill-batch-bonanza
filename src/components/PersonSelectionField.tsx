
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
import { Check, ChevronsUpDown, Loader2, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<PersonInvolved[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

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

  // Handle search input changes with debounce
  const handleSearchChange = (input: string) => {
    setSearchTerm(input);
    
    // Clear any existing timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    
    // Set a new timeout for the search
    const timeout = setTimeout(() => {
      searchPersons(input);
    }, 300); // 300ms debounce
    
    setDebounceTimeout(timeout);
  };

  // Perform the search (simulating a backend call with mockUsers)
  const searchPersons = async (input: string) => {
    if (input.trim().length === 0) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate a backend search with mockUsers
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      const results = mockUsers.filter(user => {
        // Case-insensitive search for name or employee ID
        return (
          user.name.toLowerCase().includes(input.toLowerCase()) ||
          user.employeeId.toLowerCase().includes(input.toLowerCase())
        );
      });
      
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching for persons:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Get the list of persons to display
  // If search term exists, use search results; otherwise use available persons
  const displayPersons = searchTerm
    ? searchResults
    : mockUsers.filter(user => !value.some(person => person._id === user._id));

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
              <CommandInput 
                placeholder="Search people..." 
                value={searchTerm}
                onValueChange={handleSearchChange}
              />
              <CommandEmpty>
                {isSearching ? (
                  <div className="flex items-center justify-center py-2">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Searching...
                  </div>
                ) : (
                  "No person found."
                )}
              </CommandEmpty>
              <CommandGroup>
                {displayPersons.map(person => (
                  <CommandItem
                    key={person._id}
                    onSelect={() => addPerson(person)}
                    className="flex items-center"
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
