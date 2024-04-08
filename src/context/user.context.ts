import { createContext } from 'react';
import {
  UserBattlesSummaryType,
  UserBattlesType,
  UserBrawlersSummaryType,
  UserFriendsType,
  UserProfileType,
  UserRecentBattlesType,
  UserRecentBrawlersType,
  UserSeasonType,
  UsersType,
} from '~/common/type/users.type';
import { rotationModes } from '~/common/type/events.type';
import { SeasonType } from '~/common/type/season.type';

type UserContextType = {
  id: string;
  user: UsersType;
  profile: UserProfileType;
  type: string;
  mode: string;
  rotationTL: rotationModes[];
  rotationPL: rotationModes[];
  battlesSummary: UserBattlesSummaryType[];
  brawlersSummary: UserBrawlersSummaryType[];
  recentBattles: UserRecentBattlesType[];
  recentBrawlers: UserRecentBrawlersType[];
  battles: UserBattlesType[];
  season: SeasonType;
  friends?: UserFriendsType[];
  seasonRecords?: UserSeasonType[];
  setUser: (user: UsersType) => void;
  setType: (type: string) => void;
  setMode: (mode: string) => void;
  setStack: (prevStack: (stack: number) => (number)) => void;
  setRetryCount: (retryCount: number) => void;
  setLoad: (bool: boolean) => void;
};

export const UserContext = createContext<UserContextType | null>(null);
