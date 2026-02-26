import { GameNotification } from '@/types/type';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function useGameNotifications(
  userId: string | undefined,
  onNotification: (n: GameNotification) => void,
) {
  const socketRef = useRef<Socket | null>(null);
  // Keep a ref to the callback so the socket listener always calls the latest version
  const callbackRef = useRef(onNotification);
  useEffect(() => {
    callbackRef.current = onNotification;
  }, [onNotification]);

  useEffect(() => {
    if (!userId) return;

    const socket = io(SOCKET_URL, {
      query: { userId },
      withCredentials: true,
      transports: ['websocket'],
    });

    socketRef.current = socket;

    socket.on('connect', () => console.log('[Socket] Connected:', socket.id));

    // Always call the latest callback via ref — avoids stale closure
    socket.on('game-notification', (notification: GameNotification) => {
      console.log('[Socket] Received notification:', notification);
      callbackRef.current(notification);
    });

    socket.on('disconnect', () => console.log('[Socket] Disconnected'));

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return socketRef;
}
