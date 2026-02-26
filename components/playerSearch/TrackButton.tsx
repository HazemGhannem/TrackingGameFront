import { Check, Plus } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorite';

interface TrackButtonProps {
  playerId: string;
}

export default function TrackButton({ playerId }: TrackButtonProps) {
  const { isFavorited, toggleTrack } = useFavorites( );

  const tracked = isFavorited(playerId);
  return (
    <button
      onClick={() => toggleTrack(playerId)}
      className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-condensed font-600 border transition-all duration-200 cursor-pointer ${
        tracked
          ? 'bg-[rgba(0,229,255,0.1)] text-[#00E5FF] border-[rgba(0,229,255,0.3)]'
          : 'bg-transparent text-[#5A6478] border-[#1E2535] hover:border-[#2A3040] hover:text-white'
      }`}
    >
      {tracked ? (
        <Check size={12} className="text-[#00E5FF]" />
      ) : (
        <Plus size={12} />
      )}
      {tracked ? 'Tracked' : 'Track'}
    </button>
  );
}
