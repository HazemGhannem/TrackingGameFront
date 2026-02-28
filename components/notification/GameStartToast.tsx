 'use client';

import { X, Eye } from 'lucide-react';
import { GameStartNotification } from '@/types/type';
import { DDragon } from '@/components/constants/liveGameConstant';

interface Props {
  notification: GameStartNotification;
  onClose: () => void;
  onViewTeams: () => void;
}

export default function GameStartToast({
  notification,
  onClose,
  onViewTeams,
}: Props) {
  const { playerName, championName, gameMode } = notification;

  return (
    <div className="relative rounded-2xl border border-[rgba(0,229,255,0.2)] bg-[#0D1017] overflow-hidden shadow-2xl">
      <div className="h-[2px] bg-[#00E5FF]" />
      <div className="px-4 py-3 flex items-start gap-3">
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
          <button
            onClick={onViewTeams}
            className="mt-2 flex items-center gap-1.5 text-[10px] font-condensed font-700 text-[#00E5FF] hover:text-white transition-colors cursor-pointer"
          >
            <Eye size={11} /> View all players
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
