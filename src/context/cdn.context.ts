import { createContext } from 'react';

type CdnContextType = {
  application: object;
  battle: object;
  brawler: object;
  main: object;
  map: object;
  user: object;
  setLanguage: (language: string) => void;
};

export const CdnContext = createContext<CdnContextType | null>(null);
