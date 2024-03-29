import { createContext } from 'react';

type SearchContextType = {
  onAddSearchHistory: (userID: string) => void;
  onFilterSearchItem: (userIDs: string[]) => void;
  onRemoveSearchItem: (userID: string) => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);
