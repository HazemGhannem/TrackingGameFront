// components/GameNotificationProvider.tsx
'use client';

import { useState, useCallback } from 'react';
import { useGameNotifications } from '@/hooks/useGameNotifications';
import { useAuth } from '@/hooks/useAuth';
import { useLiveGames } from '@/hooks/useLiveGame';
import { GameNotification, GameStartNotification } from '@/types/type';
import LiveGameModal from '../liveGame/LiveModal';
import ToastContainer from './ToastContainer';

interface Toast {
  id: string;
  notification: GameNotification;
}

const TOAST_DURATION = 10_000;

export default function GameNotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useAuth();
  const { refresh } = useLiveGames();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [liveModal, setLiveModal] = useState<GameStartNotification | null>(
    null,
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleNotification = useCallback(
    (notification: GameNotification) => {
      if (
        notification.type === 'GAME_START' ||
        notification.type === 'GAME_END'
      ) {
        refresh();
      }

      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, notification }]);
      setTimeout(() => dismiss(id), TOAST_DURATION);
    },
    [dismiss],
  );

  useGameNotifications(currentUser?._id, handleNotification);

  return (
    <>
      {children}

      {liveModal && (
        <LiveGameModal
          notification={liveModal}
          onClose={() => setLiveModal(null)}
        />
      )}

      <ToastContainer
        toasts={toasts}
        onDismiss={dismiss}
        onViewTeams={(notification) => {
          setLiveModal(notification);
          dismiss(notification.type); // close the toast too
        }}
      />
    </>
  );
}
