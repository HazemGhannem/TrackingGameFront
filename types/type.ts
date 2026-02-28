export interface LiveGameParticipant {
  puuid: string;
  riotId: string;
  summonerId: string;
  championId: number;
  championName: string; // we'll resolve this server-side
  profileIconId: number;
  spell1Id: number;
  spell2Id: number;
  teamId: number; // 100 = blue, 200 = red
  perks: {
    perkIds: number[];
    perkStyle: number;
    perkSubStyle: number;
  };
}

// Notification types
export interface GameStartNotification {
  type: 'GAME_START';
  playerId: string;
  playerName: string;
  gameMode: string;
  championName: string;
  championId: number;
  gameStartTime: number;
  teams: {
    blue: LiveGameParticipant[];
    red: LiveGameParticipant[];
  };
}

export interface GameEndNotification {
  type: 'GAME_END';
  playerId: string;
  playerName: string;
  result: 'WIN' | 'LOSS' | 'UNKNOWN';
  kills: number;
  deaths: number;
  assists: number;
  championName: string;
  gameDurationMinutes: number;
}

export type GameNotification = GameStartNotification | GameEndNotification;
//auth 

export interface SignupFormState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignupFieldErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
export interface LoginFormState {
  email: string;
  password: string;
}

export interface LoginFieldErrors {
  email?: string;
  password?: string;
}