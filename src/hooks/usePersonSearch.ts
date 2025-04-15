
import { useEffect, useState } from "react";
import { PersonInvolved, mockUsers } from "@/types/bill";

export function usePersonSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<PersonInvolved[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

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

  // Clear search term
  const clearSearchTerm = () => {
    setSearchTerm("");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  return {
    searchTerm,
    isSearching,
    searchResults,
    handleSearchChange,
    clearSearchTerm
  };
}
