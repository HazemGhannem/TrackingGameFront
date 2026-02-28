'use client';

import { X } from 'lucide-react';
import { GameEndNotification } from '@/types/type';
import { DDragon } from '@/components/constants/liveGameConstant';

interface Props {
  notification: GameEndNotification;
  onClose: () => void;
}

export default function GameEndToast({ notification, onClose }: Props) {
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
