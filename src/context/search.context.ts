import { createContext } from 'react';

type SearchContextType = {
  searchHistory;
  setSearchHistory;
  onAddSearchHistory: (userID: string) => void;
  onFilterSearchItem: (userIDs: string[]) => void;
  onRemoveSearchItem: (userID: string) => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);
