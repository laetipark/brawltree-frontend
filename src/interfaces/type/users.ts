export type Users = {
  USER_ID: string;
  USER_NM: string;
  USER_PRFL: string;
  USER_LST_BT: Date;
  USER_LST_CK: Date;
  USER_CR: string;
  USER_CR_NM: string;
};

export type UserProfile = {
  USER_ID: string;
  USER_NM: string;
  USER_PRFL: string;
  CLUB_ID: string;
  CLUB_NM: string;
  TROPHY_CUR: number;
  TROPHY_HGH: number;
  VICTORY_TRP: number;
  VICTORY_DUO: number;
  BRAWLER_RNK_25: number;
  BRAWLER_RNK_30: number;
  BRAWLER_RNK_35: number;
  PL_SL_CUR: number;
  PL_SL_HGH: number;
  PL_TM_CUR: number;
  PL_TM_HGH: number;
};

export type UserBrawlers = {
  BRAWLER_ID: string;
  BRAWLER_NM: string;
  BRAWLER_RRT: string;
  USER_ID: string;
  BRAWLER_PWR: number;
  TROPHY_BGN: number;
  TROPHY_CUR: number;
  TROPHY_HGH: number;
  TROPHY_RNK: number;
  MATCH_PCK_R_TL: number;
  MATCH_VIC_R_TL: number;
  MATCH_PCK_R_PL: number;
  MATCH_VIC_R_PL: number;
};

export type UserBrawlerItems = {
  USER_ID: string;
  BRAWLER_ID: string;
  ITEM_ID: string;
  ITEM_K: string;
  ITEM_NM: string;
};

export type UserBrawlerGraph = {
  BRAWLER_ID: string;
  x: string;
  y: number;
};

export type UserBattlesSummary = {
  day: string;
  value: string;
};

export type UserBrawlersSummary = {
  BRAWLER_ID: string;
  MATCH_CNT: number;
  MATCH_PCK_R: number;
  MATCH_VIC_R: number;
  BRAWLER_NM: string;
};

export type UserRecentBattles = {
  MATCH_DT: string;
  MATCH_DUR: number;
  BRAWLER_ID: string;
  MATCH_RES: number;
  MAP_ID: string;
  PLAYER_SP_BOOL: boolean;
  MAP_MD: string;
  MAP_NM: string;
  BRAWLER_NM: string;
  BRAWLER_CL: string;
};

export type UserRecentBrawlers = {
  BRAWLER_NM: string;
  MATCH_CNT_TOT: number;
  MATCH_CNT_RES: number;
  BRAWLER_ID: string;
};

export type UserBattles = {
  BATTLE_INFO: object;
  BATTLE_PLAYERS: object[];
};

export type UserFriends = {
  FRIEND_ID: string;
  MATCH_TYP: number;
  MATCH_GRD: number;
  MAP_MD: string;
  FRIEND_NM: string;
  MATCH_CNT: number;
  MATCH_CNT_VIC: number;
  MATCH_CNT_DEF: number;
  MATCH_VIC_R: number;
  FRIEND_PT: number;
};

export type UserSeasonRecords = {
  MATCH_TYP: number;
  MATCH_GRD: number;
  MAP_MD: string;
  MATCH_CNT: number;
  MATCH_CNT_VIC: number;
  MATCH_CNT_DEF: number;
  MATCH_VIC_R: number;
};
