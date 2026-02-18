import { Dispatch, SetStateAction, createContext } from 'react';

export type CdnLocale = Record<string, any>;

export type CdnBundle = {
  application: CdnLocale;
  battle: CdnLocale;
  brawler: CdnLocale;
  main: CdnLocale;
  news: CdnLocale;
  map: CdnLocale;
  user: CdnLocale;
};

export type CdnContextType = CdnBundle & {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
};

export const EMPTY_CDN_BUNDLE: CdnBundle = {
  application: {},
  battle: {},
  brawler: {},
  main: {},
  news: {},
  map: {},
  user: {}
};

export const CdnContext = createContext<CdnContextType>({
  ...EMPTY_CDN_BUNDLE,
  language: 'ko',
  setLanguage: () => undefined
});
