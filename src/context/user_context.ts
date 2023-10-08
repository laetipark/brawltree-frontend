import { createContext } from 'react';
import {
  Users,
  UserProfile,
  UserBattlesSummary,
  UserBrawlersSummary,
  UserRecentBattles,
  UserRecentBrawlers,
  UserBattles,
  UserFriends,
  UserSeasonRecords,
} from '~/interfaces/type/users';
import { rotationModes } from '~/interfaces/type/events';
import { Season } from '~/interfaces/type/season';

type UserContext = {
  id: string;
  user: Users;
  setUser: (user: Users) => void;
  profile: UserProfile;
  type: string;
  mode: string;
  setType: (type: string) => void;
  setMode: (mode: string) => void;
  rotationTL: rotationModes[];
  rotationPL: rotationModes[];
  battlesSummary: UserBattlesSummary[];
  brawlersSummary: UserBrawlersSummary[];
  recentBattles: UserRecentBattles[];
  recentBrawlers: UserRecentBrawlers[];
  battles: UserBattles[];
  season: Season;
  setRetryCount: (retryCount: number) => void;
  friends?: UserFriends[];
  seasonRecords?: UserSeasonRecords[];
};

export default createContext<UserContext | null>(null);
