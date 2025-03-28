import { createContext } from 'react';

type CdnContextType = {
  application: object;
  battle: object;
  brawler: object;
  main: object;
  news: object;
  map: object;
  user: object;
  language: string;
  setLanguage: (language: string) => void;
};

export const CdnContext = createContext<CdnContextType | null>(null);
