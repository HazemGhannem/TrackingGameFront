import { User } from '@/types/api/types';

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
}

export interface authState {
  user: User | null;
  loading: boolean;
  success: boolean;
  error: string | null;
}

//live-game

export interface ILiveGame {
  _id: string;
  playerId: string | { _id: string; gameName: string; tagLine: string };
  userId: string;
  playerName: string;
  gameId: number;
  gameMode: string;
  championName: string;
  championId: number;
  gameStartTime: number;
  teams: {
    blue: any[];
    red: any[];
  };
  createdAt: string;
}
export interface PaginationMeta {
  page: number;
  pages: number;
  total: number;
}
