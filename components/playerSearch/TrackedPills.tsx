import { X } from 'lucide-react';
import { Region } from '../constants/searchConstants';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorite';

interface TrackedPillsProps {
  activeRegion: Region;
}

export default function TrackedPills({ activeRegion }: TrackedPillsProps) {
  const { currentUser } = useAuth();
  const { favorites, remove } = useFavorites(currentUser?._id!);

  if (favorites.length === 0) return null;
  console.log(favorites);
  return (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      <span className="section-label">Tracking:</span>
      {favorites.map((fav) => (
        <span
          key={String(fav.playerId._id)}
          className="flex items-center gap-1.5 px-3 py-1 bg-[rgba(0,229,255,0.08)] border border-[rgba(0,229,255,0.2)] rounded-full text-[#00E5FF] text-xs font-condensed font-600"
        >
          <span className="text-xs">{activeRegion.flag}</span>
          {fav.playerId.gameName}#{fav.playerId.tagLine}
          <button
            onClick={() => remove(String(fav.playerId._id))}
            className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity"
          >
            <X size={12} className="text-[#00E5FF]" />
          </button>
        </span>
      ))}
    </div>
  );
}
