'use client';

import {
  GameNotification,
  GameStartNotification,
  GameEndNotification,
} from '@/types/type';
import GameStartToast from './GameStartToast';
import GameEndToast from './GameEndToast';

interface Toast {
  id: string;
  notification: GameNotification;
}

interface Props {
  toasts: Toast[];
  onDismiss: (id: string) => void;
  onViewTeams: (notification: GameStartNotification) => void;
}

export default function ToastContainer({
  toasts,
  onDismiss,
  onViewTeams,
}: Props) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      {toasts.map(({ id, notification }) => (
        <div key={id} className="pointer-events-auto">
          {notification.type === 'GAME_START' ? (
            <GameStartToast
              notification={notification as GameStartNotification}
              onClose={() => onDismiss(id)}
              onViewTeams={() =>
                onViewTeams(notification as GameStartNotification)
              }
            />
          ) : (
            <GameEndToast
              notification={notification as GameEndNotification}
              onClose={() => onDismiss(id)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
