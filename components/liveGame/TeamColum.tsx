import { LiveGameParticipant } from '@/types/type';
import { ParticipantRow } from './ParticipantRow';

export function TeamColumn({
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
