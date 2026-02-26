export interface SignupPayload {
  username: string;
  email: string;
  password: string;
}
export interface User {
  _id:string
  username: string;
  email: string;
  favorite: string[];
}
export interface authState {
  user:  User | null 
  loading: boolean;
  success: boolean;
  error: string | null;
}

// notifications
export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

export interface NotificationState {
  notifications: Notification[];
}