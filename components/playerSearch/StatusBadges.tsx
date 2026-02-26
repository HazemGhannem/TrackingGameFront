import { Flame, Shield } from 'lucide-react';

interface StatusBadgesProps {
  hotStreak: boolean;
  veteran: boolean;
}

export default function StatusBadges({
  hotStreak,
  veteran,
}: StatusBadgesProps) {
  return (
    <>
      {hotStreak && (
        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-condensed font-700 bg-[rgba(255,100,0,0.12)] border border-[rgba(255,100,0,0.25)] text-orange-400">
          <Flame size={9} /> HOT
        </span>
      )}
      {veteran && (
        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-condensed font-700 bg-[rgba(0,229,255,0.08)] border border-[rgba(0,229,255,0.2)] text-[#00E5FF]">
          <Shield size={9} /> VET
        </span>
      )}
    </>
  );
}
