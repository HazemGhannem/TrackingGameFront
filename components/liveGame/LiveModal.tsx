'use client';

import { useRef } from 'react';
import { X, Swords } from 'lucide-react';
import { GameStartNotification } from '@/types/type';
import { TeamColumn } from './TeamColum';

interface LiveGameModalProps {
  notification: GameStartNotification;
  onClose: () => void;
}

export default function LiveGameModal({
  notification,
  onClose,
}: LiveGameModalProps) {
  const { teams, playerName, gameMode, gameStartTime } = notification;
  const gameMinutes = Math.floor((Date.now() - gameStartTime) / 60000);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-3xl rounded-3xl border border-[#1A2030] bg-[#0A0E17] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1A2030] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.2)] flex items-center justify-center">
              <Swords size={15} className="text-[#00E5FF]" />
            </div>
            <div>
              <p className="font-condensed font-700 text-white text-sm">
                <span className="text-[#00E5FF]">{playerName}</span> is in game
              </p>
              <p className="text-[#00E5FF] text-xs font-condensed flex items-center gap-2">
                <span>{gameMode}</span>
                <span className="text-[#FFF]">
                  Time:
                  <span>
                    {gameMinutes > 0 ? ` ${gameMinutes}m` : 'Just started'}
                  </span>
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#3A4155] hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Teams */}
        <div className="p-6 grid grid-cols-2 gap-4">
          <TeamColumn
            label="Blue Team"
            color="#5B8DD9"
            participants={teams.blue}
            trackedPlayerName={playerName}
          />
          <TeamColumn
            label="Red Team"
            color="#D95B5B"
            participants={teams.red}
            trackedPlayerName={playerName}
          />
        </div>
      </div>
    </div>
  );
}
