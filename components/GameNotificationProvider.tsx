'use client';

import { useState, useCallback } from 'react';
import { X, Swords, Trophy, Skull, Eye } from 'lucide-react';
import { useGameNotifications } from '@/hooks/useGameNotifications';
import { useAuth } from '@/hooks/useAuth';
import {
  GameNotification,
  GameStartNotification,
  GameEndNotification,
} from '@/types/type';
import LiveGameModal from './LiveModal';
import { DDragon } from './constants/liveGameConstant';


interface Toast {
  id: string;
  notification: GameNotification;
}

export default function GameNotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useAuth();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [liveModal, setLiveModal] = useState<GameStartNotification | null>(
    null,
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleNotification = useCallback((notification: GameNotification) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, notification }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 10000);
  }, []);

  useGameNotifications(currentUser?._id, handleNotification);

  return (
    <>
      {children}

      {/* Live game modal */}
      {liveModal && (
        <LiveGameModal
          notification={liveModal}
          onClose={() => setLiveModal(null)}
        />
      )}

      {/* Toast stack */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        {toasts.map(({ id, notification }) => (
          <div key={id} className="pointer-events-auto">
            {notification.type === 'GAME_START' ? (
              <GameStartToast
                notification={notification as GameStartNotification}
                onClose={() => dismiss(id)}
                onViewTeams={() => {
                  setLiveModal(notification as GameStartNotification);
                  dismiss(id);
                }}
              />
            ) : (
              <GameEndToast
                notification={notification as GameEndNotification}
                onClose={() => dismiss(id)}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

/* ── GAME START Toast ────────────────────────────────── */
function GameStartToast({
  notification,
  onClose,
  onViewTeams,
}: {
  notification: GameStartNotification;
  onClose: () => void;
  onViewTeams: () => void;
}) {
  const { playerName, championName, championId, gameMode } = notification;

  return (
    <div className="relative rounded-2xl border border-[rgba(0,229,255,0.2)] bg-[#0D1017] overflow-hidden shadow-2xl">
      <div className="h-[2px] bg-[#00E5FF]" />
      <div className="px-4 py-3 flex items-start gap-3">
        {/* Champion icon */}
        <div className="w-12 h-12 rounded-xl overflow-hidden border border-[rgba(0,229,255,0.2)] shrink-0">
          <img
            src={DDragon.championIcon(championName)}
            alt={championName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-condensed font-700 text-white text-sm leading-snug">
            <span className="text-[#00E5FF]">{playerName}</span> just started a
            game
          </p>
          <p className="text-[#5A6478] text-xs font-condensed mt-0.5">
            Playing <span className="text-white">{championName}</span> ·{' '}
            {gameMode}
          </p>

          {/* View teams button */}
          <button
            onClick={onViewTeams}
            className="mt-2 flex items-center gap-1.5 text-[10px] font-condensed font-700 text-[#00E5FF] hover:text-white transition-colors cursor-pointer"
          >
            <Eye size={11} />
            View all players
          </button>
        </div>

        <button
          onClick={onClose}
          className="text-[#3A4155] hover:text-white transition-colors cursor-pointer shrink-0"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

/* ── GAME END Toast ──────────────────────────────────── */
function GameEndToast({
  notification,
  onClose,
}: {
  notification: GameEndNotification;
  onClose: () => void;
}) {
  const {
    playerName,
    result,
    kills,
    deaths,
    assists,
    championName,
    gameDurationMinutes,
  } = notification;

  const isWin = result === 'WIN';
  const accentColor = isWin ? '#00E676' : '#FF3B5C';

  return (
    <div
      className="relative rounded-2xl border bg-[#0D1017] overflow-hidden shadow-2xl"
      style={{ borderColor: `${accentColor}30` }}
    >
      <div className="h-[2px]" style={{ background: accentColor }} />
      <div className="px-4 py-3 flex items-start gap-3">
        {/* Champion icon */}
        <div
          className="w-12 h-12 rounded-xl overflow-hidden border shrink-0"
          style={{ borderColor: `${accentColor}30` }}
        >
          <img
            src={DDragon.championIcon(championName)}
            alt={championName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-condensed font-700 text-white text-sm leading-snug">
            <span style={{ color: accentColor }}>{playerName}</span>
            {isWin ? ' won' : ' lost'} their game
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-condensed">
              <span className="text-[#00E676]">{kills}</span>
              <span className="text-[#3A4155]"> / </span>
              <span className="text-[#FF3B5C]">{deaths}</span>
              <span className="text-[#3A4155]"> / </span>
              <span className="text-[#FFB300]">{assists}</span>
            </span>
            <span className="text-[#3A4155] text-[10px]">·</span>
            <span className="text-[#5A6478] text-[10px] font-condensed">
              {championName}
            </span>
            <span className="text-[#3A4155] text-[10px]">·</span>
            <span className="text-[#5A6478] text-[10px] font-condensed">
              {gameDurationMinutes}m
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-[#3A4155] hover:text-white transition-colors cursor-pointer shrink-0"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
