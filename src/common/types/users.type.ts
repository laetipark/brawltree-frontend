export type UsersType = {
  userID: string;
  userName: string;
  profileIcon: string;
  lastBattleAt: Date;
  isCrew: boolean;
  crew: string;
  crewName: string;
  updatedAt: Date;
};

export type UserProfileType = {
  userID: string;
  userName: string;
  profileIcon: string;
  clubID: string;
  clubName: string;
  currentTrophies: number;
  highestTrophies: number;
  trophyChange: number;
  trioMatchVictories: number;
  duoMatchVictories: number;
  soloMatchVictories: number;
  // brawlerRank25: number;
  // brawlerRank30: number;
  brawlerRank50: number;
  currentSoloRanked: number;
  highestSoloRanked: number;
  // currentTeamPL: number;
  // highestTeamPL: number;
};

export type UserSummaryBattlesType = {
  day: string;
  value: string;
};

export type UserDailyBattlesType = {
  date: Date;
  brawlers: UserDailyBrawlersType[];
};

/**
 * @type UserDailyBrawlersType
 * @description 일일 브롤러 별 픽/승률 타입
 */
export type UserDailyBrawlersType = {
  brawlerID: string;
  matchCount: number;
  pickRate: number;
  victoryRate: number;
  brawlerName: string;
};

export type UserRecentBattlesType = {
  battleTime: string;
  duration: number;
  brawlerID: string;
  gameResult: number;
  mapID: string;
  isStarPlayer: boolean;
  mode: string;
  mapName: string;
  brawlerName: string;
  role: string;
};

export type UserRecentBrawlersType = {
  brawlerName: string;
  matchCount: number;
  resultCount: { '-1': number; '0': number; '1': number };
  brawlerID: string;
};

export type UserBattlesType = {
  battleInfo: UserBattleInfoType;
  battlePlayers: UserBattlePlayersType[];
};

export type UserBattleInfoType = {
  userID: string;
  battleTime: Date;
  duration: number;
  matchType: number;
  modeCode: number;
  matchGrade: number;
  trophyChange: number;
};

export type UserBattlePlayersType = {
  playerID: string;
  playerName: string;
  teamNumber: number;
  brawlerID: string;
  brawlerPower: number;
  brawlerTrophies: number;
  gameRank: number;
  gameResult: number;
  isStarPlayer: number;
};

export type UserFriendListType = {
  friends: UserFriendsType[];
  friendsUpdatedAt: Date;
};

export type UserFriendsType = {
  friendID: string;
  friendName: string;
  profileIcon: string;
  matchCount: number;
  matchGrade: number;
  matchType: number;
  mode: string;
  victoriesCount: number;
  defeatsCount: number;
  victoryRate: number;
};

export type UserSeasonsType = {
  matchType: number;
  matchGrade: number;
  modeName: string;
  matchCount: number;
  victoriesCount: number;
  defeatsCount: number;
  victoryRate: number;
};

export type UserWithoutBrawlersType = {
  brawlerID: string;
  name: string;
  rarity: string;
};

export type UserOwnedBrawlersType = {
  brawlerID: string;
  name: string;
  rarity: string;
  userID: string;
  brawlerPower: number;
  beginTrophies: number;
  currentTrophies: number;
  highestTrophies: number;
  brawlerRank: number;
  trophyPickRate: number;
  trophyVictoryRate: number;
  rankedPickRate: number;
  rankedVictoryRate: number;
  values: object;
};

export type UserBrawlerItemsType = {
  userID: string;
  brawlerID: string;
  itemID: string;
  itemKind: string;
  itemName: string;
};

export type UserBrawlerGraphType = {
  brawlerID: string;
  x: string;
  y: number;
};
