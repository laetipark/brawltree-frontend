import { createContext } from 'react';
import {
  UserBattlesSummaryType,
  UserBattlesType,
  UserBrawlersSummaryType,
  UserFriendsType,
  UserProfileType,
  UserRecentBattlesType,
  UserRecentBrawlersType,
  UserSeasonRecordsType,
  UsersType,
} from '~/common/type/users.type';
import { rotationModes } from '~/common/type/events.type';
import { SeasonType } from '~/common/type/season.type';

type UserContext = {
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
  seasonRecords?: UserSeasonRecordsType[];
  stack: number;
  setUser: (user: UsersType) => void;
  setType: (type: string) => void;
  setMode: (mode: string) => void;
  setRetryCount: (retryCount: number) => void;
  setStack: (stack: number) => void;
};

export default createContext<UserContext | null>(null);
