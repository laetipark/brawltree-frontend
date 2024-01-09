export type UsersType = {
  userID: string;
  userName: string;
  profileIcon: string;
  lastBattleAt: Date;
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
  brawlerRank25: number;
  brawlerRank30: number;
  brawlerRank35: number;
  currentSoloPL: number;
  highestSoloPL: number;
  currentTeamPL: number;
  highestTeamPL: number;
};

export type UserBrawlersType = {
  brawlerID: string;
  name: string;
  rarity: string;
  userID: string;
  brawlerPower: number;
  beginTrophies: number;
  currentTrophies: number;
  highestTrophies: number;
  brawlerRank: number;
  trophyLeaguePickRate: number;
  trophyLeagueVictoryRate: number;
  powerLeaguePickRate: number;
  powerLeagueVictoryRate: number;
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

export type UserBattlesSummaryType = {
  day: string;
  value: string;
};

export type UserBrawlersSummaryType = {
  brawlerID: string;
  matchCount: number;
  pickRate: number;
  victoryRate: number;
  name: string;
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
  resultCount: number;
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

export type UserFriendsType = {
  friendID: string;
  matchType: number;
  matchGrade: number;
  mode: string;
  friendName: string;
  matchCount: number;
  victoriesCount: number;
  defeatsCount: number;
  victoryRate: number;
  friendPoints: number;
};

export type UserSeasonRecordsType = {
  matchType: number;
  matchGrade: number;
  mode: string;
  matchCount: number;
  victoriesCount: number;
  defeatsCount: number;
  victoryRate: number;
};
