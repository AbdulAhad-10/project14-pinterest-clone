"use client";

import { createContext, useState, useCallback } from "react";
import axios from "axios";

interface Pin {
  _id: string;
  image: string;
  title: string;
}

interface SearchContextType {
  searchResults: Pin[];
  performSearch: (query: string) => Promise<void>;
  clearSearch: () => void;
}

export const SearchContext = createContext<SearchContextType>({
  searchResults: [],
  performSearch: async () => {},
  clearSearch: () => {},
});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchResults, setSearchResults] = useState<Pin[]>([]);

  const performSearch = useCallback(async (query: string) => {
    try {
      const response = await axios.get(
        `/api/searchPins?q=${encodeURIComponent(query)}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching pins:", error);
      // Handle error (e.g., show a notification)
    }
  }, []);

  const clearSearch = useCallback(() => {
    performSearch(""); // This will fetch all pins
  }, [performSearch]);

  return (
    <SearchContext.Provider
      value={{ searchResults, performSearch, clearSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};
