export interface SignUpData {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface authResponse {
  user: User;
  token: string;
}

export interface User {
  username: string;
  email: string;
  favorite: string[];
}

export interface LoginData {
  email: string;
  password: string;
}

export interface PlayerRanked {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

export interface PlayerProfile {
  _id: string;
  puuid: string;
  gameName: string;
  tagLine: string;
  summoner: { profileIconId: number; summonerLevel: number; puuid: string };
  ranked: [PlayerRanked];
  createdAt: string;
  updatedAt: string;
  profileIconId?: number;
}

//favorite
export interface PopulatedFavoriteDocument {
  _id: string;
  userId: string;
  playerId: PlayerProfile;
  createdAt: Date;
}
