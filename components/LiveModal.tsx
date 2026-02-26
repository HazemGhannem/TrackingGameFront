'use client';

import { useEffect, useRef } from 'react';
import { X, Swords } from 'lucide-react';
import { GameStartNotification, LiveGameParticipant } from '@/types/type';
import { DDragon } from './constants/liveGameConstant';


interface LiveGameModalProps {
  notification: GameStartNotification;
  onClose: () => void;
}

export default function LiveGameModal({
  notification,
  onClose,
}: LiveGameModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    function handle(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [onClose]);

  const { teams, playerName, gameMode, gameStartTime } = notification;
  const gameMinutes = Math.floor((Date.now() - gameStartTime) / 60000);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div
        ref={ref}
        className="w-full max-w-3xl rounded-3xl border border-[#1A2030] bg-[#0A0E17] overflow-hidden shadow-2xl"
      >
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
              <p className="text-[#3A4155] text-xs font-condensed">
                {gameMode} ·{' '}
                {gameMinutes > 0 ? `${gameMinutes}m elapsed` : 'Just started'}
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

function TeamColumn({
  label,
  color,
  participants,
  trackedPlayerName,
}: {
  label: string;
  color: string;
  participants: LiveGameParticipant[];
  trackedPlayerName: string;
}) {
  return (
    <div>
      {/* Team header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
        <span
          className="font-condensed font-700 text-xs tracking-wider uppercase"
          style={{ color }}
        >
          {label}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {participants.map((p) => (
          <ParticipantRow
            key={p.puuid}
            participant={p}
            color={color}
            isTracked={p.riotId
              ?.toLowerCase()
              .includes(trackedPlayerName.split('#')[0].toLowerCase())}
          />
        ))}
      </div>
    </div>
  );
}

function ParticipantRow({
  participant,
  color,
  isTracked,
}: {
  participant: LiveGameParticipant;
  color: string;
  isTracked: boolean;
}) {
  const spell1Key = DDragon.spellIdToKey(participant.spell1Id);
  const spell2Key = DDragon.spellIdToKey(participant.spell2Id);

  return (
    <div
      className="flex items-center gap-3 px-3 py-2 rounded-xl border transition-all"
      style={{
        background: isTracked ? `${color}10` : 'rgba(255,255,255,0.02)',
        borderColor: isTracked ? `${color}40` : '#1A2030',
      }}
    >
      {/* Champion icon */}
      <div className="relative shrink-0">
        <div
          className="w-10 h-10 rounded-xl overflow-hidden border"
          style={{ borderColor: `${color}40` }}
        >
          <img
            src={DDragon.championIcon(participant.championName)}
            alt={participant.championName}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = DDragon.profileIcon(
                participant.profileIconId,
              );
            }}
          />
        </div>
        {/* Profile icon — small overlay bottom-right */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full overflow-hidden border border-[#0A0E17]">
          <img
            src={DDragon.profileIcon(participant.profileIconId)}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Name + champion */}
      <div className="flex-1 min-w-0">
        <p
          className="font-condensed font-700 text-xs truncate"
          style={{ color: isTracked ? color : 'white' }}
        >
          {participant.riotId || participant.championName}
        </p>
        <p className="text-[#3A4155] text-[10px] font-condensed truncate">
          {participant.championName}
        </p>
      </div>

      {/* Summoner spells */}
      <div className="flex flex-col gap-1 shrink-0">
        <SpellIcon spellKey={spell1Key} />
        <SpellIcon spellKey={spell2Key} />
      </div>
    </div>
  );
}

function SpellIcon({ spellKey }: { spellKey: string }) {
  return (
    <div className="w-5 h-5 rounded-md overflow-hidden border border-[#1A2030]">
      <img
        src={DDragon.spellIcon(spellKey)}
        alt={spellKey}
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    </div>
  );
}
