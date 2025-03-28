import { createContext } from 'react';
import {
  UserBattlesType,
  UserBrawlerGraphType,
  UserBrawlerItemsType,
  UserOwnedBrawlersType,
  UserDailyBattlesType,
  UserFriendListType,
  UserProfileType,
  UserRecentBattlesType,
  UserRecentBrawlersType,
  UserSeasonsType,
  UsersType,
  UserSummaryBattlesType,
  UserWithoutBrawlersType
} from '~/common/types/users.type';
import { SeasonType } from '~/common/types/season.type';

/**
 * @description User 페이지 Context
 */
type UserContextType = {
  /* user Id 정보 */
  id: string;
  user: UsersType;
  setUser: (user: UsersType) => void;
  /* menu load 정보 */
  retryProfileCount: number;
  retryBrawlerCount: number;
  userInfoLoaded: boolean;
  profileLoaded: boolean;
  brawlerLoaded: boolean;
  battlesLoaded: boolean;
  setUserPageLoaded: (bool: boolean) => void;
  setProfileLoaded: (bool: boolean) => void;
  setBrawlerLoaded: (bool: boolean) => void;
  setRetryUserInfoCount: (retryCount: number) => void;
  setRetryProfileCount: (retryCount: number) => void;
  setRetryBrawlerCount: (retryCount: number) => void;
  setBattlesLoaded: (bool: boolean) => void;
};

/**
 * @description User 페이지 Profile Menu Context
 */
export type UserProfileContextType = {
  /* User Profile container values */
  profile: UserProfileType;
  setProfile: (userProfile: UserProfileType) => void;
  /* User Battles container values */
  type: string;
  mode: string;
  setType: (type: string) => void;
  setMode: (mode: string) => void;
  modeTL: string[];
  modePL: string[];
  setModeTL: (mode: string[]) => void;
  setModePL: (mode: string[]) => void;
  summaryBattles: UserSummaryBattlesType[];
  dailyBrawlers: UserDailyBattlesType[];
  recentBattles: UserRecentBattlesType[];
  recentBrawlers: UserRecentBrawlersType[];
  battles: UserBattlesType[];
  currentSeason: SeasonType;
  battleStack: number;
  setSummaryBattles: (summaryBattle: UserSummaryBattlesType[]) => void;
  setDailyBrawlers: (dailyBattle: UserDailyBattlesType[]) => void;
  setRecentBattles: (recentBattle: UserRecentBattlesType[]) => void;
  setRecentBrawlers: (recentBattle: UserRecentBrawlersType[]) => void;
  setBattles: (recentBattle: UserBattlesType[]) => void;
  setCurrentSeason: (currentSeason: SeasonType) => void;
  setBattleStack: (stack: number) => void;
  /* User Friends/Seasons container values */
  isCrew: boolean;
  setIsCrew: (isCrew: boolean) => void;
  friendList?: UserFriendListType;
  seasonList?: UserSeasonsType[];
  setFriendList?: (userFriends: UserFriendListType) => void;
  setSeasonList?: (userSeasons: UserSeasonsType[]) => void;
};

/**
 * @description User 페이지 Brawlers Menu Context
 */
export type UserBrawlersContextType = {
  userWithoutBrawlers: UserWithoutBrawlersType[];
  setUserWithoutBrawlers: (userBrawlers: UserWithoutBrawlersType[]) => void;
  userOwnedBrawlers: UserOwnedBrawlersType[];
  brawlerItems: UserBrawlerItemsType[];
  brawlerGraphs: UserBrawlerGraphType[];
  setUserOwnedBrawlers: (userBrawlers: UserOwnedBrawlersType[]) => void;
  setBrawlerItems: (type: UserBrawlerItemsType[]) => void;
  setBrawlerGraphs: (mode: UserBrawlerGraphType[]) => void;
};

export const UserContext = createContext<UserContextType | null>(null);
export const UserProfileContext = createContext<UserProfileContextType | null>(null);
export const UserBrawlersContext = createContext<UserBrawlersContextType | null>(null);
