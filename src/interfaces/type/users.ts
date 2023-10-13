export type Users = {
  userID: string;
  name: string;
  profile: string;
  lastBattleAt: Date;
  crew: string;
  crewName: string;
  updatedAt: Date;
};

export type UserProfile = {
  userID: string;
  name: string;
  profile: string;
  clubID: string;
  clubName: string;
  currentTrophies: number;
  highestTrophies: number;
  trophyChange: number;
  tripleVictories: number;
  duoVictories: number;
  rank25Brawlers: number;
  rank30Brawlers: number;
  rank35Brawlers: number;
  currentSoloPL: number;
  highestSoloPL: number;
  currentTeamPL: number;
  highestTeamPL: number;
};

export type UserBrawlers = {
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

export type UserBrawlerItems = {
  userID: string;
  brawlerID: string;
  itemID: string;
  itemKind: string;
  itemName: string;
};

export type UserBrawlerGraph = {
  brawlerID: string;
  x: string;
  y: number;
};

export type UserBattlesSummary = {
  day: string;
  value: string;
};

export type UserBrawlersSummary = {
  brawlerID: string;
  matchCount: number;
  pickRate: number;
  victoryRate: number;
  name: string;
};

export type UserRecentBattles = {
  matchDate: string;
  duration: number;
  brawlerID: string;
  matchResult: number;
  mapID: string;
  isStarPlayer: boolean;
  mode: string;
  mapName: string;
  brawlerName: string;
  role: string;
};

export type UserRecentBrawlers = {
  name: string;
  matchCount: number;
  resultCount: number;
  brawlerID: string;
};

export type UserBattles = {
  BATTLE_INFO: object;
  BATTLE_PLAYERS: object[];
};

export type UserFriends = {
  friendID: string;
  matchType: number;
  matchGrade: number;
  mode: string;
  name: string;
  matchCount: number;
  victoryCount: number;
  defeatCount: number;
  victoryRate: number;
  friendPoints: number;
};

export type UserSeasonRecords = {
  matchType: number;
  matchGrade: number;
  mode: string;
  matchCount: number;
  victoryCount: number;
  defeatCount: number;
  victoryRate: number;
};
