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