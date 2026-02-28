import { LiveGameParticipant } from '@/types/type';
import { DDragon } from '../constants/liveGameConstant';
import { SpellIcon } from './SpellIcon';

export function ParticipantRow({
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
        {/* Profile icon  */}
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
        <p className="text-[#3A4155] text-[12px] font-condensed truncate">
          {participant.championName}
        </p>
      </div>

      {/* Summoner spells */}
      <div className="flex flex-col gap-1 ">
        <SpellIcon spellKey={spell1Key} />
        <SpellIcon spellKey={spell2Key} />
      </div>
    </div>
  );
}
