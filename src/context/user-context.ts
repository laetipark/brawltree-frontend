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
  setUser: (user: UsersType) => void;
  profile: UserProfileType;
  type: string;
  mode: string;
  setType: (type: string) => void;
  setMode: (mode: string) => void;
  rotationTL: rotationModes[];
  rotationPL: rotationModes[];
  battlesSummary: UserBattlesSummaryType[];
  brawlersSummary: UserBrawlersSummaryType[];
  recentBattles: UserRecentBattlesType[];
  recentBrawlers: UserRecentBrawlersType[];
  battles: UserBattlesType[];
  season: SeasonType;
  setRetryCount: (retryCount: number) => void;
  friends?: UserFriendsType[];
  seasonRecords?: UserSeasonRecordsType[];
};

export default createContext<UserContext | null>(null);
