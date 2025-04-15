
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
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
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
    if (!value.some(p => p._id === person._id)) {
      if (value.length < 4) {
        onChange([...value, person]);
        setSearchTerm(""); // Clear search after adding
        setOpen(false);    // Close popover after adding
      }
    }
  };

  const removePerson = (personToRemove: PersonInvolved) => {
    onChange(value.filter(person => person._id !== personToRemove._id));
  };

  const handleSearchChange = (input: string) => {
    setSearchTerm(input);
    
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    
    const timeout = setTimeout(() => {
      searchPersons(input);
    }, 300);
    
    setDebounceTimeout(timeout);
  };

  const searchPersons = async (input: string) => {
    if (!input.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      // Simulating API call with mockUsers
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const results = mockUsers.filter(user => 
        user.name.toLowerCase().includes(input.toLowerCase()) ||
        user.employeeId.toLowerCase().includes(input.toLowerCase())
      );
      
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching for persons:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        <span className="text-xs text-muted-foreground">
          {value.length}/4 selected
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-2 border rounded-md">
          {value.map((person) => (
            <Badge
              key={person._id}
              variant="secondary"
              className="flex items-center gap-1 py-1 px-2"
            >
              <span>{person.name}</span>
              <button
                type="button"
                onClick={() => removePerson(person)}
                className="ml-1 hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
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
              {isSearching ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span>Searching...</span>
                </div>
              ) : (
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
              )}
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
}
